import { ContextManager } from './contextManager';

export interface PromptOptions {
  userQuery: string;
  language?: 'English' | 'Hinglish' | 'Hindi' | 'Marathi';
  mode?: 'explain' | 'class8' | 'tricks' | 'formulas' | 'pyq' | 'notes';
}

export class PromptBuilder {
  static buildDoubtPrompt(options: PromptOptions): {
    systemInstruction: string;
    formattedUserPrompt: string;
  } {
    const systemInstruction = ContextManager.buildSystemPrompt(
      options.language || 'Hinglish',
      options.mode || 'explain'
    );

    const formattedUserPrompt = `[Student Query]: "${options.userQuery}"
Please provide a thorough, accurate, NCERT-mapped response tailored to my current lecture context and NEET preparation goal.`;

    return {
      systemInstruction,
      formattedUserPrompt,
    };
  }

  static buildNotePrompt(noteType: string): {
    systemInstruction: string;
    formattedUserPrompt: string;
  } {
    const ctx = ContextManager.getFullContext();
    const systemInstruction = ContextManager.buildSystemPrompt('English', 'notes');

    const formattedUserPrompt = `Generate a high-yield, production-ready set of "${noteType}" for:
Chapter: ${ctx.lecture.chapter}
Topic: ${ctx.lecture.topic}
Teacher: ${ctx.lecture.teacher}

Include:
1. 📌 Core Definitions & Key Terminology
2. 📖 NCERT Textbook Direct Lines & Page References
3. ⚠️ Critical NCERT Exception Clauses & Key Points
4. 🚀 Formula / Mnemonic Cheat Box
5. 🎯 3 High-Yield Sample NEET Questions with Explanations`;

    return {
      systemInstruction,
      formattedUserPrompt,
    };
  }

  static buildMCQPrompt(difficulty: 'Easy' | 'Medium' | 'Hard', count: number = 20): {
    systemInstruction: string;
    formattedUserPrompt: string;
  } {
    const ctx = ContextManager.getFullContext();
    const systemInstruction = ContextManager.buildSystemPrompt('English', 'explain');

    const formattedUserPrompt = `Generate exactly ${count} ${difficulty} level NEET Pattern MCQs for:
Chapter: ${ctx.lecture.chapter}
Topic: ${ctx.lecture.topic}

Requirements for each MCQ:
- Question Statement (NCERT based)
- 4 Options (A, B, C, D)
- Correct Option
- Detailed Step-by-Step Explanation
- NCERT Page Reference`;

    return {
      systemInstruction,
      formattedUserPrompt,
    };
  }

  static buildPYQPrompt(count: number = 10): {
    systemInstruction: string;
    formattedUserPrompt: string;
  } {
    const ctx = ContextManager.getFullContext();
    const systemInstruction = ContextManager.buildSystemPrompt('English', 'pyq');

    const formattedUserPrompt = `Retrieve and construct ${count} authentic NEET/AIPMT Previous Year Questions (2018–2025 pattern) for:
Chapter: ${ctx.lecture.chapter}
Topic: ${ctx.lecture.topic}

For each PYQ:
- Exam Year (e.g., NEET 2024 / NEET 2023)
- Question
- 4 Options
- Correct Answer
- Step-by-Step Solution & NCERT Line Citation`;

    return {
      systemInstruction,
      formattedUserPrompt,
    };
  }
}
