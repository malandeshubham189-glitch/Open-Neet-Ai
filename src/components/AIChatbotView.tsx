import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
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
  RotateCcw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const AIChatbotView: React.FC = () => {
  const { addToRevisionQueue } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `Namaste Aspirant! 👨‍⚕️👩‍⚕️ I am **NEET AI Guru** — your 24/7 personal AI Chatbot and Doubt Resolver for NEET UG.

You don't need ChatGPT or external sites anymore! You can ask me:
- **Biology NCERT lines** (*e.g. "Explain transcription in eukaryotes with NCERT points"*)
- **Physics numericals & derivations** (*e.g. "How to find torque in rotational motion?"*)
- **Chemistry mechanisms & trends** (*e.g. "Compare acidic strength of carboxylic acids"*)
- **Study schedules, revision strategies & mock test tips in English, Marathi, Hindi or Hinglish!**

What doubt would you like to clear today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Physics' | 'Chemistry' | 'Biology'>('All');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setLoading(true);

    try {
      const historyToSend = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyToSend,
          subject: selectedSubject !== 'All' ? selectedSubject : undefined
        })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Sorry, I could not generate an answer right now. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: '### ⚠️ Server Error\nCould not connect to AI server. Please verify your connection or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
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

  const presetQueries = [
    { text: 'Explain C3 vs C4 cycle NCERT points', subject: 'Biology', icon: Dna },
    { text: 'How to solve moment of inertia of disc about tangent?', subject: 'Physics', icon: Atom },
    { text: 'Explain SN1 vs SN2 mechanism and stereochemistry', subject: 'Chemistry', icon: FlaskConical },
    { text: 'Give 7-day high yield revision plan for NEET 680+ marks', subject: 'All', icon: Sparkles }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB] border border-blue-200">
            <Bot className="h-3.5 w-3.5" />
            <span>24/7 NEET AI GURU CHATBOT</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Full NEET AI Doubt Solver & Assistant
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Ask any question in English, Marathi, Hindi or Hinglish. No external ChatGPT needed!
          </p>
        </div>

        <div className="flex items-center gap-2">
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
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5 max-w-[85%]">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold px-1">
                    <span>{isUser ? 'You' : 'NEET AI Guru'}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#2563EB] text-white rounded-tr-none font-medium'
                        : 'bg-slate-50 text-[#111827] border border-slate-200 rounded-tl-none markdown-body'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    )}
                  </div>

                  {/* Actions for AI Message */}
                  {!isUser && (
                    <div className="flex items-center gap-2 pt-1 px-1">
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

          {loading && (
            <div className="flex gap-3 max-w-xl">
              <div className="h-8 w-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 animate-bounce" />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs text-slate-600 flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent"></div>
                <span>NEET AI Guru is analyzing NCERT lines and formulating solution...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#E5E7EB] bg-slate-50/50 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Type any NEET doubt in English, Marathi, or Hindi..."
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm text-[#111827] focus:border-[#2563EB] focus:outline-none shadow-2xs"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
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
