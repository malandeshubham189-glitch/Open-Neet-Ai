import { StudentLearningState, NEETSubject, RevisionQueueItem, BacklogItem } from '../types/studentState';
import { observability } from './observabilityService';

const STORAGE_KEY = 'neetdrop_student_learning_state';

const DEFAULT_STATE: StudentLearningState = {
  userId: 'student_neet_2026',
  currentSubject: 'Botany',
  currentChapter: 'The Living World',
  currentTopic: 'Taxonomic Categories & Diversity',
  currentLectureId: '_W1b6rO7_F4',
  currentLectureTitle: 'The Living World Class 11 Biology One Shot | Seep Pahuja',
  lectureProgressPercentage: 35,
  lastWatchTimestampSeconds: 1420,
  overallCompletionPercentage: 42,
  targetNEETScore: 680,
  studyHoursCompletedToday: 3.5,
  studyStreakDays: 14,
  dailyTargetMinutes: 300,
  weeklyTargetMinutes: 2100,
  monthlyTargetMinutes: 9000,
  preferredTeachers: ['Seep Pahuja', 'MA Sir (Logical Physics)', 'Alakh Pandey Sir'],
  preferredLanguage: 'Hinglish',
  weakTopics: [
    'Rotational Motion & Moment of Inertia',
    'Plant Kingdom Life Cycles',
    'Equilibrium & Le Chatelier Principle',
    'Human Reproduction Hormonal Regulation',
  ],
  strongTopics: [
    'Cell Cycle and Cell Division',
    'Kinematics in 1D',
    'Periodic Table & Chemical Bonding',
    'Biological Classification',
  ],
  revisionQueue: [
    {
      id: 'rev_1',
      topic: 'Moment of Inertia Theorems',
      chapter: 'Rotational Motion',
      subject: 'Physics',
      lectureId: 'fA-XN6q3f6A',
      ncertPages: 'NCERT Physics Vol 1 - Pages 165-172',
      priority: 'High',
      nextDueDate: new Date().toISOString(),
      timesRevised: 2,
      lastMasteryScore: 65,
    },
    {
      id: 'rev_2',
      topic: 'Gymnosperms & Angiosperms Life Cycle',
      chapter: 'Plant Kingdom',
      subject: 'Botany',
      lectureId: '_W1b6rO7_F4',
      ncertPages: 'NCERT Biology Class 11 - Pages 38-42',
      priority: 'High',
      nextDueDate: new Date().toISOString(),
      timesRevised: 1,
      lastMasteryScore: 70,
    },
  ],
  backlog: [
    {
      id: 'bg_1',
      topic: 'Center of Mass Collisions',
      chapter: 'System of Particles',
      subject: 'Physics',
      lectureId: 'fA-XN6q3f6A',
      originalDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      estimatedMinutes: 45,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

export class StudentLearningStateService {
  private static instance: StudentLearningStateService | null = null;
  private state: StudentLearningState;

  private constructor() {
    this.state = this.loadState();
  }

  public static getInstance(): StudentLearningStateService {
    if (!StudentLearningStateService.instance) {
      StudentLearningStateService.instance = new StudentLearningStateService();
    }
    return StudentLearningStateService.instance;
  }

  private loadState(): StudentLearningState {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        // use default
      }
    }
    return { ...DEFAULT_STATE };
  }

  public getState(): StudentLearningState {
    return { ...this.state };
  }

  public updateState(updates: Partial<StudentLearningState>): StudentLearningState {
    this.state = {
      ...this.state,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    this.saveState();
    return this.getState();
  }

  private saveState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        // ignore storage write errors
      }
    }
  }

  /**
   * Adaptive Planner: Automatically rebalances timetable if student missed a day or is behind
   */
  public rebalanceTimetable(): {
    rebalanced: boolean;
    backlogCount: number;
    newDailyTargetMinutes: number;
    message: string;
  } {
    const backlogCount = this.state.backlog.length;
    let newDailyTargetMinutes = this.state.dailyTargetMinutes;

    if (backlogCount > 0) {
      // Distribute backlog extra 15 mins daily
      newDailyTargetMinutes += Math.min(60, backlogCount * 15);
      this.updateState({ dailyTargetMinutes: newDailyTargetMinutes });

      observability.log('info', 'LECTURE_RESOLVER', 'Adaptive Planner: Timetable automatically rebalanced', {
        backlogCount,
        newDailyTargetMinutes,
      });

      return {
        rebalanced: true,
        backlogCount,
        newDailyTargetMinutes,
        message: `Rebalanced! Added 15 mins/day to clear ${backlogCount} pending backlog topic(s) seamlessly.`,
      };
    }

    return {
      rebalanced: false,
      backlogCount: 0,
      newDailyTargetMinutes: this.state.dailyTargetMinutes,
      message: 'Timetable is optimal and on track for target score!',
    };
  }
}

export const studentStateService = StudentLearningStateService.getInstance();
