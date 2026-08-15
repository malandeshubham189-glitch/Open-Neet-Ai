import {
  NursingYear,
  NursingSubjectId,
  NursingMCQ,
  NursingTopic
} from '../../types/nursing';
import {
  getAllNursingTopics,
  getNursingTopicById,
  NURSING_CURRICULUM_DATA
} from '../../data/nursingCurriculumData';
import { NursingWeakTopicEngine } from './nursingWeakTopicEngine';
import { NursingStudyPlannerService } from './nursingStudyPlanner';
import { StudentProfileService } from './studentProfileService';

export interface MockTestConfig {
  title: string;
  year: NursingYear;
  subjectId: NursingSubjectId | 'all';
  topicIds?: string[];
  smartSelectionMode?: 'all_syllabus' | 'studied_and_weak_only' | 'high_yield_pyq_only';
  totalQuestions: number;
  durationMinutes: number;
  difficulty: 'ALL' | 'EASY' | 'MEDIUM' | 'HARD';
}

export interface MockTestQuestion extends NursingMCQ {
  subjectId: NursingSubjectId;
  subjectName: string;
  topicTitle: string;
  unitTitle: string;
  isVerified: boolean;
  selectedAnswerId?: string;
  isFlaggedForReview?: boolean;
  timeSpentSeconds?: number;
}

export interface MockTestResult {
  id: string;
  title: string;
  year: NursingYear;
  completedAt: string;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  scorePercentage: number;
  timeSpentMinutes: number;
  weakTopicsIdentified: {
    topicId: string;
    topicTitle: string;
    subjectName: string;
    incorrectCount: number;
  }[];
  incorrectConcepts: string[];
  recommendedRevisionAction: string;
  questionDetails: {
    questionId: string;
    topicId: string;
    topicTitle: string;
    question: string;
    options: { id: string; text: string }[];
    correctAnswerId: string;
    userAnswerId?: string;
    isCorrect: boolean;
    explanation: string;
    clinicalRationale?: string;
  }[];
}

const MOCK_RESULTS_STORAGE_KEY = 'nursing_mock_results_v2';

