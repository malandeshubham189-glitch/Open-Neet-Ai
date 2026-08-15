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
  customNotes?: string;
}

export interface IITMSubjectMeta {
  id: IITMSubjectId;
  code: string;
  title: string;
  description: string;
  term: string;
  credits: number;
  lectureResource: IITMLectureResource;
  qualifierWeightage: string;
  color: {
    primary: string;
    light: string;
    border: string;
    accent: string;
  };
}
