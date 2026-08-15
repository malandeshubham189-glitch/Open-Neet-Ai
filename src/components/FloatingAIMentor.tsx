import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Sparkles,
  X,
  ArrowRight,
  Target,
  AlertTriangle,
  Calendar,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { getAllTopics } from '../data/curriculumData';
import { getAllNursingTopics } from '../data/nursingCurriculumData';

export const FloatingAIMentor: React.FC = () => {
  const {
    setCurrentView,
    openTopicDetail,
    topicProgress,
    studentMetrics,
    openAIMentorModal,
    activeCourse,
    openNursingTopicDetail
  } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const allNeetTopics = getAllTopics();
  const nextBestNeetTopic =
    allNeetTopics.find((t) => !topicProgress[t.id]?.completed) || allNeetTopics[0];

  const allNursingTopics = getAllNursingTopics('3rd_year');
  const nextBestNursingTopic = allNursingTopics[0];

  const handleNextBestTopic = () => {
    if (activeCourse === 'nursing' && nextBestNursingTopic) {
      openNursingTopicDetail(nextBestNursingTopic.id);
    } else if (nextBestNeetTopic) {
      openTopicDetail(nextBestNeetTopic.id);
    }
    setIsOpen(false);
  };

  const handleWeakTopic = () => {
    if (activeCourse === 'nursing') {
      openNursingTopicDetail('topic-msn2-stroke');
    } else {
      openTopicDetail('topic-phy-rolling');
    }
    setIsOpen(false);
  };

  const handleDailyPlan = () => {
    if (activeCourse === 'nursing') {
      setCurrentView('nursing-dashboard');
    } else {
      setCurrentView('ai-planner');
    }
    setIsOpen(false);
  };

  const handleAskAI = () => {
    openAIMentorModal();
    setIsOpen(false);
  };

  const isNursing = activeCourse === 'nursing';

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 font-sans">
      {/* Pop-Up Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-[20px] border border-slate-100 bg-white p-5 shadow-xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  isNursing
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-blue-50 text-[#2563EB]'
                }`}
              >
                {isNursing ? (
                  <Stethoscope className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isNursing ? 'Nursing Clinical AI' : 'NEET AI Mentor'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isNursing
                    ? 'MUHS Nursing Care Plan & Theory Guide'
                    : 'How can I guide your study today?'}
                </p>
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
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                isNursing
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-blue-50 text-[#2563EB] hover:bg-blue-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4" />
                <span>{isNursing ? 'Ask Clinical Nursing AI' : 'Ask AI'}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* Next Best Topic */}
            <button
              onClick={handleNextBestTopic}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Target
                  className={`h-4 w-4 ${isNursing ? 'text-emerald-700' : 'text-[#2563EB]'}`}
                />
                <span className="truncate max-w-[170px]">
                  {isNursing ? 'Continue Next Lecture' : 'Next Best Topic'}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* High Yield Focus / Weak Topic */}
            <button
              onClick={handleWeakTopic}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>{isNursing ? 'High-Yield 15M Question' : 'Weak Topic'}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Curriculum Hub */}
            <button
              onClick={handleDailyPlan}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all"
            >
              <div className="flex items-center gap-2.5">
                {isNursing ? (
                  <BookOpen className="h-4 w-4 text-emerald-700" />
                ) : (
                  <Calendar className="h-4 w-4 text-purple-600" />
                )}
                <span>{isNursing ? 'Nursing Dashboard' : 'Daily Plan'}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-bold text-white shadow-lg transition-all active:scale-95 ${
          isNursing ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2563EB] hover:bg-blue-700'
        }`}
      >
        <Sparkles className="h-4 w-4 text-white" />
        <span>{isNursing ? 'Nursing AI' : 'Ask AI'}</span>
      </button>
    </div>
  );
};
