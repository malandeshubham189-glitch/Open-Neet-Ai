export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  lectureVideoId?: string;
  timestampSeconds?: number;
}

export class ConversationMemory {
  private static messages: ChatMessage[] = [];
  private static readonly MAX_MEMORY_MESSAGES = 30;

  static addMessage(
    role: 'user' | 'assistant' | 'system',
    content: string,
    lectureVideoId?: string,
    timestampSeconds?: number
  ): ChatMessage {
    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      role,
      content,
      timestamp: new Date().toISOString(),
      lectureVideoId,
      timestampSeconds,
    };

    this.messages.push(message);

    // Keep only last 30 messages
    if (this.messages.length > this.MAX_MEMORY_MESSAGES) {
      this.messages = this.messages.slice(-this.MAX_MEMORY_MESSAGES);
    }

    return message;
  }

  static getHistory(): ChatMessage[] {
    return [...this.messages];
  }

  static getFormattedPromptHistory(): string {
    return this.messages
      .map((m) => `${m.role === 'user' ? 'Student' : 'AI Tutor'}: ${m.content}`)
      .join('\n\n');
  }

  static clear(): void {
    this.messages = [];
  }
}
