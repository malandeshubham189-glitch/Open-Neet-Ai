import {
  NursingUserProgress,
  TopicLearningStatus,
  NursingYear,
  NursingTopic
} from '../../types/nursing';
import { getAllNursingTopics } from '../../data/nursingCurriculumData';

export interface SpacedScheduleResult {
  nextDueDate: string;
  intervalDays: number;
  revisionRound: number;
  stageName: 'First Revision' | 'Second Consolidation' | 'Third Retention' | 'Mastery Review';
  status: TopicLearningStatus;
}

export interface RevisionQueueItem {
  topic: NursingTopic;
  revisionRound: number;
  nextRevisionDueDate: string;
  revisionDueReason: string;
  isOverdue: boolean;
  priority: 'High' | 'Medium';
}

const PROGRESS_STORAGE_KEY = 'nursing_user_progress_v2';

export class SpacedRevisionEngine {
  /**
   * Calculates the next spaced revision date based on mastery confidence and past revision count.
   */
  public static calculateNextRevision(
    currentProgress: Partial<NursingUserProgress>,
    performance: 'Strong' | 'Moderate' | 'Weak'
  ): SpacedScheduleResult {
    const currentRound = (currentProgress.revisionCount || 0) + 1;
    let baseInterval = 3;
    let stageName: SpacedScheduleResult['stageName'] = 'First Revision';

    if (currentRound === 1) {
      baseInterval = performance === 'Strong' ? 3 : performance === 'Moderate' ? 2 : 1;
      stageName = 'First Revision';
    } else if (currentRound === 2) {
      baseInterval = performance === 'Strong' ? 7 : performance === 'Moderate' ? 5 : 3;
      stageName = 'Second Consolidation';
    } else if (currentRound === 3) {
      baseInterval = performance === 'Strong' ? 21 : performance === 'Moderate' ? 14 : 7;
      stageName = 'Third Retention';
    } else {
      baseInterval = performance === 'Strong' ? 45 : performance === 'Moderate' ? 30 : 14;
      stageName = 'Mastery Review';
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + baseInterval);

    const isMastered = currentRound >= 3 && performance === 'Strong';
    const status: TopicLearningStatus = isMastered ? 'MASTERED' : 'PRACTICING';

    return {
      nextDueDate: nextDate.toISOString().split('T')[0],
      intervalDays: baseInterval,
      revisionRound: currentRound,
      stageName,
      status
    };
  }

  /**
   * Evaluates whether a revision is currently due or overdue.
   */
  public static isRevisionDue(progress: NursingUserProgress): boolean {
    if (!progress.nextRevisionDueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return progress.nextRevisionDueDate <= today;
  }

  /**
   * Retrieves all topics with revisions due today for the given academic year.
   */
  public static getRevisionQueue(year: NursingYear = '3rd_year'): RevisionQueueItem[] {
    const allTopics = getAllNursingTopics(year);
    let allProgress: Record<string, NursingUserProgress> = {};
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (data) {
        allProgress = JSON.parse(data);
      }
    } catch {
      // Storage fallback
    }

    const today = new Date().toISOString().split('T')[0];
    const queue: RevisionQueueItem[] = [];

    allTopics.forEach((topic) => {
      const p = allProgress[topic.id];
      if (p && p.nextRevisionDueDate && p.nextRevisionDueDate <= today) {
        const isOverdue = p.nextRevisionDueDate < today;
        queue.push({
          topic,
          revisionRound: (p.revisionCount || 0) + 1,
          nextRevisionDueDate: p.nextRevisionDueDate,
          revisionDueReason: isOverdue ? 'Overdue Spaced Revision' : 'Spaced Retention Round Due Today',
          isOverdue,
          priority: topic.importance === 'High' ? 'High' : 'Medium'
        });
      }
    });

    return queue;
  }
}
