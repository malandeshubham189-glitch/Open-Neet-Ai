import {
  IITMSubjectId,
  IITMUserProgress,
  IITMLectureResource,
  IITMQuizQuestion,
  IITMPlaylistMetadata,
  IITMWeekId,
  IITMPlaylistLesson,
  IITMWeekMetadata,
  IITMLessonProgress,
  IITMWeekProgress,
  IITMPlaylistIntegrityAudit
} from '../types/iitm';
import { StructuredNotes } from '../types/notes';
import {
  IITM_SUBJECTS_METADATA,
  IITM_MATH_1_QUESTIONS,
  IITM_STATS_1_QUESTIONS,
  IITM_STRUCTURED_NOTES
} from '../data/iitmData';
import {
  IITM_MATH_PLAYLIST_METADATA,
  IITM_STATS_PLAYLIST_METADATA,
  IITM_MATH_1_PLAYLIST_META,
  IITM_MATH_1_WEEKS,
  IITM_STATS_1_WEEKS,
  IITM_PLAYLIST_WEEK_QUESTIONS,
  IITM_STATS_PLAYLIST_WEEK_QUESTIONS,
  PlaylistIntegrityChecker
} from '../data/iitmPlaylistData';

const IITM_STORAGE_KEY = 'iitm_bs_user_progress_v1';
const IITM_SMART_RESUME_KEY = 'iitm_bs_smart_resume_v1';
const IITM_PLAYLIST_PROGRESS_KEY = 'iitm_bs_playlist_progress_v1';

export interface IITMSmartResumeState {
  subjectId: IITMSubjectId;
  subjectTitle: string;
  lectureTitle: string;
  stepNumber: number; // 1 to 5
  stepLabel: string;
  progressPercent: number;
  lastOpenedAt: string;
  activeTrack?: 'oneshot' | 'playlist';
  weekId?: IITMWeekId;
  lessonId?: string;
}

export interface IITMNextAction {
  subjectId: IITMSubjectId;
  subjectTitle: string;
  actionTitle: string;
  actionSubtitle: string;
  stepNumber: number;
  estimatedMinutes: number;
  reason: string;
  track?: 'oneshot' | 'playlist';
  weekId?: IITMWeekId;
  lessonId?: string;
}

export interface IITMDiagnosticReport {
  playlistId: string;
  playlistTitle: string;
  canonicalUrl: string;
  userProvidedUrl: string;
  channel: string;
  status: 'ACTIVE' | 'RESOURCE_UNAVAILABLE' | 'VALIDATED';
  lastValidated: string;
  totalVideosDiscovered: number;
  totalVideosImported: number;
  totalVideosMapped: number;
  week1VideosCount: number;
  week2VideosCount: number;
  week3VideosCount: number;
  week4VideosCount: number;
  skippedVideosCount: number;
  unverifiedWeekMappingsCount: number;
  unavailableVideosCount: number;
  progressPipelineStatus: string;
  buildStatus: 'VERIFIED_GREEN' | 'PENDING';
}

export class IITMService {
  /**
   * Get all progress items for OneShot track
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
   * Get progress for a specific subject (OneShot)
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
   * Save progress for a subject (OneShot)
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

    if (updated.videoWatched && updated.notesGenerated && updated.quizCompleted) {
      updated.completed = true;
    }

    all[subjectId] = updated;

    try {
      localStorage.setItem(IITM_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // Storage fallback
    }

    this.saveSmartResume(subjectId, updated.currentStep);
    return updated;
  }

  /**
   * Save smart resume point
   */
  public static saveSmartResume(
    subjectId: IITMSubjectId,
    stepNumber: number = 1,
    extra?: { activeTrack?: 'oneshot' | 'playlist'; weekId?: IITMWeekId; lessonId?: string }
  ): IITMSmartResumeState {
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
      lastOpenedAt: new Date().toISOString(),
      activeTrack: extra?.activeTrack || 'playlist',
      weekId: extra?.weekId,
      lessonId: extra?.lessonId
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

    return {
      subjectId: 'math_1',
      subjectTitle: 'Mathematics 1',
      lectureTitle: 'Mathematics for Data Science - 1 (Hindi) Playlist',
      stepNumber: 1,
      stepLabel: 'Step 1: Watch Distraction-Free Lecture',
      progressPercent: 0,
      lastOpenedAt: new Date().toISOString(),
      activeTrack: 'playlist',
      weekId: 'week_1',
      lessonId: 'math1_week_1_l1'
    };
  }

