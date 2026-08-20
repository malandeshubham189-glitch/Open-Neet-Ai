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
  BookOpen,
  Calculator,
  GraduationCap
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
    canonicalActiveCourse,
    openNursingTopicDetail,
    openIITMLecture,
    openIITMWeekLesson
  } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const allNeetTopics = getAllTopics();
  const nextBestNeetTopic =
    allNeetTopics.find((t) => !topicProgress[t.id]?.completed) || allNeetTopics[0];

  const allNursingTopics = getAllNursingTopics('3rd_year');
  const nextBestNursingTopic = allNursingTopics[0];

  const isIITM = canonicalActiveCourse === 'iitm_bs';
  const isNursing = canonicalActiveCourse === 'nursing';

  const handleNextBestTopic = () => {
    if (isIITM) {
      openIITMWeekLesson('week_1');
    } else if (isNursing && nextBestNursingTopic) {
      openNursingTopicDetail(nextBestNursingTopic.id);
    } else if (nextBestNeetTopic) {
      openTopicDetail(nextBestNeetTopic.id);
    }
    setIsOpen(false);
  };

  const handleWeakTopic = () => {
    if (isIITM) {
      openIITMLecture('math_1');
    } else if (isNursing) {
      openNursingTopicDetail('topic-msn2-stroke');
    } else {
      openTopicDetail('topic-phy-rolling');
    }
    setIsOpen(false);
  };

  const handleDailyPlan = () => {
    if (isIITM) {
      setCurrentView('iitm-dashboard');
    } else if (isNursing) {
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

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 font-sans">
      {/* Pop-Up Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-[20px] border border-slate-100 bg-white p-5 shadow-xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  isIITM
                    ? 'bg-indigo-50 text-indigo-700'
                    : isNursing
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-blue-50 text-[#2563EB]'
                }`}
              >
                {isIITM ? (
                  <Calculator className="h-4 w-4" />
                ) : isNursing ? (
                  <Stethoscope className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isIITM
                    ? 'IITM BS AI Mentor'
                    : isNursing
                    ? 'Nursing Clinical AI'
                    : 'NEET AI Mentor'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isIITM
                    ? 'Math 1 & Stats 1 Qualifier Prep Guide'
                    : isNursing
                    ? 'MUHS Nursing Care Plan & Theory Guide'
                    : 'How can I guide your study today?'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {/* Ask AI */}
            <button
              onClick={handleAskAI}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                isIITM
                  ? 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                  : isNursing
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-blue-50 text-[#2563EB] hover:bg-blue-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4" />
                <span>
                  {isIITM
                    ? 'Ask IITM BS Math/Stats AI'
                    : isNursing
                    ? 'Ask Clinical Nursing AI'
                    : 'Ask AI'}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* Next Best Topic */}
            <button
              onClick={handleNextBestTopic}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Target
                  className={`h-4 w-4 ${
                    isIITM
                      ? 'text-indigo-700'
                      : isNursing
                      ? 'text-emerald-700'
                      : 'text-[#2563EB]'
                  }`}
                />
                <span className="truncate max-w-[170px]">
                  {isIITM
                    ? 'Resume Week 1 Lessons'
                    : isNursing
                    ? 'Continue Next Lecture'
                    : 'Next Best Topic'}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* High Yield Focus / Weak Topic */}
            <button
              onClick={handleWeakTopic}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>
                  {isIITM
                    ? 'Math 1 Foundation OneShot'
                    : isNursing
                    ? 'High-Yield 15M Question'
                    : 'Weak Topic'}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Curriculum Hub */}
            <button
              onClick={handleDailyPlan}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {isIITM ? (
                  <GraduationCap className="h-4 w-4 text-indigo-700" />
                ) : isNursing ? (
                  <BookOpen className="h-4 w-4 text-emerald-700" />
                ) : (
                  <Calendar className="h-4 w-4 text-purple-600" />
                )}
                <span>
                  {isIITM
                    ? 'IITM BS Degree Hub'
                    : isNursing
                    ? 'Nursing Dashboard'
                    : 'Daily Plan'}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-bold text-white shadow-lg transition-all active:scale-95 cursor-pointer ${
          isIITM
            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            : isNursing
            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
            : 'bg-[#2563EB] hover:bg-blue-700 shadow-blue-200'
        }`}
      >
        <Sparkles className="h-4 w-4 text-white" />
        <span>
          {isIITM ? 'IITM AI' : isNursing ? 'Nursing AI' : 'Ask AI'}
        </span>
      </button>
    </div>
  );
};
