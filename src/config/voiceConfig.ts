/**
 * Centralized Voice Configuration for NEETDrop AI
 * Defines the Single Source of Truth for AI Mentor Voice System
 * Strictly Engineered for Natural, Motivational, Mature Indian Teacher & Senior Mentor Speech
 * (Authentic Indian English, Hinglish, Marathi, Hindi with warm educator cadence)
 */

export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  geminiVoice: string; // Prebuilt voice in Gemini TTS (e.g., "Fenrir", "Puck", "Charon")
  geminiFallbackVoices: string[]; // Fallback voices in order of preference
  pitch: number; // Natural pitch (0.98 for mature, resonant Indian teacher voice)
  speed: number; // Deliberate educator speed (0.92 for crystal-clear enunciation)
  directionPrompt: string; // Voice Persona instruction for Gemini TTS
  localVoiceKeywords: string[]; // Keywords to match high quality Indian teacher browser voices
}

/**
 * Single Centralized Default Mentor Voice Configuration:
 * "Indian Senior Teacher & Mentor (Sir / Bhaiya) — Natural, motivational, mature, warm Indian educator voice"
 */
export const DEFAULT_MENTOR_VOICE: VoiceProfile = {
  id: 'matureMentor',
  name: 'Indian Senior Teacher & Mentor (Sir / Bhaiya)',
  description: 'Natural, motivational, mature & calm Indian teacher voice with authentic educator cadence and clear enunciation',
  geminiVoice: 'Fenrir',
  geminiFallbackVoices: ['Puck', 'Charon', 'Zephyr'],
  pitch: 0.98,
  speed: 0.92,
  directionPrompt:
    'You are an inspiring, natural, mature, and motivational Indian NEET master teacher and academic mentor (Sir / Bhaiya). Speak with the authentic, warm, confident, and encouraging tone of an experienced Indian classroom teacher. Use natural Indian English, Hinglish, and Marathi rhythm, cadence, and clear pronunciation. Emphasize key NEET concepts with motivational energy, natural pauses, and caring authority. Sound 100% human, mature, encouraging, and authentic — like a true Indian mentor teaching his student personally. Never sound robotic, theatrical, or rushed.',
  localVoiceKeywords: [
    'natural',
    'online',
    'neural',
    'en-in',
    'hi-in',
    'mr-in',
    'prabhat',
    'ravi',
    'rishi',
    'madhav',
    'hemant',
    'swara',
    'kalpana',
    'google english',
    'india',
    'indian',
    'male'
  ]
};

export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  matureMentor: DEFAULT_MENTOR_VOICE,
  brother: {
    ...DEFAULT_MENTOR_VOICE,
    id: 'brother',
    name: 'Elder Brother Mentor (Bhaiya)',
    description: 'Motivational, warm Indian elder brother & senior NEET mentor',
    geminiVoice: 'Puck',
    geminiFallbackVoices: ['Fenrir', 'Charon', 'Zephyr'],
    directionPrompt:
      'You are a supportive, motivational, and smart Indian elder brother (Bhaiya) and NEET coach. Speak in a warm, encouraging, natural Indian tone with relatable Hinglish and Marathi cadence. Inspire the student with confidence, clear concept breakdowns, and practical exam tips.'
  },
  teacher: {
    ...DEFAULT_MENTOR_VOICE,
    id: 'teacher',
    name: 'Kota Master Teacher (Indian Faculty)',
    description: 'Authoritative, highly articulate, motivational Indian NEET classroom faculty',
    geminiVoice: 'Fenrir',
    geminiFallbackVoices: ['Charon', 'Zephyr', 'Puck'],
    directionPrompt:
      'You are a senior Kota NEET master faculty and Indian academic teacher. Speak in an authoritative, clear, and motivational Indian teaching voice. Explain every NCERT line, formula, and conceptual mechanism with crystal clarity, precision, and confidence.'
  },
  mentor: {
    ...DEFAULT_MENTOR_VOICE,
    id: 'mentor',
    name: 'Indian AIR Strategy Mentor',
    description: 'Strategic, motivational, top-rank NEET advisor with calm Indian teacher cadence',
    geminiVoice: 'Fenrir',
    geminiFallbackVoices: ['Puck', 'Zephyr', 'Charon'],
    directionPrompt:
      'You are an inspiring Indian NEET strategy mentor and top rank advisor. Speak clearly, calmly, and strategically in an authentic Indian educator voice. Guide the student on exam score maximization, time management, and concept mastery.'
  },
  sister: {
    id: 'sister',
    name: 'Elder Sister Teacher (Didi)',
    description: 'Warm, articulate, calm & motivational Indian female teacher',
    geminiVoice: 'Kore',
    geminiFallbackVoices: ['Kore', 'Fenrir', 'Puck'],
    pitch: 1.02,
    speed: 0.92,
    directionPrompt:
      'You are an inspiring, calm, and supportive Indian female teacher and elder sister mentor (Didi). Speak naturally, warmly, and clearly in an authentic Indian educator tone. Maintain moderate pacing, warm encouragement, and emphasize important scientific concepts like a caring teacher.',
    localVoiceKeywords: [
      'natural',
      'online',
      'neural',
      'en-in',
      'hi-in',
      'mr-in',
      'swara',
      'neerja',
      'heera',
      'veena',
      'aditi',
      'kalpana',
      'kore',
      'female'
    ]
  }
};

export const DEFAULT_VOICE_PROFILE_KEY = 'matureMentor';
