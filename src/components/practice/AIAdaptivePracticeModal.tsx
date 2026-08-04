import React from 'react';
import { ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import { Sparkles, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AIAdaptiveProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const AIAdaptivePracticeModal: React.FC<AIAdaptiveProps> = ({ onStartSession }) => {
  const analytics = PracticeEngineService.getAnalyticsState();
  const weakChapters = analytics.weakChapters || ['Thermodynamics', 'Rotational Motion'];

  const handleLaunchAdaptiveDrill = (chapter: string) => {
    const session = PracticeEngineService.createTestSession({
      title: `AI Adaptive Mastery Drill: ${chapter} (20 Qs)`,
      testType: 'ai_adaptive',
      chapterName: chapter,
      questionCount: 20,
      displayMode: 'instant_explanation'
    });

    onStartSession(session);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-pink-950 to-slate-900 border border-purple-800/60 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-400/30">
          <Sparkles className="h-3.5 w-3.5" />
          <span>MODULE 11 • AI ADAPTIVE PRACTICE ENGINE</span>
        </div>
        <h2 className="text-2xl font-extrabold">Targeted Weak-Topic Mastery</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          The AI engine analyzes your historical accuracy and dynamically constructs 20-question custom
          drills until your topic accuracy reaches 85%+.
        </p>
      </div>

      <div className="space-y-3">
        {weakChapters.map((chap) => (
          <div
            key={chap}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-red-400 uppercase">
                Weak Chapter Detected (&lt;60% Accuracy)
              </span>
              <h3 className="text-lg font-bold text-white">{chap}</h3>
            </div>
            <button
              onClick={() => handleLaunchAdaptiveDrill(chap)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/20 transition shrink-0"
            >
              <Sparkles className="h-4 w-4" />
              Launch Mastery Drill (20 Qs)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
