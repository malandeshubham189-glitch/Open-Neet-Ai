import React, { useState, useEffect } from 'react';
import {
  ActiveTestSession,
  QuestionItem,
  TestPerformanceReport
} from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  Flag,
  Calculator,
  Edit3,
  Layers,
  ChevronLeft,
  ChevronRight,
  Send,
  Eye,
  EyeOff,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  X,
  FileText
} from 'lucide-react';

interface QuestionPlayerProps {
  session: ActiveTestSession;
  onFinishTest: (report: TestPerformanceReport) => void;
  onExitTest: () => void;
}

export const InteractiveQuestionPlayer: React.FC<QuestionPlayerProps> = ({
  session: initialSession,
  onFinishTest,
  onExitTest
}) => {
  const [session, setSession] = useState<ActiveTestSession>(initialSession);
  const [showPalette, setShowPalette] = useState(false);
  const [showRoughSheet, setShowRoughSheet] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showInstantExplanation, setShowInstantExplanation] = useState(
    initialSession.displayMode === 'instant_explanation'
  );
  const [roughNotes, setRoughNotes] = useState('');
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});
  const [paletteSubjectFilter, setPaletteSubjectFilter] = useState<'all' | 'physics' | 'chemistry' | 'botany' | 'zoology'>('all');

  const currentQ: QuestionItem | undefined = session.questions[session.activeQuestionIndex];

  // Timer Countdown Effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!session.isFinished && !session.isPaused) {
      timer = setInterval(() => {
        setSession((prev) => {
          if (prev.timeLeftSeconds <= 1) {
            handleAutoSubmit(prev);
            return { ...prev, timeLeftSeconds: 0, isFinished: true };
          }
          return { ...prev, timeLeftSeconds: prev.timeLeftSeconds - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [session.isFinished, session.isPaused]);

  const handleAutoSubmit = (activeSession: ActiveTestSession) => {
    const report = PracticeEngineService.finishAndEvaluateSession(activeSession);
    onFinishTest(report);
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQ) return;
    setSession((prev) => {
      const updatedAnswers = { ...prev.userAnswers, [currentQ.id]: optionId };
      return { ...prev, userAnswers: updatedAnswers };
    });
  };

  const toggleOptionElimination = (optionId: string) => {
    if (!currentQ) return;
    setSession((prev) => {
      const qEliminated = prev.eliminatedOptions[currentQ.id] || [];
      const isAlreadyEliminated = qEliminated.includes(optionId);
      const updatedList = isAlreadyEliminated
        ? qEliminated.filter((id) => id !== optionId)
        : [...qEliminated, optionId];
      return {
        ...prev,
        eliminatedOptions: { ...prev.eliminatedOptions, [currentQ.id]: updatedList }
      };
    });
  };

  const toggleMarkForReview = () => {
    if (!currentQ) return;
    setSession((prev) => {
      const isMarked = !!prev.markedForReview[currentQ.id];
      return {
        ...prev,
        markedForReview: { ...prev.markedForReview, [currentQ.id]: !isMarked }
      };
    });
  };

  const toggleBookmark = (qId: string) => {
    setBookmarkedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleNext = () => {
    if (session.activeQuestionIndex < session.questions.length - 1) {
      setSession((prev) => ({ ...prev, activeQuestionIndex: prev.activeQuestionIndex + 1 }));
    }
  };

  const handlePrev = () => {
    if (session.activeQuestionIndex > 0) {
      setSession((prev) => ({ ...prev, activeQuestionIndex: prev.activeQuestionIndex - 1 }));
    }
  };

  const handleSubmitTest = () => {
    if (window.confirm('Are you sure you want to submit your test now?')) {
      handleAutoSubmit(session);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculator helper
  const handleCalcEval = () => {
    try {
      // Safe math eval
      const sanitized = calcInput.replace(/[^0-9+\-*/().]/g, '');
      // eslint-disable-next-line no-eval
      const res = eval(sanitized);
      setCalcResult(String(res));
    } catch {
      setCalcResult('Error');
    }
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-600 font-sans">
        No questions available for this test session.
      </div>
    );
  }

  const answeredCount = Object.keys(session.userAnswers).length;
  const markedCount = Object.keys(session.markedForReview).filter((k) => session.markedForReview[k]).length;
  const selectedAns = session.userAnswers[currentQ.id];
  const eliminatedList = session.eliminatedOptions[currentQ.id] || [];
  const isCorrect = selectedAns === currentQ.correctAnswerId;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header & Real Timer */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitTest}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Exit Test"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {session.testType.replace('_', ' ')}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {session.title}
            </h1>
          </div>
        </div>

        {/* Center Live Timer */}
        <div className="flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-1.5 border border-slate-700/80">
          <Clock className={`h-4 w-4 ${session.timeLeftSeconds < 300 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`} />
          <span className={`text-sm font-mono font-bold ${session.timeLeftSeconds < 300 ? 'text-red-400' : 'text-slate-200'}`}>
            {formatTime(session.timeLeftSeconds)}
          </span>
        </div>

        {/* Right Tools & Palette Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRoughSheet(!showRoughSheet)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 border border-slate-700 transition"
            title="Digital Rough Sheet"
          >
            <Edit3 className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline">Rough Sheet</span>
          </button>

          {currentQ.subjectId === 'physics' && (
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 border border-slate-700 transition"
              title="Physics Scratchpad Calculator"
            >
              <Calculator className="h-4 w-4 text-cyan-400" />
              <span className="hidden sm:inline">Calc</span>
            </button>
          )}

          <button
            onClick={() => setShowPalette(true)}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-blue-500/20"
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Palette</span>
            <span className="rounded-full bg-blue-950 px-2 py-0.5 text-[10px] font-mono">
              {answeredCount}/{session.isNtaFullSyllabus200Q || session.questions.length === 200 ? 180 : session.questions.length}
            </span>
          </button>

          <button
            onClick={handleSubmitTest}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/20"
          >
            Submit
          </button>
        </div>
      </header>

      {/* Main Question Arena */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Question Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
            <span>
              Question <strong className="text-white">{session.activeQuestionIndex + 1}</strong> of{' '}
              <strong className="text-white">{session.questions.length}</strong>
            </span>
            <span>•</span>
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-blue-300 font-bold uppercase">
              {currentQ.subjectCategory || currentQ.subjectId}
            </span>
            {currentQ.section && (
              <>
                <span>•</span>
                <span
                  className={`rounded-md px-2.5 py-0.5 font-bold ${
                    currentQ.section === 'A'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  Section {currentQ.section} {currentQ.section === 'A' ? '(Compulsory Qs 1–35)' : '(Choose 10 of Qs 36–50)'}
                </span>
              </>
            )}
            <span>•</span>
            <span
              className={`rounded-md px-2 py-0.5 font-bold ${
                currentQ.difficulty === 'Easy'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : currentQ.difficulty === 'Hard'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(currentQ.id)}
              className={`p-1.5 rounded-lg transition border ${
                bookmarkedQuestions[currentQ.id]
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Bookmark Question"
            >
              {bookmarkedQuestions[currentQ.id] ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={toggleMarkForReview}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
                session.markedForReview[currentQ.id]
                  ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {session.markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
            </button>

            <button
              onClick={() => setShowInstantExplanation(!showInstantExplanation)}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
              title="Toggle Explanation Mode"
            >
              {showInstantExplanation ? (
                <EyeOff className="h-4 w-4 text-emerald-400" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Section B Limit Warning Banner if candidate selected > 10 in Section B */}
        {(() => {
          if (currentQ.section === 'B') {
            const subCat = currentQ.subjectCategory || (currentQ.subjectId === 'biology' ? 'botany' : currentQ.subjectId);
            const secBAnswered = session.questions.filter(
              (q) => q.section === 'B' && (q.subjectCategory === subCat || q.subjectId === subCat) && session.userAnswers[q.id]
            ).length;

            if (secBAnswered > 10) {
              return (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Section B Notice:</strong> You have selected {secBAnswered}/10 questions in {String(subCat).toUpperCase()} Section B. Only your first 10 attempted questions in sequence will be evaluated by NTA.
                  </span>
                </div>
              );
            }
          }
          return null;
        })()}

        {/* Question Text Box */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-4">
          <div className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed whitespace-pre-line">
            {currentQ.question}
          </div>

          {/* Special Assertion / Reason / Statement fields if present */}
          {currentQ.assertionText && (
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-sm">
              <p>
                <strong className="text-amber-300">Assertion (A):</strong> {currentQ.assertionText}
              </p>
              <p>
                <strong className="text-cyan-300">Reason (R):</strong> {currentQ.reasonText}
              </p>
            </div>
          )}

          {currentQ.statement1Text && (
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-sm">
              <p>
                <strong className="text-amber-300">Statement I:</strong> {currentQ.statement1Text}
              </p>
              <p>
                <strong className="text-cyan-300">Statement II:</strong> {currentQ.statement2Text}
              </p>
            </div>
          )}

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAns === opt.id;
              const isEliminated = eliminatedList.includes(opt.id);

              let optionStyle =
                'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600';

              if (isSelected) {
                optionStyle = 'bg-blue-600/20 border-blue-500 text-white font-semibold ring-1 ring-blue-500';
              }

              if (showInstantExplanation && selectedAns) {
                if (opt.id === currentQ.correctAnswerId) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-500/20 border-red-500 text-red-200';
                }
              }

              return (
                <div
                  key={opt.id}
                  className="flex items-center justify-between gap-3 group"
                >
                  <button
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isEliminated}
                    className={`flex-1 text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${optionStyle} ${
                      isEliminated ? 'opacity-30 line-through' : ''
                    }`}
                  >
                    <span
                      className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold uppercase shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'border-slate-600 text-slate-400 group-hover:border-slate-400'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm sm:text-base leading-snug">{opt.text}</span>
                  </button>

                  {/* Option Eliminator Strike Button */}
                  <button
                    onClick={() => toggleOptionElimination(opt.id)}
                    className={`p-2 rounded-lg transition border text-xs font-semibold ${
                      isEliminated
                        ? 'bg-slate-800 border-slate-700 text-red-400'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                    title={isEliminated ? 'Restore Option' : 'Eliminate Option'}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Instant NCERT Explanation Box */}
          {showInstantExplanation && selectedAns && (
            <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>NCERT Explanation</span>
                </span>
                {currentQ.ncertReference && (
                  <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-800/50">
                    {currentQ.ncertReference}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            onClick={handlePrev}
            disabled={session.activeQuestionIndex === 0}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={session.activeQuestionIndex === session.questions.length - 1}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>

      {/* Question Palette Drawer / Modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Question Palette</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">Questions Attempted:</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold font-mono text-xs">
                      {answeredCount} / {session.isNtaFullSyllabus200Q || session.questions.length === 200 ? 180 : session.questions.length}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPalette(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Subject Tabs Filter for 200 Question Palette */}
              {session.questions.length >= 180 && (
                <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs">
                  {[
                    { id: 'all', label: `All (${session.questions.length})` },
                    { id: 'physics', label: 'Physics' },
                    { id: 'chemistry', label: 'Chemistry' },
                    { id: 'botany', label: 'Botany' },
                    { id: 'zoology', label: 'Zoology' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setPaletteSubjectFilter(sub.id as any)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                        paletteSubjectFilter === sub.id
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-slate-700" />
                  <span>Unanswered ({session.questions.length - answeredCount})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-purple-500" />
                  <span>Marked for Review ({markedCount})</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2.5 pt-2">
                {session.questions.map((q, idx) => {
                  const subCat = q.subjectCategory || (q.subjectId === 'biology' ? 'botany' : q.subjectId);
                  if (paletteSubjectFilter !== 'all' && subCat !== paletteSubjectFilter) {
                    return null;
                  }

                  const isAns = !!session.userAnswers[q.id];
                  const isRev = !!session.markedForReview[q.id];
                  const isCurrent = idx === session.activeQuestionIndex;

                  let bgStyle = 'bg-slate-800 border-slate-700 text-slate-300';
                  if (isAns && isRev) {
                    bgStyle = 'bg-amber-500 border-amber-400 text-slate-950 font-bold';
                  } else if (isAns) {
                    bgStyle = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                  } else if (isRev) {
                    bgStyle = 'bg-purple-600 border-purple-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setSession((prev) => ({ ...prev, activeQuestionIndex: idx }));
                        setShowPalette(false);
                      }}
                      className={`h-11 rounded-xl border flex flex-col items-center justify-center text-xs transition-all ${bgStyle} ${
                        isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                      }`}
                    >
                      <span>Q{idx + 1}</span>
                      {q.section && (
                        <span className="text-[9px] opacity-80 uppercase">
                          Sec {q.section}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSubmitTest}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 transition"
            >
              Submit Test Paper
            </button>
          </div>
        </div>
      )}

      {/* Digital Rough Sheet Modal */}
      {showRoughSheet && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Digital Rough Scratchpad</h3>
              </div>
              <button
                onClick={() => setShowRoughSheet(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={roughNotes}
              onChange={(e) => setRoughNotes(e.target.value)}
              placeholder="Write your rough steps, physics derivations, or chemistry equations here..."
              className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 font-mono resize-none"
            />
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Auto-saved locally for this session</span>
              <button
                onClick={() => setRoughNotes('')}
                className="text-red-400 hover:underline"
              >
                Clear Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Physics Scratchpad Calculator Modal */}
      {showCalculator && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl w-80 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Calculator className="h-4 w-4" />
              <span className="text-xs font-bold uppercase">Physics Calculator</span>
            </div>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-right space-y-1">
            <input
              type="text"
              value={calcInput}
              onChange={(e) => setCalcInput(e.target.value)}
              placeholder="e.g. (3/2)*9.8*10"
              className="w-full bg-transparent text-right text-sm text-slate-300 font-mono focus:outline-none"
            />
            <div className="text-lg font-mono font-bold text-cyan-400">
              {calcResult || '= 0'}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(
              (btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') handleCalcEval();
                    else setCalcInput((prev) => prev + btn);
                  }}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                >
                  {btn}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => {
              setCalcInput('');
              setCalcResult('');
            }}
            className="w-full py-1 text-xs text-red-400 hover:underline text-center"
          >
            Clear Calc
          </button>
        </div>
      )}
    </div>
  );
};
