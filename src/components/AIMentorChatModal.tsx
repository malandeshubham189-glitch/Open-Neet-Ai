import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { TeacherFormattedMessage } from './TeacherFormattedMessage';
import { indianTTS } from '../utils/indianVoiceTTS';
import {
  Bot,
  Sparkles,
  Send,
  X,
  RotateCcw,
  RefreshCw,
  Activity,
  Terminal,
  CheckCircle2,
  XCircle,
  Zap,
  Server,
  Key,
  Paperclip,
  Image as ImageIcon,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  User,
  ChevronDown,
  Play,
  Pause,
  Upload,
  Radio
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
  image?: {
    fileUrl: string;
    mimeType: string;
    data: string;
    fileName?: string;
  };
}

export interface PersonaConfig {
  id: 'brother' | 'sister' | 'teacher' | 'mentor';
  name: string;
  marathiTitle: string;
  icon: string;
  badgeColor: string;
  toneDescription: string;
  voiceGender: 'male' | 'female';
  pitch: number;
  rate: number;
  systemInstructionPrefix: string;
}

export const AI_PERSONAS: Record<string, PersonaConfig> = {
  brother: {
    id: 'brother',
    name: 'Big Brother',
    marathiTitle: 'Moṭhā Bhāū',
    icon: '👦',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    toneDescription: 'Friendly, warm, encouraging, Hinglish/Marathi casual tone',
    voiceGender: 'male',
    pitch: 1.0,
    rate: 1.05,
    systemInstructionPrefix: `====================================================
PERSONA MODE: BIG BROTHER (Moṭhā Bhāū)
====================================================
You are the student's caring, cool, and super smart Elder Brother (Moṭhā Bhāū).
Tone: Warm, encouraging, casual, energetic, friendly.
Languages: Mix English, Hinglish, Marathi, Minglish naturally (e.g., "Chalo chhotya...", "Bhai, zero tension!", "Ata ha point lakshat thev...").
Always make the student feel safe, confident, and motivated!`
  },
  sister: {
    id: 'sister',
    name: 'Big Sister',
    marathiTitle: 'Moṭhī Bahīṇ',
    icon: '👧',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    toneDescription: 'Caring, empathetic, highly motivating, soft study partner',
    voiceGender: 'female',
    pitch: 1.15,
    rate: 1.0,
    systemInstructionPrefix: `====================================================
PERSONA MODE: BIG SISTER (Moṭhī Bahīṇ)
====================================================
You are the student's gentle, highly empathetic, and motivating Elder Sister (Moṭhī Bahīṇ).
Tone: Soft, caring, patient, supportive, reassuring.
Languages: English, Marathi, Hindi mix (e.g., "Hey dear...", "Don't stress, khoop soppa ahe...", "Samajhla ka sweetheart?").
Guide step-by-step with zero judgement!`
  },
  teacher: {
    id: 'teacher',
    name: 'Strict Master Teacher',
    marathiTitle: 'Kota Master Sir',
    icon: '👨‍🏫',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    toneDescription: 'Direct, NCERT line-focused, exam-oriented, analytical',
    voiceGender: 'male',
    pitch: 0.95,
    rate: 1.0,
    systemInstructionPrefix: `====================================================
PERSONA MODE: STRICT MASTER TEACHER (Kota Senior Faculty)
====================================================
You are a top Kota Senior NEET Master Faculty.
Tone: Direct, disciplined, highly precise, NCERT line-focused, analytical.
Style: Emphasize exact NCERT page concepts, formula derivations, trick applications, and highlight high-yield negative marking traps.`
  },
  mentor: {
    id: 'mentor',
    name: 'NEET Strategy Guide',
    marathiTitle: 'AIR Rank Advisor',
    icon: '🎯',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    toneDescription: 'High-yield focus, time-management tips, roadmap advisor',
    voiceGender: 'male',
    pitch: 1.0,
    rate: 1.0,
    systemInstructionPrefix: `====================================================
PERSONA MODE: NEET STRATEGY GUIDE & RANK MENTOR
====================================================
You are an All India Rank (AIR) Strategy Mentor & Planner.
Tone: Strategic, roadmap-focused, action-oriented, inspiring.
Style: Focus on score maximization (720 mark target), mock test analysis, backlog elimination, time allocation per question, and high-weightage chapter prioritization.`
  }
};

