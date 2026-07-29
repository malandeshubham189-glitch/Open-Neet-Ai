import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import { SubjectId } from '../types';
import { Search, HelpCircle, BookOpen } from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { openTopicDetail } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'pyq' | 'mcq'>('all');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, string>>({});

  const allTopics = getAllTopics();

  // Consolidate all questions
  const allQuestions: Array<{
    id: string;
    topicId: string;
    topicTitle: string;
    subjectId: SubjectId;
    question: string;
    options: Array<{ id: string; text: string }>;
    correctAnswerId: string;
    explanation: string;
    type: 'PYQ' | 'MCQ';
    badge: string;
  }> = [];

  allTopics.forEach((topic) => {
    topic.pyqs.forEach((pyq) => {
      allQuestions.push({
        id: pyq.id,
        topicId: topic.id,
        topicTitle: topic.title,
        subjectId: topic.subjectId,
        question: pyq.question,
        options: pyq.options,
        correctAnswerId: pyq.correctAnswerId,
        explanation: pyq.explanation,
        type: 'PYQ',
        badge: `NEET ${pyq.year}`
      });
    });

    topic.mcqs.forEach((mcq) => {
      allQuestions.push({
        id: mcq.id,
        topicId: topic.id,
        topicTitle: topic.title,
        subjectId: topic.subjectId,
        question: mcq.question,
        options: mcq.options,
        correctAnswerId: mcq.correctAnswerId,
        explanation: mcq.explanation,
        type: 'MCQ',
        badge: mcq.tag
      });
    });
  });

  const filteredQuestions = allQuestions.filter((q) => {
    const matchesSubject = subjectFilter === 'all' || q.subjectId === subjectFilter;
    const matchesType = typeFilter === 'all' || q.type.toLowerCase() === typeFilter;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesType && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB] border border-blue-200">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>10-YEAR PAST PYQ & MCQ REPOSITORY</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">Master Question Bank</h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Filter authentic NEET previous year questions and NCERT MCQs with step-by-step solutions.
          </p>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full rounded-xl border border-[#E5E7EB] bg-slate-50 py-2.5 pl-10 pr-4 text-xs text-[#111827] placeholder-[#6B7280] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Subject Pills */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-[#E5E7EB] text-xs">
            <button
              onClick={() => setSubjectFilter('all')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                subjectFilter === 'all' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSubjectFilter('physics')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                subjectFilter === 'physics' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => setSubjectFilter('chemistry')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                subjectFilter === 'chemistry' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              Chemistry
            </button>
            <button
              onClick={() => setSubjectFilter('biology')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                subjectFilter === 'biology' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              Biology
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-[#E5E7EB] text-xs">
            <button
              onClick={() => setTypeFilter('all')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                typeFilter === 'all' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('pyq')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                typeFilter === 'pyq' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              PYQs Only
            </button>
            <button
              onClick={() => setTypeFilter('mcq')}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                typeFilter === 'mcq' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              MCQs Only
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        <p className="text-xs text-[#6B7280] font-bold">
          Showing {filteredQuestions.length} Questions
        </p>

        {filteredQuestions.map((q) => {
          const selectedAns = userSelectedAnswers[q.id];
          const isRevealed = revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-[#2563EB] border border-blue-200">
                    {q.badge}
                  </span>
                  <span className="text-xs font-bold text-[#6B7280]">{q.subjectId.toUpperCase()}</span>
                </div>

                <button
                  onClick={() => openTopicDetail(q.topicId)}
                  className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Topic: {q.topicTitle}</span>
                </button>
              </div>

              <p className="text-sm font-semibold text-[#111827] leading-relaxed">{q.question}</p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt) => {
                  const isCorrect = opt.id === q.correctAnswerId;
                  const isSelected = selectedAns === opt.id;

                  let btnClass = 'border-[#E5E7EB] bg-slate-50 text-[#111827] hover:bg-slate-100';
                  if (selectedAns || isRevealed) {
                    if (isCorrect) btnClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                    else if (isSelected) btnClass = 'border-rose-300 bg-rose-50 text-rose-900';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setUserSelectedAnswers((prev) => ({ ...prev, [q.id]: opt.id }))
                      }
                      className={`flex items-center justify-start rounded-xl border p-3.5 text-xs text-left transition-all ${btnClass}`}
                    >
                      <span className="font-bold uppercase mr-2 opacity-75">({opt.id})</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Solution Toggle */}
              <div className="pt-2 flex items-center justify-between border-t border-[#E5E7EB]">
                <button
                  onClick={() =>
                    setRevealedSolutions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                  }
                  className="text-xs font-bold text-[#2563EB] hover:underline"
                >
                  {isRevealed ? 'Hide Solution' : 'Reveal Step-by-Step Solution'}
                </button>
              </div>

              {(isRevealed || selectedAns) && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
                  <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                    Derivation & NCERT Explanation
                  </span>
                  <p className="text-xs text-[#111827] leading-relaxed whitespace-pre-line font-sans">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
