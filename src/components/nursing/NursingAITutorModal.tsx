import React, { useState, useRef, useEffect } from 'react';
import { NursingAIChatMessage, NursingAITutorService } from '../../services/nursing/nursingAITutor';
import { NursingSubjectId, NursingYear, NursingTopic } from '../../types/nursing';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  BookOpen,
  Stethoscope,
  ShieldAlert,
  FileText,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface NursingAITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle?: string;
  subjectName?: string;
  subjectId?: NursingSubjectId;
  year?: NursingYear;
  contextYear?: NursingYear;
  activeTopic?: NursingTopic;
}

export const NursingAITutorModal: React.FC<NursingAITutorModalProps> = ({
  isOpen,
  onClose,
  topicTitle: propTopicTitle,
  subjectName: propSubjectName,
  subjectId: propSubjectId,
  year: propYear,
  contextYear,
  activeTopic
}) => {
  const activeYear = propYear || contextYear || '3rd_year';
  const topicTitle = activeTopic?.title || propTopicTitle || 'Clinical Nursing Theory';
  const subjectName = activeTopic?.subjectName || propSubjectName || 'Adult Health Nursing';
  const subjectId = activeTopic?.subjectId || propSubjectId;
  const year = activeTopic?.year || propYear || '3rd_year';
  const [messages, setMessages] = useState<NursingAIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your **B.Sc Nursing Academic & Clinical Theory Mentor** (MUHS & INC Syllabus aligned).

How can I assist your study preparation today? You can ask me to:
- Explain complex disease pathophysiology step-by-step
- Formulate a complete **NANDA-I Nursing Care Plan (NCP)** with scientific rationales
- Draft a high-scoring **15-Mark LAQ** model answer for your upcoming university exam
- Explain drug mechanisms, dosage rules, and essential nursing assessments.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery.trim();
    if (!text || isLoading) return;

    const userMsg: NursingAIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const reply = await NursingAITutorService.askNursingAI({
        query: text,
        topicTitle,
        subjectName,
        subjectId,
        year,
        mode: text.toLowerCase().includes('ncp') || text.toLowerCase().includes('care plan')
          ? 'ncp_generation'
          : text.toLowerCase().includes('laq') || text.toLowerCase().includes('15 mark')
          ? 'muhs_laq_answer'
          : 'concept_explanation'
      });

      const aiMsg: NursingAIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: NursingAIChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: 'I encountered a brief connection delay. Please ensure you have an active network and retry your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    `Generate NANDA Care Plan for ${topicTitle}`,
    `Write 15-Mark MUHS LAQ Answer outline for ${topicTitle}`,
    `Explain Pathophysiology & Clinical Signs of ${topicTitle}`,
    `What are the priority Nursing Actions & Drug Precautions?`
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative flex h-[85vh] w-full max-w-3xl flex-col rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">Nursing AI Clinical Mentor</h3>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  MUHS / INC Aligned
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-md">
                Topic: <span className="font-semibold text-slate-700">{topicTitle}</span> ({subjectName})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Clinical Safety Disclaimer Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2 flex items-center gap-2 text-[11px] font-medium text-amber-800">
          <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
          <span>
            Academic & Theory Assistant: Strictly for B.Sc Nursing university exam preparation. Always follow hospital SOPs and physician orders during clinical rotations.
          </span>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] rounded-3xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  <div
                    className={`mt-2 flex items-center justify-between gap-2 text-[10px] ${
                      isUser ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-slate-700"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 animate-pulse">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                <span>Formulating clinical nursing response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Suggestions:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
                className="shrink-0 rounded-full bg-white border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-100 p-4 bg-white">
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
              placeholder={`Ask a question on ${topicTitle} or request NANDA Care Plan...`}
              disabled={isLoading}
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
