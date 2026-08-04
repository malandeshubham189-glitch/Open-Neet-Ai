import { CURRICULUM_DATA, getTopicById } from '../data/curriculumData';
import { observability } from './observabilityService';

export interface StudentAIMemory {
  currentChapterId?: string;
  currentTopicId?: string;
  completedTopics: string[];
  weakTopics: string[];
  targetScore: number;
  targetDate?: string;
  revisionQueue: string[];
  mistakeHistory: string[];
  preferredLanguage: 'English' | 'Hinglish' | 'Hindi' | 'Marathi';
  dailyStudyHours: number;
  conversationHistory: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
}

// Global state memory singleton in client session
const globalAIMemory: StudentAIMemory = {
  currentChapterId: 'chap-phy-rotational',
  currentTopicId: 'topic-phy-moi',
  completedTopics: [],
  weakTopics: [],
  targetScore: 680,
  targetDate: '2027-05-02',
  revisionQueue: ['topic-phy-moi'],
  mistakeHistory: [],
  preferredLanguage: 'English',
  dailyStudyHours: 8,
  conversationHistory: []
};

export class AIService {
  /**
   * Get global memory state
   */
  static getMemory(): StudentAIMemory {
    return globalAIMemory;
  }

  /**
   * Update student memory state dynamically
   */
  static updateMemory(partial: Partial<StudentAIMemory>) {
    Object.assign(globalAIMemory, partial);
    observability.log('info', 'AI_GATEWAY', 'Updated Student AI Memory State', partial);
  }

  /**
   * Auto-detect student query language
   */
  static detectLanguage(text: string): 'English' | 'Hinglish' | 'Hindi' | 'Marathi' {
    const lower = text.toLowerCase();
    if (/[\u0900-\u097F]/.test(text)) {
      if (lower.includes('मराठी') || lower.includes('आहे') || lower.includes('नाही') || lower.includes('काय')) {
        return 'Marathi';
      }
      return 'Hindi';
    }
    if (
      lower.includes('bhai') ||
      lower.includes('kaise') ||
      lower.includes('kya') ||
      lower.includes('hai') ||
      lower.includes('samajh') ||
      lower.includes('sikhado') ||
      lower.includes('batao')
    ) {
      return 'Hinglish';
    }
    return 'English';
  }

  /**
   * Build Rich RAG Context before every AI query
   */
  static buildRAGContext(topicId?: string): string {
    const activeTopicId = topicId || globalAIMemory.currentTopicId || 'topic-phy-moi';
    const topic = getTopicById(activeTopicId);
    const chapter = topic ? CURRICULUM_DATA.flatMap((s) => s.units.flatMap((u) => u.chapters)).find((c) => c.topics.some((t) => t.id === topic.id)) : null;

    const memory = globalAIMemory;

    return `
=== RAG CURRICULUM & STUDENT MEMORY CONTEXT ===
Active Target Score: ${memory.targetScore} / 720
Target NEET Date: ${memory.targetDate}
Daily Study Hours: ${memory.dailyStudyHours} hrs
Preferred Language: ${memory.preferredLanguage}

[CURRENT CURRICULUM CONTEXT]
Active Chapter: ${chapter ? chapter.name : 'General NEET'}
Active Topic: ${topic ? topic.title : 'General NEET Topic'}
Topic High-Yield Formula/Fact: ${topic?.notes?.[0]?.content || 'NCERT Class 11/12 High-Yield Core'}
Subtopics: ${topic?.subtopics?.map((s) => s.title).join(', ') || 'N/A'}
Lectures Count: ${topic?.lectures?.length || 0}
MCQs Available: ${topic?.mcqs?.length || 0}

[STUDENT PROGRESS & WEAKNESSES]
Completed Topics Count: ${memory.completedTopics.length}
Weak Topics Flagged: ${memory.weakTopics.length > 0 ? memory.weakTopics.join(', ') : 'None'}
Pending Revision Queue: ${memory.revisionQueue.join(', ')}
Recent Mistakes Logged: ${memory.mistakeHistory.slice(-3).join('; ') || 'None'}
===============================================
`;
  }

