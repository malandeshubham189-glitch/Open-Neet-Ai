/**
 * Studio Audio DSP Processor (Web Audio API)
 * Applies broadcast-grade dynamic compression, clarity parametric EQ,
 * de-mud filters, consonant definition (dhar), and high-frequency sparkle (chamkana)
 * to make speech sound crystal-clear, razor-sharp, smooth, and authentically human.
 */

export class StudioAudioDSP {
  private static instance: StudioAudioDSP;
  private audioCtx: AudioContext | null = null;
  private sourceNodeMap: WeakMap<HTMLAudioElement, MediaElementAudioSourceNode> = new WeakMap();
  private analyser: AnalyserNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private highpass: BiquadFilterNode | null = null;
  private deMudEQ: BiquadFilterNode | null = null;
  private warmthEQ: BiquadFilterNode | null = null;
  private presenceEQ: BiquadFilterNode | null = null;
  private airShelf: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;

  public static getInstance(): StudioAudioDSP {
    if (!StudioAudioDSP.instance) {
      StudioAudioDSP.instance = new StudioAudioDSP();
    }
    return StudioAudioDSP.instance;
  }

  private initAudioContext() {
    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    this.audioCtx = ctx;

    // 1. Highpass Filter (Cuts sub-bass rumble < 85Hz for clean speech baseline)
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 85;
    hp.Q.value = 0.707;
    this.highpass = hp;

    // 2. De-Mud Filter (Cuts boxy, nasal low-mid clutter at 380Hz)
    const deMud = ctx.createBiquadFilter();
    deMud.type = 'peaking';
    deMud.frequency.value = 380;
    deMud.gain.value = -1.6;
    deMud.Q.value = 1.1;
    this.deMudEQ = deMud;

    // 3. Warmth EQ (Adds solid male vocal body & chest resonance at 210Hz)
    const warmth = ctx.createBiquadFilter();
    warmth.type = 'peaking';
    warmth.frequency.value = 210;
    warmth.gain.value = 1.6;
    warmth.Q.value = 0.9;
    this.warmthEQ = warmth;

    // 4. Consonant Definition & Razor Presence ("Dhar" at 4.2kHz)
    // Sharpens plosives, dental consonants (T, K, P, D, Ch, Sh, L) for crystal-clear enunciation
    const presence = ctx.createBiquadFilter();
    presence.type = 'peaking';
    presence.frequency.value = 4200;
    presence.gain.value = 3.6;
    presence.Q.value = 1.35;
    this.presenceEQ = presence;

    // 5. Studio Air & Polish ("Chamkana" High-Shelf at 10.5kHz)
    // Imparts silky broadcast sheen, open presence, and smooth studio finish
    const air = ctx.createBiquadFilter();
    air.type = 'highshelf';
    air.frequency.value = 10500;
    air.gain.value = 2.8;
    this.airShelf = air;

    // 6. Broadcast Dynamics Compressor (Even, punchy, smooth vocal leveling)
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -19;
    comp.knee.value = 5;
    comp.ratio.value = 3.2;
    comp.attack.value = 0.002;
    comp.release.value = 0.16;
    this.compressor = comp;

    // 7. Analyser for Real-time Waveform Visualizer
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.82;
    this.analyser = analyser;

    // 8. Master Gain Limiter & Leveler
    const gain = ctx.createGain();
    gain.gain.value = 1.08;
    this.masterGain = gain;

    // Connect DSP Mastering Chain:
    // HP -> DeMud -> Warmth -> Presence (Dhar) -> Air (Chamkana) -> Compressor -> Analyser -> Gain -> Destination
    hp.connect(deMud);
    deMud.connect(warmth);
    warmth.connect(presence);
    presence.connect(air);
    air.connect(comp);
    comp.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);
  }

  public routeAudioElement(audio: HTMLAudioElement) {
    try {
      this.initAudioContext();
      if (!this.audioCtx || !this.highpass) return;

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (!this.sourceNodeMap.has(audio)) {
        const source = this.audioCtx.createMediaElementSource(audio);
        source.connect(this.highpass);
        this.sourceNodeMap.set(audio, source);
      }
    } catch {
      // Audio element plays directly through default audio routing if Web Audio is restricted
    }
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

export const studioDSP = StudioAudioDSP.getInstance();
