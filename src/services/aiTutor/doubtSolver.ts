import { PromptBuilder, PromptOptions } from './promptBuilder';
import { ResponseFormatter, FormattedAIResponse } from './responseFormatter';
import { ConversationMemory } from './conversationMemory';
import { ContextManager } from './contextManager';

export class DoubtSolver {
  static async solveDoubt(options: PromptOptions): Promise<FormattedAIResponse> {
    const { systemInstruction } = PromptBuilder.buildDoubtPrompt(options);

    // Save user message to memory
    const ctx = ContextManager.getFullContext();
    ConversationMemory.addMessage(
      'user',
      options.userQuery,
      ctx.lecture.videoId,
      ctx.lecture.currentTimestampSeconds
    );

    try {
      const response = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: ctx.lecture.subject,
          topicTitle: ctx.lecture.topic,
          userQuery: options.userQuery,
          systemInstruction,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.answer || data.reply;
        if (text) {
          ConversationMemory.addMessage('assistant', text);
          return ResponseFormatter.format(text);
        }
      }
    } catch (e) {
      // API call fallback
    }

    const errText = "Unable to fetch AI explanation. Please ensure API key is configured properly.";
    ConversationMemory.addMessage('assistant', errText);
    return ResponseFormatter.format(errText);
  }
}
