import { LectureMapping, LectureType, TeacherProfile, TargetScoreConfig, TargetScoreMode } from '../types';
import { GENERATED_LECTURE_DATABASE, LECTURE_DATABASE, LectureRecord, ImportedLectureRecord } from '../data/generatedLectureDatabase';
import { CURRICULUM_DATA } from '../data/curriculumData';

const LECTURE_STORAGE_KEY = 'neetdrop_curated_lectures_v1';

export const TEACHERS_DATABASE: TeacherProfile[] = [
  {
    id: 'tch-pw-saleem',
    name: 'Saleem Sir',
    channel: 'Competition Wallah',
    subjectId: 'physics',
    specialization: 'Physics Masterclass, Mechanics & Electrodynamics',
    rating: 4.95,
    totalLecturesCount: 180,
    verifiedStatus: 'Top Rated 2025'
  },
  {
    id: 'tch-pw-mrityunjay',
    name: 'Mrityunjay Sir',
    channel: 'Competition Wallah',
    subjectId: 'physics',
    specialization: 'Rotational Motion, Optics & Modern Physics',
    rating: 4.9,
    totalLecturesCount: 160,
    verifiedStatus: 'Top Rated 2025'
  },
  {
    id: 'tch-pw-pankaj',
    name: 'Pankaj Sir',
    channel: 'Competition Wallah',
    subjectId: 'chemistry',
    specialization: 'Organic Chemistry & Reaction Mechanisms',
    rating: 4.98,
    totalLecturesCount: 210,
    verifiedStatus: 'Top Rated 2025'
  },
  {
    id: 'tch-pw-amit',
    name: 'Amit Mahajan Sir',
    channel: 'Competition Wallah',
    subjectId: 'chemistry',
    specialization: 'Physical Chemistry & Stoichiometry',
    rating: 4.92,
    totalLecturesCount: 175,
    verifiedStatus: 'Top Rated 2025'
  },
  {
    id: 'tch-pw-mohit',
    name: 'Mohit Sir',
    channel: 'Competition Wallah',
    subjectId: 'chemistry',
    specialization: 'Inorganic Chemistry & Coordination Compounds',
    rating: 4.91,
    totalLecturesCount: 150,
    verifiedStatus: 'Top Rated 2025'
  },
  {
    id: 'tch-pw-tarun',
    name: 'Tarun Sir',
    channel: 'Competition Wallah',
    subjectId: 'biology',
    specialization: 'Botany, Plant Physiology & Genetics',
    rating: 4.96,
    totalLecturesCount: 220,
    verifiedStatus: 'Top Rated 2025'
  },
  {
    id: 'tch-pw-md',
    name: 'MD Sir (Dr. Manish Dubey)',
    channel: 'Competition Wallah',
    subjectId: 'biology',
    specialization: 'Zoology, Human Physiology & Reproduction',
    rating: 4.97,
    totalLecturesCount: 240,
    verifiedStatus: 'Top Rated 2025'
  }
];

export const TARGET_SCORE_CONFIGS: Record<TargetScoreMode, TargetScoreConfig> = {
  '500+': {
    mode: '500+',
    targetMarks: 500,
    dailyStudyHours: 4.5,
    mcqsPerTopic: 15,
    revisionIntervalsDays: [1, 7, 30],
    mockTestFrequencyDays: 14,
    mockTestLabel: 'Biweekly Full Mock'
  },
  '600+': {
    mode: '600+',
    targetMarks: 600,
    dailyStudyHours: 6.0,
    mcqsPerTopic: 25,
    revisionIntervalsDays: [1, 3, 7, 15, 30],
    mockTestFrequencyDays: 7,
    mockTestLabel: 'Weekly Full Mock'
  },
  '650+': {
    mode: '650+',
    targetMarks: 650,
    dailyStudyHours: 7.5,
    mcqsPerTopic: 40,
    revisionIntervalsDays: [1, 3, 7, 14, 21, 30],
    mockTestFrequencyDays: 4,
    mockTestLabel: 'Twice-Weekly Full Mock'
  },
  '700+': {
    mode: '700+',
    targetMarks: 720,
    dailyStudyHours: 9.0,
    mcqsPerTopic: 60,
    revisionIntervalsDays: [1, 2, 5, 10, 20, 30],
    mockTestFrequencyDays: 2,
    mockTestLabel: 'Every 2 Days AI Super Mock'
  }
};

/**
 * Verified 2025 Competition Wallah / Physics Wallah Curated Complete Lecture Database
 * Dynamically populated from src/data/generatedLectureDatabase.ts
 */
export const VERIFIED_2025_CURATED_LECTURES: Record<string, LectureMapping> = {};

