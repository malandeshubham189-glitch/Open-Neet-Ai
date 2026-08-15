import React, { useState, useEffect } from 'react';
import {
  NursingYear,
  NursingSubjectId,
  NursingTopic
} from '../../types/nursing';
import {
  NursingMockTestEngine,
  MockTestConfig,
  MockTestQuestion,
  MockTestResult
} from '../../services/nursing/nursingMockTestEngine';
import { NURSING_CURRICULUM_DATA } from '../../data/nursingCurriculumData';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flag,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  X
} from 'lucide-react';

interface NursingMockTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: NursingYear;
  initialSubjectId?: NursingSubjectId | 'all';
  initialSmartMode?: 'all_syllabus' | 'studied_and_weak_only' | 'high_yield_pyq_only';
  onSelectTopic?: (topicId: string) => void;
}

export const NursingMockTestModal: React.FC<NursingMockTestModalProps> = ({
  isOpen,
  onClose,
  year,
  initialSubjectId = 'all',
  initialSmartMode = 'all_syllabus',
  onSelectTopic
}) => {
  const [step, setStep] = useState<'config' | 'taking' | 'result'>('config');

  // Config State
  const [selectedSubject, setSelectedSubject] = useState<NursingSubjectId | 'all'>(initialSubjectId);
  const [smartMode, setSmartMode] = useState<'all_syllabus' | 'studied_and_weak_only' | 'high_yield_pyq_only'>(initialSmartMode);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [difficulty, setDifficulty] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');

  // Active Test State
  const [questions, setQuestions] = useState<MockTestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [testResult, setTestResult] = useState<MockTestResult | null>(null);

  const yearSubjects = NURSING_CURRICULUM_DATA[year].subjects;

  useEffect(() => {
    if (step === 'taking' && secondsRemaining > 0) {
      const timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, secondsRemaining]);

  if (!isOpen) return null;

  const handleStartTest = () => {
    const generated = NursingMockTestEngine.generateMockTest({
      title: `${selectedSubject === 'all' ? 'Grand Multi-Subject' : 'Target Subject'} Mock Test`,
      year,
      subjectId: selectedSubject,
      smartSelectionMode: smartMode,
      totalQuestions: questionCount,
      durationMinutes,
      difficulty
    });

    if (generated.length === 0) {
      alert('No questions found for the selected criteria. Generating from all year topics.');
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(durationMinutes * 60);
    setStep('taking');
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitTest = () => {
    const totalTimeSpentSeconds = durationMinutes * 60 - secondsRemaining;
    const result = NursingMockTestEngine.evaluateMockTest(
      `${selectedSubject === 'all' ? 'Comprehensive' : 'Clinical Subject'} B.Sc Nursing Test`,
      year,
      questions,
      userAnswers,
      totalTimeSpentSeconds
    );
    setTestResult(result);
    setStep('result');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
        {/* ================= STEP 1: CONFIGURATION ================= */}
        {step === 'config' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    B.Sc Nursing Mock Test Center
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    MUHS University Format & NORCET Clinical Vignette Practice
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value as any)}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="all">🌟 All Subjects (Grand University Mock)</option>
                  {yearSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Smart Question Selection Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Smart Test Strategy</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all_syllabus', label: 'Full Syllabus', desc: 'All curriculum topics' },
                    { id: 'studied_and_weak_only', label: 'Studied & Weak', desc: 'Your error areas' },
                    { id: 'high_yield_pyq_only', label: 'High-Yield PYQ', desc: '15M LAQs focus' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSmartMode(mode.id as any)}
                      className={`rounded-2xl border p-2.5 text-left transition-all cursor-pointer ${
                        smartMode === mode.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{mode.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count & Time Limit */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Number of Questions</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 50, 100].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setQuestionCount(num);
                        setDurationMinutes(num === 10 ? 15 : num === 20 ? 25 : num === 50 ? 60 : 120);
                      }}
                      className={`rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                        questionCount === num
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Duration */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Time Duration (Minutes)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 25, 60, 120].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                        durationMinutes === mins
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {mins} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Rules Banner */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>MUHS Examination Rules & Marking:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                <li>Section-A format: 1 Mark per correct clinical MCQ.</li>
                <li>Timer counts down continuously; test auto-submits on timeout.</li>
                <li>Instant diagnostic analysis of weak topics, care plan deficits, and recommended revision steps.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartTest}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
              >
                <span>Launch Mock Test</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: ACTIVE TEST TAKING ================= */}
        {step === 'taking' && currentQ && (
          <div className="space-y-6">
            {/* Header: Title, Timer, Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {currentQ.subjectName} • {currentQ.unitTitle}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Question {currentIndex + 1} of {questions.length}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-extrabold ${
                  secondsRemaining < 180
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-slate-900 text-white'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span>{formatTimer(secondsRemaining)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    flaggedQuestions[currentQ.id]
                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
                >
                  Submit Test
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500">
                    Topic: {currentQ.topicTitle}
                  </span>
                  {currentQ.tag && (
                    <span className="text-[9px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      {currentQ.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      className={`w-full flex items-center justify-between rounded-2xl border p-4 text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-extrabold ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Navigator & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-bold text-white disabled:opacity-40 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Question Palette Grid */}
              <div className="flex flex-wrap items-center gap-1.5 max-w-md">
                {questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-7 w-7 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-emerald-600 ring-offset-1 bg-slate-900 text-white'
                          : isFlagged
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: DETAILED TEST RESULTS ================= */}
        {step === 'result' && testResult && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Test Evaluation Complete
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {testResult.title} Scorecard
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scorecard Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Accuracy Score
                </div>
                <div className="text-2xl font-black text-emerald-950 mt-1">
                  {testResult.scorePercentage}%
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {testResult.correctAnswers} / {testResult.totalQuestions} Correct
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Incorrect / Skipped
                </div>
                <div className="text-2xl font-black text-rose-700 mt-1">
                  {testResult.incorrectAnswers}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {testResult.unansweredQuestions} Skipped
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Time Spent
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {testResult.timeSpentMinutes}m
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Clinical Pacing</div>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4">
                <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">
                  Weak Topics Found
                </div>
                <div className="text-2xl font-black text-purple-950 mt-1">
                  {testResult.weakTopicsIdentified.length}
                </div>
                <div className="text-[11px] text-purple-700 font-semibold mt-0.5">
                  Targeted for Revision
                </div>
              </div>
            </div>

            {/* Diagnostic Recommendation */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Next Best Action:</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                {testResult.recommendedRevisionAction}
              </p>
            </div>

            {/* Weak Topics Identified */}
            {testResult.weakTopicsIdentified.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Specific Weak Concepts to Review
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {testResult.weakTopicsIdentified.map((wt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/40 p-3.5"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{wt.topicTitle}</div>
                        <div className="text-[10px] text-rose-700 mt-0.5">
                          {wt.incorrectCount} mistakes in this test ({wt.subjectName})
                        </div>
                      </div>
                      {onSelectTopic && (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectTopic(wt.topicId);
                            onClose();
                          }}
                          className="rounded-xl bg-white border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-800 hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          Revise
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Question Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Full Question Breakdown & Scientific Rationales
              </h4>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {testResult.questionDetails.map((qd, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-4 space-y-3 ${
                      qd.isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500">
                          Q{idx + 1} • {qd.topicTitle}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                          {qd.question}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold shrink-0 ${
                        qd.isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {qd.isCorrect ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        <span>{qd.isCorrect ? 'Correct' : 'Incorrect'}</span>
                      </span>
                    </div>

                    <div className="rounded-xl bg-white p-3 border border-slate-200/80 space-y-1 text-xs text-slate-700">
                      <div>
                        <strong>Correct Option:</strong>{' '}
                        <span className="text-emerald-700 font-bold">
                          {qd.correctAnswerId}
                        </span>
                      </div>
                      {qd.userAnswerId && (
                        <div>
                          <strong>Your Option:</strong>{' '}
                          <span className={qd.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                            {qd.userAnswerId}
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 mt-1 leading-relaxed">
                        <strong>Clinical Explanation:</strong> {qd.explanation}
                      </p>
                      {qd.clinicalRationale && (
                        <p className="text-[11px] text-emerald-800 font-medium">
                          <strong>Scientific Rationale:</strong> {qd.clinicalRationale}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep('config')}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake / New Test</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