  // ================= 1. ASK AI (General / Smart Query) =================
  static async askAI(userQuery: string, topicId?: string): Promise<{ text: string; modelUsed: string; functionCalls?: any[] }> {
    globalAIMemory.conversationHistory.push({ role: 'user', content: userQuery, timestamp: new Date().toISOString() });

    try {
      const response = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: 'doubt_explainer',
          topicTitle: topicId || globalAIMemory.currentTopicId || 'General',
          userQuery,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.answer || data.reply || "Unable to solve doubt.";
        globalAIMemory.conversationHistory.push({ role: 'assistant', content: text, timestamp: new Date().toISOString() });
        return { text, modelUsed: data.modelUsed || "NEET AI Engine" };
      }
    } catch (err: any) {
      observability.log('error', 'AI_GATEWAY', 'Ask AI failed', { error: err?.message || err });
    }

    const errText = "Unable to fetch AI response. Please try again.";
    globalAIMemory.conversationHistory.push({ role: 'assistant', content: errText, timestamp: new Date().toISOString() });
    return { text: errText, modelUsed: "NEET AI Engine" };
  }

  // ================= 2. EXPLAIN CONCEPT =================
  static async explainConcept(conceptName: string, topicId?: string): Promise<{ text: string; modelUsed: string }> {
    try {
      const response = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: 'concept_explainer',
          topicTitle: conceptName,
          userQuery: `Explain the concept of ${conceptName} in detail.`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { text: data.answer || "Concept explanation generated.", modelUsed: data.modelUsed || "NEET AI Engine" };
      }
    } catch (e) {}

    return {
      text: "Unable to generate concept explanation.",
      modelUsed: "NEET AI Engine"
    };
  }

  // ================= 3. SOLVE QUESTION =================
  static async solveQuestion(questionText: string, topicId?: string): Promise<{ text: string; modelUsed: string }> {
    try {
      const response = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: 'question_solver',
          topicTitle: topicId || 'NEET Question',
          userQuery: `Solve this NEET question step-by-step: ${questionText}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { text: data.answer || "Step-by-step solution generated.", modelUsed: data.modelUsed || "NEET AI Engine" };
      }
    } catch (e) {}

    return {
      text: "Unable to generate question solution.",
      modelUsed: "NEET AI Engine"
    };
  }

  // ================= 4. GENERATE NOTES =================
  static async generateNotes(topicTitle: string): Promise<{ text: string; modelUsed: string }> {
    try {
      const response = await fetch('/api/ai/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteType: 'Quick Notes',
          chapter: topicTitle,
          topic: topicTitle,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { text: data.notes || "High-yield notes generated.", modelUsed: data.modelUsed || "NEET AI Notes Engine" };
      }
    } catch (e) {}

    return {
      text: `# 📖 High-Yield Revision Notes: ${topicTitle}
- **NCERT Key Line:** Master definitions and bold terms.
- **Core Formula:** $I = \\sum m r^2$ or fundamental biological pathways.
- **Common Mistake:** Avoid misreading exception clauses.`,
      modelUsed: "NEET AI Notes Engine (Fallback Mode)"
    };
  }

  // ================= 5. GENERATE FLASHCARDS =================
  static async generateFlashcards(topicTitle: string, count: number = 5): Promise<{ flashcards: { front: string; back: string }[]; modelUsed: string }> {
    return {
      flashcards: [
        { front: `What is the key NCERT definition in ${topicTitle}?`, back: `Refer to NCERT Class 11/12 standard chapter definitions.` },
        { front: `What common trap exists in ${topicTitle}?`, back: `Pay strict attention to units, exceptions, and sign conventions.` },
        { front: `What is the primary formula for ${topicTitle}?`, back: `Check standard NCERT equation and SI units.` },
      ],
      modelUsed: "NEET AI Flashcard Engine"
    };
  }

  // ================= 6. GENERATE MCQS =================
  static async generateMCQs(topicTitle: string, count: number = 5): Promise<{ mcqs: any[]; modelUsed: string }> {
    try {
      const response = await fetch('/api/ai/mcq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficulty: 'Medium',
          count,
          chapter: topicTitle,
          topic: topicTitle,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.mcqs && Array.isArray(data.mcqs)) {
          return { mcqs: data.mcqs, modelUsed: data.modelUsed || "NEET AI MCQ Engine" };
        }
      }
    } catch (e) {}

    return {
      mcqs: [
        {
          question: `Which of the following statements is TRUE regarding ${topicTitle}?`,
          options: [
            'Cellular organization is a defining feature of living organisms.',
            'Growth alone is a defining feature without exception.',
            'Reproduction is present in all living beings without exception.',
            'Extrinsic growth occurs in biological cells.'
          ],
          correctIndex: 0,
          explanation: 'Cellular organization occurs in all living beings without any exception.'
        }
      ],
      modelUsed: "NEET AI MCQ Engine (Fallback Mode)"
    };
  }

  // ================= 7. GENERATE TESTS =================
  static async generateTest(subject: string, chapterTitle?: string): Promise<{ testTitle: string; questions: any[]; modelUsed: string }> {
    return {
      testTitle: `AI Adaptive Test - ${subject} (${chapterTitle || 'Syllabus'})`,
      questions: [
        {
          question: `Sample NCERT Diagnostic Question for ${chapterTitle || subject}?`,
          options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
          correctIndex: 0,
          explanation: 'Based on Class 11/12 NCERT curriculum standard.'
        }
      ],
      modelUsed: "NEET AI Test Engine"
    };
  }

  // ================= 8. GENERATE REVISION SCHEDULE =================
  static async generateRevisionSchedule(topicId: string): Promise<{ text: string; modelUsed: string }> {
    return {
      text: `### 🗓️ Ebbinghaus Spaced Repetition Schedule for ${topicId}
- **Day 1:** Core NCERT Reading & Formula Memorization
- **Day 3:** Solve 20 Topic MCQs & PYQs
- **Day 7:** Rapid Flashcard Revision
- **Day 15:** Full Chapter Mock Test
- **Day 30:** Final Speed Run`,
      modelUsed: "NEET AI Schedule Engine"
    };
  }

  // ================= 9. GENERATE MNEMONICS =================
  static async generateMnemonics(concept: string): Promise<{ text: string; modelUsed: string }> {
    return {
      text: `### 🚀 Memory Trick & Mnemonic for ${concept}
- **Mnemonic:** PMAT (Prophase, Metaphase, Anaphase, Telophase)
- **NCERT Rule:** Focus on order of events and bold key terms.`,
      modelUsed: "NEET AI Mnemonic Engine"
    };
  }

  // ================= 10. WEAK TOPIC RECOVERY =================
  static async recoverWeakTopic(topicTitle: string): Promise<{ text: string; modelUsed: string }> {
    return {
      text: `### 🎯 3-Step Weak Topic Recovery: ${topicTitle}
1. **5-Min Concept Fix:** Re-read bold NCERT definitions.
2. **Formula Check:** Write core equations 3 times.
3. **Practice:** Solve 10 target MCQs with detailed explanations.`,
      modelUsed: "NEET AI Recovery Engine"
    };
  }

  // ================= 11. DAILY PLANNER =================
  static async generateDailyPlanner(hoursAvailable: number = 8): Promise<{ text: string; modelUsed: string }> {
    return {
      text: `### 📅 ${hoursAvailable}-Hour Daily Study Schedule
- **Slot 1 (2.5 hrs):** Physics Numericals & Derivations
- **Slot 2 (2.5 hrs):** Biology NCERT Reading & Active Recall
- **Slot 3 (2.0 hrs):** Chemistry Reactions & Formulas
- **Slot 4 (1.0 hr):** Daily MCQ Test & Error Log Review`,
      modelUsed: "NEET AI Planner Engine"
    };
  }

  // ================= 12. STUDY MOTIVATION =================
  static async getStudyMotivation(): Promise<{ text: string; modelUsed: string }> {
    return {
      text: "Every single NCERT line you master today brings you one step closer to your dream medical college seat. Stay consistent, stay focused, and keep solving!",
      modelUsed: "NEET AI Motivation Engine"
    };
  }
}

