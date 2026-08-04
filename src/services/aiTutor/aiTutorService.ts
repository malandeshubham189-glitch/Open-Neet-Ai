import { LectureContextManager, LectureContextData } from './lectureContext';
import { ConversationMemory } from './conversationMemory';
import { DoubtSolver } from './doubtSolver';
import { NoteGenerator, NoteType } from './noteGenerator';
import { MCQGenerator } from './mcqGenerator';
import { PYQGenerator } from './pyqGenerator';
import { RevisionGenerator } from './revisionGenerator';
import { StudyCoach } from './studyCoach';
import { ContextManager } from './contextManager';
import { PromptOptions } from './promptBuilder';
import { FormattedAIResponse } from './responseFormatter';

export class AITutorService {
  private static instance: AITutorService | null = null;

  public static getInstance(): AITutorService {
    if (!AITutorService.instance) {
      AITutorService.instance = new AITutorService();
    }
    return AITutorService.instance;
  }

  public updateActiveLecture(context: Partial<LectureContextData>): LectureContextData {
    return LectureContextManager.setContext(context);
  }

  public getActiveLectureContext(): LectureContextData {
    return LectureContextManager.getContext();
  }

  public async solveDoubt(options: PromptOptions): Promise<FormattedAIResponse> {
    return DoubtSolver.solveDoubt(options);
  }

  public async generateNotes(noteType: NoteType): Promise<FormattedAIResponse> {
    return NoteGenerator.generateNotes(noteType);
  }

  public async generateMCQs(difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium', count: number = 20) {
    return MCQGenerator.generateMCQs(difficulty, count);
  }

  public async generatePYQs(count: number = 10) {
    return PYQGenerator.generatePYQs(count);
  }

  public async generateRevisionCards() {
    return RevisionGenerator.generateRevisionCards();
  }

  public getCoachAdvice(query: string) {
    return StudyCoach.getAdvice(query);
  }

  public getConversationHistory() {
    return ConversationMemory.getHistory();
  }

  public clearConversationMemory(): void {
    ConversationMemory.clear();
  }
}

export const aiTutor = AITutorService.getInstance();
