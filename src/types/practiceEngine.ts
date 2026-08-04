import { SubjectId } from './index';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType =
  | 'mcq'
  | 'assertion_reason'
  | 'statement_based'
  | 'integer'
  | 'image'
  | 'numerical'
  | 'ncert_line'
  | 'ncert_fact'
  | 'chemistry_reaction';

export interface QuestionOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  text: string;
}

export interface QuestionItem {
  id: string;
  subjectId: SubjectId;
  chapterId?: string;
  chapterName: string;
  topicId?: string;
  topicTitle: string;
  question: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  ncertReference?: string; // e.g. "NCERT Class 11 Bio Page 128, Section 8.5"
  difficulty: QuestionDifficulty;
  timeEstimateSeconds?: number;
  tags: string[];
  conceptId?: string;
  questionType: QuestionType;
  year?: number; // for PYQs
  isPyq?: boolean;
  imageUrl?: string;
  assertionText?: string;
  reasonText?: string;
  statement1Text?: string;
  statement2Text?: string;
  section?: 'A' | 'B';
  subjectSection?: 'Physics_A' | 'Physics_B' | 'Chemistry_A' | 'Chemistry_B' | 'Botany_A' | 'Botany_B' | 'Zoology_A' | 'Zoology_B';
  subjectCategory?: 'physics' | 'chemistry' | 'botany' | 'zoology';
}

export type MasterTestType =
  | 'topic_dpp'
  | 'chapter_pyq'
  | 'chapter_test'
  | 'subject_test'
  | 'full_syllabus'
  | 'ai_mistake_practice'
  | 'ai_adaptive'
  | 'custom_quiz';

export type TestDisplayMode = 'cbt' | 'omr' | 'instant_explanation';

export interface ActiveTestSession {
  id: string;
  title: string;
  testType: MasterTestType;
  subjectId?: SubjectId | 'all';
  chapterName?: string;
  topicTitle?: string;
  questions: QuestionItem[];
  userAnswers: Record<string, string>; // questionId -> optionId
  markedForReview: Record<string, boolean>;
  eliminatedOptions: Record<string, string[]>; // questionId -> list of optionIds struck out
  activeQuestionIndex: number;
  totalTimeSeconds: number;
  timeLeftSeconds: number;
  displayMode: TestDisplayMode;
  startedAt: string;
  isFinished: boolean;
  isPaused?: boolean;
  isNtaFullSyllabus200Q?: boolean;
}

export interface TopicAccuracy {
  topicTitle: string;
  totalQuestions: number;
  correctCount: number;
  accuracyPercent: number;
}

export interface ChapterAccuracy {
  chapterName: string;
  subjectId: SubjectId;
  totalQuestions: number;
  correctCount: number;
  accuracyPercent: number;
}

export interface TestPerformanceReport {
  sessionId: string;
  testTitle: string;
  testType: MasterTestType;
  subjectId?: SubjectId | 'all';
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  marksObtained: number;
  maxMarks: number;
  percentageScore: number;
  accuracyPercent: number;
  totalTimeSpentSeconds: number;
  avgTimePerQuestionSeconds: number;
  subjectBreakdown: {
    physics?: { attempted: number; correct: number; wrong: number; marks: number };
    chemistry?: { attempted: number; correct: number; wrong: number; marks: number };
    botany?: { attempted: number; correct: number; wrong: number; marks: number };
    zoology?: { attempted: number; correct: number; wrong: number; marks: number };
  };
  topicAccuracies: TopicAccuracy[];
  weakestConcepts: string[];
  predictedAIR?: {
    rankRange: string;
    percentile: number;
    targetScoreGap: number;
  };
  completedAt: string;
}

export type MistakeCategory =
  | 'wrong'
  | 'skipped'
  | 'guess'
  | 'time_consuming'
  | 'conceptual'
  | 'ncert_fact'
  | 'formula_mistake'
  | 'organic_reaction'
  | 'inorganic_memory';

export interface MistakeBookItem {
  id: string;
  question: QuestionItem;
  userSelectedOptionId?: string;
  category: MistakeCategory;
  attemptedAt: string;
  timesWrongCount: number;
  lastAttemptResult: 'wrong' | 'correct';
}

export interface SpacedRevisionItem {
  id: string;
  question: QuestionItem;
  scheduledIntervalDays: 1 | 3 | 7 | 15 | 30;
  nextReviewDate: string; // ISO date string YYYY-MM-DD
  memoryStrengthFactor: number; // e.g. 1.0 to 3.0 (SuperMemo multiplier)
  repetitionsCount: number;
  lastReviewedAt: string;
  isDue: boolean;
}

export interface DailyActivityLog {
  date: string; // YYYY-MM-DD
  questionsAttempted: number;
  correctCount: number;
  minutesSpent: number;
}

export interface StudentAnalyticsState {
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  totalSkipped: number;
  overallAccuracyPercent: number;
  subjectAccuracies: {
    physics: number;
    chemistry: number;
    botany: number;
    zoology: number;
  };
  dailyQuestionsThisWeek: number;
  weeklyQuestionsThisMonth: number;
  monthlyQuestionsThisYear: number;
  avgTimePerQuestionSeconds: number;
  strongChapters: string[];
  weakChapters: string[];
  dailyActivityLogs: DailyActivityLog[];
  projectedNeetScore: number; // e.g. 645 / 720
  projectedAIR: string; // e.g. "AIR 2,150 - 3,400"
}

export interface GamificationState {
  xpPoints: number;
  currentStreakDays: number;
  lastActiveDate: string;
  unlockedBadges: string[];
  dailyRank: number;
  weeklyRank: number;
  overallRank: number;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}
