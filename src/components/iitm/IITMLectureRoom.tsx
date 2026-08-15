import React, { useState, useEffect } from 'react';
import {
  IITMSubjectId,
  IITMLectureResource,
  IITMUserProgress,
  IITMQuizQuestion
} from '../../types/iitm';
import {
  IITM_SUBJECTS_METADATA
} from '../../data/iitmData';
import {
  IITMService
} from '../../services/iitmService';
import {
  ArrowLeft,
  Play,
  FileText,
  HelpCircle,
  Award,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Download,
  Copy,
  Check,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  BookOpen,
  Send,
  Timer,
  AlertCircle
} from 'lucide-react';

interface IITMLectureRoomProps {
  subjectId: IITMSubjectId;
  onBack: () => void;
}

export const IITMLectureRoom: React.FC<IITMLectureRoomProps> = ({
  subjectId,
  onBack
}) => {
  const meta = IITM_SUBJECTS_METADATA[subjectId];
  const resource = meta.lectureResource;

  const [progress, setProgress] = useState<IITMUserProgress>(
    IITMService.getProgress(subjectId)
  );
  const [currentStep, setCurrentStep] = useState<number>(progress.currentStep || 1);
  const [isVideoUnavailable, setIsVideoUnavailable] = useState<boolean>(false);
  const [unavailableMessage, setUnavailableMessage] = useState<string | null>(null);

  // AI Notes State
  const [notesContent, setNotesContent] = useState<string>('');
  const [isGeneratingNotes, setIsGeneratingNotes] = useState<boolean>(false);
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);

  // Practice Quiz State
  const [quizQuestions, setQuizQuestions] = useState<IITMQuizQuestion[]>(
    IITMService.getQuizQuestions(subjectId)
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizTimerSeconds, setQuizTimerSeconds] = useState<number>(600); // 10 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Initialize and track smart resume
  useEffect(() => {
    const current = IITMService.getProgress(subjectId);
    setProgress(current);
    setCurrentStep(current.currentStep || 1);

    // Record smart resume point
    IITMService.saveSmartResume(subjectId, current.currentStep || 1);

    // Pre-load notes if available
    loadStructuredNotes();
  }, [subjectId]);

  const loadStructuredNotes = async () => {
    const staticNotes = IITMService.getStructuredNotes(subjectId);
    if (!notesContent) {
      const defaultText = `### 📘 ${meta.title} — Study Notes & Formula Sheet
**Course**: IIT Madras BS Degree Foundation Level
**Focus**: Qualifier Exam & Quiz 1 Preparation

#### Overview
${staticNotes.overview}

#### 🔑 Key Mathematical & Statistical Formulas
${staticNotes.keyFormulas.map((f) => `- **${f.label}**:\n  \`${f.formula}\`\n  *Note*: ${f.note}`).join('\n\n')}

#### 💡 High-Yield Concept Breakdown
${staticNotes.highYieldConcepts.map((c) => `##### ${c.heading}\n${c.points.map((p) => `- ${p}`).join('\n')}`).join('\n\n')}

