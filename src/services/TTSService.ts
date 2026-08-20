/**
 * Production-Grade Text-to-Speech (TTS) Service
 * Dual-Engine Architecture:
 * 1. Primary Engine: Gemini AI 3.1 Flash High-Definition Voice (24kHz Studio-grade Human-like Voice)
 * 2. Fallback Engine: Multilingual Indian SpeechSynthesizer (Offline & Instant Fallback)
 */

export interface SentenceChunk {
  id: string;
  index: number;
  text: string;
  spokenText: string;
  lang: string;
  startOffset: number;
  endOffset: number;
}

export type TTSStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'error';

export interface TTSState {
  status: TTSStatus;
  currentIndex: number;
  totalSentences: number;
  currentSentence: SentenceChunk | null;
  speed: number;
  pitch: number;
  persona: string;
  engine: 'gemini-hd' | 'browser-tts';
  error: string | null;
  isPreloading: boolean;
}

export type TTSListener = (state: TTSState) => void;

/**
 * Detects if text contains Devanagari script (Marathi / Hindi)
 */
export function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Strips raw code, diagram JSON, markdown artifacts, LaTeX, and converts
 * medical/scientific notation to natural spoken language.
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove JSON and Code Blocks
  cleaned = cleaned.replace(/```(?:json|mermaid|latex|markdown|text)?[\s\S]*?```/gi, '');
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // 2. Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, ' ');

  // 3. Remove Markdown Tables
  cleaned = cleaned.replace(/\|.*\|/g, (match) => {
    return match
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', ');
  });

  // 4. Remove Markdown Headings & Styling
  cleaned = cleaned.replace(/^#+\s+/gm, '');
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
  cleaned = cleaned.replace(/__([^_]+)__/g, '$1');
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1');
  cleaned = cleaned.replace(/~~([^~]+)~~/g, '$1');
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 5. Clean LaTeX formulas and Greek characters
  cleaned = cleaned
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\$([^\$]+)\$/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 divided by $2')
    .replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1')
    .replace(/\\Delta\s*([a-zA-Z0-9]+)/g, 'change in $1')
    .replace(/\\Delta/g, 'delta')
    .replace(/\\theta/g, 'theta')
    .replace(/\\alpha/g, 'alpha')
    .replace(/\\beta/g, 'beta')
    .replace(/\\gamma/g, 'gamma')
    .replace(/\\lambda/g, 'lambda')
    .replace(/\\pi/g, 'pi')
    .replace(/\\sigma/g, 'sigma')
    .replace(/\\mu/g, 'micro')
    .replace(/\\omega/g, 'omega')
    .replace(/\\tau/g, 'tau')
    .replace(/\\rightarrow|\\to/g, ' yields ')
    .replace(/\\leftrightarrow/g, ' is in equilibrium with ')
    .replace(/\\times/g, ' multiplied by ')
    .replace(/\\div/g, ' divided by ')
    .replace(/\\pm/g, ' plus or minus ')
    .replace(/\\approx/g, ' approximately ')
    .replace(/\\le|\\leq/g, ' less than or equal to ')
    .replace(/\\ge|\\geq/g, ' greater than or equal to ')
    .replace(/\\neq/g, ' is not equal to ')
    .replace(/\\infty/g, ' infinity ')
    .replace(/\^2/g, ' squared ')
    .replace(/\^3/g, ' cubed ')
    .replace(/\\[a-zA-Z]+/g, ' ');

  // 6. Common NEET Chemical & Biological Terms
  cleaned = cleaned
    .replace(/\bH2O\b/gi, 'water')
    .replace(/\bCO2\b/gi, 'carbon dioxide')
    .replace(/\bO2\b/gi, 'oxygen')
    .replace(/\bN2\b/gi, 'nitrogen')
    .replace(/\bH2SO4\b/gi, 'sulfuric acid')
    .replace(/\bHCl\b/gi, 'hydrochloric acid')
    .replace(/\bNaCl\b/gi, 'sodium chloride')
    .replace(/\bC6H12O6\b/gi, 'glucose')
    .replace(/\bCaCO3\b/gi, 'calcium carbonate')
    .replace(/\bNH3\b/gi, 'ammonia');

  // 7. Scientific Units & Abbreviations
  cleaned = cleaned
    .replace(/\bm\/s\^2\b|\bm\/s2\b/gi, ' meters per second squared ')
    .replace(/\bm\/s\b/gi, ' meters per second ')
    .replace(/\bkg\b/gi, ' kilograms ')
    .replace(/\bcm\b/gi, ' centimeters ')
    .replace(/\bmm\b/gi, ' millimeters ')
    .replace(/\bnm\b/gi, ' nanometers ')
    .replace(/\beV\b/gi, ' electron volts ')
    .replace(/\bkJ\/mol\b/gi, ' kilojoules per mole ')
    .replace(/\bkJ\b/gi, ' kilojoules ')
    .replace(/\bJ\b/g, ' Joules ')
    .replace(/\bHz\b/gi, ' Hertz ')
    .replace(/\batm\b/gi, ' atmospheres ')
    .replace(/°C|\\degree\s*C/gi, ' degrees Celsius ')
    .replace(/°|\\degree/gi, ' degrees ');

  // 8. Exam Acronyms & Teacher Card markers
  cleaned = cleaned
    .replace(/💡\s*\*\*FORMULA CARD:\*\*/gi, 'Formula Note. ')
    .replace(/⚡\s*\*\*SHORTCUT CARD:\*\*/gi, 'Shortcut Trick. ')
    .replace(/🎯\s*\*\*PYQ TRICK:\*\*/gi, 'Previous Year Question Trick. ')
    .replace(/⚠️\s*\*\*COMMON MISTAKE:\*\*/gi, 'Warning, common mistake alert. ')
    .replace(/📖\s*Refer NCERT Figure/gi, 'Refer NCERT Textbook Figure. ')
    .replace(/\bNCERT\b/gi, 'N C E R T')
    .replace(/\bNEET\b/gi, 'Neet')
    .replace(/\bNTA\b/gi, 'N T A')
    .replace(/\bDNA\b/gi, 'D N A')
    .replace(/\bRNA\b/gi, 'R N A')
    .replace(/\bATP\b/gi, 'A T P')
    .replace(/\bDPP\b/gi, 'D P P')
    .replace(/\bPYQ\b/gi, 'P Y Q')
    .replace(/\bPYQs\b/gi, 'P Y Qs')
    .replace(/\bCBT\b/gi, 'C B T')
    .replace(/\bFig\.\s*/gi, 'Figure ')
    .replace(/\bEq\.\s*/gi, 'Equation ');

  // 9. Remove decorative emojis that disrupt speech
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}]/gu, '');

  // 10. Clean list bullets and excess whitespaces
  cleaned = cleaned
    .replace(/^[-*•]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Sentence Parser with Devanagari (Marathi/Hindi) and English support
 */
export function parseSentences(rawText: string): SentenceChunk[] {
  const cleaned = cleanTextForSpeech(rawText);
  if (!cleaned) return [];

  // Protect common abbreviation dots and decimal numbers
  const protectedText = cleaned
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Fig|Eq|p|pp|vs|e\.g|i\.e|etc|sp|spp|Vol|Ch|No)\./gi, '$1___DOT___')
    .replace(/(\d+)\.(\d+)/g, '$1___DECIMAL___$2');

  const regex = /[^.!?।\n]+[.!?।\n]*/g;
  const chunks: SentenceChunk[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = regex.exec(protectedText)) !== null) {
    let sentenceText = match[0];
    const startOffset = match.index;
    const endOffset = match.index + sentenceText.length;

    sentenceText = sentenceText
      .replace(/___DOT___/g, '.')
      .replace(/___DECIMAL___/g, '.');

    const trimmed = sentenceText.trim();
    if (trimmed.length > 0) {
      const isDevanagari = containsDevanagari(trimmed);
      chunks.push({
        id: `chunk-${index}-${startOffset}`,
        index,
        text: trimmed,
        spokenText: trimmed,
        lang: isDevanagari ? 'mr-IN' : 'en-IN',
        startOffset,
        endOffset
      });
      index++;
    }
  }

  if (chunks.length === 0 && cleaned.length > 0) {
    const isDevanagari = containsDevanagari(cleaned);
    chunks.push({
      id: 'chunk-0-0',
      index: 0,
      text: cleaned,
      spokenText: cleaned,
      lang: isDevanagari ? 'mr-IN' : 'en-IN',
      startOffset: 0,
      endOffset: cleaned.length
    });
  }

  return chunks;
}

