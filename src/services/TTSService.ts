/**
 * Production-Grade Text-to-Speech (TTS) Service
 * Senior Speech AI Architecture for NCERT & NEET Learning
 *
 * Features:
 * - Intelligent sentence parsing with offset mapping (preserves abbreviations, formulas, decimals, units)
 * - Streaming queue with preloading and local caching
 * - Seamless sentence-by-sentence audio playback with zero audible gaps
 * - State management with listeners for sentence highlighting and auto-scroll
 * - Play, Pause, Resume, Stop, Speed (0.75x–2x), Seek, and Restart controls
 * - Chrome Speech Engine Keep-Alive watchdog to prevent 15-second speech freezes
 * - Automatic chunk retry logic & voice fallback
 * - Memory-leak prevention and cleanup for long NCERT chapters
 */

export interface SentenceChunk {
  id: string;
  index: number;
  text: string;
  spokenText: string;
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
  error: string | null;
  isPreloading: boolean;
}

export type TTSListener = (state: TTSState) => void;

/**
 * Normalizes text specifically for natural spoken English/Indian pronunciation
 * without modifying original text or using SSML hacks.
 */
export function normalizeSpokenText(text: string): string {
  if (!text) return '';

  return text
    // Remove markdown code blocks and markdown symbols
    .replace(/```[\s\S]*?```/g, ' Code block. ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#+\s+/g, '')

    // Convert chemical formulas to clear spoken words
    .replace(/\bH2O\b/gi, 'water')
    .replace(/\bCO2\b/gi, 'carbon dioxide')
    .replace(/\bO2\b/gi, 'oxygen')
    .replace(/\bN2\b/gi, 'nitrogen')
    .replace(/\bH2SO4\b/gi, 'sulfuric acid')
    .replace(/\bHCl\b/gi, 'hydrochloric acid')
    .replace(/\bNaCl\b/gi, 'sodium chloride')
    .replace(/\bC6H12O6\b/gi, 'glucose')

    // Scientific units
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
    .replace(/°|\\degree/gi, ' degrees ')

    // Acronyms
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
    .replace(/\bEq\.\s*/gi, 'Equation ')

    // Math symbols
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2')
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
    .replace(/\\rightarrow|\\to/g, ' gives ')
    .replace(/\\leftrightarrow/g, ' is in equilibrium with ')
    .replace(/\\times/g, ' times ')
    .replace(/\\approx/g, ' is approximately equal to ')
    .replace(/\\le|\\leq/g, ' is less than or equal to ')
    .replace(/\\ge|\\geq/g, ' is greater than or equal to ')
    .replace(/\^2/g, ' squared ')
    .replace(/\^3/g, ' cubed ')
    .replace(/\\[a-zA-Z]+/g, ' ')

    // Formatting cleanup
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[-*•]\s+/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sentence Parser with exact offset mapping
 * Correctly handles common abbreviations, decimals, and formulas without splitting mid-sentence
 */
export function parseSentences(rawText: string): SentenceChunk[] {
  if (!rawText || !rawText.trim()) return [];

  // Protect common sentence-break false positives (e.g., Dr., Fig., 3.14, e.g., i.e.)
  const protectedText = rawText
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Fig|Eq|p|pp|vs|e\.g|i\.e|etc|sp|spp|Vol|Ch|No)\./gi, '$1___DOT___')
    .replace(/(\d+)\.(\d+)/g, '$1___DECIMAL___$2');

  // Regex to match sentences ending with . ! ? or linebreaks
  const sentenceRegex = /[^.!?\n]+[.!?\n]*/g;
  const chunks: SentenceChunk[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = sentenceRegex.exec(protectedText)) !== null) {
    let sentenceText = match[0];
    const startOffset = match.index;
    const endOffset = match.index + sentenceText.length;

    // Restore protected dots and decimals
    sentenceText = sentenceText
      .replace(/___DOT___/g, '.')
      .replace(/___DECIMAL___/g, '.');

    const trimmed = sentenceText.trim();
    if (trimmed.length > 0) {
      chunks.push({
        id: `sentence-${index}-${startOffset}`,
        index,
        text: rawText.substring(startOffset, endOffset).trim(),
        spokenText: normalizeSpokenText(trimmed),
        startOffset,
        endOffset
      });
      index++;
    }
  }

  // Fallback if regex matched nothing
  if (chunks.length === 0 && rawText.trim().length > 0) {
    chunks.push({
      id: `sentence-0-0`,
      index: 0,
      text: rawText.trim(),
      spokenText: normalizeSpokenText(rawText.trim()),
      startOffset: 0,
      endOffset: rawText.length
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
    speed: 1.0,
    error: null,
    isPreloading: false
  };

  private sentences: SentenceChunk[] = [];
  private listeners: Set<TTSListener> = new Set();
  private utteranceCache: Map<string, SpeechSynthesisUtterance> = new Map();

  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private watchDogTimer: any = null;
  private keepAliveInterval: any = null;
  private retryCount = 0;
  private maxRetries = 3;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Prioritize natural Indian English voices, then UK/US English
    const preferredVoice =
      voices.find((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        return (
          lang.includes('en-in') ||
          lang.includes('hi-in') ||
          name.includes('india') ||
          name.includes('ravi') ||
          name.includes('heera') ||
          name.includes('aditi')
        );
      }) ||
      voices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US') || v.lang.startsWith('en')) ||
      voices[0];

    this.selectedVoice = preferredVoice || null;
  }

  public subscribe(listener: TTSListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
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

  /**
   * Loads text into the queue and initializes sentence chunks
   */
  public loadText(text: string) {
    this.stop();
    this.utteranceCache.clear();
    this.sentences = parseSentences(text);

    this.updateState({
      status: 'idle',
      currentIndex: 0,
      totalSentences: this.sentences.length,
      currentSentence: this.sentences[0] || null,
      error: null,
      isPreloading: false
    });

    if (this.sentences.length > 0) {
      this.preloadNextChunks(0);
    }
  }

  /**
   * Preloads and caches utterance objects for smooth playback
   */
  private preloadNextChunks(startIndex: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    this.updateState({ isPreloading: true });
    const aheadCount = 3;

    for (let i = startIndex; i < Math.min(startIndex + aheadCount, this.sentences.length); i++) {
      const chunk = this.sentences[i];
      if (chunk && !this.utteranceCache.has(chunk.id)) {
        const utterance = new SpeechSynthesisUtterance(chunk.spokenText);
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
          utterance.lang = this.selectedVoice.lang;
        }
        utterance.rate = this.state.speed;
        this.utteranceCache.set(chunk.id, utterance);
      }
    }

    this.updateState({ isPreloading: false });
  }

  /**
   * Starts or resumes playback
   */
  public play(text?: string, startIndex?: number) {
    if (text) {
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

    this.playChunkAtIndex(indexToPlay);
  }

  private playChunkAtIndex(index: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.updateState({ status: 'error', error: 'Speech synthesis is not supported in this browser.' });
      return;
    }

    if (index < 0 || index >= this.sentences.length) {
      this.stop();
      this.updateState({ status: 'stopped', currentIndex: 0 });
      return;
    }

    const chunk = this.sentences[index];
    this.clearWatchdog();

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Get or create cached utterance
    let utterance = this.utteranceCache.get(chunk.id);
    if (!utterance) {
      utterance = new SpeechSynthesisUtterance(chunk.spokenText);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
        utterance.lang = this.selectedVoice.lang;
      }
      this.utteranceCache.set(chunk.id, utterance);
    }

    utterance.rate = this.state.speed;
    this.activeUtterance = utterance;

    this.updateState({
      status: 'playing',
      currentIndex: index,
      currentSentence: chunk,
      error: null
    });

    // Start preloading upcoming chunks
    this.preloadNextChunks(index + 1);

    // Setup event handlers
    utterance.onstart = () => {
      this.startKeepAliveWatchdog();
    };

    utterance.onend = () => {
      this.clearWatchdog();
      this.retryCount = 0;

      // Automatically advance to next sentence
      const nextIndex = index + 1;
      if (nextIndex < this.sentences.length && this.state.status === 'playing') {
        this.playChunkAtIndex(nextIndex);
      } else {
        this.updateState({ status: 'stopped', currentIndex: 0, currentSentence: this.sentences[0] || null });
      }
    };

    utterance.onerror = (e) => {
      console.warn(`[TTSService] Chunk error at index ${index}:`, e);
      this.clearWatchdog();

      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`[TTSService] Retrying chunk ${index} (Attempt ${this.retryCount}/${this.maxRetries})...`);
        setTimeout(() => this.playChunkAtIndex(index), 300);
      } else {
        this.retryCount = 0;
        // Skip problem sentence gracefully to never stop playback completely
        const nextIndex = index + 1;
        if (nextIndex < this.sentences.length) {
          this.playChunkAtIndex(nextIndex);
        } else {
          this.updateState({ status: 'stopped' });
        }
      }
    };

    // Speak chunk
    window.speechSynthesis.speak(utterance);
    this.startWatchdogTimer(index);
  }

  /**
   * Chrome Keep-Alive Mechanism to prevent SpeechSynthesis freezing after 15 seconds
   */
  private startKeepAliveWatchdog() {
    this.clearKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (this.state.status === 'playing' && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  }

  private clearKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  /**
   * Watchdog timer to catch frozen utterances that never trigger onend
   */
  private startWatchdogTimer(index: number) {
    this.clearWatchdog();
    // Allow up to 12s per sentence chunk before watchdog forces advance/retry
    this.watchDogTimer = setTimeout(() => {
      if (this.state.status === 'playing' && this.state.currentIndex === index) {
        console.warn(`[TTSService] Watchdog triggered for chunk ${index}. Auto-advancing.`);
        window.speechSynthesis.cancel();
        const nextIndex = index + 1;
        if (nextIndex < this.sentences.length) {
          this.playChunkAtIndex(nextIndex);
        } else {
          this.stop();
        }
      }
    }, 14000);
  }

  private clearWatchdog() {
    if (this.watchDogTimer) {
      clearTimeout(this.watchDogTimer);
      this.watchDogTimer = null;
    }
    this.clearKeepAlive();
  }

  public pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    this.clearWatchdog();
    this.updateState({ status: 'paused' });
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.startKeepAliveWatchdog();
        this.updateState({ status: 'playing' });
      } else {
        this.playChunkAtIndex(this.state.currentIndex);
      }
    }
  }

  public stop() {
    this.clearWatchdog();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.activeUtterance = null;
    this.retryCount = 0;
    this.updateState({
      status: 'stopped',
      currentIndex: 0,
      currentSentence: this.sentences[0] || null
    });
  }

  public setSpeed(speed: number) {
    const clampedSpeed = Math.min(2.0, Math.max(0.75, speed));
    this.updateState({ speed: clampedSpeed });

    // Update cached rate
    this.utteranceCache.forEach((utt) => {
      utt.rate = clampedSpeed;
    });

    // Replay active chunk with updated speed
    if (this.state.status === 'playing') {
      this.playChunkAtIndex(this.state.currentIndex);
    }
  }

  public seek(index: number) {
    if (index >= 0 && index < this.sentences.length) {
      this.playChunkAtIndex(index);
    }
  }

  public restart() {
    this.seek(0);
  }

  public retryCurrentChunk() {
    this.playChunkAtIndex(this.state.currentIndex);
  }

  public getSentences(): SentenceChunk[] {
    return this.sentences;
  }
}

export const ttsService = TTSService.getInstance();
