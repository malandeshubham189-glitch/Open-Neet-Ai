import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { TeacherFormattedMessage } from './TeacherFormattedMessage';
import { AI_PERSONAS, PersonaConfig } from './AIMentorChatModal';
import { indianTTS } from '../utils/indianVoiceTTS';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  PlusCircle,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Paperclip,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
  image?: {
    fileUrl: string;
    mimeType: string;
    data: string;
    fileName?: string;
  };
}

export const AIChatbotView: React.FC = () => {
  const { addToRevisionQueue } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `Namaste Aspirant! 👨‍⚕️👩‍⚕️ I am **NEET AI Guru** — your 24/7 personal AI Chatbot and Doubt Resolver for NEET UG.

You can ask me:
- 📸 **Vision OCR & Photo Doubt Solver** (Upload textbook diagrams & numericals)
- 🎙️ **Voice Doubt Input** (Speak in Marathi, Hindi or English)
- 🎭 **Multi-Persona Mentors** (Switch between Big Brother, Big Sister, Strict Teacher & Rank Mentor)
- **NCERT lines, derivations, and study schedules in English, Marathi, Hindi or Hinglish!**

What doubt would you like to clear today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Physics' | 'Chemistry' | 'Biology'>('All');
  const [selectedPersona, setSelectedPersona] = useState<keyof typeof AI_PERSONAS>('brother');
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Vision & Voice States
  const [attachedImage, setAttachedImage] = useState<{
    fileUrl: string;
    mimeType: string;
    data: string;
    fileName: string;
  } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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

  // Image Helper
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

  // Voice STT
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
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join('');
        setInputQuery(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // TTS Output
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

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if ((!text.trim() && !attachedImage) || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text || (attachedImage ? '📷 [Attached Question Image]' : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: attachedImage ? { ...attachedImage } : undefined
    };

    const aiMsgId = `m-${Date.now()}`;
    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'model',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, initialAiMsg]);
    if (!queryToSend) setInputQuery('');
    setAttachedImage(null);
    setLoading(true);

    try {
      const historyToSend = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
        image: m.image ? { mimeType: m.image.mimeType, data: m.image.data } : undefined
      }));

      const personaInstruction = AI_PERSONAS[selectedPersona].systemInstructionPrefix;

      const res = await fetch('/api/ai/stream-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyToSend,
          subject: selectedSubject !== 'All' ? selectedSubject : undefined,
          personaInstruction
        })
      });

      if (!res.body) throw new Error('No stream body returned');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkString = decoder.decode(value, { stream: true });
        const lines = chunkString.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.chunk) {
                accumulatedText += parsed.chunk;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMsgId
                      ? { ...msg, content: accumulatedText, modelUsed: parsed.modelUsed }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Ignore
            }
          }
        }
      }

      if (!accumulatedText.trim()) {
        const fallbackRes = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: historyToSend,
            subject: selectedSubject !== 'All' ? selectedSubject : undefined,
            personaInstruction
          })
        });
        const fallbackData = await fallbackRes.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId
              ? { ...msg, content: fallbackData.reply || 'No response generated.', modelUsed: fallbackData.modelUsed }
              : msg
          )
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId
            ? {
                ...msg,
                content:
                  '### ⚠️ Server Error\nCould not connect to live AI server. Please verify environment setup.'
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: `Chat history cleared! What concept or question shall we study next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSaveToRevision = (msg: ChatMessage) => {
    const subjectId = selectedSubject === 'Physics' ? 'physics' : selectedSubject === 'Biology' ? 'biology' : 'chemistry';
    addToRevisionQueue(
      `ai-chat-${msg.id}`,
      `AI Doubt: ${msg.content.substring(0, 35)}...`,
      'AI Chatbot Saved Note',
      subjectId
    );
    setSavedId(msg.id);
    setTimeout(() => setSavedId(null), 2500);
  };

  const activePersonaConfig = AI_PERSONAS[selectedPersona];

  const presetQueries = [
    { text: 'Explain C3 vs C4 cycle NCERT points', subject: 'Biology', icon: Dna },
    { text: 'How to solve moment of inertia of disc about tangent?', subject: 'Physics', icon: Atom },
    { text: 'Explain SN1 vs SN2 mechanism and stereochemistry', subject: 'Chemistry', icon: FlaskConical },
    { text: 'Give 7-day high yield revision plan for NEET 680+ marks', subject: 'All', icon: Sparkles }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8 text-[#111827] font-sans">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB] border border-blue-200">
            <Bot className="h-3.5 w-3.5" />
            <span>24/7 MULTI-MODAL NEET AI GURU (VISION OCR + VOICE)</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Full NEET AI Doubt Solver & Mentor
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Ask any question in English, Marathi, Hindi or Hinglish. Upload photos or speak your doubt!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Persona Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 transition"
            >
              <span>{activePersonaConfig.icon} Voice: {activePersonaConfig.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isPersonaMenuOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 animate-in fade-in">
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

          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-500" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 shrink-0">Subject Focus:</span>
        {(['All', 'Physics', 'Chemistry', 'Biology'] as const).map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all border shrink-0 ${
              selectedSubject === sub
                ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Preset Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {presetQueries.map((pq, idx) => {
          const Icon = pq.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(pq.text)}
              className="flex items-center gap-2 p-2.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left text-xs text-slate-700 transition-all shadow-2xs group"
            >
              <Icon className="h-4 w-4 text-[#2563EB] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="line-clamp-2">{pq.text}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Box Container */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    isUser ? 'bg-slate-800' : 'bg-[#2563EB]'
                  }`}
                >
                  {isUser ? <User className="h-4 w-4" /> : <span>{activePersonaConfig.icon}</span>}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5 max-w-[85%]">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold px-1">
                    <span>{isUser ? 'You' : `NEET AI (${activePersonaConfig.name})`}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                    {m.modelUsed && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[9px]">
                        {m.modelUsed}
                      </span>
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#2563EB] text-white rounded-tr-none font-medium'
                        : 'bg-slate-50 text-[#111827] border border-slate-200 rounded-tl-none markdown-body'
                    }`}
                  >
                    {/* Attached Image inside User Message */}
                    {m.image && (
                      <div className="mb-3 rounded-xl overflow-hidden border border-white/20 bg-black/20 max-w-sm">
                        <img
                          src={m.image.fileUrl}
                          alt="Uploaded Doubt"
                          className="max-h-56 w-full object-contain bg-slate-950"
                        />
                      </div>
                    )}

                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : m.content ? (
                      <TeacherFormattedMessage content={m.content} />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-500">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
                        <span>Generating response token-by-token...</span>
                      </div>
                    )}
                  </div>

                  {/* Actions for AI Message */}
                  {!isUser && m.content && (
                    <div className="flex items-center gap-3 pt-1 px-1">
                      <button
                        onClick={() => playTTS(m.id, m.content)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                          speakingMsgId === m.id ? 'text-purple-600 animate-pulse' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>{speakingMsgId === m.id ? 'Speaking...' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleSaveToRevision(m)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7C3AED] hover:text-purple-800"
                      >
                        {savedId === m.id ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <PlusCircle className="h-3 w-3" />
                        )}
                        <span>{savedId === m.id ? 'Saved!' : 'Save to Revision'}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(m.content);
                          setCopiedId(m.id);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800"
                      >
                        {copiedId === m.id ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#E5E7EB] bg-slate-50/50 rounded-b-2xl space-y-2">
          {attachedImage && (
            <div className="flex items-center justify-between rounded-xl bg-blue-50 border border-blue-200 p-2 text-xs text-blue-900">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={attachedImage.fileUrl}
                  alt="Thumbnail"
                  className="h-8 w-8 rounded-lg object-cover border border-blue-300"
                />
                <span className="truncate font-bold">{attachedImage.fileName}</span>
              </div>
              <button onClick={() => setAttachedImage(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Photo / Diagram"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#2563EB] transition-all shadow-2xs"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={isListening ? 'Stop Listening' : 'Speak Doubt'}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                  : 'border-slate-300 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 shadow-2xs'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isListening ? '🎙️ Listening...' : `Ask ${activePersonaConfig.name} any doubt or upload photo...`}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm text-[#111827] focus:border-[#2563EB] focus:outline-none shadow-2xs"
            />

            <button
              type="submit"
              disabled={loading || (!inputQuery.trim() && !attachedImage)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md shadow-blue-600/20 shrink-0"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
