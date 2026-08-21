import { DEFAULT_MENTOR_VOICE, VOICE_PROFILES } from '../config/voiceConfig';
import { ttsService } from '../services/TTSService';

export interface IndianVoiceConfig {
  voice: SpeechSynthesisVoice | null;
  lang: string;
  isNativeIndian: boolean;
  name: string;
}

export class IndianTTSController {
  private static instance: IndianTTSController;
  private activeMsgId: string | null = null;
  private activeUnsubscribe: (() => void) | null = null;

  public static getInstance(): IndianTTSController {
    if (!IndianTTSController.instance) {
      IndianTTSController.instance = new IndianTTSController();
    }
    return IndianTTSController.instance;
  }

  public async speakText(
    msgId: string,
    rawText: string,
    personaKey: string = DEFAULT_MENTOR_VOICE.id,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    // If clicking on the currently speaking message, stop and toggle off
    if (this.activeMsgId === msgId) {
      this.stop();
      if (onEnd) onEnd();
      return;
    }

    // Stop any existing playback
    this.stop();
    this.activeMsgId = msgId;

    if (onStart) onStart();

    // Map persona to appropriate pitch & speech rate (Mature, calm & authoritative)
    const profile = VOICE_PROFILES[personaKey] || DEFAULT_MENTOR_VOICE;
    const personaPitch = profile.pitch;

    let hasStarted = false;

    this.activeUnsubscribe = ttsService.subscribe((state) => {
      if (state.status === 'playing') {
        hasStarted = true;
      }

      if (hasStarted && (state.status === 'stopped' || state.status === 'idle')) {
        if (this.activeMsgId === msgId) {
          this.activeMsgId = null;
          if (this.activeUnsubscribe) {
            this.activeUnsubscribe();
            this.activeUnsubscribe = null;
          }
          if (onEnd) onEnd();
        }
      } else if (state.status === 'error') {
        if (this.activeMsgId === msgId) {
          this.activeMsgId = null;
          if (this.activeUnsubscribe) {
            this.activeUnsubscribe();
            this.activeUnsubscribe = null;
          }
          if (onError) onError(state.error);
          else if (onEnd) onEnd();
        }
      }
    });

    ttsService.play(rawText, 0, profile.id, personaPitch);
  }

  public stop() {
    if (this.activeUnsubscribe) {
      this.activeUnsubscribe();
      this.activeUnsubscribe = null;
    }
    ttsService.stop();
    this.activeMsgId = null;
  }

  public getActiveMsgId(): string | null {
    return this.activeMsgId;
  }

  public isSpeaking(msgId?: string): boolean {
    if (!msgId) return this.activeMsgId !== null;
    return this.activeMsgId === msgId;
  }
}

export const indianTTS = IndianTTSController.getInstance();