#### 🎯 Qualifier Exam & Quiz 1 Strategy
${staticNotes.qualifierTips.map((t) => `- ${t}`).join('\n')}`;
      setNotesContent(defaultText);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    const updated = IITMService.saveProgress(subjectId, {
      currentStep: step
    });
    setProgress(updated);
  };

  const handleToggleWatched = () => {
    const newStatus = !progress.videoWatched;
    const updated = IITMService.saveProgress(subjectId, {
      videoWatched: newStatus
    });
    setProgress(updated);
  };

  const handleGenerateAiNotes = async () => {
    setIsGeneratingNotes(true);
    try {
      const notes = await IITMService.fetchAiNotes(subjectId);
      setNotesContent(notes);
      const updated = IITMService.saveProgress(subjectId, {
        notesGenerated: true,
        customNotes: notes
      });
      setProgress(updated);
    } catch {
      // Keep static notes
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const handleCopyNotes = () => {
    if (!notesContent) return;
    navigator.clipboard.writeText(notesContent);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const handleDownloadNotes = () => {
    if (!notesContent) return;
    const element = document.createElement('a');
    const file = new Blob([notesContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${meta.code}_${meta.title.replace(/\s+/g, '_')}_Notes.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });
    setQuizScore(score);
    setIsQuizSubmitted(true);
    setIsTimerRunning(false);

    const updated = IITMService.saveProgress(subjectId, {
      quizCompleted: true,
      quizScore: score,
      quizTotal: quizQuestions.length
    });
    setProgress(updated);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
    setQuizTimerSeconds(600);
    setIsTimerRunning(true);
  };

  const handleReportBrokenVideo = () => {
    setIsVideoUnavailable(true);
    setUnavailableMessage(
      'This lecture was flagged for review. Distraction-Free Notes, Practice Questions, and Quiz remain 100% accessible.'
    );
  };

  const handleScheduleRevision = () => {
    const updated = IITMService.saveProgress(subjectId, {
      revisionScheduled: true
    });
    setProgress(updated);
  };

  const totalSteps = 5;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer shadow-xs"
            title="Back to IIT Madras BS Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                IIT MADRAS BS • FOUNDATION
              </span>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-black text-indigo-800">
                {meta.code}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {meta.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Verified User Resource</span>
          </span>

          <button
            onClick={handleToggleWatched}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer border ${
              progress.videoWatched
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`h-4 w-4 ${progress.videoWatched ? 'text-white' : 'text-slate-400'}`} />
            <span>{progress.videoWatched ? 'Lecture Watched' : 'Mark as Watched'}</span>
          </button>
        </div>
      </div>

      {/* 2. 5-STEP LEARNING PIPELINE STEPPER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {[
            { step: 1, title: 'Watch Lecture', icon: Play, done: progress.videoWatched },
            { step: 2, title: 'Generate Notes', icon: FileText, done: progress.notesGenerated },
            { step: 3, title: 'Practice Questions', icon: HelpCircle, done: progress.practiceCompleted },
            { step: 4, title: 'Take Quiz', icon: Award, done: progress.quizCompleted },
            { step: 5, title: 'Revision', icon: RotateCcw, done: progress.revisionScheduled }
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = currentStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => handleStepChange(item.step)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 rounded-2xl p-2.5 sm:p-3 text-center sm:text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black'
                    : item.done
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold'
                    : 'text-slate-600 hover:bg-slate-100 font-medium'
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-xl text-xs shrink-0 ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : item.done
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.done ? <Check className="h-3.5 w-3.5" /> : item.step}
                </div>
                <span className="text-[10px] sm:text-xs truncate">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. STEP 1: WATCH LECTURE (DISTRACTION-FREE EMBEDDED PLAYER) */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {resource.title}
              </h2>
              <p className="text-xs text-slate-500">
                Duration: ~{resource.durationMinutes} mins • {resource.termTag}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReportBrokenVideo}
                className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer"
                title="Report playback issues"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Report / Alternative</span>
              </button>
            </div>
          </div>

          {/* Alert if broken */}
          {unavailableMessage && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{unavailableMessage}</p>
              </div>
              <button
                onClick={() => setUnavailableMessage(null)}
                className="text-amber-700 hover:underline font-bold text-[11px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* OFFICIAL EMBEDDED PLAYER */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-xl border border-slate-200">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${resource.videoId}?autoplay=0&rel=0&modestbranding=1`}
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>

          {/* Key Topics Covered Chips */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Concepts & Units Covered in this OneShot Marathon:
            </div>
            <div className="flex flex-wrap gap-2">
              {resource.keyTopicsCovered.map((topic, i) => (
                <span
                  key={i}
                  className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Advance Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                handleToggleWatched();
                handleStepChange(2);
              }}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Done Watching? Proceed to Notes</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. STEP 2: GENERATE NOTES */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Step 2: AI Study Notes & Formula Sheet
              </h2>
              <p className="text-xs text-slate-500">
                Exam-ready summaries, formulas, and proofs tailored specifically for {meta.title}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleGenerateAiNotes}
                disabled={isGeneratingNotes}
                className="flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isGeneratingNotes ? 'Generating AI Notes...' : 'Regenerate Notes'}</span>
              </button>

              <button
                onClick={handleCopyNotes}
                className="flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                {copiedNotes ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedNotes ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadNotes}
                className="flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {notesContent}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => handleStepChange(1)}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Lecture</span>
            </button>

            <button
              onClick={() => {
                IITMService.saveProgress(subjectId, { notesGenerated: true });
                handleStepChange(3);
              }}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Proceed to Practice Questions</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. STEP 3: PRACTICE QUESTIONS */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Step 3: High-Yield Practice Problems
            </h2>
            <p className="text-xs text-slate-500">
              Step-by-step mathematical reasoning for Qualifier Exam & Quiz 1
            </p>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Question {idx + 1} of {quizQuestions.length}
                  </span>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                    {q.isVerifiedPyq ? 'Verified Previous Question' : 'AI Practice Question'}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`rounded-2xl p-3.5 text-xs font-medium border ${
                        optIdx === q.correctOptionIndex
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-slate-500">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{opt}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100 text-xs text-indigo-950 space-y-1">
                  <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Solution & Mathematical Rationale</span>
                  </div>
                  <p className="text-indigo-900/90 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => handleStepChange(2)}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Notes</span>
            </button>

            <button
              onClick={() => {
                IITMService.saveProgress(subjectId, { practiceCompleted: true });
                handleStepChange(4);
              }}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Take Interactive Quiz</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. STEP 4: TAKE QUIZ */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Step 4: Qualifier Diagnostic Quiz
              </h2>
              <p className="text-xs text-slate-500">
                Test your knowledge under timed conditions. Aim for at least 4/5 (80%).
              </p>
            </div>

            {isQuizSubmitted ? (
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-50 border border-indigo-200 px-4 py-2 text-xs font-black text-indigo-900">
                  Score: {quizScore} / {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="rounded-2xl bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                >
                  Retry Quiz
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Quiz</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctOptionIndex;

              return (
                <div
                  key={q.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      Question {idx + 1}
                    </span>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                      {q.isVerifiedPyq ? 'Verified Previous Question' : 'AI Practice Question'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let optionClasses = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                      if (isQuizSubmitted) {
                        if (optIdx === q.correctOptionIndex) {
                          optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionClasses = 'border-rose-500 bg-rose-50 text-rose-950';
                        }
                      } else if (isSelected) {
                        optionClasses = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isQuizSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left rounded-2xl p-3.5 text-xs transition-all border flex items-start gap-3 cursor-pointer ${optionClasses}`}
                        >
                          <span className="font-bold shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div
                      className={`rounded-2xl p-4 border text-xs space-y-1 ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/70 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-rose-600" />
                        )}
                        <span>{isCorrect ? 'Correct Answer!' : 'Incorrect — Review Explanation'}</span>
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => handleStepChange(3)}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Practice</span>
            </button>

            <button
              onClick={() => handleStepChange(5)}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Proceed to Spaced Revision</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 7. STEP 5: REVISION */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <RotateCcw className="h-4 w-4" />
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Step 5: Spaced Repetition & Retention Protocol
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lock in your formulas and problem patterns with spaced review intervals: Day 1, Day 3, Day 7, and Day 14.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Revision Schedule</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold">
                  <span>Day 1 (Immediate Review)</span>
                  <span>Completed</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <span>Day 3 (Formula Check)</span>
                  <span>In 3 Days</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <span>Day 7 (PYQ Speed Run)</span>
                  <span>In 7 Days</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <span>Day 14 (Full Mock Exam)</span>
                  <span>In 14 Days</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-indigo-200 bg-indigo-50/50 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-indigo-950">Active Recall Key Takeaway</h3>
                <p className="text-xs text-indigo-900/80 leading-relaxed">
                  Before finishing, write down the 3 most important formulas from this lecture on paper from memory without looking at notes.
                </p>
              </div>

              <button
                onClick={() => {
                  handleScheduleRevision();
                  onBack();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 py-3.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark All Steps Complete & Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
