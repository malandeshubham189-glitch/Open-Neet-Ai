export type NEETSubject = 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';

export interface RevisionQueueItem {
  id: string;
  topic: string;
  chapter: string;
  subject: NEETSubject;
  lectureId?: string;
  ncertPages?: string;
  priority: 'High' | 'Medium' | 'Low';
  nextDueDate: string;
  timesRevised: number;
  lastMasteryScore: number;
}

export interface BacklogItem {
  id: string;
  topic: string;
  chapter: string;
  subject: NEETSubject;
  lectureId?: string;
  originalDate: string;
  estimatedMinutes: number;
}

export interface StudentLearningState {
  userId: string;
  currentSubject: NEETSubject;
  currentChapter: string;
  currentTopic: string;
  currentLectureId: string;
  currentLectureTitle: string;
  lectureProgressPercentage: number;
  lastWatchTimestampSeconds: number;
  overallCompletionPercentage: number;
  targetNEETScore: number;
  studyHoursCompletedToday: number;
  studyStreakDays: number;
  dailyTargetMinutes: number;
  weeklyTargetMinutes: number;
  monthlyTargetMinutes: number;
  preferredTeachers: string[];
  preferredLanguage: 'English' | 'Hinglish' | 'Hindi';
  weakTopics: string[];
  strongTopics: string[];
  revisionQueue: RevisionQueueItem[];
  backlog: BacklogItem[];
  currentStudyPlan?: string;
  lastUpdated: string;
}

export interface RankedLectureRecommendation {
  lectureId: string;
  title: string;
  chapter: string;
  subject: NEETSubject;
  teacherName: string;
  thumbnail: string;
  embedUrl: string;
  watchUrl: string;
  score: number;
  rankingReasons: string[];
  isLive: boolean;
  ncertWeight: number; // 1-10 max marks weightage
  nextStepInPipeline: 'Lecture' | 'AI Notes' | 'NCERT' | 'Topic MCQs' | 'PYQs' | 'AI Mini Test' | 'Mistake Analysis' | 'Revision Queue';
}
