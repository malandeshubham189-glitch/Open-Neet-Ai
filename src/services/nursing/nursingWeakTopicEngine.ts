import {
  NursingTopic,
  NursingYear,
  TopicLearningStatus,
  NursingUserProgress,
  NursingSubjectId
} from '../../types/nursing';
import { getAllNursingTopics, getNursingTopicById } from '../../data/nursingCurriculumData';
import { SpacedRevisionEngine } from './spacedRevisionEngine';
import { NursingStudyPlannerService } from './nursingStudyPlanner';

export interface TopicMasteryEvaluation {
  topicId: string;
  status: TopicLearningStatus;
  isMastered: boolean;
  isWeak: boolean;
  isRevisionDue: boolean;
  accuracyScorePercent: number;
  totalAttempts: number;
  reasons: string[];
  criteria: {
    lectureWatched: boolean;
    notesRead: boolean;
    ncpReviewed: boolean;
    mcqAccuracyPassed: boolean; // >= 75%
    miniTestCompleted: boolean;
    revisionCompleted: boolean; // >= 1 successful revision round
  };
}

export interface WeakTopicRecord {
  topic: NursingTopic;
  accuracyPercent: number;
  totalQuestionsAttempted: number;
  incorrectQuestionsCount: number;
  weakConceptDescription: string;
  recommendedAction: string;
  priorityScore: number;
}

const WEAK_TOPIC_STORAGE_KEY = 'nursing_weak_topic_stats_v2';

export interface TopicAttemptStats {
  topicId: string;
  totalMcqAttempts: number;
  correctMcqAttempts: number;
  testScorePercent?: number;
  repeatedMistakeConcepts: string[];
  lastAttemptedAt: string;
}

