import type { StructuredNotes } from './notes';

export type IITMSubjectId = 'math_1' | 'stats_1';

export type ResourceSourceType = 'USER_PROVIDED' | 'DISCOVERY_ENGINE' | 'OFFICIAL_PORTAL';

export interface IITMLectureResource {
  resourceId: string;
  courseId: 'iit_madras_bs';
  subjectId: IITMSubjectId;
  subjectName: string;
  title: string;
  subtitle: string;
  platform: 'youtube';
  videoId: string;
  canonicalUrl: string;
  userProvidedUrl?: string;
  embedUrl: string;
  durationMinutes: number;
  resourceType: 'lecture';
  sourceType: ResourceSourceType;
  isUserProvided: boolean;
  verified: boolean;
  status: 'ACTIVE' | 'UNAVAILABLE' | 'REPLACED';
  instructorOrChannel: string;
  termTag: string; // e.g. "Qualifier & Quiz 1 | May 26"
  keyTopicsCovered: string[];
}

export interface IITMRawPlaylistVideo {
  playlistId: string;
  subjectId: IITMSubjectId;
  videoId: string;
  videoTitle: string;
  videoOrder: number; // 1-indexed in playlist
  duration: string;
  durationMinutes?: number;
  channel: string;
  availabilityStatus: 'ACTIVE' | 'UNAVAILABLE' | 'PRIVATE' | 'DELETED' | 'UNVERIFIED';
  weekMapped?: IITMWeekId;
  weekLessonOrder?: number;
  weekMappingConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNVERIFIED';
}

export interface IITMPlaylistMetadata {
  playlistId: string;
  playlistTitle: string;
  canonicalUrl: string;
  userProvidedUrl: string;
  channel: string;
  subjectId: IITMSubjectId;
  totalVideosDiscovered: number;
  totalVideosImported: number;
  totalWeeksMapped: number;
  status: 'ACTIVE' | 'RESOURCE_UNAVAILABLE' | 'VALIDATED';
  lastValidated: string;
  courseCode: string;
  description: string;
}

export type IITMWeekId = 'week_1' | 'week_2' | 'week_3' | 'week_4';

export interface IITMPlaylistLesson {
  lessonId: string;
  subjectId: IITMSubjectId;
  weekId: IITMWeekId;
  weekNumber: number;
  lessonOrder: number; // 1, 2, 3...
  playlistOrder: number; // Index in raw playlist
  title: string;
  durationMinutes: number;
  durationFormatted: string;
  videoId: string;
  canonicalUrl: string;
  embedUrl: string;
  status: 'ACTIVE' | 'UNAVAILABLE' | 'PRIVATE' | 'DELETED' | 'UNVERIFIED';
  weekMappingStatus: 'VERIFIED' | 'WEEK_MAPPING_UNVERIFIED';
  weekMappingConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNVERIFIED';
  keyConcepts: string[];
  description: string;
  lectureNotesOverview?: string;
}

export interface IITMWeekMetadata {
  weekId: IITMWeekId;
  subjectId: IITMSubjectId;
  weekNumber: number;
  title: string;
  subtitle: string;
  description: string;
  examRelevance: string; // e.g. "Qualifier & Quiz 1 Core"
  lessons: IITMPlaylistLesson[];
  estimatedHours: number;
  keyTopics: string[];
}

export interface IITMWeekAudit {
  weekId: IITMWeekId;
  weekNumber: number;
  totalVideos: number;
  skippedVideos: number;
  unmappedVideos: number;
  coveragePercent: number;
  status: 'COMPLETE_ZERO_SKIPS' | 'GAPS_DETECTED';
}

export interface IITMPlaylistIntegrityAudit {
  playlistId: string;
  playlistTitle: string;
  subjectId: IITMSubjectId;
  totalDiscovered: number;
  totalImported: number;
  totalMapped: number;
  totalSkipped: number;
  totalDuplicated: number;
  totalUnavailable: number;
  totalUnverified: number;
  weeksAudit: Record<IITMWeekId, IITMWeekAudit>;
  overallStatus: 'PASS_ZERO_SKIPS' | 'FAIL_GAPS_PRESENT';
  auditTimestamp: string;
}

export interface IITMLessonProgress {
  lessonId: string;
  weekId: IITMWeekId;
  subjectId: IITMSubjectId;
  courseId: 'iit_madras_bs';
  userId: string;
  watched: boolean;
  watchDurationSeconds?: number;
  totalDurationSeconds?: number;
  notesGenerated: boolean;
  practiceCompleted: boolean;
  quizCompleted: boolean;
  quizScore?: number;
  quizTotal?: number;
  revisionScheduled: boolean;
  currentStep: number; // 1: Watch, 2: Notes, 3: Practice, 4: Quiz, 5: Revision
  lastOpenedAt: string;
  completed: boolean;
}

export interface IITMWeekProgress {
  weekId: IITMWeekId;
  subjectId: IITMSubjectId;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  isCompleted: boolean;
}

export interface IITMQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  isVerifiedPyq: boolean;
  questionType: 'AI_PRACTICE' | 'VERIFIED_PYQ';
  topicTag: string;
}

export interface IITMUserProgress {
  subjectId: IITMSubjectId;
  startedAt?: string;
  lastOpenedAt?: string;
  completed: boolean;
  watchProgressSeconds?: number;
  watchDurationSeconds?: number;
  videoWatched: boolean;
  notesGenerated: boolean;
  practiceCompleted: boolean;
  quizCompleted: boolean;
  quizScore?: number;
  quizTotal?: number;
  revisionScheduled: boolean;
  currentStep: number; // 1: Lecture, 2: Notes, 3: Practice, 4: Quiz, 5: Revision
  customNotes?: string | StructuredNotes;
}

export interface IITMSubjectMeta {
  id: IITMSubjectId;
  code: string;
  title: string;
  description: string;
  term: string;
  credits: number;
  lectureResource: IITMLectureResource;
  playlistResource?: IITMPlaylistMetadata;
  qualifierWeightage: string;
  color: {
    primary: string;
    light: string;
    border: string;
    accent: string;
  };
}
