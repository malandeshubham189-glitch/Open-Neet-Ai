export type SubjectId = 'physics' | 'chemistry' | 'biology';

export type ClassLevel = 'Class 11' | 'Class 12' | 'Class 11 & 12';

export type TopicLifecycleStatus = 'Not Started' | 'Learning' | 'Practicing' | 'Revision Due' | 'Mastered';

export type ImportanceLevel = 'High' | 'Medium' | 'Low';

export type LectureType =
  | 'primary'
  | 'backup'
  | 'quickRevision'
  | 'oneShot'
  | 'ncertReading'
  | 'practiceSession';

export type LectureHealthStatus = 'Verified' | 'Needs Review' | 'Outdated' | 'Unavailable' | 'Flagged' | 'WAITING_FOR_OFFICIAL_LECTURE';

export interface LectureMapping {
  id: string;
  type: LectureType;
  title: string;
  teacher: string;
  channel: string;
  youtubeVideoId: string;
  durationMinutes: number;
  language: 'Hindi' | 'English' | 'Hinglish';
  recordedYear: string;
  updatedStatus: 'Latest NMC Syllabus' | 'Verified 2027' | 'Updated';
  sequenceOrder: number;
  ncertCoveragePercent: number;
  topicCoveragePercent: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';

  // Enhanced Curation & Health Metadata
  healthStatus?: LectureHealthStatus;
  isNmcCompatible?: boolean;
  activeStatus?: boolean;
  conceptRating?: number;
  questionPracticeRating?: number;
  revisionRating?: number;
  lastVerifiedDate?: string;
  recommendationReason?: string;

  // Hierarchy Context
  subjectId?: SubjectId;
  chapterName?: string;
  unitName?: string;
  topicId?: string;
}

export interface Subtopic {
  id: string;
  title: string;
  estimatedMinutes: number;
  keyFormulaOrFact?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isGuest: boolean;
  targetYear: number;
  dropperStatus: '1st Drop' | '2nd Drop' | 'Fresher';
  streakDays: number;
  lastActiveDate: string;
  totalStudyMinutes: number;
  createdAt: string;
}

export interface PYQOption {
  id: string;
  text: string;
}

export interface PYQ {
  id: string;
  topicId: string;
  year: number;
  question: string;
  options: PYQOption[];
  correctAnswerId: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  frequency: 'Frequently Asked' | 'High Weightage' | 'Concept Repeater';
  ncertReference?: string;
}

export interface MCQ {
  id: string;
  topicId: string;
  question: string;
  options: PYQOption[];
  correctAnswerId: string;
  explanation: string;
  hint: string;
  tag: 'Assertion-Reason' | 'Direct Formula' | 'Conceptual' | 'NCERT Line';
}

export interface NoteSection {
  title: string;
  content: string;
  formulas?: string[];
  mnemonics?: string[];
  highYieldTips?: string[];
}

export interface Topic {
  id: string;
  chapterId: string;
  chapterName: string;
  subjectId: SubjectId;
  subjectName: string;
  unitName: string;
  classLevel: ClassLevel;
  title: string;
  description: string;
  youtubeVideoId: string;
  channelName: string;
  durationMinutes: number;
  importance: ImportanceLevel;
  neetWeightage: string;
  
  // Advanced Metadata
  estimatedStudyMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ncertImportance: ImportanceLevel;
  pyqWeightageScore: number; // 1 to 10
  revisionPriority: ImportanceLevel;
  prerequisiteTopicIds: string[];
  learningOutcomes: string[];
  subtopics: Subtopic[];

  // Lecture Mapping System
  lectures: LectureMapping[];

  notes: NoteSection[];
  pyqs: PYQ[];
  mcqs: MCQ[];
}

export interface Chapter {
  id: string;
  unitId: string;
  unitName: string;
  subjectId: SubjectId;
  classLevel: ClassLevel;
  name: string;
  description: string;
  importance: ImportanceLevel;
  totalTopics: number;
  prerequisiteChapterIds?: string[];
  pyqWeightageScore: number; // 1 to 10
  topics: Topic[];
}