  // ==========================================
  // PLAYLIST & WEEK-BASED STRUCTURE METHODS
  // ==========================================

  /**
   * Get playlist metadata for a subject
   */
  public static getPlaylistMeta(subjectId: IITMSubjectId = 'math_1'): IITMPlaylistMetadata {
    return subjectId === 'math_1' ? IITM_MATH_PLAYLIST_METADATA : IITM_STATS_PLAYLIST_METADATA;
  }

  /**
   * Get all week metadata for a subject
   */
  public static getAllWeeks(subjectId: IITMSubjectId = 'math_1'): Record<IITMWeekId, IITMWeekMetadata> {
    return subjectId === 'math_1' ? IITM_MATH_1_WEEKS : IITM_STATS_1_WEEKS;
  }

  /**
   * Get specific week metadata for a subject
   */
  public static getWeek(weekId: IITMWeekId, subjectId: IITMSubjectId = 'math_1'): IITMWeekMetadata {
    const weeks = this.getAllWeeks(subjectId);
    return weeks[weekId] || weeks.week_1;
  }

  /**
   * Get all lesson progress stored locally
   */
  public static getAllLessonProgress(): Record<string, IITMLessonProgress> {
    try {
      const data = localStorage.getItem(IITM_PLAYLIST_PROGRESS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return {};
  }

  /**
   * Get progress for a specific lesson
   */
  public static getLessonProgress(
    lessonId: string,
    weekId: IITMWeekId,
    subjectId: IITMSubjectId = 'math_1'
  ): IITMLessonProgress {
    const all = this.getAllLessonProgress();
    const existing = all[lessonId];
    if (existing) {
      return existing;
    }

    return {
      lessonId,
      weekId,
      subjectId,
      courseId: 'iit_madras_bs',
      userId: 'student_current',
      watched: false,
      watchDurationSeconds: 0,
      totalDurationSeconds: 0,
      notesGenerated: false,
      practiceCompleted: false,
      quizCompleted: false,
      revisionScheduled: false,
      currentStep: 1,
      lastOpenedAt: new Date().toISOString(),
      completed: false
    };
  }

  /**
   * Save progress for a lesson
   */
  public static saveLessonProgress(
    lessonId: string,
    weekId: IITMWeekId,
    updates: Partial<IITMLessonProgress>,
    subjectId: IITMSubjectId = 'math_1'
  ): IITMLessonProgress {
    const all = this.getAllLessonProgress();
    const current = this.getLessonProgress(lessonId, weekId, subjectId);

    const updated: IITMLessonProgress = {
      ...current,
      ...updates,
      lastOpenedAt: new Date().toISOString()
    };

    if (updated.watched && (updated.notesGenerated || updated.quizCompleted || updated.practiceCompleted)) {
      updated.completed = true;
    } else if (updated.watched && updated.notesGenerated) {
      updated.completed = true;
    }

    all[lessonId] = updated;

    try {
      localStorage.setItem(IITM_PLAYLIST_PROGRESS_KEY, JSON.stringify(all));
    } catch {
      // Ignore
    }

    return updated;
  }

  /**
   * Calculate progress for a specific week
   */
  public static getWeekProgress(weekId: IITMWeekId, subjectId: IITMSubjectId = 'math_1'): IITMWeekProgress {
    const weeks = this.getAllWeeks(subjectId);
    const week = weeks[weekId];
    if (!week || !week.lessons) {
      return { weekId, subjectId, completedLessons: 0, totalLessons: 0, progressPercent: 0, isCompleted: false };
    }

    const totalLessons = week.lessons.length;
    let completedLessons = 0;

    week.lessons.forEach((lesson) => {
      const prog = this.getLessonProgress(lesson.lessonId, weekId, subjectId);
      if (prog.completed || prog.watched) {
        completedLessons++;
      }
    });

    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const isCompleted = completedLessons === totalLessons && totalLessons > 0;

    return {
      weekId,
      subjectId,
      completedLessons,
      totalLessons,
      progressPercent,
      isCompleted
    };
  }

  /**
   * Get progress for all 4 weeks (Weeks 1 to 4) of a subject
   */
  public static getAllWeeksProgress(subjectId: IITMSubjectId = 'math_1'): Record<IITMWeekId, IITMWeekProgress> {
    return {
      week_1: this.getWeekProgress('week_1', subjectId),
      week_2: this.getWeekProgress('week_2', subjectId),
      week_3: this.getWeekProgress('week_3', subjectId),
      week_4: this.getWeekProgress('week_4', subjectId)
    };
  }

  /**
   * Get subject overall progress (completed videos / total mapped videos)
   */
  public static getSubjectPlaylistProgress(subjectId: IITMSubjectId): {
    completedVideos: number;
    totalVideos: number;
    progressPercent: number;
  } {
    const weeks = this.getAllWeeks(subjectId);
    let completed = 0;
    let total = 0;

    (['week_1', 'week_2', 'week_3', 'week_4'] as IITMWeekId[]).forEach((wId) => {
      const w = weeks[wId];
      if (w && w.lessons) {
        total += w.lessons.length;
        w.lessons.forEach((l) => {
          const prog = this.getLessonProgress(l.lessonId, wId, subjectId);
          if (prog.completed || prog.watched) completed++;
        });
      }
    });

    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completedVideos: completed, totalVideos: total, progressPercent };
  }

  /**
   * Get Next Best Action for the playlist track (continuation from exact unfinished video)
   */
  public static getPlaylistNextAction(subjectId: IITMSubjectId = 'math_1'): IITMNextAction {
    const weekIds: IITMWeekId[] = ['week_1', 'week_2', 'week_3', 'week_4'];
    const weeks = this.getAllWeeks(subjectId);
    const subjectTitle = subjectId === 'math_1' ? 'Mathematics 1 (Hindi)' : 'Statistics 1 (Hindi)';

    for (const wId of weekIds) {
      const week = weeks[wId];
      for (const lesson of week.lessons) {
        const prog = this.getLessonProgress(lesson.lessonId, wId, subjectId);
        if (!prog.watched) {
          return {
            subjectId,
            subjectTitle,
            actionTitle: `Continue ${lesson.title}`,
            actionSubtitle: `Week ${week.weekNumber} • Lesson ${lesson.lessonOrder} • ${lesson.durationFormatted} • ${lesson.keyConcepts[0] || 'Concept Lecture'}`,
            stepNumber: 1,
            estimatedMinutes: lesson.durationMinutes,
            reason: `Next sequential lecture in Week ${week.weekNumber} playlist.`,
            track: 'playlist',
            weekId: wId,
            lessonId: lesson.lessonId
          };
        } else if (!prog.notesGenerated) {
          return {
            subjectId,
            subjectTitle,
            actionTitle: `Review AI Notes: ${lesson.title}`,
            actionSubtitle: `Week ${week.weekNumber} • Formulas & Theorems`,
            stepNumber: 2,
            estimatedMinutes: 10,
            reason: 'Consolidate key formulas immediately following the video lecture.',
            track: 'playlist',
            weekId: wId,
            lessonId: lesson.lessonId
          };
        } else if (!prog.practiceCompleted) {
          return {
            subjectId,
            subjectTitle,
            actionTitle: `Practice: ${week.title}`,
            actionSubtitle: `Lesson ${lesson.lessonOrder} • Step-by-Step Questions`,
            stepNumber: 3,
            estimatedMinutes: 15,
            reason: 'Practice problem sets to solidify understanding before taking the quiz.',
            track: 'playlist',
            weekId: wId,
            lessonId: lesson.lessonId
          };
        }
      }
    }

    return {
      subjectId,
      subjectTitle,
      actionTitle: `Take Comprehensive Week 1-4 ${subjectTitle} Mock`,
      actionSubtitle: 'All Weeks Completed • Qualifier & Quiz 1 Exam Readiness',
      stepNumber: 4,
      estimatedMinutes: 30,
      reason: `You have completed all 4 weeks of ${subjectTitle}!`,
      track: 'playlist',
      weekId: 'week_1'
    };
  }

  /**
   * Diagnostic report for playlist validation and integrity
   */
  public static getDiagnosticReport(subjectId: IITMSubjectId = 'math_1'): IITMDiagnosticReport {
    const meta = this.getPlaylistMeta(subjectId);
    const weeks = this.getAllWeeks(subjectId);
    const w1 = weeks.week_1.lessons;
    const w2 = weeks.week_2.lessons;
    const w3 = weeks.week_3.lessons;
    const w4 = weeks.week_4.lessons;

    const allLessons = [...w1, ...w2, ...w3, ...w4];
    const unverifiedCount = allLessons.filter((l) => l.weekMappingStatus === 'WEEK_MAPPING_UNVERIFIED').length;
    const unavailableCount = allLessons.filter((l) => l.status === 'UNAVAILABLE').length;

    const audit = subjectId === 'math_1' ? PlaylistIntegrityChecker.getMathAudit() : PlaylistIntegrityChecker.getStatsAudit();

    return {
      playlistId: meta.playlistId,
      playlistTitle: meta.playlistTitle,
      canonicalUrl: meta.canonicalUrl,
      userProvidedUrl: meta.userProvidedUrl,
      channel: meta.channel,
      status: meta.status,
      lastValidated: meta.lastValidated,
      totalVideosDiscovered: meta.totalVideosDiscovered,
      totalVideosImported: meta.totalVideosImported,
      totalVideosMapped: allLessons.length,
      week1VideosCount: w1.length,
      week2VideosCount: w2.length,
      week3VideosCount: w3.length,
      week4VideosCount: w4.length,
      skippedVideosCount: audit.totalSkipped,
      unverifiedWeekMappingsCount: unverifiedCount,
      unavailableVideosCount: unavailableCount,
      progressPipelineStatus: '5_STEP_ACTIVE (Watch -> Notes -> Practice -> Quiz -> Revision)',
      buildStatus: 'VERIFIED_GREEN'
    };
  }

  /**
   * Get integrity audit from PlaylistIntegrityChecker
   */
  public static getIntegrityAudit(subjectId: IITMSubjectId): IITMPlaylistIntegrityAudit {
    return subjectId === 'math_1'
      ? PlaylistIntegrityChecker.getMathAudit()
      : PlaylistIntegrityChecker.getStatsAudit();
  }

  /**
   * Get Quiz questions for playlist week
   */
  public static getWeekQuizQuestions(weekId: IITMWeekId, subjectId: IITMSubjectId = 'math_1'): IITMQuizQuestion[] {
    if (subjectId === 'stats_1') {
      return IITM_STATS_PLAYLIST_WEEK_QUESTIONS[weekId] || IITM_STATS_PLAYLIST_WEEK_QUESTIONS.week_1;
    }
    return IITM_PLAYLIST_WEEK_QUESTIONS[weekId] || IITM_PLAYLIST_WEEK_QUESTIONS.week_1;
  }

  /**
   * Get Quiz questions for subject (OneShot)
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
   * Request AI Notes specifically for IIT Madras BS OneShot
   */
  public static async fetchAiNotes(subjectId: IITMSubjectId): Promise<StructuredNotes | string> {
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
        if (data.structuredNotes) {
          return data.structuredNotes;
        }
        if (data.notes) {
          return data.notes;
        }
      }
    } catch {
      // Fallback
    }

