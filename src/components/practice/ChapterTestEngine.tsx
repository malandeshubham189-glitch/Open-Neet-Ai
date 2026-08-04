import React, { useState } from 'react';
import { SubjectId } from '../../types';
import { ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ChapterTestEngineProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const ChapterTestEngine: React.FC<ChapterTestEngineProps> = ({ onStartSession }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('physics');

  const handleLaunchChapterTest = () => {
    const session = PracticeEngineService.createTestSession({
      title: `NEET Chapter Mock Test: ${selectedSubject.toUpperCase()} (50 Qs / 45 Mins)`,
      testType: 'chapter_test',
      subjectId: selectedSubject,
      questionCount: 50,
      displayMode: 'cbt'
    });

    onStartSession(session);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-800/50 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-400/30">
          <Clock className="h-3.5 w-3.5" />
          <span>MODULE 3 • CHAPTER TEST SIMULATOR</span>
        </div>
        <h2 className="text-2xl font-extrabold">45-Minute Chapter Mock Test</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Simulate timed 50-question chapter tests with real NEET marking scheme (+4 for correct, -1 for wrong, 0 for unattempted) and instant AIR rank prediction.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Subject for Chapter Test
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'physics', label: 'Physics Test', color: 'from-blue-600 to-cyan-600' },
              { id: 'chemistry', label: 'Chemistry Test', color: 'from-amber-600 to-orange-600' },
              { id: 'biology', label: 'Biology Test', color: 'from-emerald-600 to-teal-600' }
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

        {/* Test Info Cards */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-purple-400 font-bold block text-lg">50 Qs</span>
            <span className="text-slate-400">Mixed Difficulty</span>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-amber-400 font-bold block text-lg">45 Mins</span>
            <span className="text-slate-400">Strict Countdown</span>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-emerald-400 font-bold block text-lg">200 Marks</span>
            <span className="text-slate-400">+4 / -1 Marking</span>
          </div>
        </div>

        <button
          onClick={handleLaunchChapterTest}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-purple-600/25 transition"
        >
          <FileCheck className="h-5 w-5" />
          <span>Launch 45-Min Chapter Test</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