export interface Unit {
  id: string;
  subjectId: SubjectId;
  classLevel: ClassLevel;
  name: string;
  description: string;
  chapters: Chapter[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  code: string;
  icon: string;
  color: string;
  badge: string;
  totalUnits: number;
  totalChapters: number;
  totalTopics: number;
  neetWeightagePercent: number;
  units: Unit[];
}

export type TargetScoreMode = '500+' | '600+' | '650+' | '700+';

export interface TargetScoreConfig {
  mode: TargetScoreMode;
  targetMarks: number;
  dailyStudyHours: number;
  mcqsPerTopic: number;
  revisionIntervalsDays: number[];
  mockTestFrequencyDays: number;
  mockTestLabel: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  channel: string;
  subjectId: SubjectId;
  specialization: string;
  rating: number;
  totalLecturesCount: number;
  verifiedStatus: string;
}

export type MasterTestType =
  | 'topic'
  | 'chapter'
  | 'unit'
  | 'full-syllabus'
  | 'mock'
  | 'mistake-bank'
  | 'weak-topic';

export interface BacklogSummary {
  pendingCount: number;
  estimatedOverdueMinutes: number;
  overdueTopics: string[];
  lastRebalancedAt?: string;
}

export interface UserTopicProgress {
  topicId: string;
  subjectId: SubjectId;
  completed: boolean;
  videoWatched: boolean;
  notesRead: boolean;
  ncertRead: boolean;
  mcqsSolvedCount: number;
  totalMcqsCount: number;
  pyqsSolvedCount: number;
  totalPyqsCount: number;
  aiTestCompleted: boolean;
  addedToRevision: boolean;
  confidenceLevel: 'Strong' | 'Moderate' | 'Weak';
  lastStudiedAt: string;
  notesSaved?: string;
  activeStep: number; // 1: Video, 2: Notes, 3: NCERT, 4: MCQs, 5: PYQs, 6: AI Test, 7: Revision, 8: Complete
  watchTimeMinutes?: number;
  mcqAccuracyPercent?: number;
  pyqAccuracyPercent?: number;
  revisionCount?: number;
  masteryScorePercent?: number;
}

export interface BookmarkItem {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  subjectId: SubjectId;
  itemType: 'topic' | 'pyq' | 'mcq' | 'note';
  targetId: string;
  title: string;
  createdAt: string;
}

export interface RevisionItem {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  chapterName: string;
  subjectId: SubjectId;
  dueAt: string;
  stage: number; // 1 to 5
  status: 'due' | 'completed' | 'overdue';
}

export interface StudySession {
  id: string;
  userId: string;
  subjectId: SubjectId;
  topicId?: string;
  topicTitle?: string;
  durationMinutes: number;
  mode: 'Pomodoro' | 'Stopwatch' | 'Focus Room';
  timestamp: string;
}

export interface DailyTask {
  id: string;
  title: string;
  subjectId: SubjectId;
  topicId?: string;
  topicTitle: string;
  type: 'Video' | 'Notes' | 'NCERT' | 'MCQs' | 'PYQs' | 'Revision';
  estimatedMinutes: number;
  completed: boolean;
  targetFinishTime?: string;
}

export interface TestQuestion {
  id: string;
  subjectId: SubjectId;
  topicName: string;
  question: string;
  options: PYQOption[];
  correctOptionId: string;
  explanation: string;
}

export interface TestResult {
  id: string;
  userId: string;
  testTitle: string;
  subjectId?: SubjectId;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  score: number;
  totalMarks: number;
  timeTakenSeconds: number;
  accuracyPercent: number;
  date: string;
  weakTopics: string[];
}

export interface AIDailyPlan {
  date: string;
  targetDate: string; // '2026-12-30' or '2027-05-01'
  daysRemaining: number;
  topicsToday: string[];
  lecturesToday: DailyTask[];
  mcqsTodayCount: number;
  ncertPagesToday: string;
  revisionTasksToday: DailyTask[];
  totalExpectedMinutes: number;
  targetFinishTime: string;
}

