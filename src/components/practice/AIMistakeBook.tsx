import React, { useState, useEffect } from 'react';
import { MistakeBookItem, ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface AIMistakeBookProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const AIMistakeBook: React.FC<AIMistakeBookProps> = ({ onStartSession }) => {
  const [mistakes, setMistakes] = useState<MistakeBookItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setMistakes(PracticeEngineService.getMistakeBook());
  }, []);

  const handlePracticeMistakes = () => {
    const listToPractice =
      selectedCategory === 'all'
        ? mistakes
        : mistakes.filter((m) => m.category === selectedCategory);

    if (listToPractice.length === 0) return;

    const questions = listToPractice.map((m) => m.question);

    const session = PracticeEngineService.createTestSession({
      title: `AI Mistake Practice (${questions.length} Weak Questions)`,
      testType: 'ai_mistake_practice',
      displayMode: 'instant_explanation',
      customQuestions: questions
    });

    onStartSession(session);
  };

  const handleRemoveItem = (qId: string) => {
    PracticeEngineService.removeMistake(qId);
    setMistakes((prev) => prev.filter((m) => m.question.id !== qId));
  };

  const filteredList =
    selectedCategory === 'all'
      ? mistakes
      : mistakes.filter((m) => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-rose-950 to-slate-900 border border-red-800/60 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300 border border-red-400/30">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>MODULE 6 • AI MISTAKE BOOK</span>
        </div>
        <h2 className="text-2xl font-extrabold">Smart AI Mistake Book</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Automatically logs every wrong, skipped, or time-consuming question into categorized error
          buckets. Practice your weak spots until 100% mastery is achieved.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap gap-2 text-xs">
          {['all', 'ncert_fact', 'formula_mistake', 'conceptual', 'organic_reaction', 'skipped'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border font-semibold capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            )
          )}
        </div>

        <button
          onClick={handlePracticeMistakes}
          disabled={filteredList.length === 0}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 transition"
        >
          <RotateCcw className="h-4 w-4" />
          Practice Wrong Questions Again ({filteredList.length})
        </button>
      </div>

      {/* Mistakes List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No Mistakes Found!</h3>
            <p className="text-xs">
              All solved questions were answered correctly or no test mistakes logged yet.
            </p>
          </div>
        ) : (
          filteredList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-red-950 text-red-300 font-bold border border-red-800/50 uppercase">
                  {item.category.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Wrong {item.timesWrongCount} time(s)</span>
                  <button
                    onClick={() => handleRemoveItem(item.question.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition"
                    title="Remove from Mistake Book"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="text-sm font-semibold text-slate-100">{item.question.question}</div>

              <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 leading-relaxed border border-slate-800">
                <strong className="text-emerald-400 block mb-1">NCERT Explanation:</strong>
                {item.question.explanation}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
