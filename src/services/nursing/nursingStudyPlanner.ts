import {
  NursingUserProgress,
  NursingStudyPlanTask,
  NursingStudyPlannerConfig,
  NursingYear,
  NursingSubjectId,
  NursingTopic,
  TopicLearningStatus
} from '../../types/nursing';
import { getAllNursingTopics, getNursingTopicById } from '../../data/nursingCurriculumData';
import { SpacedRevisionEngine } from './spacedRevisionEngine';

const PROGRESS_STORAGE_KEY = 'nursing_user_progress_v2';
const PLANNER_CONFIG_KEY = 'nursing_planner_config_v2';
const SMART_RESUME_KEY = 'nursing_smart_resume_v1';

export interface SmartResumeState {
  topicId: string;
  topicTitle: string;
  subjectName: string;
  subjectId: string;
  unitNumber: number;
  unitTitle: string;
  year: NursingYear;
  stepNumber: number; // 1 to 5
  stepLabel: string;
  videoTimeSeconds?: number;
  videoDurationMinutes?: number;
  lastAccessedAt: string;
}

export interface TodayNursingGoalItem {
  id: string;
  subjectName: string;
  topicTitle: string;
  topicId: string;
  type: 'Lecture' | 'Smart Notes' | 'Nursing Care Plan' | 'MCQ Practice' | 'Spaced Revision';
  description?: string;
  durationMinutes: number;
  completed: boolean;
  isCompleted?: boolean;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface TodayNursingGoal {
  totalEstimatedMinutes: number;
  dailyGoalMinutes: number;
  completedMinutes: number;
  progressPercent: number;
  items: TodayNursingGoalItem[];
  tasks: TodayNursingGoalItem[];
}

export const DEFAULT_PLANNER_CONFIG: NursingStudyPlannerConfig = {
  targetExamDate: `${new Date().getFullYear() + 1}-05-15`, // May MUHS Summer Exams
  dailyStudyHours: 3.5,
  collegeAttendance: 'Remote / Self-Study Only',
  weakSubjectIds: [],
  strongSubjectIds: [],
  missedDays: 0,
  autoRebalanceEnabled: true
};

export class NursingStudyPlannerService {
  public static getAllProgress(): Record<string, NursingUserProgress> {
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return {};
  }

  public static getTopicProgress(topicId: string): NursingUserProgress | null {
    const all = this.getAllProgress();
    return all[topicId] || null;
  }

  public static saveTopicProgress(
    topicId: string,
    updates: Partial<NursingUserProgress>
  ): NursingUserProgress {
    const all = this.getAllProgress();
    const topic = getNursingTopicById(topicId);

    const existing: NursingUserProgress = all[topicId] || {
      topicId,
      subjectId: topic?.subjectId || 'med_surg_2',
      year: topic?.year || '3rd_year',
      status: 'NOT_STARTED',
      completed: false,
      videoWatched: false,
      notesRead: false,
      ncpReviewed: false,
      mcqsSolvedCount: 0,
      totalMcqsCount: topic?.mcqs?.length || 4,
      universityQuestionsReviewed: false,
      aiTestCompleted: false,
      addedToRevision: false,
      confidenceLevel: 'Moderate',
      lastStudiedAt: new Date().toISOString(),
      activeStep: 0,
      revisionCount: 0,
      revisionIntervalDays: 3
    };

    const updated: NursingUserProgress = {
      ...existing,
      ...updates,
      lastStudiedAt: new Date().toISOString()
    };

    // Auto-update status
    if (updated.videoWatched && !updated.completed) {
      updated.status = 'LEARNING';
    }
    if (updated.notesRead) {
      updated.status = 'NOTES_COMPLETED';
    }
    if (updated.mcqsSolvedCount > 0 || updated.ncpReviewed) {
      updated.status = 'PRACTICING';
    }
    if (updated.aiTestCompleted) {
      updated.status = 'TEST_COMPLETED';
    }
    if (updated.completed && !updated.addedToRevision) {
      updated.status = 'PRACTICING';
    }
    if (updated.addedToRevision) {
      const isDue = SpacedRevisionEngine.isRevisionDue(updated);
      updated.status = isDue ? 'REVISION_DUE' : updated.status;
    }

    if (updated.videoWatched && (updated.notesRead || updated.ncpReviewed)) {
      updated.completed = true;
    }

    all[topicId] = updated;

    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // Ignore
    }

    return updated;
  }