interface DiagnosticState {
  serverReachable: boolean;
  backendStatus: string;
  geminiConnected: boolean;
  currentModel: string;
  latencyMs: number;
  httpStatus: number | null;
  promptTokens: number;
  outputTokens: number;
  totalTokens: number;
  requestUrl: string;
  lastError: string | null;
}

interface AIMentorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  role: 'assistant',
  content: `Hello NEET Aspirant! 👋 I am your dedicated **NEET AI Mentor & Teacher**.

I am here 24/7 to help you master NEET 2026/2027:
- 📸 **Vision OCR & Photo Doubt Solver** (Upload textbook diagrams & numericals)
- 🎙️ **Voice Doubt Input** (Speak in Marathi, Hindi or English)
- 🎭 **Multi-Persona Mentors** (Switch between Big Brother, Big Sister, Strict Teacher & Rank Mentor)
- 🔬 **NCERT Concept Doubts** (Physics, Chemistry & Biology)
- 🔊 **Natural Audio Explanations** (Listen to audio solutions)

Select a persona or upload an image to start!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const SUGGESTED_PROMPTS = [
  '🫀 NCERT Class 11 Human Heart Sectional View Diagram & Blood Flow',
  '⚡ Explain Moment of Inertia tricks & formulas',
  '🧪 Explain GOC acidic strength order',
  '🧬 How to revise Class 11 Biology in 3 weeks?',
  '🎯 Strategy to score 160+ in Physics for NEET'
];

export const AIMentorChatModal: React.FC<AIMentorChatModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ lastQuery: string; message: string } | null>(null);
  const [modelUsed, setModelUsed] = useState('gemini-3.7-flash');
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // New Multi-Persona & Multi-Modal States
  const [selectedPersona, setSelectedPersona] = useState<keyof typeof AI_PERSONAS>('brother');
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{
    fileUrl: string;
    mimeType: string;
    data: string;
    fileName: string;
  } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoPlayTTS, setAutoPlayTTS] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // Diagnostics State
  const [diagnostics, setDiagnostics] = useState<DiagnosticState>({
    serverReachable: true,
    backendStatus: 'INITIALIZING',
    geminiConnected: true,
    currentModel: 'gemini-3.7-flash',
    latencyMs: 0,
    httpStatus: null,
    promptTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    requestUrl: '/api/ai/chat',
    lastError: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Probe Server Health on Mount / Open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/ai/health')
        .then(res => res.json())
        .then(data => {
          setDiagnostics(prev => ({
            ...prev,
            serverReachable: data.serverReachable ?? true,
            backendStatus: data.backendStatus || 'ACTIVE',
            geminiConnected: data.geminiConnected ?? true,
            currentModel: data.currentModel || 'gemini-3.7-flash'
          }));
        })
        .catch(() => {
          setDiagnostics(prev => ({
            ...prev,
            serverReachable: false,
            backendStatus: 'OFFLINE',
            geminiConnected: false
          }));
        });
    }
  }, [isOpen]);

  // Auto-scroll when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Handle initial query if provided
  useEffect(() => {
    if (isOpen) {
      if (initialQuery && initialQuery.trim()) {
        handleSendMessage(initialQuery.trim());
      }
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, initialQuery]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Image Processing Helper
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setAttachedImage({
        fileUrl: URL.createObjectURL(file),
        mimeType: file.type,
        data: base64Data,
        fileName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          processFile(blob);
          e.preventDefault();
          break;
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  // Web Speech API Voice Input (STT)
  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // Multi-language (Hindi/Marathi/English)

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  // Text-to-Speech (TTS Audio Output)
  const stripMarkdownForTTS = (text: string): string => {
    return text
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#+\s+/g, '')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[-*•]\s+/g, '')
      .replace(/\n+/g, ' ');
  };

  const playTTS = (msgId: string, text: string) => {
    indianTTS.speakText(
      msgId,
      text,
      selectedPersona as any,
      () => setSpeakingMsgId(msgId),
      () => setSpeakingMsgId(null),
      () => setSpeakingMsgId(null)
    );
  };

  const handleSendMessage = async (textToSend: string) => {
    const textContent = textToSend.trim();
    if ((!textContent && !attachedImage) || isLoading) return;

    setErrorState(null);
    const userMsgId = `msg-user-${Date.now()}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textContent || (attachedImage ? '📷 [Attached Question Image for Analysis]' : ''),
      timestamp: nowTime,
      image: attachedImage ? { ...attachedImage } : undefined
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputQuery('');
    const currentAttached = attachedImage;
    setAttachedImage(null);
    setIsLoading(true);

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // Format multi-turn history with persona instruction & image support
    const formattedHistory = updatedMessages
      .filter(m => !m.isError)
      .map(m => ({
        role: m.role,
        content: m.content,
        image: m.image ? { mimeType: m.image.mimeType, data: m.image.data } : undefined
      }));

    const endpointUrl = '/api/ai/chat';
    const personaInstruction = AI_PERSONAS[selectedPersona].systemInstructionPrefix;
    const requestBody = {
      messages: formattedHistory,
      personaInstruction
    };

    console.log(`\n=================== [Frontend Outgoing Request] ===================`);
    console.log(`Endpoint: POST ${endpointUrl}`);
    console.log(`Persona: ${selectedPersona}`);

    const startTime = Date.now();
    let lastErrorMsg = '';
    let responseData: any = null;
    let httpStatus: number | null = null;

    try {
      const res = await fetch(endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      httpStatus = res.status;
      responseData = await res.json();

      if (res.ok && responseData.success && (responseData.answer || responseData.reply)) {
        // Success
      } else {
        lastErrorMsg = responseData?.error || `HTTP ${res.status}: ${res.statusText || 'Server Error'}`;
      }
    } catch (err: any) {
      lastErrorMsg = err?.message || 'Network connectivity error contacting server.';
      console.error(`[Frontend Fetch Exception]:`, err);
    }

    const latencyMs = Date.now() - startTime;
    const answerText = responseData?.answer || responseData?.reply;

    // Update Diagnostics
    setDiagnostics({
      serverReachable: httpStatus !== null,
      backendStatus: httpStatus === 200 ? 'HEALTHY' : `HTTP_${httpStatus || 'ERR'}`,
      geminiConnected: responseData?.success ?? false,
      currentModel: responseData?.modelUsed || 'gemini-3.7-flash',
      latencyMs,
      httpStatus,
      promptTokens: responseData?.promptTokens || 0,
      outputTokens: responseData?.outputTokens || 0,
      totalTokens: responseData?.totalTokens || 0,
      requestUrl: endpointUrl,
      lastError: lastErrorMsg || null
    });

    if (responseData?.success && answerText) {
      const aiMsgId = `msg-ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        role: 'assistant',
        content: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      if (responseData.modelUsed) setModelUsed(responseData.modelUsed);

      if (autoPlayTTS) {
        setTimeout(() => playTTS(aiMsgId, answerText), 300);
      }
    } else {
      const actualError = lastErrorMsg || 'Unable to connect to AI server.';
      setErrorState({ lastQuery: textContent, message: actualError });

      const errorMsgItem: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `**Server Diagnostic Error:**\n\`\`\`text\n${actualError}\n\`\`\`\nPlease check the Diagnostics panel for details or retry your query.`,
        timestamp: nowTime,
        isError: true
      };
      setMessages(prev => [...prev, errorMsgItem]);
    }
    setIsLoading(false);
  };

  const handleClearHistory = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
    setErrorState(null);
    setAttachedImage(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputQuery);
    }
  };

  const activePersonaConfig = AI_PERSONAS[selectedPersona];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-4 backdrop-blur-md animate-in fade-in">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        className={`relative flex h-[92vh] max-h-[850px] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl border ${
          isDraggingOver ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-slate-200'
        } text-slate-900 overflow-hidden font-sans transition-all`}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white px-4 sm:px-6 py-3 shrink-0 gap-3">
          
          {/* Left Persona Selector */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20 text-lg">
              {activePersonaConfig.icon}
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-extrabold text-slate-900 shadow-2xs hover:bg-slate-50 transition"
                >
                  <span>{activePersonaConfig.icon} {activePersonaConfig.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">({activePersonaConfig.marathiTitle})</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border ${activePersonaConfig.badgeColor}`}>
                  <Sparkles className="h-2.5 w-2.5" />
                  {modelUsed}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block truncate max-w-xs">
                {activePersonaConfig.toneDescription}
              </p>

              {/* Persona Switcher Dropdown */}
              {isPersonaMenuOpen && (
                <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    Select AI Persona Voice
                  </div>
                  {Object.values(AI_PERSONAS).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPersona(p.id);
                        setIsPersonaMenuOpen(false);
                      }}
                      className={`flex w-full items-start gap-2.5 rounded-xl p-2.5 text-left transition ${
                        selectedPersona === p.id
                          ? 'bg-blue-50 border border-blue-200 text-[#2563EB]'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{p.icon}</span>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{p.name}</span>
                          <span className="text-[10px] font-normal text-slate-500">({p.marathiTitle})</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{p.toneDescription}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Header Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoPlayTTS(!autoPlayTTS)}
              title={autoPlayTTS ? 'Auto-play Voice Enabled' : 'Auto-play Voice Muted'}
              className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${
                autoPlayTTS
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {autoPlayTTS ? <Volume2 className="h-3.5 w-3.5 text-purple-600" /> : <VolumeX className="h-3.5 w-3.5 text-slate-400" />}
              <span className="hidden sm:inline">Audio TTS</span>
            </button>

            <button
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              title="Toggle System Diagnostics Panel"
              className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-all ${
                showDiagnostics
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
              <span>Diagnostics</span>
            </button>

            <button
              onClick={handleClearHistory}
              title="Reset Chat"
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Diagnostics Drawer */}
        {showDiagnostics && (
          <div className="bg-slate-950 border-b border-slate-800 p-4 text-white text-xs font-mono space-y-3 shrink-0 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="font-bold text-slate-200">System Diagnostics & AI Gateway Status</span>
              </div>
              <span className="text-[10px] text-slate-400">Endpoint: POST {diagnostics.requestUrl}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Server className="h-3 w-3 text-blue-400" /> Server Reachable
                </div>
                <div className="font-bold mt-0.5 flex items-center gap-1">
                  {diagnostics.serverReachable ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> YES (200 OK)</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="h-3 w-3" /> OFFLINE</span>
                  )}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-emerald-400" /> Backend Status
                </div>
                <div className="font-bold text-slate-200 mt-0.5">
                  {diagnostics.backendStatus}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Key className="h-3 w-3 text-amber-400" /> Gemini Connected
                </div>
                <div className="font-bold mt-0.5">
                  {diagnostics.geminiConnected ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> READY</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="h-3 w-3" /> DISCONNECTED</span>
                  )}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Zap className="h-3 w-3 text-cyan-400" /> Current Model
                </div>
                <div className="font-bold text-cyan-300 mt-0.5 truncate">
                  {diagnostics.currentModel}
                </div>
              </div>
            </div>

            {diagnostics.lastError && (
              <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-[11px]">
                <strong className="text-rose-400">Last Error:</strong> {diagnostics.lastError}
              </div>
            )}
          </div>
        )}

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow-sm">
                  {activePersonaConfig.icon}
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#2563EB] text-white font-medium rounded-tr-none shadow-sm'
                    : msg.isError
                    ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-none'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                {/* Attached Image inside User Message */}
                {msg.image && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-white/20 bg-black/20 max-w-sm">
                    <img
                      src={msg.image.fileUrl}
                      alt="Uploaded Doubt"
                      className="max-h-56 w-full object-contain bg-slate-950"
                    />
                    <div className="p-2 text-[10px] bg-slate-900/90 text-slate-300 flex items-center justify-between">
                      <span className="truncate">{msg.image.fileName || 'Question Image'}</span>
                      <span className="text-emerald-400 font-mono">Vision OCR Ready</span>
                    </div>
                  </div>
                )}

                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <TeacherFormattedMessage content={msg.content} />
                )}

                <div className="mt-2.5 flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                  <span className={msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}>
                    {msg.timestamp}
                  </span>

                  {/* Audio TTS Button for AI Bubble */}
                  {msg.role === 'assistant' && msg.content && (
                    <button
                      onClick={() => playTTS(msg.id, msg.content)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold transition ${
                        speakingMsgId === msg.id
                          ? 'bg-purple-600 text-white animate-pulse'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="Listen to Audio Explanation"
                    >
                      {speakingMsgId === msg.id ? (
                        <>
                          <Volume2 className="h-3 w-3 animate-bounce" />
                          <span>Playing...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3 w-3" />
                          <span>Read Aloud</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563EB] text-white text-sm font-bold">
                {activePersonaConfig.icon}
              </div>
              <div className="rounded-2xl rounded-tl-none border border-slate-200 bg-white p-3.5 shadow-sm flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse delay-150" />
                  <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse delay-300" />
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {activePersonaConfig.name} is solving step-by-step...
                </span>
              </div>
            </div>
          )}

          {/* Retry Prompt */}
          {errorState && !isLoading && (
            <div className="flex justify-center my-2">
              <button
                onClick={() => handleSendMessage(errorState.lastQuery)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
                <span>Retry sending question: "{errorState.lastQuery.substring(0, 35)}..."</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Bar */}
        <div className="border-t border-slate-100 bg-white px-4 py-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1 shrink-0">
            <Sparkles className="h-3 w-3 text-[#2563EB]" />
            <span>Suggested Prompts:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_PROMPTS.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(promptText)}
                disabled={isLoading}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Upload Bar */}
        <div className="border-t border-slate-100 bg-white p-3.5 sm:p-4 shrink-0 space-y-2">
          {/* Attached Image Preview Banner */}
          {attachedImage && (
            <div className="flex items-center justify-between rounded-xl bg-blue-50 border border-blue-200 p-2 text-xs text-blue-900">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={attachedImage.fileUrl}
                  alt="Thumbnail"
                  className="h-9 w-9 rounded-lg object-cover border border-blue-300"
                />
                <div className="truncate">
                  <div className="font-bold text-slate-900 truncate max-w-xs">{attachedImage.fileName}</div>
                  <div className="text-[10px] text-blue-600">Vision OCR Multimodal Analysis Ready</div>
                </div>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-blue-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            {/* Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Question Photo / Diagram (Vision OCR)"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-600 hover:text-[#2563EB] transition-all"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Voice STT Mic Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={isListening ? 'Stop Listening' : 'Speak Doubt in Hindi/Marathi/English'}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse ring-4 ring-rose-200'
                  : 'border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-slate-600 hover:text-rose-600'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <textarea
              ref={inputRef}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? '🎙️ Listening to your voice... Speak now!'
                  : `Ask ${activePersonaConfig.name} any doubt, upload textbook photo or paste image...`
              }
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] disabled:bg-slate-50"
            />

            <button
              type="submit"
              disabled={(!inputQuery.trim() && !attachedImage) || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md hover:bg-blue-700 transition-all disabled:opacity-40 disabled:hover:bg-[#2563EB]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>
              Supports Drag-and-Drop photo paste, Voice Speech-to-Text & Indian Audio TTS
            </span>
            <span className="font-semibold text-slate-500">
              Active Voice: {activePersonaConfig.name}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
