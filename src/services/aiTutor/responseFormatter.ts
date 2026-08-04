export interface FormattedAIResponse {
  rawText: string;
  markdownText: string;
  hasCodeOrMath: boolean;
  extractedMCQs?: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export class ResponseFormatter {
  static format(rawText: string): FormattedAIResponse {
    let markdownText = rawText || '';

    // Check for LaTeX or code blocks
    const hasCodeOrMath =
      markdownText.includes('$') ||
      markdownText.includes('\\(') ||
      markdownText.includes('```') ||
      markdownText.includes('\\frac');

    // Clean up excessive whitespace
    markdownText = markdownText.replace(/\n{3,}/g, '\n\n').trim();

    return {
      rawText,
      markdownText,
      hasCodeOrMath,
    };
  }
}
