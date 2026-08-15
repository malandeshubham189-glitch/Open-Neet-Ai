import {
  IITMSubjectId,
  IITMUserProgress,
  IITMLectureResource,
  IITMQuizQuestion
} from '../types/iitm';
import {
  IITM_SUBJECTS_METADATA,
  IITM_MATH_1_QUESTIONS,
  IITM_STATS_1_QUESTIONS,
  IITM_STRUCTURED_NOTES
} from '../data/iitmData';

const IITM_STORAGE_KEY = 'iitm_bs_user_progress_v1';
const IITM_SMART_RESUME_KEY = 'iitm_bs_smart_resume_v1';

export interface IITMSmartResumeState {
  subjectId: IITMSubjectId;
  subjectTitle: string;
  lectureTitle: string;
  stepNumber: number; // 1 to 5
  stepLabel: string;
  progressPercent: number;
  lastOpenedAt: string;
}

export interface IITMNextAction {
  subjectId: IITMSubjectId;
  subjectTitle: string;
  actionTitle: string;
  actionSubtitle: string;
  stepNumber: number;
  estimatedMinutes: number;
  reason: string;
}

export class IITMService {
  /**
   * Get all progress items
   */
  public static getAllProgress(): Record<IITMSubjectId, IITMUserProgress> {
    try {
      const data = localStorage.getItem(IITM_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Storage fallback
    }

    // Initial default state
    const defaultProgress: Record<IITMSubjectId, IITMUserProgress> = {
      math_1: {
        subjectId: 'math_1',
        completed: false,
        videoWatched: false,
        notesGenerated: false,
        practiceCompleted: false,
        quizCompleted: false,
        revisionScheduled: false,
        currentStep: 1
      },
      stats_1: {
        subjectId: 'stats_1',
        completed: false,
        videoWatched: false,
        notesGenerated: false,
        practiceCompleted: false,
        quizCompleted: false,
        revisionScheduled: false,
        currentStep: 1
      }
    };

    return defaultProgress;
  }

  /**
   * Get progress for a specific subject
   */
  public static getProgress(subjectId: IITMSubjectId): IITMUserProgress {
    const all = this.getAllProgress();
    return (
      all[subjectId] || {
        subjectId,
        completed: false,
        videoWatched: false,
        notesGenerated: false,
        practiceCompleted: false,
        quizCompleted: false,
        revisionScheduled: false,
        currentStep: 1
      }
    );
  }

  /**
   * Save progress for a subject
   */
  public static saveProgress(
    subjectId: IITMSubjectId,
    updates: Partial<IITMUserProgress>
  ): IITMUserProgress {
    const all = this.getAllProgress();
    const current = all[subjectId] || {
      subjectId,
      completed: false,
      videoWatched: false,
      notesGenerated: false,
      practiceCompleted: false,
      quizCompleted: false,
      revisionScheduled: false,
      currentStep: 1
    };

    const updated: IITMUserProgress = {
      ...current,
      ...updates,
      lastOpenedAt: new Date().toISOString()
    };

    // Calculate completion
    if (updated.videoWatched && updated.notesGenerated && updated.quizCompleted) {
      updated.completed = true;
    }

    all[subjectId] = updated;

    try {
      localStorage.setItem(IITM_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // Storage fallback
    }

    // Update smart resume
    this.saveSmartResume(subjectId, updated.currentStep);

    return updated;
  }

  /**
   * Save smart resume point
   */
  public static saveSmartResume(subjectId: IITMSubjectId, stepNumber: number = 1): IITMSmartResumeState {
    const meta = IITM_SUBJECTS_METADATA[subjectId];
    const progress = this.getProgress(subjectId);

    const stepLabel =
      stepNumber === 1
        ? 'Step 1: Watch Distraction-Free Lecture'
        : stepNumber === 2
        ? 'Step 2: Review AI Notes & High-Yield Formulas'
        : stepNumber === 3
        ? 'Step 3: Practice Foundation PYQs'
        : stepNumber === 4
        ? 'Step 4: Take Qualifier Practice Quiz'
        : 'Step 5: Spaced Repetition Revision';

    let completedSteps = 0;
    if (progress.videoWatched) completedSteps++;
    if (progress.notesGenerated) completedSteps++;
    if (progress.practiceCompleted) completedSteps++;
    if (progress.quizCompleted) completedSteps++;
    if (progress.revisionScheduled) completedSteps++;

    const progressPercent = Math.round((completedSteps / 5) * 100);

    const state: IITMSmartResumeState = {
      subjectId,
      subjectTitle: meta.title,
      lectureTitle: meta.lectureResource.title,
      stepNumber,
      stepLabel,
      progressPercent,
      lastOpenedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(IITM_SMART_RESUME_KEY, JSON.stringify(state));
    } catch {
      // Storage fallback
    }

    return state;
  }

  /**
   * Get active smart resume state
   */
  public static getSmartResume(): IITMSmartResumeState {
    try {
      const data = localStorage.getItem(IITM_SMART_RESUME_KEY);
      if (data) {
        const parsed = JSON.parse(data) as IITMSmartResumeState;
        if (parsed && (parsed.subjectId === 'math_1' || parsed.subjectId === 'stats_1')) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }

    // Default to Mathematics 1
    return {
      subjectId: 'math_1',
      subjectTitle: 'Mathematics 1',
      lectureTitle: IITM_SUBJECTS_METADATA.math_1.lectureResource.title,
      stepNumber: 1,
      stepLabel: 'Step 1: Watch Distraction-Free Lecture',
      progressPercent: 0,
      lastOpenedAt: new Date().toISOString()
    };
  }

  /**
   * Calculate Next Best Action for the student in IIT Madras BS
   */
  public static getNextAction(): IITMNextAction {
    const all = this.getAllProgress();
    const mathProg = all.math_1;
    const statsProg = all.stats_1;

    if (!mathProg.videoWatched) {
      return {
        subjectId: 'math_1',
        subjectTitle: 'Mathematics 1',
        actionTitle: 'Watch Mathematics 1 OneShot Lecture',
        actionSubtitle: 'Functions, Coordinate Geometry, Polynomials & Matrix Systems (Qualifier & Quiz 1)',
        stepNumber: 1,
        estimatedMinutes: 45,
        reason: 'Mathematics 1 forms the foundational core required for all subsequent algorithms and data structures.'
      };
    }

    if (!mathProg.notesGenerated) {
      return {
        subjectId: 'math_1',
        subjectTitle: 'Mathematics 1',
        actionTitle: 'Generate & Review Mathematics 1 Notes',
        actionSubtitle: 'Key formulas, vertex equations, determinants and rank criteria',
        stepNumber: 2,
        estimatedMinutes: 15,
        reason: 'Consolidate algebraic and matrix formulas immediately after watching the lecture.'
      };
    }

    if (!statsProg.videoWatched) {
      return {
        subjectId: 'stats_1',
        subjectTitle: 'Statistics 1',
        actionTitle: 'Watch Statistics 1 OneShot Lecture',
        actionSubtitle: 'Descriptive Statistics, Tukey Outliers, Probability Axioms & Bayes Theorem',
        stepNumber: 1,
        estimatedMinutes: 45,
        reason: 'Statistics 1 is essential for probability and exploratory data analysis in Quiz 1.'
      };
    }

    if (!statsProg.quizCompleted) {
      return {
        subjectId: 'stats_1',
        subjectTitle: 'Statistics 1',
        actionTitle: 'Take Statistics 1 Practice Quiz',
        actionSubtitle: '5-Question diagnostic test on Bayes Theorem, IQR, PMF and Data Types',
        stepNumber: 4,
        estimatedMinutes: 15,
        reason: 'Verify mastery of conditional probability and discrete random variables before exam day.'
      };
    }

    if (!mathProg.quizCompleted) {
      return {
        subjectId: 'math_1',
        subjectTitle: 'Mathematics 1',
        actionTitle: 'Take Mathematics 1 Practice Quiz',
        actionSubtitle: 'Diagnostic test on Inverses, Matrices, Perpendicular Lines & Orthogonality',
        stepNumber: 4,
        estimatedMinutes: 15,
        reason: 'Test problem-solving speed under exam-like conditions.'
      };
    }

    // Default to revision
    return {
      subjectId: 'math_1',
      subjectTitle: 'Mathematics 1',
      actionTitle: 'Spaced Repetition Revision',
      actionSubtitle: 'Active recall on high-yield formulas and theorem proofs',
      stepNumber: 5,
      estimatedMinutes: 20,
      reason: 'Regular spaced review ensures 100% retention for the upcoming Qualifier Exam & Quiz 1.'
    };
  }

  /**
   * Get Quiz questions for subject
   */
  public static getQuizQuestions(subjectId: IITMSubjectId): IITMQuizQuestion[] {
    return subjectId === 'math_1' ? IITM_MATH_1_QUESTIONS : IITM_STATS_1_QUESTIONS;
  }

  /**
   * Get structured notes for subject
   */
  public static getStructuredNotes(subjectId: IITMSubjectId) {
    return IITM_STRUCTURED_NOTES[subjectId];
  }

  /**
   * Request AI Notes specifically for IIT Madras BS
   */
  public static async fetchAiNotes(subjectId: IITMSubjectId): Promise<string> {
    const meta = IITM_SUBJECTS_METADATA[subjectId];
    try {
      const resp = await fetch('/api/iitm/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          subjectName: meta.title,
          lectureTitle: meta.lectureResource.title
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.notes) {
          return data.notes;
        }
      }
    } catch {
      // Fallback
    }

    // Pre-formatted high-yield fallback
    const staticNotes = IITM_STRUCTURED_NOTES[subjectId];
    return `### 📘 ${meta.title} — Comprehensive Study Notes & Formula Sheet
**Course**: IIT Madras BS Degree Foundation Level
**Focus**: Qualifier Exam & Quiz 1 Preparation

#### Overview
${staticNotes.overview}

#### 🔑 Key Mathematical & Statistical Formulas
${staticNotes.keyFormulas.map((f) => `- **${f.label}**:\n  \`${f.formula}\`\n  *Note*: ${f.note}`).join('\n\n')}

#### 💡 High-Yield Concept Breakdown
${staticNotes.highYieldConcepts.map((c) => `##### ${c.heading}\n${c.points.map((p) => `- ${p}`).join('\n')}`).join('\n\n')}

#### 🎯 Qualifier Exam & Quiz 1 Strategy
${staticNotes.qualifierTips.map((t) => `- ${t}`).join('\n')}`;
  }
}