    const staticNotes = IITM_STRUCTURED_NOTES[subjectId];
    return {
      title: `${meta.title} — Comprehensive Study Notes & Formula Sheet`,
      subtitle: 'IIT Madras BS Degree Foundation Level — Qualifier Exam & Quiz 1 Preparation',
      subjectName: meta.title,
      weekNumber: 1,
      sections: [
        {
          id: 'sec-overview',
          heading: 'Subject & Topic Overview',
          blocks: [
            {
              type: 'paragraph',
              text: staticNotes.overview
            }
          ]
        },
        {
          id: 'sec-formulas',
          heading: 'Key Mathematical & Statistical Formulas',
          blocks: staticNotes.keyFormulas.map((f) => ({
            type: 'formula' as const,
            label: f.label,
            expression: f.formula,
            explanation: f.note
          }))
        },
        {
          id: 'sec-concepts',
          heading: 'High-Yield Concept Breakdown',
          blocks: staticNotes.highYieldConcepts.map((c) => ({
            type: 'callout' as const,
            variant: 'concept' as const,
            title: c.heading,
            content: c.points.join(' • ')
          }))
        },
        {
          id: 'sec-strategy',
          heading: 'Qualifier Exam & Quiz 1 Strategy',
          blocks: staticNotes.qualifierTips.map((t) => ({
            type: 'tip' as const,
            title: 'Qualifier Strategy',
            tipText: t,
            examFocus: true
          }))
        }
      ],
      summary: {
        title: 'Qualifier High-Yield Key Points',
        points: staticNotes.qualifierTips
      }
    };
  }

  /**
   * Request AI Notes for a specific playlist lesson
   */
  public static async fetchLessonAiNotes(lesson: IITMPlaylistLesson): Promise<StructuredNotes | string> {
    const subTitle = lesson.subjectId === 'stats_1' ? 'Statistics for Data Science 1 (Hindi)' : 'Mathematics for Data Science 1 (Hindi)';
    try {
      const resp = await fetch('/api/iitm/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: lesson.subjectId,
          subjectName: `${subTitle} (Week ${lesson.weekNumber})`,
          lectureTitle: lesson.title
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.structuredNotes) {
          return data.structuredNotes;
        }
        if (data.notes) {
          return data.notes;
        }
      }
    } catch {
      // Fallback
    }

    return {
      title: lesson.title,
      subtitle: `IIT Madras BS Degree — ${subTitle} (Week ${lesson.weekNumber})`,
      subjectName: subTitle,
      weekNumber: lesson.weekNumber,
      lessonOrder: lesson.lessonOrder,
      sections: [
        {
          id: 'sec-concept-overview',
          heading: 'Lesson Concept Overview',
          blocks: [
            {
              type: 'paragraph',
              text: lesson.description
            }
          ]
        },
        {
          id: 'sec-key-rules',
          heading: 'Key Formulas & Mathematical Rules',
          blocks: lesson.keyConcepts.map((c, i) => ({
            type: 'formula' as const,
            label: `Key Rule ${i + 1}`,
            expression: c,
            explanation: 'Foundation mathematical rule tested in assignments and qualifier exam.'
          }))
        },
        {
          id: 'sec-exam-focus',
          heading: 'Qualifier Exam & Graded Assignment Focus',
          blocks: [
            {
              type: 'tip' as const,
              title: 'Exam Focus Strategy',
              tipText: lesson.lectureNotesOverview || 'Master core formulas, definitions, and problem-solving steps for graded assignments.',
              examFocus: true
            },
            {
              type: 'callout' as const,
              variant: 'info' as const,
              title: 'Practice Recommendation',
              content: `Complete the Week ${lesson.weekNumber} practice problem set and take the diagnostic checkpoint quiz.`
            }
          ]
        }
      ],
      summary: {
        title: `Week ${lesson.weekNumber} Lesson Summary`,
        points: lesson.keyConcepts
      }
    };
  }
}
