import React, { useState, useEffect } from 'react';
import { SpacedRevisionItem, ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface SpacedRevisionQueueProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const SpacedRevisionQueue: React.FC<SpacedRevisionQueueProps> = ({ onStartSession }) => {
  const [queue, setQueue] = useState<SpacedRevisionItem[]>([]);

  useEffect(() => {
    setQueue(PracticeEngineService.getRevisionQueue());
  }, []);

  const handleStartDueRevisions = () => {
    if (queue.length === 0) return;
    const questions = queue.map((q) => q.question);

    const session = PracticeEngineService.createTestSession({
      title: `Spaced Revision Practice (${questions.length} Due Questions)`,
      testType: 'ai_adaptive',
      displayMode: 'instant_explanation',
      customQuestions: questions
    });

    onStartSession(session);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-blue-800/60 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>MODULE 7 • SPACED REPETITION REVISION QUEUE</span>
        </div>
        <h2 className="text-2xl font-extrabold">Scientific Memory Revision Queue</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          SuperMemo-2 based spaced repetition algorithm schedules questions into 1-Day, 3-Day, 7-Day,
          15-Day, and 30-Day intervals for 100% long-term retention.
        </p>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white">Questions Due for Revision Today</h3>
          <p className="text-xs text-slate-400">
            {queue.length} question(s) queued for active recall testing
          </p>
        </div>
        <button
          onClick={handleStartDueRevisions}
          disabled={queue.length === 0}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition"
        >
          <RotateCcw className="h-4 w-4" />
          Start Due Revisions Now
        </button>
      </div>

      {/* Queue Items List */}
      <div className="space-y-3">
        {queue.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">All Revisions Up to Date!</h3>
            <p className="text-xs">No questions currently due in your spaced repetition queue.</p>
          </div>
        ) : (
          queue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">
                  {item.question.chapterName}
                </span>
                <p className="text-sm font-semibold text-white line-clamp-1">
                  {item.question.question}
                </p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800 shrink-0">
                Next: {item.nextReviewDate}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
