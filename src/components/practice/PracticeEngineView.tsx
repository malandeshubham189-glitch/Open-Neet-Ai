import React, { useState } from 'react';
import { ActiveTestSession, TestPerformanceReport } from '../../types/practiceEngine';
import { InteractiveQuestionPlayer } from './InteractiveQuestionPlayer';
import { TestPerformanceReportModal } from './TestPerformanceReportModal';
import { TopicDPPEngine } from './TopicDPPEngine';
import { ChapterPYQEngine } from './ChapterPYQEngine';
import { ChapterTestEngine } from './ChapterTestEngine';
import { SubjectTestEngine } from './SubjectTestEngine';
import { FullSyllabusTestEngine } from './FullSyllabusTestEngine';
import { AIMistakeBook } from './AIMistakeBook';
import { SpacedRevisionQueue } from './SpacedRevisionQueue';
import { PracticeAnalyticsDashboard } from './PracticeAnalyticsDashboard';
import { LeaderboardGamification } from './LeaderboardGamification';
import { AIAdaptivePracticeModal } from './AIAdaptivePracticeModal';
import {
  Zap,
  BookOpen,
  Clock,
  Layers,
  Trophy,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  Sparkles,
  Award
} from 'lucide-react';

export const PracticeEngineView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<
    'dpp' | 'pyq' | 'chapter_test' | 'subject_test' | 'full_syllabus' | 'mistake_book' | 'revision' | 'analytics' | 'leaderboard' | 'adaptive'
  >('dpp');

  const [activeSession, setActiveSession] = useState<ActiveTestSession | null>(null);
  const [completedReport, setCompletedReport] = useState<TestPerformanceReport | null>(null);

  const handleStartSession = (session: ActiveTestSession) => {
    setActiveSession(session);
    setCompletedReport(null);
  };

  const handleFinishTest = (report: TestPerformanceReport) => {
    setActiveSession(null);
    setCompletedReport(report);
  };

  // If a test session is live, render the Interactive Player!
  if (activeSession) {
    return (
      <InteractiveQuestionPlayer
        session={activeSession}
        onFinishTest={handleFinishTest}
        onExitTest={() => setActiveSession(null)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      {/* Post-Test Performance Report Modal */}
      {completedReport && (
        <TestPerformanceReportModal
          report={completedReport}
          onClose={() => setCompletedReport(null)}
          onPracticeWeakConcepts={(concepts) => {
            setCompletedReport(null);
            setActiveModule('adaptive');
          }}
        />
      )}

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>NEETDROP AI PRACTICE & TEST ECOSYSTEM V8</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practice Engine & Test Center
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Topic DPPs, 20+ Years PYQs, Chapter Tests, Full 720-Mark Simulations, AI Mistake Book, and Spaced Revision.
          </p>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        {[
          { id: 'dpp', label: 'Topic DPP', icon: Zap },
          { id: 'pyq', label: '20+ Yrs PYQs', icon: BookOpen },
          { id: 'chapter_test', label: 'Chapter Test', icon: Clock },
          { id: 'subject_test', label: 'Subject Test', icon: Layers },
          { id: 'full_syllabus', label: '720 Full Test', icon: Trophy },
          { id: 'mistake_book', label: 'Mistake Book', icon: AlertTriangle },
          { id: 'revision', label: 'Revision Queue', icon: RotateCcw },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'leaderboard', label: 'Leaderboard', icon: Award },
          { id: 'adaptive', label: 'AI Adaptive', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap border ${
                isActive
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Practice Engine Module */}
      <div className="pt-2">
        {activeModule === 'dpp' && <TopicDPPEngine onStartSession={handleStartSession} />}
        {activeModule === 'pyq' && <ChapterPYQEngine onStartSession={handleStartSession} />}
        {activeModule === 'chapter_test' && <ChapterTestEngine onStartSession={handleStartSession} />}
        {activeModule === 'subject_test' && <SubjectTestEngine onStartSession={handleStartSession} />}
        {activeModule === 'full_syllabus' && <FullSyllabusTestEngine onStartSession={handleStartSession} />}
        {activeModule === 'mistake_book' && <AIMistakeBook onStartSession={handleStartSession} />}
        {activeModule === 'revision' && <SpacedRevisionQueue onStartSession={handleStartSession} />}
        {activeModule === 'analytics' && <PracticeAnalyticsDashboard />}
        {activeModule === 'leaderboard' && <LeaderboardGamification />}
        {activeModule === 'adaptive' && <AIAdaptivePracticeModal onStartSession={handleStartSession} />}
      </div>
    </div>
  );
};
