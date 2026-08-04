import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  Target,
  Radio,
  AlertTriangle,
  Calendar,
  MessageSquare,
  X,
  ChevronRight,
  Bot
} from 'lucide-react';
import { AIStudyEngine } from '../services/aiStudyEngine';
import { studentStateService } from '../services/studentLearningStateService';

interface AIMentorWidgetProps {
  onSelectLecture?: (videoId: string, title: string) => void;
  onNavigateSection?: (section: string) => void;
}

export const AIMentorWidget: React.FC<AIMentorWidgetProps> = ({
  onSelectLecture,
  onNavigateSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');

  const studentState = studentStateService.getState();

  const handleQuickAction = (actionKey: string, promptText: string) => {
    setActiveQuery(promptText);
    const advice = AIStudyEngine.getAIDecisionAdvice(promptText);
    setAiResponse(advice.answer);

    if (advice.recommendedVideoId && onSelectLecture && actionKey === 'resume') {
      onSelectLecture(advice.recommendedVideoId, advice.recommendedTopicOrChapter);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setActiveQuery(customInput);
    const advice = AIStudyEngine.getAIDecisionAdvice(customInput);
    setAiResponse(advice.answer);
    setCustomInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Modal Panel */}
      {isOpen && (
        <div className="mb-4 w-96 max-w-[calc(100vw-2rem)] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  NEETDrop AI Mentor
                </h3>
                <p className="text-[11px] text-indigo-300 font-medium">Smart Study Decision Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar">
            {/* AI Decision Output Box */}
            {aiResponse ? (
              <div className="p-3.5 bg-slate-800/80 border border-indigo-500/30 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between text-indigo-400 font-bold text-[11px]">
                  <span className="flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5" /> Recommendation
                  </span>
                  <span className="text-[10px] text-slate-400">{activeQuery}</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">{aiResponse}</p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setAiResponse(null);
                      setActiveQuery(null);
                    }}
                    className="text-[11px] text-indigo-400 hover:underline font-medium"
                  >
                    Clear answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-2xl text-xs text-slate-300 flex items-center gap-3">
                <Target className="w-8 h-8 text-indigo-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">Target NEET Score: {studentState.targetNEETScore}/720</div>
                  <p className="text-[11px] text-slate-400">Streak: {studentState.studyStreakDays} Days 🔥 | Weak Topics: {studentState.weakTopics.length}</p>
                </div>
              </div>
            )}

            {/* Quick Action Grid */}
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">Quick Smart Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickAction('next', 'What should I study now?')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-800 text-left transition-all group"
                >
                  <Target className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Next Best Topic</span>
                </button>

                <button
                  onClick={() => handleQuickAction('resume', 'Resume my last lecture')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-slate-800 text-left transition-all group"
                >
                  <Play className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Resume Lecture</span>
                </button>

                <button
                  onClick={() => handleQuickAction('revision', 'What should I revise today?')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 hover:bg-amber-600/20 hover:border-amber-500/40 border border-slate-800 text-left transition-all group"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Start Revision</span>
                </button>

                <button
                  onClick={() => handleQuickAction('live', 'Is there any live class right now?')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 hover:bg-rose-600/20 hover:border-rose-500/40 border border-slate-800 text-left transition-all group"
                >
                  <Radio className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform shrink-0 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-200">Join Live</span>
                </button>

                <button
                  onClick={() => handleQuickAction('weak', 'What is my weakest topic?')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 hover:bg-red-600/20 hover:border-red-500/40 border border-slate-800 text-left transition-all group"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Weak Topic</span>
                </button>

                <button
                  onClick={() => handleQuickAction('plan', 'Show my daily timetable plan')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 hover:bg-cyan-600/20 hover:border-cyan-500/40 border border-slate-800 text-left transition-all group"
                >
                  <Calendar className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Daily Plan</span>
                </button>
              </div>
            </div>

            {/* Ask Anything Input */}
            <form onSubmit={handleCustomSubmit} className="pt-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask AI Mentor anything..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-xs rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border border-indigo-400/30"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        <span>NEETDrop AI Mentor</span>
      </button>
    </div>
  );
};