export class TTSService {
  private static instance: TTSService;

  private state: TTSState = {
    status: 'idle',
    currentIndex: 0,
    totalSentences: 0,
    currentSentence: null,
    speed: 0.94,
    pitch: 0.94,
    persona: 'brother',
    engine: 'gemini-hd',
    error: null,
    isPreloading: false
  };

  private sentences: SentenceChunk[] = [];
  private listeners: Set<TTSListener> = new Set();
  private availableVoices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private selectedDevanagariVoice: SpeechSynthesisVoice | null = null;

  // Gemini HD Audio Player
  private currentAudio: HTMLAudioElement | null = null;
  private audioCache: Map<string, string> = new Map(); // text+persona -> audio data URI
  private isGeminiSupported: boolean = true;
  private geminiBackoffUntil: number = 0;

  // Watchdogs
  private watchDogTimer: any = null;
  private keepAliveInterval: any = null;
  private retryCount = 0;
  private maxRetries = 2;
  private currentPlayToken: number = 0;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.availableVoices = window.speechSynthesis.getVoices() || [];
    this.resolveBestVoices();
  }

  private resolveBestVoices() {
    if (!this.availableVoices.length) return;

    // 1. Marathi / Hindi Voice Resolution (Priority: Natural Male / Google / Microsoft / Native)
    const devanagariVoice =
      this.availableVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        const lang = (v.lang || '').toLowerCase();
        return (
          (lang.includes('mr') || lang.includes('hi')) &&
          (name.includes('natural') || name.includes('online') || name.includes('male') || name.includes('madhav') || name.includes('hemant') || name.includes('rishi') || name.includes('google'))
        );
      }) ||
      this.availableVoices.find((v) => (v.lang || '').toLowerCase().includes('mr')) ||
      this.availableVoices.find((v) => (v.lang || '').toLowerCase().includes('hi-in')) ||
      this.availableVoices.find((v) => (v.lang || '').toLowerCase().includes('hi')) ||
      this.availableVoices.find((v) => (v.name || '').toLowerCase().includes('marathi')) ||
      this.availableVoices.find((v) => (v.name || '').toLowerCase().includes('hindi')) ||
      null;

    this.selectedDevanagariVoice = devanagariVoice;

    // 2. Mature Male English / Indian English Voice (High-Definition, Deep & Authoritative)
    const isFemale = this.state.persona === 'sister';

    let englishVoice: SpeechSynthesisVoice | null = null;

    if (isFemale) {
      englishVoice =
        this.availableVoices.find((v) => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();
          return (
            (lang.includes('en-in') || lang.includes('en')) &&
            (name.includes('natural') || name.includes('online') || name.includes('female') || name.includes('heera') || name.includes('veena') || name.includes('aditi') || name.includes('samantha'))
          );
        }) ||
        this.availableVoices.find((v) => (v.lang || '').toLowerCase().includes('en-in')) ||
        this.availableVoices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
        null;
    } else {
      // Prioritize High-Quality Mature Male Voices: Microsoft Natural Online, Google UK/India Male, etc.
      englishVoice =
        this.availableVoices.find((v) => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();
          const isMaleName =
            name.includes('ravi') ||
            name.includes('rishi') ||
            name.includes('madhav') ||
            name.includes('hemant') ||
            name.includes('christopher') ||
            name.includes('ryan') ||
            name.includes('guy') ||
            name.includes('david') ||
            name.includes('george') ||
            name.includes('male') ||
            name.includes('uk english male');
          return (lang.includes('en-in') || lang.startsWith('en')) && (name.includes('natural') || name.includes('online')) && isMaleName;
        }) ||
        this.availableVoices.find((v) => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();
          return (
            (lang.includes('en-in') || lang.startsWith('en')) &&
            (name.includes('google uk english male') || name.includes('google english') || name.includes('ravi') || name.includes('rishi') || name.includes('madhav'))
          );
        }) ||
        this.availableVoices.find((v) => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();
          const isFemaleName = name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('victoria') || name.includes('kangana') || name.includes('kore');
          return (lang.includes('en-in') || lang.startsWith('en')) && !isFemaleName && (name.includes('male') || name.includes('david') || name.includes('george') || name.includes('daniel') || name.includes('alex'));
        }) ||
        this.availableVoices.find((v) => (v.lang || '').toLowerCase().includes('en-in')) ||
        this.availableVoices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
        null;
    }

    this.selectedVoice = englishVoice || this.availableVoices[0] || null;
  }

  public subscribe(listener: TTSListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateState(partial: Partial<TTSState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => listener(this.state));
  }

  public getState(): TTSState {
    return this.state;
  }

  public setPersona(persona: string, pitch = 1.0, rate = 1.0) {
    this.state.persona = persona;
    this.state.pitch = pitch;
    this.state.speed = rate;
    this.resolveBestVoices();
  }

  public loadText(text: string) {
    this.stop();
    this.sentences = parseSentences(text);

    this.updateState({
      status: 'idle',
      currentIndex: 0,
      totalSentences: this.sentences.length,
      currentSentence: this.sentences[0] || null,
      error: null,
      isPreloading: false
    });
  }

  public play(text?: string, startIndex?: number, persona = 'brother', pitch = 1.0) {
    if (text) {
      this.setPersona(persona, pitch, this.state.speed);
      this.loadText(text);
    }

    if (this.sentences.length === 0) {
      this.updateState({ status: 'idle', error: 'No text available to read.' });
      return;
    }

    const indexToPlay = startIndex !== undefined ? startIndex : this.state.currentIndex;
    if (indexToPlay >= this.sentences.length) {
      this.updateState({ status: 'stopped', currentIndex: 0 });
      return;
    }

    if (this.state.status === 'paused' && indexToPlay === this.state.currentIndex) {
      this.resume();
      return;
    }

    this.currentPlayToken = Date.now();
    this.playChunkAtIndex(indexToPlay, this.currentPlayToken);
  }

  private async fetchGeminiAudio(text: string, persona: string): Promise<string | null> {
    if (Date.now() < this.geminiBackoffUntil) {
      return null;
    }

    const cacheKey = `${persona}_${text}`;
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    try {
      const response = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, persona })
      });

      if (!response.ok) {
        if (response.status === 429) {
          this.geminiBackoffUntil = Date.now() + 10 * 60 * 1000;
        }
        return null;
      }

      const data = await response.json();
      if (data.quotaExceeded || data.fallback) {
        // Automatically backoff from Gemini TTS endpoint for 10 minutes
        this.geminiBackoffUntil = Date.now() + 10 * 60 * 1000;
        return null;
      }

      if (data.success && data.audioBase64) {
        const audioUri = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        this.audioCache.set(cacheKey, audioUri);
        // Cap cache size
        if (this.audioCache.size > 80) {
          const firstKey = this.audioCache.keys().next().value;
          if (firstKey) this.audioCache.delete(firstKey);
        }
        return audioUri;
      }
      return null;
    } catch {
      return null;
    }
  }

  private async playChunkAtIndex(index: number, token: number) {
    if (index < 0 || index >= this.sentences.length) {
      this.stop();
      return;
    }

    const chunk = this.sentences[index];
    this.clearWatchdog();
    this.stopCurrentAudio();

    if (token !== this.currentPlayToken) return;

    this.updateState({
      status: 'loading',
      currentIndex: index,
      currentSentence: chunk,
      error: null
    });

    // Try Gemini HD Audio First (if supported and available)
    if (this.isGeminiSupported) {
      try {
        const audioUri = await this.fetchGeminiAudio(chunk.spokenText, this.state.persona);

        // Check if playback was stopped or changed while fetching
        if (token !== this.currentPlayToken) return;

        if (audioUri) {
          const audio = new Audio(audioUri);
          this.currentAudio = audio;
          audio.playbackRate = Math.max(0.75, Math.min(2.0, this.state.speed));

          audio.onplay = () => {
            if (token === this.currentPlayToken) {
              this.updateState({
                status: 'playing',
                engine: 'gemini-hd',
                currentIndex: index,
                currentSentence: chunk
              });
            }
          };

          audio.onended = () => {
            if (token === this.currentPlayToken) {
              this.currentAudio = null;
              const nextIndex = index + 1;
              if (nextIndex < this.sentences.length && this.state.status === 'playing') {
                this.playChunkAtIndex(nextIndex, token);
              } else {
                this.updateState({
                  status: 'stopped',
                  currentIndex: 0,
                  currentSentence: this.sentences[0] || null
                });
              }
            }
          };

          audio.onerror = () => {
            console.warn('[TTSService] Gemini audio error, switching to browser synthesizer fallback');
            this.playBrowserTTS(chunk, index, token);
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('[TTSService] Gemini TTS failed, falling back:', err);
      }
    }

    // Fallback to Browser Native Web Speech Synthesizer
    this.playBrowserTTS(chunk, index, token);
  }

  private playBrowserTTS(chunk: SentenceChunk, index: number, token: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.updateState({ status: 'error', error: 'Audio is not supported on this browser.' });
      return;
    }

    if (token !== this.currentPlayToken) return;

    if (!this.availableVoices.length) {
      this.loadVoices();
    }

    try {
      window.speechSynthesis.cancel();
    } catch {}

    setTimeout(() => {
      if (token !== this.currentPlayToken) return;

      const utterance = new SpeechSynthesisUtterance(chunk.spokenText);
      const isDevanagari = containsDevanagari(chunk.spokenText);

      if (isDevanagari && this.selectedDevanagariVoice) {
        utterance.voice = this.selectedDevanagariVoice;
        utterance.lang = this.selectedDevanagariVoice.lang || 'mr-IN';
      } else if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
        utterance.lang = this.selectedVoice.lang || 'en-IN';
      }

      utterance.rate = Math.max(0.75, Math.min(2.0, this.state.speed));
      utterance.pitch = Math.max(0.8, Math.min(1.4, this.state.pitch));

      utterance.onstart = () => {
        if (token === this.currentPlayToken) {
          this.startKeepAliveWatchdog();
        }
      };

      utterance.onend = () => {
        this.clearWatchdog();
        this.retryCount = 0;

        if (token === this.currentPlayToken) {
          const nextIndex = index + 1;
          if (nextIndex < this.sentences.length && this.state.status === 'playing') {
            this.playChunkAtIndex(nextIndex, token);
          } else {
            this.updateState({
              status: 'stopped',
              currentIndex: 0,
              currentSentence: this.sentences[0] || null
            });
          }
        }
      };

      utterance.onerror = (e) => {
        console.warn(`[TTSService] Browser speech error on chunk ${index}:`, e);
        this.clearWatchdog();

        if (token === this.currentPlayToken) {
          if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            setTimeout(() => this.playChunkAtIndex(index, token), 200);
          } else {
            this.retryCount = 0;
            const nextIndex = index + 1;
            if (nextIndex < this.sentences.length) {
              this.playChunkAtIndex(nextIndex, token);
            } else {
              this.updateState({ status: 'stopped' });
            }
          }
        }
      };

      this.updateState({
        status: 'playing',
        engine: 'browser-tts',
        currentIndex: index,
        currentSentence: chunk,
        error: null
      });

      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
        this.startWatchdogTimer(index, token);
      } catch (err: any) {
        console.error('[TTSService] Speak exception:', err);
        this.updateState({ status: 'error', error: 'Audio playback failed.' });
      }
    }, 40);
  }

  private stopCurrentAudio() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {}
      this.currentAudio = null;
    }
  }

  private startKeepAliveWatchdog() {
    this.clearKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (this.state.status === 'playing' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 8000);
  }

  private clearKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  private startWatchdogTimer(index: number, token: number) {
    this.clearWatchdog();
    this.watchDogTimer = setTimeout(() => {
      if (token === this.currentPlayToken && this.state.status === 'playing' && this.state.currentIndex === index) {
        console.warn(`[TTSService] Watchdog timer expired for chunk ${index}. Advancing.`);
        try {
          window.speechSynthesis.cancel();
        } catch {}
        const nextIndex = index + 1;
        if (nextIndex < this.sentences.length) {
          this.playChunkAtIndex(nextIndex, token);
        } else {
          this.stop();
        }
      }
    }, 15000);
  }

  private clearWatchdog() {
    if (this.watchDogTimer) {
      clearTimeout(this.watchDogTimer);
      this.watchDogTimer = null;
    }
    this.clearKeepAlive();
  }

  public pause() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
      } catch {}
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.pause();
      } catch {}
    }
    this.clearWatchdog();
    this.updateState({ status: 'paused' });
  }

  public resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      try {
        this.currentAudio.play();
        this.updateState({ status: 'playing' });
        return;
      } catch {}
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        try {
          window.speechSynthesis.resume();
        } catch {}
        this.startKeepAliveWatchdog();
        this.updateState({ status: 'playing' });
        return;
      }
    }

    this.playChunkAtIndex(this.state.currentIndex, ++this.currentPlayToken);
  }

  public stop() {
    this.currentPlayToken = Date.now();
    this.clearWatchdog();
    this.stopCurrentAudio();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.retryCount = 0;
    this.updateState({
      status: 'stopped',
      currentIndex: 0,
      currentSentence: this.sentences[0] || null
    });
  }

  public setSpeed(speed: number) {
    const clamped = Math.min(2.0, Math.max(0.75, speed));
    this.updateState({ speed: clamped });
    if (this.currentAudio) {
      this.currentAudio.playbackRate = clamped;
    }
    if (this.state.status === 'playing') {
      this.playChunkAtIndex(this.state.currentIndex, ++this.currentPlayToken);
    }
  }

  public seek(index: number) {
    if (index >= 0 && index < this.sentences.length) {
      this.playChunkAtIndex(index, ++this.currentPlayToken);
    }
  }

  public restart() {
    this.seek(0);
  }

  public retryCurrentChunk() {
    this.playChunkAtIndex(this.state.currentIndex, ++this.currentPlayToken);
  }

  public getSentences(): SentenceChunk[] {
    return this.sentences;
  }
}

export const ttsService = TTSService.getInstance();