export class NursingMockTestEngine {
  public static getAllPastResults(): MockTestResult[] {
    try {
      const data = localStorage.getItem(MOCK_RESULTS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return [];
  }

  public static saveMockResult(result: MockTestResult): void {
    const all = this.getAllPastResults();
    all.unshift(result);
    try {
      localStorage.setItem(MOCK_RESULTS_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // Storage fallback
    }

    // Automatically record weak topic stats in weak topic engine
    result.weakTopicsIdentified.forEach((wt) => {
      NursingWeakTopicEngine.recordTestAttempt(
        wt.topicId,
        result.scorePercentage,
        result.incorrectConcepts
      );
    });

    // Record study time
    StudentProfileService.recordStudyActivity(result.timeSpentMinutes, false);
  }

  /**
   * Generates a calibrated set of questions for a mock test.
   */
  public static generateMockTest(config: MockTestConfig): MockTestQuestion[] {
    const allYearTopics = getAllNursingTopics(config.year);
    const allProgress = NursingStudyPlannerService.getAllProgress();
    const weakTopics = NursingWeakTopicEngine.getWeakTopics(config.year).map((w) => w.topic.id);

    // Filter candidate topics
    let candidateTopics: NursingTopic[] = allYearTopics;

    if (config.subjectId !== 'all') {
      candidateTopics = candidateTopics.filter((t) => t.subjectId === config.subjectId);
    }

    if (config.topicIds && config.topicIds.length > 0) {
      candidateTopics = candidateTopics.filter((t) => config.topicIds?.includes(t.id));
    } else if (config.smartSelectionMode === 'studied_and_weak_only') {
      candidateTopics = candidateTopics.filter((t) => {
        const p = allProgress[t.id];
        return (p && (p.videoWatched || p.notesRead)) || weakTopics.includes(t.id);
      });
      // Fallback if student hasn't studied much yet
      if (candidateTopics.length === 0) {
        candidateTopics = allYearTopics;
      }
    } else if (config.smartSelectionMode === 'high_yield_pyq_only') {
      candidateTopics = candidateTopics.filter((t) => t.importance === 'High' || t.priority === 'High');
    }

    const compiledQuestions: MockTestQuestion[] = [];

    candidateTopics.forEach((topic) => {
      if (topic.mcqs && topic.mcqs.length > 0) {
        topic.mcqs.forEach((mcq) => {
          if (config.difficulty !== 'ALL' && mcq.difficulty && mcq.difficulty !== config.difficulty) {
            return;
          }
          compiledQuestions.push({
            ...mcq,
            subjectId: topic.subjectId,
            subjectName: topic.subjectName,
            topicTitle: topic.title,
            unitTitle: topic.unitTitle,
            isVerified: true
          });
        });
      }
    });

    // Shuffle questions
    const shuffled = [...compiledQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(config.totalQuestions, shuffled.length));
  }

  /**
   * Evaluates user submissions and returns rich analytics.
   */
  public static evaluateMockTest(
    title: string,
    year: NursingYear,
    questions: MockTestQuestion[],
    userAnswers: Record<string, string>,
    timeSpentSeconds: number
  ): MockTestResult {
    let correctCount = 0;
    let attemptedCount = 0;
    const weakTopicsMap: Record<string, { topicId: string; topicTitle: string; subjectName: string; incorrectCount: number }> = {};
    const incorrectConcepts: string[] = [];

    const questionDetails = questions.map((q) => {
      const selected = userAnswers[q.id];
      const isAttempted = selected !== undefined && selected !== '';
      if (isAttempted) attemptedCount++;

      const isCorrect = selected === q.correctAnswerId;
      if (isCorrect) {
        correctCount++;
        NursingWeakTopicEngine.recordMcqAttempt(q.topicId, true);
      } else if (isAttempted) {
        NursingWeakTopicEngine.recordMcqAttempt(q.topicId, false, q.topicTitle);
        if (!weakTopicsMap[q.topicId]) {
          weakTopicsMap[q.topicId] = {
            topicId: q.topicId,
            topicTitle: q.topicTitle,
            subjectName: q.subjectName,
            incorrectCount: 0
          };
        }
        weakTopicsMap[q.topicId].incorrectCount++;

        if (q.tag && !incorrectConcepts.includes(q.tag)) {
          incorrectConcepts.push(q.tag);
        }
      }

      return {
        questionId: q.id,
        topicId: q.topicId,
        topicTitle: q.topicTitle,
        question: q.question,
        options: q.options,
        correctAnswerId: q.correctAnswerId,
        userAnswerId: selected,
        isCorrect,
        explanation: q.explanation,
        clinicalRationale: q.clinicalRationale
      };
    });

    const totalQuestions = questions.length;
    const incorrectCount = attemptedCount - correctCount;
    const unansweredCount = totalQuestions - attemptedCount;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const timeSpentMinutes = Math.max(1, Math.round(timeSpentSeconds / 60));

    const weakTopicsIdentified = Object.values(weakTopicsMap).sort((a, b) => b.incorrectCount - a.incorrectCount);

    let recommendedAction = 'Maintain consistency and complete weekly full mock tests.';
    if (weakTopicsIdentified.length > 0) {
      recommendedAction = `Immediate priority: Review 5-column NCP and high-yield LAQs for ${weakTopicsIdentified[0].topicTitle}.`;
    } else if (scorePercentage >= 80) {
      recommendedAction = 'Outstanding clinical accuracy! Proceed to advance university LAQ blueprint revisions.';
    }

    const result: MockTestResult = {
      id: `NMT-${Date.now()}`,
      title,
      year,
      completedAt: new Date().toISOString(),
      totalQuestions,
      attemptedQuestions: attemptedCount,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unansweredQuestions: unansweredCount,
      scorePercentage,
      timeSpentMinutes,
      weakTopicsIdentified,
      incorrectConcepts,
      recommendedRevisionAction: recommendedAction,
      questionDetails
    };

    this.saveMockResult(result);
    return result;
  }
}
