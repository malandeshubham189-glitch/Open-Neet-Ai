import { NursingLectureResource, NursingTopic } from '../../types/nursing';
import { NursingSearchQueryService } from './nursingSearchQueryService';

export interface ScoreExplanation {
  topicRelevance: number; // 0–25
  syllabusCoverage: number; // 0–25
  nursingSpecificity: number; // 0–20
  playlistCompleteness: number; // 0–10
  teachingQuality: number; // 0–10
  durationScore: number; // 0–10
  totalScore: number; // 0–100
  confidenceScore: number; // 0–100
  summary: string;
}

export class LectureScoringEngine {
  /**
   * Transparent Multi-Factor Quality & Relevance Scoring Algorithm.
   * Ranks candidate lectures objectively based on syllabus alignment, clinical rigor, and playlist continuity.
   */
  public static calculateScore(
    resource: Partial<NursingLectureResource>,
    topic: NursingTopic
  ): {
    lectureScore: number;
    relevanceScore: number;
    coverageScore: number;
    qualityScore: number;
    confidenceScore: number;
    finalScore: number;
    explanation: ScoreExplanation;
  } {
    // 1. Topic Relevance (25% weight)
    const titleLower = (resource.title || '').toLowerCase();
    const queryData = NursingSearchQueryService.generateQueries(topic);
    const keywords = queryData.sanitizedKeywords;

    let matchedKws = 0;
    keywords.forEach((kw) => {
      if (titleLower.includes(kw.toLowerCase())) {
        matchedKws++;
      }
    });
    const relRatio = keywords.length > 0 ? matchedKws / keywords.length : 1;
    const topicRelevance = Math.min(25, Math.round(relRatio * 20 + 5));

    // 2. Syllabus Coverage (25% weight)
    const rawCoverage = resource.coverageScore || 90;
    const syllabusCoverage = Math.min(25, Math.round((rawCoverage / 100) * 25));

    // 3. B.Sc Nursing Specificity & Indian University Curriculum Alignment (20% weight)
    const channelLower = (resource.channel || '').toLowerCase();
    let nursingSpecificity = 14;
    if (
      channelLower.includes('bhushan') ||
      channelLower.includes('raj nursing') ||
      channelLower.includes('nursing criteria') ||
      channelLower.includes('jinc') ||
      channelLower.includes('target high') ||
      channelLower.includes('utkarsh nursing')
    ) {
      nursingSpecificity = 20; // Direct Indian University (MUHS / INC) syllabus mapping
    } else if (
      channelLower.includes('simple nursing') ||
      channelLower.includes('registerednurse') ||
      channelLower.includes('dr. g.k. sharma')
    ) {
      nursingSpecificity = 17; // Strong clinical and pathophysiological concepts
    }

    // 4. Playlist Completeness & Continuity (10% weight)
    let playlistCompleteness = 5;
    if (resource.isPlaylist) {
      playlistCompleteness = 10; // Complete subject coverage boost
    } else if (resource.playlistId) {
      playlistCompleteness = 8; // Member of structured subject playlist
    }

    // 5. Teaching Quality Signals & Expert Rating (10% weight)
    const rating = resource.qualityRating || 4.8;
    const teachingQuality = Math.min(10, Math.round((rating / 5.0) * 10));

    // 6. Duration & Academic Depth (10% weight)
    const duration = resource.durationMinutes || 35;
    let durationScore = 7;
    if (duration >= 25 && duration <= 60) {
      durationScore = 10; // Optimal for university depth without cognitive fatigue
    } else if (duration > 60) {
      durationScore = 8; // Comprehensive marathon lecture
    } else if (duration >= 15) {
      durationScore = 7; // Fast high-yield summary
    } else {
      durationScore = 4; // Too brief for deep clinical mastery
    }

    const finalScore =
      topicRelevance +
      syllabusCoverage +
      nursingSpecificity +
      playlistCompleteness +
      teachingQuality +
      durationScore;

    const relevanceScore = Math.min(100, Math.round((topicRelevance / 25) * 100));
    const coverageScore = rawCoverage;
    const qualityScore = Math.min(100, Math.round(((teachingQuality + durationScore) / 20) * 100));
    const confidenceScore = resource.confidenceScore || (resource.verifiedBadge ? 95 : 88);

    const summary = `${resource.isPlaylist ? 'Full Playlist Recommendation' : 'Single Best High-Yield Lecture'} (Score: ${finalScore}/100) with ${rawCoverage}% syllabus coverage in ${resource.teachingLanguage || 'Hindi'}.`;

    return {
      lectureScore: finalScore,
      relevanceScore,
      coverageScore,
      qualityScore,
      confidenceScore,
      finalScore,
      explanation: {
        topicRelevance,
        syllabusCoverage,
        nursingSpecificity,
        playlistCompleteness,
        teachingQuality,
        durationScore,
        totalScore: finalScore,
        confidenceScore,
        summary
      }
    };
  }
}

// Export pipeline alias
export const NursingLectureRankingService = LectureScoringEngine;
