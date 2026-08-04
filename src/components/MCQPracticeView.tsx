import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import { SubjectId } from '../types';
import {
  HelpCircle,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Zap
} from 'lucide-react';

export const MCQPracticeView: React.FC = () => {
  const {
    setCurrentView,
    updateTopicStepProgress,
    toggleBookmark,
    isBookmarked
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const allTopics = getAllTopics();

  // Consolidate all MCQs
  const mcqList: Array<{
    id: string;
    topicId: string;
    topicTitle: string;
    subjectId: SubjectId;
    question: string;
    options: Array<{ id: string; text: string }>;
    correctAnswerId: string;
    explanation: string;
    tag: string;
  }> = [];

  allTopics.forEach((t) => {
    if (t.mcqs && t.mcqs.length > 0) {
      t.mcqs.forEach((m) => {
        mcqList.push({
          id: m.id,
          topicId: t.id,
          topicTitle: t.title,
          subjectId: t.subjectId,
          question: m.question,
          options: m.options,
          correctAnswerId: m.correctAnswerId,
          explanation: m.explanation,
          tag: m.tag || 'NCERT MCQ'
        });
      });
    }
  });

  const filteredMcqs = mcqList.filter((m) => {
    const matchesSubject = selectedSubject === 'all' || m.subjectId === selectedSubject;
    const matchesSearch =
      m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([mcqId, ansId]) => {
      const q = mcqList.find((m) => m.id === mcqId);
      return q && q.correctAnswerId === ansId;
    }
  ).length;

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const handleSelectOption = (mcqId: string, optionId: string, topicId: string) => {
    setUserAnswers((prev) => ({ ...prev, [mcqId]: optionId }));
    setShowSolution((prev) => ({ ...prev, [mcqId]: true }));
    updateTopicStepProgress(topicId, 'mcq');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* Header Banner */}
      <div className="rounded-[20px] bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <HelpCircle className="h-48 w-48 text-emerald-300" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>NCERT WORD-TO-WORD MCQ ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Interactive MCQ Practice</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            High-yield NCERT multiple choice practice with immediate answer feedback and detailed step-by-step solutions.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setCurrentView('ncert')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 px-4 py-2 text-xs font-black hover:bg-emerald-400 transition-all shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Chapter-Wise 20-MCQ AI Practice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Attempted MCQs</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{answeredCount} / {mcqList.length}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
            <HelpCircle className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Correct Answers</p>
            <p className="text-xl font-extrabold text-emerald-600 mt-0.5">{correctCount}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Accuracy Rate</p>
            <p className="text-xl font-extrabold text-purple-600 mt-0.5">{accuracy}%</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Award className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'all'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setSelectedSubject('physics')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'physics'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setSelectedSubject('chemistry')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'chemistry'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Chemistry
          </button>
          <button
            onClick={() => setSelectedSubject('biology')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'biology'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Biology
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search MCQs or topics..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {filteredMcqs.length === 0 ? (
          <div className="rounded-[20px] border border-slate-100 bg-white p-12 text-center text-slate-500">
            <HelpCircle className="mx-auto h-12 w-12 text-slate-300 mb-2" />
            <p className="text-sm font-bold">No MCQs found matching your search criteria</p>
          </div>
        ) : (
          filteredMcqs.map((mcq, idx) => {
            const selectedOpt = userAnswers[mcq.id];
            const isRevealed = showSolution[mcq.id];
            const isCorrect = selectedOpt === mcq.correctAnswerId;

            return (
              <div
                key={mcq.id}
                className="rounded-[20px] border border-slate-100 bg-white p-5 sm:p-6 shadow-sm space-y-4 transition-all"
              >
                {/* MCQ Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] font-black text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {mcq.subjectId.toUpperCase()} • {mcq.topicTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {mcq.tag}
                    </span>

                    <button
                      onClick={() => toggleBookmark(mcq.topicId, 'mcq', mcq.question, `mcq-${mcq.id}`)}
                      className={`p-1.5 rounded-lg border text-xs transition-all ${
                        isBookmarked(`mcq-${mcq.id}`)
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      {isBookmarked(`mcq-${mcq.id}`) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                  {mcq.question}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mcq.options.map((opt) => {
                    const isThisSelected = selectedOpt === opt.id;
                    const isThisCorrect = opt.id === mcq.correctAnswerId;

                    let btnStyle =
                      'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                    if (isRevealed) {
                      if (isThisCorrect) {
                        btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 font-black';
                      } else if (isThisSelected && !isThisCorrect) {
                        btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-700 font-bold';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(mcq.id, opt.id, mcq.topicId)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/80 border border-slate-200 font-bold text-[11px] text-slate-800 shrink-0">
                            {opt.id.toUpperCase()}
                          </span>
                          <span>{opt.text}</span>
                        </div>

                        {isRevealed && isThisCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        )}
                        {isRevealed && isThisSelected && !isThisCorrect && (
                          <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Solution Box */}
                {isRevealed && (
                  <div
                    className={`rounded-2xl p-4 border text-xs space-y-1.5 animate-in fade-in ${
                      isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>Solution & NCERT Explanation:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{mcq.explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
