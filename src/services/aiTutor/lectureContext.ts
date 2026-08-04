export type NEETSubject = 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';

export interface LectureContextData {
  subject: NEETSubject;
  classLevel: 'Class 11' | 'Class 12';
  chapter: string;
  topic: string;
  teacher: string;
  lectureTitle: string;
  videoId: string;
  videoUrl: string;
  currentTimestampSeconds: number;
  watchProgressPercent: number;
  weakTopics: string[];
  currentStudyPlan: string;
  transcriptChunk?: string;
  ncertMapping?: string;
}

const DEFAULT_LECTURE_CONTEXT: LectureContextData = {
  subject: 'Botany',
  classLevel: 'Class 11',
  chapter: 'The Living World',
  topic: 'Taxonomic Categories & Diversity',
  teacher: 'Seep Pahuja',
  lectureTitle: 'The Living World Class 11 Biology One Shot | Seep Pahuja',
  videoId: '_W1b6rO7_F4',
  videoUrl: 'https://www.youtube.com/watch?v=_W1b6rO7_F4',
  currentTimestampSeconds: 1420,
  watchProgressPercent: 35,
  weakTopics: [
    'Rotational Motion & Moment of Inertia',
    'Plant Kingdom Life Cycles',
    'Equilibrium & Le Chatelier Principle',
  ],
  currentStudyPlan: 'Target 680+ Marks | Complete Botany Chapter 1 & Physics Rotational Motion today',
  ncertMapping: 'NCERT Class 11 Biology Chapter 1 (Pages 1 - 15)',
  transcriptChunk:
    'Living organisms show growth, reproduction, ability to sense environment, and mount a suitable response. Metabolism, cellular organization, and consciousness are defining features of living beings.',
};

export class LectureContextManager {
  private static activeContext: LectureContextData = { ...DEFAULT_LECTURE_CONTEXT };

  static setContext(context: Partial<LectureContextData>): LectureContextData {
    this.activeContext = {
      ...this.activeContext,
      ...context,
    };
    return this.getContext();
  }

  static getContext(): LectureContextData {
    return { ...this.activeContext };
  }

  static updateTimestamp(seconds: number, durationSeconds: number = 3600): void {
    this.activeContext.currentTimestampSeconds = seconds;
    this.activeContext.watchProgressPercent = Math.min(
      100,
      Math.round((seconds / durationSeconds) * 100)
    );
  }

  /**
   * Fetches transcript or falls back gracefully
   */
  static getRelevantTranscriptChunk(): string {
    if (this.activeContext.transcriptChunk && this.activeContext.transcriptChunk.trim().length > 0) {
      return this.activeContext.transcriptChunk;
    }

    return `[Fallback Metadata Context] Chapter: ${this.activeContext.chapter}, Topic: ${this.activeContext.topic}, NCERT Mapping: ${this.activeContext.ncertMapping || 'Class 11/12 NCERT'}, Teacher: ${this.activeContext.teacher}`;
  }
}
