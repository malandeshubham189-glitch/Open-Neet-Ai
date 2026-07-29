/**
 * Gemini AI Integration Architecture for NEETDrop AI
 * Prepared for server-side proxy execution
 */

export interface MentorPromptRequest {
  promptType: 'physics_solver' | 'biology_ncert' | 'chemistry_mechanism' | 'study_plan' | 'doubt_explainer';
  subject?: string;
  chapterName?: string;
  topicTitle?: string;
  userQuery: string;
}

export interface MentorPromptResponse {
  systemPrompt: string;
  formattedQuery: string;
  guidelines: string[];
}

export function formatAIMentorPrompt(req: MentorPromptRequest): MentorPromptResponse {
  const baseSystem = `You are "NEETDrop AI Master Mentor", an elite AI coach specialized in NEET UG 2027 preparation for droppers.
Your tone: Encouraging, ultra-precise, NCERT-focused, structured, and distraction-free.`;

  switch (req.promptType) {
    case 'physics_solver':
      return {
        systemPrompt: `${baseSystem}\nYou solve Physics numericals using a step-by-step formula derivation format. State Given Values -> Core Formula -> Step-by-Step Calculation -> Final Answer with Units -> Common NEET Trap/Mistake to Avoid.`,
        formattedQuery: `[PHYSICS NUMERICAL] Topic: ${req.topicTitle || 'General Physics'}\nProblem/Doubt: ${req.userQuery}`,
        guidelines: [
          'Break down vectors and sign conventions clearly.',
          'Highlight shortcuts for time saving in NEET exam.',
          'Mention NCERT Physics exemplar references where applicable.'
        ]
      };

    case 'biology_ncert':
      return {
        systemPrompt: `${baseSystem}\nYou explain Biology concepts strict to NCERT text lines and diagrams. Identify the exact NCERT Class 11/12 chapter, quote critical lines, and point out potential Assertion-Reason traps.`,
        formattedQuery: `[BIOLOGY NCERT ANALYSIS] Topic: ${req.topicTitle || 'NCERT Bio'}\nQuestion/Line: ${req.userQuery}`,
        guidelines: [
          'Quote or paraphrase key NCERT lines precisely.',
          'Highlight keywords (e.g., "always", "except", "strictly", "majority").',
          'Provide 1 memorable mnemonic for difficult terms.'
        ]
      };

    case 'chemistry_mechanism':
      return {
        systemPrompt: `${baseSystem}\nYou explain Physical, Organic, and Inorganic Chemistry. For Organic: reaction mechanisms and electron movement. For Physical: formula application and log/calc tricks. For Inorganic: NCERT trend exceptions.`,
        formattedQuery: `[CHEMISTRY DECODER] Subject: ${req.subject || 'Chemistry'} | Topic: ${req.topicTitle || 'General'}\nDoubt: ${req.userQuery}`,
        guidelines: [
          'Explain nucleophile/electrophile attacks step by step.',
          'State periodic table trend exceptions clearly.',
          'Highlight stoichiometry shortcuts.'
        ]
      };

    default:
      return {
        systemPrompt: baseSystem,
        formattedQuery: `[NEET DROPPER MENTOR QUERY] Topic: ${req.topicTitle || 'General'}\nQuery: ${req.userQuery}`,
        guidelines: [
          'Keep response under 250 words for fast reading.',
          'End with a 1-sentence motivation for NEET 2027 Droppers.'
        ]
      };
  }
}
