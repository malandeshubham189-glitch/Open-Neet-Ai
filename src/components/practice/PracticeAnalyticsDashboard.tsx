import React, { useState, useEffect } from 'react';
import { StudentAnalyticsState } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
  Calendar
} from 'lucide-react';

export const PracticeAnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<StudentAnalyticsState>(
    PracticeEngineService.getAnalyticsState()
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border border-emerald-800/60 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>MODULE 8 • PERFORMANCE ANALYTICS & PREDICTIVE AIR</span>
        </div>
        <h2 className="text-2xl font-extrabold">Student Practice Analytics</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Real-time tracking of accuracy %, subject speed, consistency heatmap, and projected NEET score.
        </p>
      </div>

      {/* Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1 text-center">
          <span className="text-xs font-bold uppercase text-slate-400">Total Solved</span>
          <div className="text-3xl font-black text-white">{analytics.totalQuestionsAttempted}</div>
          <span className="text-xs text-emerald-400 font-bold">{analytics.totalCorrect} Correct</span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1 text-center">
          <span className="text-xs font-bold uppercase text-slate-400">Overall Accuracy</span>
          <div className="text-3xl font-black text-emerald-400">{analytics.overallAccuracyPercent}%</div>
          <span className="text-xs text-slate-400">Target &gt; 85%</span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1 text-center">
          <span className="text-xs font-bold uppercase text-slate-400">Projected Score</span>
          <div className="text-3xl font-black text-amber-400">{analytics.projectedNeetScore} <span className="text-xs text-slate-400">/ 720</span></div>
          <span className="text-xs text-amber-300 font-bold">{analytics.projectedAIR}</span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1 text-center">
          <span className="text-xs font-bold uppercase text-slate-400">Avg Speed</span>
          <div className="text-3xl font-black text-cyan-400">{analytics.avgTimePerQuestionSeconds}s</div>
          <span className="text-xs text-slate-400">Per MCQ</span>
        </div>
      </div>

      {/* Subject Accuracy Bars */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Subject-wise Accuracy Breakdown</h3>
        <div className="space-y-4">
          {[
            { name: 'Physics', acc: analytics.subjectAccuracies.physics, color: 'bg-blue-500' },
            { name: 'Chemistry', acc: analytics.subjectAccuracies.chemistry, color: 'bg-amber-500' },
            { name: 'Botany', acc: analytics.subjectAccuracies.botany, color: 'bg-emerald-500' },
            { name: 'Zoology', acc: analytics.subjectAccuracies.zoology, color: 'bg-teal-500' }
          ].map((sub) => (
            <div key={sub.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>{sub.name}</span>
                <span>{sub.acc}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full ${sub.color} transition-all duration-500`}
                  style={{ width: `${sub.acc}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Matrix / Consistency Heatmap */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <Calendar className="h-5 w-5 text-emerald-400" />
          <span>30-Day Practice Consistency Matrix</span>
        </div>
        <div className="grid grid-cols-10 sm:grid-cols-15 gap-2 pt-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`h-8 rounded-md border flex items-center justify-center text-[10px] font-bold ${
                i % 3 === 0
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : i % 2 === 0
                  ? 'bg-emerald-900/60 border-emerald-800 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={`Day ${i + 1}`}
            >
              D{i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