  public static recordRevisionCompleted(topicId: string, performance: 'Strong' | 'Moderate' | 'Weak'): NursingUserProgress {
    const current = this.getTopicProgress(topicId);
    const schedule = SpacedRevisionEngine.calculateNextRevision(current || {}, performance);

    return this.saveTopicProgress(topicId, {
      revisionCount: schedule.revisionRound,
      nextRevisionDueDate: schedule.nextDueDate,
      lastRevisionCompletedAt: new Date().toISOString(),
      revisionIntervalDays: schedule.intervalDays,
      status: schedule.status,
      confidenceLevel: performance
    });
  }

  public static getPlannerConfig(): NursingStudyPlannerConfig {
    try {
      const data = localStorage.getItem(PLANNER_CONFIG_KEY);
      if (data) {
        return { ...DEFAULT_PLANNER_CONFIG, ...JSON.parse(data) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PLANNER_CONFIG;
  }

  public static savePlannerConfig(config: Partial<NursingStudyPlannerConfig>): NursingStudyPlannerConfig {
    const current = this.getPlannerConfig();
    const updated = { ...current, ...config };
    try {
      localStorage.setItem(PLANNER_CONFIG_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    return updated;
  }

  public static toggleGoalTaskCompleted(year: NursingYear, taskId: string): void {
    const allProgress = this.getAllProgress();
    const topicId = taskId.split('__')[0];
    const type = taskId.split('__')[1];

    if (!topicId) return;
    const existing: Partial<NursingUserProgress> = allProgress[topicId] || {};

    if (type === 'Lecture') {
      this.saveTopicProgress(topicId, { videoWatched: !existing.videoWatched });
    } else if (type === 'Smart Notes') {
      this.saveTopicProgress(topicId, { notesRead: !existing.notesRead });
    } else if (type === 'Nursing Care Plan') {
      this.saveTopicProgress(topicId, { ncpReviewed: !existing.ncpReviewed });
    } else if (type === 'MCQ Practice') {
      this.saveTopicProgress(topicId, {
        mcqsSolvedCount: (existing.mcqsSolvedCount || 0) > 0 ? 0 : 4
      });
    } else if (type === 'Spaced Revision') {
      this.recordRevisionCompleted(topicId, 'Strong');
    }
  }

  /**
   * Calculates Today's Structured Nursing Study Goal considering target hours, backlogs & revision queue.
   */
  public static getTodayGoal(year: NursingYear = '3rd_year'): TodayNursingGoal {
    const allProgress = this.getAllProgress();
    const yearTopics = getAllNursingTopics(year);
    const today = new Date().toISOString().split('T')[0];

    const goalItems: TodayNursingGoalItem[] = [];

    // 1. Check for Revisions due today
    const dueRevisions = yearTopics.filter((t) => {
      const p = allProgress[t.id];
      return p && p.nextRevisionDueDate && p.nextRevisionDueDate <= today;
    });

    dueRevisions.slice(0, 1).forEach((topic) => {
      const p = allProgress[topic.id];
      const isDone = p?.lastRevisionCompletedAt?.startsWith(today) || false;
      goalItems.push({
        id: `${topic.id}__Spaced Revision`,
        subjectName: topic.subjectName,
        topicTitle: topic.title,
        topicId: topic.id,
        type: 'Spaced Revision',
        description: 'Spaced retention session to prevent knowledge decay',
        durationMinutes: 15,
        completed: isDone,
        isCompleted: isDone,
        reason: `Spaced Retention Round ${(p?.revisionCount || 0) + 1} due today.`,
        priority: 'High'
      });
    });

    // 2. High priority core clinical topics
    const uncompletedCore = yearTopics.filter((t) => {
      const p = allProgress[t.id];
      return !p || !p.completed;
    });

    if (uncompletedCore.length > 0) {
      const primaryTopic = uncompletedCore[0];
      const prog = allProgress[primaryTopic.id];

      // Primary Lecture
      const vidDone = !!prog?.videoWatched;
      goalItems.push({
        id: `${primaryTopic.id}__Lecture`,
        subjectName: primaryTopic.subjectName,
        topicTitle: primaryTopic.title,
        topicId: primaryTopic.id,
        type: 'Lecture',
        description: 'Watch one verified best clinical theory lecture',
        durationMinutes: 45,
        completed: vidDone,
        isCompleted: vidDone,
        reason: `MUHS High Weightage (${primaryTopic.muhsExamWeightage || '15M LAQ'}).`,
        priority: 'High'
      });

      // 5-Column NCP or Smart Notes
      const ncpDone = !!prog?.ncpReviewed;
      goalItems.push({
        id: `${primaryTopic.id}__Nursing Care Plan`,
        subjectName: primaryTopic.subjectName,
        topicTitle: primaryTopic.title,
        topicId: primaryTopic.id,
        type: 'Nursing Care Plan',
        description: 'Review 5-column NANDA diagnosis and intervention rationales',
        durationMinutes: 30,
        completed: ncpDone,
        isCompleted: ncpDone,
        reason: 'Master NANDA nursing diagnoses & scientific rationales.',
        priority: 'High'
      });

      // MCQ Practice
      const mcqDone = (prog?.mcqsSolvedCount || 0) >= (prog?.totalMcqsCount || 2);
      goalItems.push({
        id: `${primaryTopic.id}__MCQ Practice`,
        subjectName: primaryTopic.subjectName,
        topicTitle: primaryTopic.title,
        topicId: primaryTopic.id,
        type: 'MCQ Practice',
        description: 'Solve Section-A clinical vignettes with rationales',
        durationMinutes: 20,
        completed: mcqDone,
        isCompleted: mcqDone,
        reason: 'NORCET & MUHS Section-A clinical practice questions.',
        priority: 'Medium'
      });
    }

    // If secondary subject available, add secondary subject session
    if (uncompletedCore.length > 1) {
      const secondaryTopic = uncompletedCore.find((t) => t.subjectId !== uncompletedCore[0].subjectId) || uncompletedCore[1];
      const prog2 = allProgress[secondaryTopic.id];
      const notesDone = !!prog2?.notesRead;

      goalItems.push({
        id: `${secondaryTopic.id}__Smart Notes`,
        subjectName: secondaryTopic.subjectName,
        topicTitle: secondaryTopic.title,
        topicId: secondaryTopic.id,
        type: 'Smart Notes',
        description: 'High-yield textbook notes & cardinal sign summaries',
        durationMinutes: 35,
        completed: notesDone,
        isCompleted: notesDone,
        reason: 'Subject diversification to prevent mental fatigue.',
        priority: 'Medium'
      });
    }

    const totalEstimatedMinutes = goalItems.reduce((acc, item) => acc + item.durationMinutes, 0);
    const completedMinutes = goalItems.filter((i) => i.completed).reduce((acc, item) => acc + item.durationMinutes, 0);
    const progressPercent = totalEstimatedMinutes > 0 ? Math.round((completedMinutes / totalEstimatedMinutes) * 100) : 0;

    return {
      totalEstimatedMinutes,
      dailyGoalMinutes: totalEstimatedMinutes,
      completedMinutes,
      progressPercent,
      items: goalItems,
      tasks: goalItems
    };
  }

  /**
   * "No Obstacle" Next Best Action calculation.
   * Student is never left wondering what to do.
   */
  public static getNextBestAction(year: NursingYear = '3rd_year'): {
    topic: NursingTopic;
    reason: string;
    actionType: 'Watch Lecture' | 'Revise NCP' | 'Practice University LAQ' | 'Spaced Revision';
    nextStepLabel: string;
    estimatedDurationMinutes: number;
  } {
    const allProgress = this.getAllProgress();
    const yearTopics = getAllNursingTopics(year);
    const today = new Date().toISOString().split('T')[0];

    if (yearTopics.length === 0) {
      const fallback = getAllNursingTopics('3rd_year')[0];
      return {
        topic: fallback,
        reason: 'Select your batch to load personalized topics.',
        actionType: 'Watch Lecture',
        nextStepLabel: 'Select Academic Batch',
        estimatedDurationMinutes: 45
      };
    }

    // 1. Spaced Revision Due
    const dueRevision = yearTopics.find((t) => {
      const p = allProgress[t.id];
      return p && p.nextRevisionDueDate && p.nextRevisionDueDate <= today;
    });

    if (dueRevision) {
      return {
        topic: dueRevision,
        reason: `Spaced Retention is due today for ${dueRevision.title}. Solidify before memory decays.`,
        actionType: 'Spaced Revision',
        nextStepLabel: 'Start Spaced Revision',
        estimatedDurationMinutes: 20
      };
    }

    // 2. In-Progress Topic (video watched but NCP/Notes pending)
    const inProgress = yearTopics.find((t) => {
      const prog = allProgress[t.id];
      return prog && !prog.completed && (prog.videoWatched || prog.notesRead);
    });

    if (inProgress) {
      return {
        topic: inProgress,
        reason: `You watched the lecture for ${inProgress.title}. Complete the 5-Column NCP and LAQ outline now.`,
        actionType: 'Revise NCP',
        nextStepLabel: 'Complete NCP & Notes',
        estimatedDurationMinutes: 25
      };
    }

    // 3. High Weightage Unstudied Topic (15 Marks LAQ)
    const highWeightage = yearTopics.find((t) => {
      const prog = allProgress[t.id];
      return (!prog || !prog.completed) && (t.importance === 'High' || t.priority === 'High');
    });

    if (highWeightage) {
      return {
        topic: highWeightage,
        reason: `Essential MUHS 15-Mark LAQ Topic: ${highWeightage.title}. Verified syllabus video lecture ready.`,
        actionType: 'Watch Lecture',
        nextStepLabel: 'Start Free Lecture',
        estimatedDurationMinutes: 45
      };
    }

    // 4. Next incomplete topic in syllabus sequence
    const nextIncomplete = yearTopics.find((t) => {
      const prog = allProgress[t.id];
      return !prog || !prog.completed;
    });

    if (nextIncomplete) {
      return {
        topic: nextIncomplete,
        reason: `Follow sequential syllabus progress: ${nextIncomplete.title}.`,
        actionType: 'Watch Lecture',
        nextStepLabel: 'Start Learning',
        estimatedDurationMinutes: 45
      };
    }

    // 5. All complete
    return {
      topic: yearTopics[0],
      reason: 'All topics for this year completed! Review high-yield University LAQs.',
      actionType: 'Practice University LAQ',
      nextStepLabel: 'Practice University LAQs',
      estimatedDurationMinutes: 30
    };
  }

  /**
   * Save exact location when a student studies a topic or watches a lecture
   */
  public static saveSmartResumeState(state: Partial<SmartResumeState> & { topicId: string }): SmartResumeState {
    const topic = getNursingTopicById(state.topicId);
    const existing = this.getSmartResumeState(topic?.year || '3rd_year');

    const updated: SmartResumeState = {
      topicId: state.topicId,
      topicTitle: topic?.title || state.topicTitle || 'Active Topic',
      subjectName: topic?.subjectName || state.subjectName || 'Clinical Subject',
      subjectId: topic?.subjectId || state.subjectId || 'med_surg_2',
      unitNumber: topic?.unitNumber || state.unitNumber || 1,
      unitTitle: topic?.unitTitle || state.unitTitle || 'Core Unit',
      year: topic?.year || state.year || '3rd_year',
      stepNumber: state.stepNumber || existing?.stepNumber || 1,
      stepLabel: state.stepLabel || (state.stepNumber === 2 ? 'Step 2: Read Notes & NCP' : state.stepNumber === 3 ? 'Step 3: Solve MCQs' : state.stepNumber === 4 ? 'Step 4: Mini Test' : state.stepNumber === 5 ? 'Step 5: Spaced Revision' : 'Step 1: Watch Lecture'),
      videoTimeSeconds: state.videoTimeSeconds ?? existing?.videoTimeSeconds ?? 0,
      videoDurationMinutes: topic?.recommendedLecture?.durationMinutes || state.videoDurationMinutes || 45,
      lastAccessedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(SMART_RESUME_KEY, JSON.stringify(updated));
    } catch {
      // Storage fallback
    }

    return updated;
  }

  /**
   * Retrieve active resume point or calculate best default for the given year
   */
  public static getSmartResumeState(year: NursingYear = '3rd_year'): SmartResumeState {
    try {
      const data = localStorage.getItem(SMART_RESUME_KEY);
      if (data) {
        const parsed = JSON.parse(data) as SmartResumeState;
        if (parsed && parsed.topicId) {
          const topic = getNursingTopicById(parsed.topicId);
          if (topic && topic.year === year) {
            return parsed;
          }
        }
      }
    } catch {
      // Ignore
    }

    // Default to Next Best Action
    const nextAction = this.getNextBestAction(year);
    const defaultState: SmartResumeState = {
      topicId: nextAction.topic.id,
      topicTitle: nextAction.topic.title,
      subjectName: nextAction.topic.subjectName,
      subjectId: nextAction.topic.subjectId,
      unitNumber: nextAction.topic.unitNumber,
      unitTitle: nextAction.topic.unitTitle,
      year: nextAction.topic.year,
      stepNumber: 1,
      stepLabel: 'Step 1: Watch Lecture',
      videoTimeSeconds: 0,
      videoDurationMinutes: nextAction.topic.recommendedLecture?.durationMinutes || 45,
      lastAccessedAt: new Date().toISOString()
    };

    return defaultState;
  }
}