function initCuratedLecturesMap() {
  const topicToRecordMap: Record<string, LectureRecord> = {};
  if (GENERATED_LECTURE_DATABASE && Array.isArray(GENERATED_LECTURE_DATABASE)) {
    GENERATED_LECTURE_DATABASE.forEach((rec) => {
      topicToRecordMap[rec.topic.toLowerCase()] = rec;
      topicToRecordMap[rec.id] = rec;
    });
  }

  const chapterToLectureMap: Record<string, ImportedLectureRecord> = {};
  LECTURE_DATABASE.forEach((rec) => {
    chapterToLectureMap[rec.chapterName || rec.chapterId] = rec;
  });

  CURRICULUM_DATA.forEach((subject) => {
    subject.units.forEach((unit) => {
      unit.chapters.forEach((chapter) => {
        const foundChapterLec = chapterToLectureMap[chapter.name] || chapterToLectureMap[chapter.id];
        chapter.topics.forEach((topic) => {
          const directRec = topicToRecordMap[`rec-${topic.id}`] || topicToRecordMap[topic.title.toLowerCase()];
          if (directRec) {
            VERIFIED_2025_CURATED_LECTURES[topic.id] = {
              id: directRec.id || directRec.youtubeId,
              type: 'primary',
              title: directRec.videoTitle,
              teacher: directRec.teacher,
              channel: directRec.channel,
              youtubeVideoId: directRec.youtubeId,
              durationMinutes: parseInt(directRec.duration) || 0,
              language: 'Hinglish',
              recordedYear: '2025',
              updatedStatus: 'Latest NMC Syllabus',
              sequenceOrder: directRec.playlistOrder || 1,
              ncertCoveragePercent: 100,
              topicCoveragePercent: 100,
              difficulty: 'Medium',
              healthStatus: 'Verified',
              isNmcCompatible: true,
              recommendationReason: `Official lecture from ${directRec.playlist} by ${directRec.teacher}.`
            };
          } else if (foundChapterLec) {
            VERIFIED_2025_CURATED_LECTURES[topic.id] = {
              id: foundChapterLec.chapterId || foundChapterLec.youtubeId,
              type: 'primary',
              title: foundChapterLec.title || `${chapter.name} Complete Lecture`,
              teacher: foundChapterLec.teacher,
              channel: foundChapterLec.channel,
              youtubeVideoId: foundChapterLec.youtubeId,
              durationMinutes: parseInt(foundChapterLec.duration) || 0,
              language: 'Hinglish',
              recordedYear: '2025',
              updatedStatus: 'Latest NMC Syllabus',
              sequenceOrder: 1,
              ncertCoveragePercent: 100,
              topicCoveragePercent: 100,
              difficulty: 'Medium',
              healthStatus: foundChapterLec.verified ? 'Verified' : 'Flagged',
              isNmcCompatible: true,
              recommendationReason: foundChapterLec.verified
                ? `Verified 2025 ${foundChapterLec.channel} playlist lecture by ${foundChapterLec.teacher}.`
                : 'Waiting for official lecture release.'
            };
          }
        });
      });
    });
  });
}

initCuratedLecturesMap();

/**
 * Architecture Interface for Future AI Recommendation Engine Plugability.
 * In V1, Curated2025PWLectureProvider is active.
 * In future versions, an Automatic AI Engine Provider can implement this interface.
 */
export interface ILectureRecommendationProvider {
  getRecommendedLecture(
    topicId: string,
    baseLectures: LectureMapping[]
  ): { lecture: LectureMapping; isFallback: boolean; reason: string };
}

export class Curated2025PWLectureProvider implements ILectureRecommendationProvider {
  getRecommendedLecture(
    topicId: string,
    baseLectures: LectureMapping[] = []
  ): { lecture: LectureMapping; isFallback: boolean; reason: string } {
    // 1. Check local storage overrides (for admin updates)
    try {
      if (typeof localStorage !== 'undefined') {
        const overridesRaw = localStorage.getItem(LECTURE_STORAGE_KEY);
        if (overridesRaw) {
          const overridesMap: Record<string, LectureMapping[]> = JSON.parse(overridesRaw);
          if (overridesMap[topicId] && overridesMap[topicId].length > 0) {
            const primaryOverride = overridesMap[topicId].find((l) => l.type === 'primary') || overridesMap[topicId][0];
            return {
              lecture: primaryOverride,
              isFallback: false,
              reason: primaryOverride.recommendationReason || 'Custom verified lecture override.'
            };
          }
        }
      }
    } catch (e) {
      console.warn('Could not read lecture overrides:', e);
    }

    // 2. Check Curated 2025 Competition Wallah database
    if (VERIFIED_2025_CURATED_LECTURES[topicId]) {
      const curated = VERIFIED_2025_CURATED_LECTURES[topicId];
      return {
        lecture: curated,
        isFallback: false,
        reason: curated.recommendationReason || 'Verified 2025 Competition Wallah complete chapter lecture.'
      };
    }

    // 3. Check base lectures provided in curriculum data
    if (baseLectures && baseLectures.length > 0) {
      const primary = baseLectures.find((l) => l.type === 'primary') || baseLectures[0];
      return {
        lecture: primary,
        isFallback: false,
        reason: primary.recommendationReason || 'Curated syllabus-aligned lecture.'
      };
    }

    // 4. Default Fallback Generator: Waiting for Official Lecture Release
    const fallback: LectureMapping = {
      id: `lec-pending-${topicId}`,
      type: 'primary',
      title: 'Waiting for Official Playlist Lecture',
      teacher: 'Pending Official Release',
      channel: 'Competition Wallah',
      youtubeVideoId: '',
      durationMinutes: 0,
      language: 'Hinglish',
      recordedYear: '2025',
      updatedStatus: 'Latest NMC Syllabus',
      sequenceOrder: 1,
      ncertCoveragePercent: 100,
      topicCoveragePercent: 100,
      difficulty: 'Medium',
      healthStatus: 'WAITING_FOR_OFFICIAL_LECTURE',
      isNmcCompatible: true,
      recommendationReason: 'Waiting for official lecture release from official playlist.'
    };

    return {
      lecture: fallback,
      isFallback: false,
      reason: fallback.recommendationReason!
    };
  }
}

