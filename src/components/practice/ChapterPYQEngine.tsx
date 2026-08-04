import React, { useState } from 'react';
import { SubjectId } from '../../types';
import { ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface ChapterPYQEngineProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const ChapterPYQEngine: React.FC<ChapterPYQEngineProps> = ({ onStartSession }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('biology');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [onlyRepeated, setOnlyRepeated] = useState<boolean>(false);

  const yearsList = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  const handleLaunchPYQTest = () => {
    const session = PracticeEngineService.createTestSession({
      title: `NEET PYQs: ${selectedSubject.toUpperCase()} ${
        selectedYear !== 'all' ? `(${selectedYear})` : '(20+ Years)'
      }`,
      testType: 'chapter_pyq',
      subjectId: selectedSubject,
      displayMode: 'instant_explanation',
      customQuestions: PracticeEngineService.getQuestions({
        subjectId: selectedSubject,
        onlyPyqs: true,
        year: selectedYear !== 'all' ? selectedYear : undefined,
        limit: 30
      })
    });

    onStartSession(session);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-slate-900 border border-emerald-800/50 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
          <Calendar className="h-3.5 w-3.5" />
          <span>MODULE 2 • 20+ YEARS AUTHENTIC NEET PYQ ENGINE</span>
        </div>
        <h2 className="text-2xl font-extrabold">Chapter-wise NEET PYQs</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Solve verified previous year questions from NEET 2025 to 2005 with step-by-step NCERT page
          citations and repeat-frequency tags.
        </p>
      </div>

      {/* Control Panel */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Subject
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'physics', label: 'Physics PYQs', color: 'from-blue-600 to-cyan-600' },
              { id: 'chemistry', label: 'Chemistry PYQs', color: 'from-amber-600 to-orange-600' },
              { id: 'biology', label: 'Biology PYQs', color: 'from-emerald-600 to-teal-600' }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id as SubjectId)}
                className={`py-3.5 rounded-xl border text-sm font-bold transition-all ${
                  selectedSubject === sub.id
                    ? `bg-gradient-to-r ${sub.color} text-white border-white/20 shadow-lg`
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* Year Filter Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Filter by Exam Year
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition ${
                selectedYear === 'all'
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              All Years (2005 - 2025)
            </button>
            {yearsList.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition ${
                  selectedYear === yr
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                NEET {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={handleLaunchPYQTest}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 transition"
        >
          <BookOpen className="h-5 w-5" />
          <span>Start Practice Session ({selectedYear === 'all' ? '20+ Years' : `NEET ${selectedYear}`})</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
