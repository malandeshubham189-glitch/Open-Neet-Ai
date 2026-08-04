import React, { useState } from 'react';
import { ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  Trophy,
  Clock,
  Sparkles,
  ArrowRight,
  Sliders,
  CheckSquare,
  Globe
} from 'lucide-react';

interface FullSyllabusTestEngineProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const FullSyllabusTestEngine: React.FC<FullSyllabusTestEngineProps> = ({
  onStartSession
}) => {
  const [displayMode, setDisplayMode] = useState<'cbt' | 'omr'>('cbt');

  const handleLaunchFullTest = () => {
    const session = PracticeEngineService.createTestSession({
      title: 'NEET 2026 Full Syllabus NTA Grand Test (200 Qs • 720 Marks)',
      testType: 'full_syllabus',
      subjectId: 'all',
      questionCount: 200,
      displayMode
    });

    onStartSession(session);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-rose-900 to-slate-900 border border-red-800/60 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300 border border-red-400/30">
          <Trophy className="h-3.5 w-3.5" />
          <span>MODULE 5 • 720 MARKS EXACT NTA NEET GRAND TEST</span>
        </div>
        <h2 className="text-2xl font-extrabold">Exact NTA NEET 200-Question Grand Test Engine</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Authentic NTA NEET Exam Structure: 200 Questions across Physics, Chemistry, Botany & Zoology.
          Each subject contains <strong>Section A (35 Compulsory Qs)</strong> and <strong>Section B (15 Qs, Choose Any 10)</strong>.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        {/* NTA Pattern Structure Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <span className="text-[10px] uppercase font-bold text-blue-400">Physics (50 Qs)</span>
            <div className="text-white font-bold mt-1">35 Sec A + 15 Sec B</div>
            <div className="text-slate-400 text-[11px]">Choose 10 in Sec B • 180 Marks</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <span className="text-[10px] uppercase font-bold text-amber-400">Chemistry (50 Qs)</span>
            <div className="text-white font-bold mt-1">35 Sec A + 15 Sec B</div>
            <div className="text-slate-400 text-[11px]">Choose 10 in Sec B • 180 Marks</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Botany (50 Qs)</span>
            <div className="text-white font-bold mt-1">35 Sec A + 15 Sec B</div>
            <div className="text-slate-400 text-[11px]">Choose 10 in Sec B • 180 Marks</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <span className="text-[10px] uppercase font-bold text-purple-400">Zoology (50 Qs)</span>
            <div className="text-white font-bold mt-1">35 Sec A + 15 Sec B</div>
            <div className="text-slate-400 text-[11px]">Choose 10 in Sec B • 180 Marks</div>
          </div>
        </div>

        {/* Exam Mode Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Test Interface Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDisplayMode('cbt')}
              className={`p-4 rounded-xl border text-left transition ${
                displayMode === 'cbt'
                  ? 'bg-red-600 border-red-500 text-white font-bold shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-sm font-bold flex items-center gap-2">
                <Globe className="h-4 w-4" />
                CBT Mode (Screen Option Selection)
              </div>
              <div className="text-xs opacity-80 mt-1">Standard NTA digital test interface</div>
            </button>

            <button
              onClick={() => setDisplayMode('omr')}
              className={`p-4 rounded-xl border text-left transition ${
                displayMode === 'omr'
                  ? 'bg-red-600 border-red-500 text-white font-bold shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-sm font-bold flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                OMR Mode (Interactive Bubble Filling)
              </div>
              <div className="text-xs opacity-80 mt-1">Simulates real physical NEET OMR sheet</div>
            </button>
          </div>
        </div>

        {/* Paper Stats */}
        <div className="grid grid-cols-4 gap-3 text-center text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
            <div className="text-lg font-black text-white">720 Marks</div>
            <div className="text-slate-400">Maximum Scored</div>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
            <div className="text-lg font-black text-rose-400">200 Qs</div>
            <div className="text-slate-400">Attempt 180 Qs</div>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
            <div className="text-lg font-black text-amber-400">200 Mins</div>
            <div className="text-slate-400">3 Hours 20 Mins</div>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
            <div className="text-lg font-black text-emerald-400">Instant AIR</div>
            <div className="text-slate-400">NTA Percentile Map</div>
          </div>
        </div>

        <button
          onClick={handleLaunchFullTest}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-red-600/25 transition"
        >
          <Trophy className="h-5 w-5" />
          <span>Launch 200-Question (720 Marks) NTA NEET Grand Test</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
