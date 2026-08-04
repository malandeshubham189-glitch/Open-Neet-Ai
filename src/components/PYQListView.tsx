import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import { AUTHENTIC_NEET_PYQS } from '../data/pyqData';
import { SubjectId } from '../types';
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Zap,
  Filter
} from 'lucide-react';

export const PYQListView: React.FC = () => {
  const { updateTopicStepProgress, toggleBookmark, isBookmarked } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const allTopics = getAllTopics();

  // Consolidate PYQs from both AUTHENTIC_NEET_PYQS and topic curriculum
  const pyqList: Array<{
    id: string;
    topicId: string;
    topicTitle: string;
    subjectId: SubjectId;
    question: string;
    options: Array<{ id: string; text: string }>;
    correctAnswerId: string;
    explanation: string;
    year: number;
  }> = [...AUTHENTIC_NEET_PYQS];

  allTopics.forEach((t) => {
    if (t.pyqs && t.pyqs.length > 0) {
      t.pyqs.forEach((p) => {
        if (!pyqList.some((existing) => existing.id === p.id)) {
          pyqList.push({
            id: p.id,
            topicId: t.id,
            topicTitle: t.title,
            subjectId: t.subjectId,
            question: p.question,
            options: p.options,
            correctAnswerId: p.correctAnswerId,
            explanation: p.explanation,
            year: p.year
          });
        }
      });
    }
  });

  const years = Array.from(new Set(pyqList.map((p) => p.year))).sort((a, b) => b - a);

  const filteredPyqs = pyqList.filter((p) => {
    const matchesSubject = selectedSubject === 'all' || p.subjectId === selectedSubject;
    const matchesYear = selectedYear === 'all' || p.year.toString() === selectedYear;
    const matchesSearch =
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesYear && matchesSearch;
  });

  const handleSelectOption = (pyqId: string, optionId: string, topicId: string) => {
    setUserAnswers((prev) => ({ ...prev, [pyqId]: optionId }));
    setShowSolution((prev) => ({ ...prev, [pyqId]: true }));
    updateTopicStepProgress(topicId, 'pyq');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* Header Banner */}
      <div className="rounded-[20px] bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="h-48 w-48 text-amber-300" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>10-YEAR PAST NEET PAPERS (2015-2025) VAULT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Authentic NEET PYQ Archive</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Solve authentic previous year NEET questions year-by-year with step-by-step formula derivations and detailed explanations.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {/* Year Filter */}
          <div className="flex items-center gap-1 shrink-0">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-bold text-slate-900 focus:outline-none"
            >
              <option value="all">All NEET Years</option>
              {years.map((y) => (
                <option key={y} value={y.toString()}>
                  NEET {y}
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* Subject Filter */}
          <button
            onClick={() => setSelectedSubject('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'all' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedSubject('physics')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'physics' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setSelectedSubject('chemistry')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'chemistry' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Chemistry
          </button>
          <button
            onClick={() => setSelectedSubject('biology')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'biology' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Biology
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PYQs..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>

      {/* PYQ Feed */}
      <div className="space-y-4">
        {filteredPyqs.length === 0 ? (
          <div className="rounded-[20px] border border-slate-100 bg-white p-12 text-center text-slate-500">
            <Award className="mx-auto h-12 w-12 text-slate-300 mb-2" />
            <p className="text-sm font-bold">No PYQs matching filter</p>
          </div>
        ) : (
          filteredPyqs.map((pyq, idx) => {
            const selectedOpt = userAnswers[pyq.id];
            const isRevealed = showSolution[pyq.id];
            const isCorrect = selectedOpt === pyq.correctAnswerId;

            return (
              <div
                key={pyq.id}
                className="rounded-[20px] border border-slate-100 bg-white p-5 sm:p-6 shadow-sm space-y-4 transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-amber-700 font-black text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {pyq.subjectId.toUpperCase()} • {pyq.topicTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-300">
                      NEET {pyq.year} Official
                    </span>

                    <button
                      onClick={() => toggleBookmark(pyq.topicId, 'pyq', pyq.question, `pyq-${pyq.id}`)}
                      className={`p-1.5 rounded-lg border text-xs transition-all ${
                        isBookmarked(`pyq-${pyq.id}`)
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      {isBookmarked(`pyq-${pyq.id}`) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                  {pyq.question}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pyq.options.map((opt) => {
                    const isThisSelected = selectedOpt === opt.id;
                    const isThisCorrect = opt.id === pyq.correctAnswerId;

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
                        onClick={() => handleSelectOption(pyq.id, opt.id, pyq.topicId)}
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
                      <span>Official Solution & Derivation:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{pyq.explanation}</p>
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
