import {
  NursingLectureResource,
  ResourceValidationStatus,
  NursingTopic
} from '../../types/nursing';
import { NursingSearchQueryService } from './nursingSearchQueryService';

export interface ValidationCheckResult {
  status: ResourceValidationStatus;
  isValid: boolean;
  issuesFound: string[];
  relevanceScore: number; // 0 to 100
  clinicalCompleteness: number; // 0 to 100
  checkedAt: string;
  rejectionReason?: string;
}

export class ResourceValidationService {
  /**
   * Verified educational channels in Indian and International Nursing curriculum.
   * Note: The ranking system is dynamic and not restricted solely to these channels.
   */
  private static KNOWN_NURSING_CHANNELS = [
    'bhushan science',
    'raj nursing academy',
    'nursing criteria',
    'simple nursing',
    'registerednurse rn',
    'dr. g.k. sharma',
    'nursing desk',
    'jinc jodhpur',
    'target high',
    'utkarsh nursing',
    'sarvottam nursing',
    'osn academy',
    'ignou bsc nursing'
  ];

  /**
   * Validates a candidate lecture resource before presentation to a student.
   * Never allows placeholder IDs or guessed URLs.
   */
  public static validate(
    resource: Partial<NursingLectureResource>,
    topic: NursingTopic
  ): ValidationCheckResult {
    const issues: string[] = [];

    // 1. YouTube ID format check (Standard 11-char ID)
    const videoId = (resource.videoId || '').trim();
    const ytIdRegex = /^[a-zA-Z0-9_-]{11}$/;

    if (!videoId || !ytIdRegex.test(videoId)) {
      const reason = 'Invalid YouTube video ID format (Must be valid 11-character identifier).';
      return {
        status: 'UNAVAILABLE',
        isValid: false,
        issuesFound: [reason],
        relevanceScore: 0,
        clinicalCompleteness: 0,
        checkedAt: new Date().toISOString(),
        rejectionReason: reason
      };
    }

    // 2. Strict Prohibition of Placeholders or Guessed IDs
    const badPatterns = [
      'xxxx', 'test', 'sample', 'fake', '00000000000', '12345678901',
      'abcdefghijk', 'placeholder', 'dummy'
    ];
    if (badPatterns.some((p) => videoId.toLowerCase().includes(p))) {
      const reason = 'Placeholder or simulated video ID detected.';
      return {
        status: 'DELETED',
        isValid: false,
        issuesFound: [reason],
        relevanceScore: 0,
        clinicalCompleteness: 0,
        checkedAt: new Date().toISOString(),
        rejectionReason: reason
      };
    }

    // 3. Title & Topic Match Analysis using Search Query Service
    const titleLower = (resource.title || '').toLowerCase();
    const queryData = NursingSearchQueryService.generateQueries(topic);
    const keywords = queryData.sanitizedKeywords;

    let matchedKeywords = 0;
    keywords.forEach((kw) => {
      if (titleLower.includes(kw.toLowerCase())) {
        matchedKeywords++;
      }
    });

    const keywordRatio = keywords.length > 0 ? matchedKeywords / keywords.length : 1;
    const relevanceScore = Math.min(100, Math.round(keywordRatio * 65 + 35));

    // 4. Suitability Filter (Filters non-nursing / UPSC / NEET-UG physics content)
    const isSuitable = NursingSearchQueryService.isCandidateSuitableForNursing(
      resource.title || '',
      resource.channel || ''
    );

    if (!isSuitable && relevanceScore < 60) {
      const reason = 'Resource is not aligned with B.Sc Nursing university curriculum standards.';
      issues.push(reason);
      return {
        status: 'LOW_RELEVANCE',
        isValid: false,
        issuesFound: issues,
        relevanceScore,
        clinicalCompleteness: 30,
        checkedAt: new Date().toISOString(),
        rejectionReason: reason
      };
    }

    // 5. Channel Authority Signal Check
    const channelLower = (resource.channel || '').toLowerCase();
    const isKnownChannel = this.KNOWN_NURSING_CHANNELS.some((tc) => channelLower.includes(tc));

    // 6. Duration reasonableness for B.Sc Nursing university level
    const duration = resource.durationMinutes || 0;
    if (duration > 0 && duration < 8 && !resource.isPlaylist) {
      const reason = 'Lecture duration under 8 minutes is insufficient for university syllabus depth.';
      issues.push(reason);
      return {
        status: 'LOW_RELEVANCE',
        isValid: false,
        issuesFound: issues,
        relevanceScore: Math.round(relevanceScore * 0.7),
        clinicalCompleteness: 35,
        checkedAt: new Date().toISOString(),
        rejectionReason: reason
      };
    }

    // 7. Playlist Validation if marked as Playlist
    if (resource.isPlaylist) {
      if (!resource.playlistId && !resource.sourceUrl?.includes('list=')) {
        issues.push('Playlist resource missing valid playlist parameter.');
      }
    }

    const clinicalCompleteness = Math.min(
      100,
      Math.round(
        relevanceScore * 0.4 +
        (isKnownChannel ? 35 : 20) +
        (duration >= 25 ? 25 : 15)
      )
    );

    return {
      status: 'VALID',
      isValid: true,
      issuesFound: issues,
      relevanceScore,
      clinicalCompleteness,
      checkedAt: new Date().toISOString()
    };
  }
}

// Alias for pipeline specification
export const NursingResourceValidator = ResourceValidationService;