export class LectureService {
  // Active recommendation provider (Default V1: Curated 2025 Competition Wallah)
  private static provider: ILectureRecommendationProvider = new Curated2025PWLectureProvider();

  /**
   * Pluggable provider method for future AI recommendation engine extension.
   */
  static setRecommendationProvider(newProvider: ILectureRecommendationProvider) {
    this.provider = newProvider;
  }

  /**
   * Retrieves all curated lectures for a topic.
   */
  static getLecturesForTopic(topicId: string, baseLectures: LectureMapping[] = []): LectureMapping[] {
    const rec = this.getRecommendedLecture(topicId, baseLectures);
    return [rec.lecture]; // Enforce One Topic = One Lecture
  }

  /**
   * Intelligently evaluates and selects the SINGLE best lecture for a student to prevent decision fatigue.
   */
  static getRecommendedLecture(
    topicId: string,
    baseLectures: LectureMapping[] = []
  ): { lecture: LectureMapping; isFallback: boolean; reason: string } {
    return this.provider.getRecommendedLecture(topicId, baseLectures);
  }

  /**
   * Helper to parse 11-char YouTube Video ID from raw ID or full YouTube URL
   */
  static extractYoutubeId(input: string): string {
    if (!input) return '';
    const trimmed = input.trim();
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?')) {
      return trimmed;
    }
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : trimmed;
  }

  /**
   * Saves or updates the lecture mapping list for a specific topic.
   */
  static saveLecturesForTopic(topicId: string, lectures: LectureMapping[]): void {
    try {
      if (typeof localStorage !== 'undefined') {
        const overridesRaw = localStorage.getItem(LECTURE_STORAGE_KEY);
        const overridesMap: Record<string, LectureMapping[]> = overridesRaw ? JSON.parse(overridesRaw) : {};
        overridesMap[topicId] = lectures;
        localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(overridesMap));
      }
    } catch (e) {
      console.error('Failed to save lecture updates:', e);
    }
  }

  /**
   * Adds or replaces a specific lecture for a topic.
   */
  static upsertLecture(topicId: string, baseLectures: LectureMapping[], newLecture: LectureMapping): LectureMapping[] {
    const currentLectures = this.getLecturesForTopic(topicId, baseLectures);
    const updated = [newLecture];
    this.saveLecturesForTopic(topicId, updated);
    return updated;
  }

  /**
   * Admin Helper: Updates specific metadata on a lecture.
   */
  static updateLectureMetadata(
    topicId: string,
    baseLectures: LectureMapping[],
    lectureId: string,
    patch: Partial<LectureMapping>
  ): LectureMapping[] {
    const currentLectures = this.getLecturesForTopic(topicId, baseLectures);
    const updated = currentLectures.map((l) => (l.id === lectureId ? { ...l, ...patch } : l));
    this.saveLecturesForTopic(topicId, updated);
    return updated;
  }

  /**
   * Admin Helper: Replaces YouTube Video ID or Teacher profile for a lecture.
   */
  static replaceYoutubeVideoId(
    topicId: string,
    baseLectures: LectureMapping[],
    lectureId: string,
    newYoutubeId: string,
    newTitle?: string
  ): LectureMapping[] {
    return this.updateLectureMetadata(topicId, baseLectures, lectureId, {
      youtubeVideoId: newYoutubeId,
      title: newTitle || undefined,
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      healthStatus: 'Verified'
    });
  }

  /**
   * Returns a specific lecture category.
   */
  static getLectureByType(topicId: string, type: LectureType, baseLectures: LectureMapping[] = []): LectureMapping | undefined {
    return this.getRecommendedLecture(topicId, baseLectures).lecture;
  }
}
