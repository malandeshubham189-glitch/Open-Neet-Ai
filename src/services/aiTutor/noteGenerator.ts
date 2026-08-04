import { PromptBuilder } from './promptBuilder';
import { ResponseFormatter, FormattedAIResponse } from './responseFormatter';
import { ContextManager } from './contextManager';

export type NoteType =
  | 'Quick Notes'
  | 'Detailed Notes'
  | 'NCERT Notes'
  | 'Exam Notes'
  | 'One Page Notes'
  | 'Revision Notes'
  | 'Mind Maps'
  | 'Flash Cards';

export class NoteGenerator {
  static async generateNotes(noteType: NoteType): Promise<FormattedAIResponse> {
    const ctx = ContextManager.getFullContext();
    const { systemInstruction, formattedUserPrompt } = PromptBuilder.buildNotePrompt(noteType);

    try {
      const response = await fetch('/api/ai/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteType,
          chapter: ctx.lecture.chapter,
          topic: ctx.lecture.topic,
          subject: ctx.lecture.subject,
          systemInstruction,
          formattedUserPrompt,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.notes) {
          return ResponseFormatter.format(data.notes);
        }
      }
    } catch (e) {
      // API call error fallback
    }

    const errNotes = "Unable to generate notes at this time. Please check your API key configuration.";
    return ResponseFormatter.format(errNotes);
  }
}
