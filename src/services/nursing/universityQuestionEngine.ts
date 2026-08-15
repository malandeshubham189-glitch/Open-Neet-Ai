import { NursingUniversityQuestion, NursingTopic } from '../../types/nursing';

export interface UniversityQuestionSet {
  topicId: string;
  topicTitle: string;
  subjectName: string;
  verifiedPYQs: NursingUniversityQuestion[];
  aiPracticeQuestions: NursingUniversityQuestion[];
  laqCount: number;
  saqCount: number;
  totalMarksWeightage: number;
}

export class UniversityQuestionEngine {
  /**
   * Separates authentic past university examination questions from AI-generated practice questions.
   */
  public static getCategorizedQuestions(topic: NursingTopic): UniversityQuestionSet {
    const rawList = topic.universityQuestions || [];

    const verifiedPYQs = rawList.filter(
      (q) => q.sourceCategory === 'Verified Previous Question' || (q as any).isVerifiedPYQ
    );

    const aiPracticeQuestions = rawList.filter(
      (q) => q.sourceCategory === 'AI Practice Question' || (!q.sourceCategory && !(q as any).isVerifiedPYQ)
    );

    const laqs = rawList.filter((q) => q.type === 'LAQ' || q.marks === 15);
    const saqs = rawList.filter((q) => q.type === 'SAQ' || q.marks === 5);
    const totalMarks = rawList.reduce((acc, q) => acc + (q.marks || 5), 0);

    return {
      topicId: topic.id,
      topicTitle: topic.title,
      subjectName: topic.subjectName,
      verifiedPYQs,
      aiPracticeQuestions,
      laqCount: laqs.length,
      saqCount: saqs.length,
      totalMarksWeightage: totalMarks
    };
  }

  public static getUniversityQuestionsForTopic(topic: NursingTopic): UniversityQuestionSet {
    return this.getCategorizedQuestions(topic);
  }

  /**
   * Generates a structured 15-mark LAQ Model Answer Framework according to MUHS evaluation rubrics.
   */
  public static generateLAQBlueprint(question: NursingUniversityQuestion): {
    markingRubric: { section: string; marksAllocated: number; expectation: string }[];
    recommendedTimeMinutes: number;
    recommendedPageCount: number;
  } {
    if (question.marks === 15) {
      return {
        markingRubric: [
          { section: '1. Definition & Classification/Types', marksAllocated: 2, expectation: 'Standard NANDA/WHO definition with clear bulleted classification.' },
          { section: '2. Etiology & Risk Factors', marksAllocated: 2, expectation: 'Primary, secondary causes and high-risk predispositions.' },
          { section: '3. Pathophysiology with Flowchart', marksAllocated: 3, expectation: 'Step-by-step boxed flowchart showing compensatory & decompensatory stages.' },
          { section: '4. Clinical Manifestations', marksAllocated: 2, expectation: 'Cardinal signs, symptoms, and atypical presentations.' },
          { section: '5. Medical & Surgical Management', marksAllocated: 2, expectation: 'Drug dosages, IV regimens, surgical protocols.' },
          { section: '6. 5-Column Nursing Care Plan (2 NCPs)', marksAllocated: 4, expectation: 'Assessment, NANDA Diagnosis, Goal, 4+ Interventions with scientific rationales, Evaluation.' }
        ],
        recommendedTimeMinutes: 32,
        recommendedPageCount: 4
      };
    }

    // 5-Mark SAQ default rubric
    return {
      markingRubric: [
        { section: '1. Definition & Core Pathology', marksAllocated: 1, expectation: 'Precise 2-line definition.' },
        { section: '2. Key Clinical Signs & Diagnostics', marksAllocated: 2, expectation: 'Triad or cardinal manifestations.' },
        { section: '3. Essential Nursing Responsibilities', marksAllocated: 2, expectation: 'Priority bedside interventions & emergency precautions.' }
      ],
      recommendedTimeMinutes: 10,
      recommendedPageCount: 1.5
    };
  }
}
