import { NursingLectureResource, NursingTopic, ResourceValidationStatus } from '../../types/nursing';
import { LectureResourceCache } from './lectureResourceCache';
import { VERIFIED_NURSING_LECTURES } from './nursingLectureDiscovery';
import { ResourceValidationService } from './resourceValidationService';
import { LectureScoringEngine } from './lectureScoringEngine';

export interface BrokenLinkRecoveryResult {
  success: boolean;
  activeLecture: NursingLectureResource | null;
  message: string;
  recoveredFromAlternative: boolean;
  remainingAlternatives: NursingLectureResource[];
  statusAssigned: ResourceValidationStatus;
}

export class BrokenLinkRecovery {
  /**
   * Automatically recovers when a video link is private, restricted, or deleted.
   * Invalidates cache, ranks candidates, replaces the video stream, and completely preserves student progress.
   */
  public static handleBrokenResource(
    topic: NursingTopic,
    failedVideoId: string,
    reasonStatus: ResourceValidationStatus = 'UNAVAILABLE'
  ): BrokenLinkRecoveryResult {
    // 1. Update the status of the failing resource in persistent cache
    LectureResourceCache.updateResourceStatus(topic.id, failedVideoId, reasonStatus);

    // 2. Fetch alternative verified candidates for this curriculum topic
    const cachedResources = LectureResourceCache.get(topic.id) || [];
    const seedResources = VERIFIED_NURSING_LECTURES[topic.id] || [];
    const combinedCandidates = [...cachedResources, ...seedResources];

    // Deduplicate by videoId
    const uniqueCandidatesMap = new Map<string, NursingLectureResource>();
    combinedCandidates.forEach((c) => {
      if (!uniqueCandidatesMap.has(c.videoId)) {
        uniqueCandidatesMap.set(c.videoId, c);
      }
    });

    const validAlternatives: NursingLectureResource[] = [];
    uniqueCandidatesMap.forEach((candidate) => {
      if (candidate.videoId !== failedVideoId && candidate.status === 'VALID') {
        const valResult = ResourceValidationService.validate(candidate, topic);
        if (valResult.isValid) {
          const { finalScore } = LectureScoringEngine.calculateScore(candidate, topic);
          validAlternatives.push({
            ...candidate,
            lectureScore: finalScore,
            status: 'VALID'
          });
        }
      }
    });

    if (validAlternatives.length > 0) {
      // Sort alternatives by highest quality score
      const sorted = [...validAlternatives].sort((a, b) => b.lectureScore - a.lectureScore);
      const nextBest = sorted[0];
      const others = sorted.slice(1);

      return {
        success: true,
        activeLecture: nextBest,
        message: `Switched seamlessly to alternative verified lecture by ${nextBest.teacherName} (${nextBest.channel}). Your study notes, NCP, and MCQ progress are preserved.`,
        recoveredFromAlternative: true,
        remainingAlternatives: others,
        statusAssigned: reasonStatus
      };
    }

    // 3. Transparent Fallback: No secondary video available
    return {
      success: false,
      activeLecture: null,
      message: 'Video resource currently offline. Complete academic AI Smart Notes, NANDA 5-Column Care Plan, and University Exam Questions are available below without interruption.',
      recoveredFromAlternative: false,
      remainingAlternatives: [],
      statusAssigned: reasonStatus
    };
  }
}

// Export pipeline alias
export const NursingBrokenLinkRecovery = BrokenLinkRecovery;
