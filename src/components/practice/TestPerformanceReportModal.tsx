import React, { useState } from 'react';
import { TestPerformanceReport } from '../../types/practiceEngine';
import {
  Trophy,
  Award,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface ReportModalProps {
  report: TestPerformanceReport;
  onClose: () => void;
  onPracticeWeakConcepts?: (concepts: string[]) => void;
}

export const TestPerformanceReportModal: React.FC<ReportModalProps> = ({
  report,
  onClose,
  onPracticeWeakConcepts
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'topics'>('overview');

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}m ${remaining}s`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>OFFICIAL SCORECARD & PERFORMANCE REPORT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{report.testTitle}</h2>
            <p className="text-xs text-slate-400">
              Completed on {new Date(report.completedAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition"
          >
            Back to Practice Hub
          </button>
        </div>

        {/* Highlight Score & Rank Prediction Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-800/50 p-5 text-center space-y-1">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Score Obtained</span>
            <div className="text-3xl font-black text-white">
              {report.marksObtained} <span className="text-sm font-normal text-slate-400">/ {report.maxMarks}</span>
            </div>
            <span className="text-xs text-blue-300 font-bold">{report.percentageScore}% Score</span>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/50 p-5 text-center space-y-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Accuracy</span>
            <div className="text-3xl font-black text-emerald-300">{report.accuracyPercent}%</div>
            <span className="text-xs text-slate-400">
              {report.correctCount} Correct / {report.wrongCount} Wrong
            </span>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-800/50 p-5 text-center space-y-1">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Estimated AIR</span>
            <div className="text-2xl font-black text-amber-300">
              {report.predictedAIR?.rankRange || 'AIR 1,500'}
            </div>
            <span className="text-xs text-amber-200">{report.predictedAIR?.percentile || 99.2}%ile</span>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-800/50 p-5 text-center space-y-1">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Time & Speed</span>
            <div className="text-2xl font-black text-purple-200">
              {formatSeconds(report.totalTimeSpentSeconds)}
            </div>
            <span className="text-xs text-slate-400">
              ~{report.avgTimePerQuestionSeconds}s / question
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 space-x-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview & Breakdown
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'subjects'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Subject Performance
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'topics'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Topic Mastery ({report.topicAccuracies.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Weak Concepts Card */}
            {report.weakestConcepts.length > 0 && (
              <div className="rounded-2xl bg-red-950/40 border border-red-800/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <AlertTriangle className="h-5 w-5" />
                    <span>AI Identified Weak Topics (&lt;60% Accuracy)</span>
                  </div>
                  {onPracticeWeakConcepts && (
                    <button
                      onClick={() => onPracticeWeakConcepts(report.weakestConcepts)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Practice Weak Topics Now
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.weakestConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-red-900/60 text-red-200 text-xs font-semibold border border-red-700/50"
                    >
                      ⚠️ {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Distribution */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/80">
                <div className="text-2xl font-extrabold text-emerald-400">{report.correctCount}</div>
                <div className="text-xs text-slate-400 mt-1">Correct Answers (+4)</div>
              </div>
              <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/80">
                <div className="text-2xl font-extrabold text-red-400">{report.wrongCount}</div>
                <div className="text-xs text-slate-400 mt-1">Incorrect Answers (-1)</div>
              </div>
              <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/80">
                <div className="text-2xl font-extrabold text-slate-400">{report.skippedCount}</div>
                <div className="text-xs text-slate-400 mt-1">Unattempted (0)</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(report.subjectBreakdown).map(([sub, stats]) => {
              if (!stats || stats.attempted === 0) return null;
              return (
                <div
                  key={sub}
                  className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase text-blue-400">{sub}</span>
                    <span className="text-lg font-black text-white">{stats.marks} Marks</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-emerald-400 font-bold">{stats.correct}</span> Correct
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-red-400 font-bold">{stats.wrong}</span> Wrong
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-slate-300 font-bold">{stats.attempted}</span> Total
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {report.topicAccuracies.map((topic, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-sm"
              >
                <div>
                  <div className="font-bold text-white">{topic.topicTitle}</div>
                  <div className="text-xs text-slate-400">
                    {topic.correctCount} / {topic.totalQuestions} questions correct
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        topic.accuracyPercent >= 70 ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${topic.accuracyPercent}%` }}
                    />
                  </div>
                  <span
                    className={`font-mono font-bold text-sm ${
                      topic.accuracyPercent >= 70 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {topic.accuracyPercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
