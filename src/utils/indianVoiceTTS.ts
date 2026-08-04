import { AI_PERSONAS, PersonaConfig } from '../components/AIMentorChatModal';
import { ttsService } from '../services/TTSService';

export interface IndianVoiceConfig {
  voice: SpeechSynthesisVoice | null;
  lang: string;
  isNativeIndian: boolean;
  name: string;
}

export function cleanTextForIndianTTS(text: string): string {
  if (!text) return '';
  return text;
}

export class IndianTTSController {
  private static instance: IndianTTSController;
  private activeMsgId: string | null = null;

  public static getInstance(): IndianTTSController {
    if (!IndianTTSController.instance) {
      IndianTTSController.instance = new IndianTTSController();
    }
    return IndianTTSController.instance;
  }

  public async speakText(
    msgId: string,
    rawText: string,
    personaKey: 'brother' | 'sister' | 'teacher' | 'mentor' = 'brother',
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (this.activeMsgId === msgId && ttsService.getState().status === 'playing') {
      this.stop();
      if (onEnd) onEnd();
      return;
    }

    this.stop();
    this.activeMsgId = msgId;

    if (onStart) onStart();

    let unsubscribeFn: (() => void) | null = null;
    unsubscribeFn = ttsService.subscribe((state) => {
      if (state.status === 'stopped' || state.status === 'idle') {
        if (this.activeMsgId === msgId) {
          this.activeMsgId = null;
          if (unsubscribeFn) unsubscribeFn();
          if (onEnd) onEnd();
        }
      } else if (state.status === 'error') {
        if (this.activeMsgId === msgId) {
          this.activeMsgId = null;
          if (unsubscribeFn) unsubscribeFn();
          if (onError) onError(state.error);
        }
      }
    });

    ttsService.play(rawText);
  }

  public stop() {
    ttsService.stop();
    this.activeMsgId = null;
  }

  public getActiveMsgId(): string | null {
    return this.activeMsgId;
  }
}

export const indianTTS = IndianTTSController.getInstance();