export class NursingWeakTopicEngine {
  public static getAllAttemptStats(): Record<string, TopicAttemptStats> {
    try {
      const data = localStorage.getItem(WEAK_TOPIC_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return {};
  }

  public static recordMcqAttempt(
    topicId: string,
    isCorrect: boolean,
    conceptName?: string
  ): void {
    const all = this.getAllAttemptStats();
    const existing = all[topicId] || {
      topicId,
      totalMcqAttempts: 0,
      correctMcqAttempts: 0,
      repeatedMistakeConcepts: [],
      lastAttemptedAt: new Date().toISOString()
    };

    existing.totalMcqAttempts += 1;
    if (isCorrect) {
      existing.correctMcqAttempts += 1;
    } else if (conceptName && !existing.repeatedMistakeConcepts.includes(conceptName)) {
      existing.repeatedMistakeConcepts.push(conceptName);
    }
    existing.lastAttemptedAt = new Date().toISOString();

    all[topicId] = existing;
    try {
      localStorage.setItem(WEAK_TOPIC_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // Storage error fallback
    }
  }

  public static recordTestAttempt(
    topicId: string,
    scorePercent: number,
    mistakes: string[] = []
  ): void {
    const all = this.getAllAttemptStats();
    const existing = all[topicId] || {
      topicId,
      totalMcqAttempts: 0,
      correctMcqAttempts: 0,
      repeatedMistakeConcepts: [],
      lastAttemptedAt: new Date().toISOString()
    };

    existing.testScorePercent = scorePercent;
    mistakes.forEach((m) => {
      if (!existing.repeatedMistakeConcepts.includes(m)) {
        existing.repeatedMistakeConcepts.push(m);
      }
    });
    existing.lastAttemptedAt = new Date().toISOString();

    all[topicId] = existing;
    try {
      localStorage.setItem(WEAK_TOPIC_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // Storage error fallback
    }
  }

  /**
   * Transparently evaluates the mastery state and criteria for a topic.
   */
  public static evaluateTopicMastery(topicId: string): TopicMasteryEvaluation {
    const topic = getNursingTopicById(topicId);
    const progress = NursingStudyPlannerService.getTopicProgress(topicId);
    const stats = this.getAllAttemptStats()[topicId];

    const lectureWatched = !!progress?.videoWatched;
    const notesRead = !!progress?.notesRead;
    const ncpReviewed = !!progress?.ncpReviewed;

    const totalQuestions = (stats?.totalMcqAttempts || 0) + (progress?.totalMcqsCount || 0);
    const correctQuestions = (stats?.correctMcqAttempts || 0) + (progress?.mcqsSolvedCount || 0);
    const calculatedAccuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
    const accuracyScore = stats?.testScorePercent !== undefined ? stats.testScorePercent : calculatedAccuracy;

    const mcqAccuracyPassed = (totalQuestions >= 2 && accuracyScore >= 75) || (stats?.testScorePercent !== undefined && stats.testScorePercent >= 75);
    const miniTestCompleted = !!progress?.aiTestCompleted || stats?.testScorePercent !== undefined;
    const revisionCompleted = (progress?.revisionCount || 0) >= 1;

    const isRevisionDue = progress ? SpacedRevisionEngine.isRevisionDue(progress) : false;
    const isWeak = (totalQuestions > 0 && accuracyScore < 65) || (stats?.repeatedMistakeConcepts && stats.repeatedMistakeConcepts.length >= 2);

    const isMastered =
      lectureWatched &&
      notesRead &&
      ncpReviewed &&
      mcqAccuracyPassed &&
      miniTestCompleted &&
      revisionCompleted &&
      !isRevisionDue &&
      !isWeak;

    let status: TopicLearningStatus = 'NOT_STARTED';
    const reasons: string[] = [];

    if (isMastered) {
      status = 'MASTERED';
      reasons.push('All mastery criteria satisfied: Lecture watched, Smart Notes read, NCP reviewed, MCQ accuracy ≥75%, Mini Test passed, and Spaced Revision retained.');
    } else if (isRevisionDue) {
      status = 'REVISION_DUE';
      reasons.push('Spaced revision interval elapsed. Revisit now to prevent memory decay.');
    } else if (isWeak) {
      status = 'PRACTICING';
      reasons.push(`Accuracy is currently ${accuracyScore}% (threshold: ≥75%). Requires targeted clinical MCQ & NCP review.`);
    } else if (miniTestCompleted) {
      status = 'TEST_COMPLETED';
      reasons.push('Mini test completed. Schedule spaced revision to reach Mastery.');
    } else if (totalQuestions > 0 || ncpReviewed) {
      status = 'PRACTICING';
      reasons.push('Clinical practice & care plan review in progress.');
    } else if (notesRead) {
      status = 'NOTES_COMPLETED';
      reasons.push('Smart notes reviewed. Proceed to clinical MCQs and 5-column NCP.');
    } else if (lectureWatched) {
      status = 'LEARNING';
      reasons.push('Lecture completed. Proceed to reading smart notes.');
    } else {
      status = 'NOT_STARTED';
      reasons.push('Topic not yet started. Begin with the curated verified video lecture.');
    }

    return {
      topicId,
      status,
      isMastered,
      isWeak: !!isWeak,
      isRevisionDue,
      accuracyScorePercent: accuracyScore,
      totalAttempts: totalQuestions,
      reasons,
      criteria: {
        lectureWatched,
        notesRead,
        ncpReviewed,
        mcqAccuracyPassed,
        miniTestCompleted,
        revisionCompleted
      }
    };
  }

  /**
   * Identifies all weak topics for a given nursing academic year.
   */
  public static getWeakTopics(year: NursingYear = '3rd_year'): WeakTopicRecord[] {
    const yearTopics = getAllNursingTopics(year);
    const allStats = this.getAllAttemptStats();
    const allProgress = NursingStudyPlannerService.getAllProgress();
    const weakList: WeakTopicRecord[] = [];

    yearTopics.forEach((topic) => {
      const stats = allStats[topic.id];
      const prog = allProgress[topic.id];
      const evaluation = this.evaluateTopicMastery(topic.id);

      if (evaluation.isWeak || (prog && prog.confidenceLevel === 'Weak')) {
        const accuracy = evaluation.accuracyScorePercent || (prog?.confidenceLevel === 'Weak' ? 52 : 60);
        weakList.push({
          topic,
          accuracyPercent: accuracy,
          totalQuestionsAttempted: stats?.totalMcqAttempts || prog?.mcqsSolvedCount || 3,
          incorrectQuestionsCount: (stats?.totalMcqAttempts || 3) - (stats?.correctMcqAttempts || 1),
          weakConceptDescription: stats?.repeatedMistakeConcepts?.join(', ') || 'NANDA diagnosis & pharmacological dosage nuances',
          recommendedAction: 'Re-attempt high-yield clinical MCQs and review 5-column NCP rationales',
          priorityScore: (topic.importance === 'High' ? 100 : 70) - accuracy
        });
      }
    });

    // Sort by priority (higher priority first)
    return weakList.sort((a, b) => b.priorityScore - a.priorityScore);
  }
}
