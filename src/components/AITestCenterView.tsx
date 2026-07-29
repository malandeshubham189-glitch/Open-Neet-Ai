import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TestQuestion, MasterTestType } from '../types';
import { getAllTopics } from '../data/curriculumData';
import { FileText, Clock, Award, RotateCcw, ArrowRight, Layers, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export const AITestCenterView: React.FC = () => {
  const { saveTestResult, testResults } = useApp();

  const [testType, setTestType] = useState<MasterTestType>('chapter');
  const [activeTestStarted, setActiveTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60);

  const allTopics = getAllTopics();

  const sampleQuestions: TestQuestion[] = [
    {
      id: 't-q1',
      subjectId: 'physics',
      topicName: 'System of Particles & Rotational Motion',
      question: 'A thin uniform ring of mass M and radius R rotates about its central axis. Its moment of inertia about its diameter axis is:',
      options: [
        { id: 'a', text: '(1/2) M R²' },
        { id: 'b', text: 'M R²' },
        { id: 'c', text: '(1/4) M R²' },
        { id: 'd', text: '(3/2) M R²' }
      ],
      correctOptionId: 'a',
      explanation: 'For a ring, perpendicular axis theorem gives I_z = I_x + I_y => M R² = 2 I_dia => I_dia = (1/2) M R².'
    },
    {
      id: 't-q2',
      subjectId: 'chemistry',
      topicName: 'General Organic Chemistry (GOC)',
      question: 'In which of the following groups is the -I (minus Inductive) effect highest?',
      options: [
        { id: 'a', text: '-NO₂' },
        { id: 'b', text: '-COOH' },
        { id: 'c', text: '-F' },
        { id: 'd', text: '-OH' }
      ],
      correctOptionId: 'a',
      explanation: '-I effect strength order: -NO₂ > -CN > -COOH > -F > -OH.'
    },
    {
      id: 't-q3',
      subjectId: 'biology',
      topicName: 'Molecular Basis of Inheritance',
      question: 'According to Chargaff rule, if a double stranded DNA has 30% Cytosine, what is the percentage of Thymine?',
      options: [
        { id: 'a', text: '20%' },
        { id: 'b', text: '30%' },
        { id: 'c', text: '40%' },
        { id: 'd', text: '10%' }
      ],
      correctOptionId: 'a',
      explanation: '% C = % G = 30% => Total G+C = 60%. Remaining A+T = 40% => % T = 20%.'
    },
    {
      id: 't-q4',
      subjectId: 'physics',
      topicName: 'Thermodynamics',
      question: 'In an adiabatic process for a monoatomic ideal gas, PV^gamma = Constant. What is the value of gamma?',
      options: [
        { id: 'a', text: '5/3' },
        { id: 'b', text: '7/5' },
        { id: 'c', text: '4/3' },
        { id: 'd', text: '1.4' }
      ],
      correctOptionId: 'a',
      explanation: 'For monoatomic gas with degrees of freedom f=3, gamma = 1 + 2/f = 1 + 2/3 = 5/3.'
    }
  ];

  useEffect(() => {
    let timer: any = null;
    if (activeTestStarted && !testFinished) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTestStarted, testFinished]);

  const finishTest = () => {
    setTestFinished(true);
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    sampleQuestions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (!userAns) unattempted++;
      else if (userAns === q.correctOptionId) correct++;
      else incorrect++;
    });

    const score = correct * 4 - incorrect * 1;
    const totalMarks = sampleQuestions.length * 4;
    const accuracy = Math.round((correct / (correct + incorrect || 1)) * 100);

    saveTestResult({
      testTitle: `NEET 2027 ${testType.toUpperCase()} Test Engine`,
      totalQuestions: sampleQuestions.length,
      correctCount: correct,
      incorrectCount: incorrect,
      unattemptedCount: unattempted,
      score,
      totalMarks,
      timeTakenSeconds: 15 * 60 - timeLeftSeconds,
      accuracyPercent: accuracy,
      weakTopics: incorrect > 0 ? ['Review incorrect questions'] : []
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = sampleQuestions[currentQuestionIndex];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB] border border-blue-200">
            <FileText className="h-3.5 w-3.5" />
            <span>NEET 2027 PATTERN TEST CENTER</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">Interactive NTA Mock Test Simulator</h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Official NTA NEET marking pattern (+4 for correct, -1 for wrong, 0 for unattempted).
          </p>
        </div>
      </div>

      {!activeTestStarted && !testFinished && (
        <div className="space-y-6">
          {/* Test Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {[
              { id: 'topic', label: 'Topic Test', desc: '10-15 MCQs' },
              { id: 'chapter', label: 'Chapter Test', desc: '30-45 MCQs' },
              { id: 'unit', label: 'Unit Test', desc: '90 MCQs' },
              { id: 'full-syllabus', label: 'Full Mock (720)', desc: '180 MCQs' },
              { id: 'mistake-bank', label: 'Mistake Bank', desc: 'Revision' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTestType(t.id as MasterTestType)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  testType === t.id
                    ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold shadow-sm'
                    : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-slate-50'
                }`}
              >
                <p className="text-xs font-extrabold">{t.label}</p>
                <p className="text-[10px] font-semibold opacity-75">{t.desc}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-12 text-center space-y-6 shadow-sm max-w-2xl mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] border border-blue-100 mx-auto">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#111827]">
                NEET 2027 {testType === 'topic' ? 'Topic Level' : testType === 'chapter' ? 'Chapter Diagnostic' : testType === 'unit' ? 'Unit Diagnostic' : testType === 'full-syllabus' ? 'Full Syllabus 720 Marks' : 'Mistake Bank Revision'} Mock
              </h2>
              <p className="text-xs text-[#6B7280]">
                {sampleQuestions.length} High-Yield MCQs • NTA Pattern (+4 / -1) • Real Timer
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTestStarted(true);
                setTimeLeftSeconds(15 * 60);
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-all mx-auto"
            >
              <span>Start {testType.toUpperCase()} Test</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Test Running Screen */}
      {activeTestStarted && !testFinished && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel */}
          <div className="lg:col-span-3 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <span className="text-xs font-bold text-[#2563EB] uppercase">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#111827] leading-relaxed">{currentQ.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: opt.id }))
                    }
                    className={`flex items-center justify-start rounded-xl border p-4 text-xs text-left transition-all ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold'
                        : 'border-[#E5E7EB] bg-slate-50 text-[#111827] hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold uppercase mr-2 opacity-75">({opt.id})</span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((i) => i - 1)}
                className="rounded-xl border border-[#E5E7EB] bg-slate-50 px-4 py-2 text-xs font-bold text-[#111827] disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() =>
                  setMarkedForReview((prev) => ({
                    ...prev,
                    [currentQ.id]: !prev[currentQ.id]
                  }))
                }
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'border border-[#E5E7EB] bg-slate-50 text-[#111827]'
                }`}
              >
                {markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
              </button>

              {currentQuestionIndex < sampleQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((i) => i + 1)}
                  className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={finishTest}
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Palette Sidebar */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Question Palette</h3>
            <div className="grid grid-cols-3 gap-2">
              {sampleQuestions.map((q, idx) => {
                const isAttempted = !!userAnswers[q.id];
                const isReview = markedForReview[q.id];
                const isCurrent = currentQuestionIndex === idx;

                let badgeClass = 'border-[#E5E7EB] bg-slate-50 text-[#6B7280]';
                if (isCurrent) badgeClass = 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold';
                else if (isAttempted) badgeClass = 'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold';
                else if (isReview) badgeClass = 'border-amber-300 bg-amber-50 text-amber-800 font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${badgeClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Test Finished Diagnostic Screen */}
      {testFinished && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm space-y-6 max-w-3xl mx-auto text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] border border-blue-100 mx-auto">
            <Award className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#111827]">Diagnostic Score Breakdown</h2>
            <p className="text-xs text-[#6B7280]">NEET Marking: +4 Correct / -1 Incorrect</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#E5E7EB] bg-slate-50 p-4">
              <p className="text-[10px] font-bold text-[#6B7280]">SCORE</p>
              <p className="text-xl font-extrabold text-[#2563EB] mt-1">
                {testResults[0]?.score || 12} / {testResults[0]?.totalMarks || 12}
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-slate-50 p-4">
              <p className="text-[10px] font-bold text-[#6B7280]">ACCURACY</p>
              <p className="text-xl font-extrabold text-[#7C3AED] mt-1">
                {testResults[0]?.accuracyPercent || 100}%
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-slate-50 p-4">
              <p className="text-[10px] font-bold text-[#6B7280]">CORRECT</p>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">
                {testResults[0]?.correctCount || 3}
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-slate-50 p-4">
              <p className="text-[10px] font-bold text-[#6B7280]">INCORRECT</p>
              <p className="text-xl font-extrabold text-rose-600 mt-1">
                {testResults[0]?.incorrectCount || 0}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setTestFinished(false);
              setActiveTestStarted(false);
              setUserAnswers({});
              setMarkedForReview({});
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-all mx-auto shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Test</span>
          </button>
        </div>
      )}
    </div>
  );
};
