import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Sparkles, X, ArrowRight, Target, AlertTriangle, Calendar } from 'lucide-react';
import { getAllTopics } from '../data/curriculumData';

export const FloatingAIMentor: React.FC = () => {
  const { setCurrentView, openTopicDetail, topicProgress, studentMetrics, openAIMentorModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const allTopics = getAllTopics();
  // Find next best topic (first incomplete topic)
  const nextBestTopic = allTopics.find((t) => !topicProgress[t.id]?.completed) || allTopics[0];

  // Weak topic ID default
  const weakTopicId = 'topic-phy-rolling';

  const handleNextBestTopic = () => {
    if (nextBestTopic) {
      openTopicDetail(nextBestTopic.id);
      setIsOpen(false);
    }
  };

  const handleWeakTopic = () => {
    openTopicDetail(weakTopicId);
    setIsOpen(false);
  };

  const handleDailyPlan = () => {
    setCurrentView('ai-planner');
    setIsOpen(false);
  };

  const handleAskAI = () => {
    openAIMentorModal();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 font-sans">
      {/* Pop-Up Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-[20px] border border-slate-100 bg-white p-5 shadow-xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">AI Mentor</h4>
                <p className="text-[11px] text-slate-500">How can I guide your study today?</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {/* Ask AI */}
            <button
              onClick={handleAskAI}
              className="flex w-full items-center justify-between rounded-xl bg-blue-50 px-3.5 py-2.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4" />
                <span>Ask AI</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* Next Best Topic */}
            <button
              onClick={handleNextBestTopic}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Target className="h-4 w-4 text-[#2563EB]" />
                <span className="truncate max-w-[170px]">Next Best Topic</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Weak Topic */}
            <button
              onClick={handleWeakTopic}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Weak Topic</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Daily Plan */}
            <button
              onClick={handleDailyPlan}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>Daily Plan</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full bg-[#2563EB] px-5 py-3 text-xs font-bold text-white shadow-lg hover:bg-blue-700 transition-all active:scale-95"
      >
        <Sparkles className="h-4 w-4 text-white" />
        <span>Ask AI</span>
      </button>
    </div>
  );
};
