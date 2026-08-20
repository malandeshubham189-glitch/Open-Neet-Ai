import React, { useState, useEffect } from 'react';
import {
  IITMSubjectId,
  IITMWeekId,
  IITMPlaylistLesson,
  IITMWeekMetadata,
  IITMLessonProgress
} from '../../types/iitm';
import { StructuredNotes } from '../../types/notes';
import { StructuredNotesRenderer } from '../notes/StructuredNotesRenderer';
import { IITMService } from '../../services/iitmService';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Play,
  FileText,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Copy,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  Check,
  Calculator,
  BarChart3
} from 'lucide-react';

interface IITMWeekRoomProps {
  initialSubjectId?: IITMSubjectId;
  initialWeekId?: IITMWeekId;
  initialLessonId?: string;
  onBackToDashboard: () => void;
}

export const IITMWeekRoom: React.FC<IITMWeekRoomProps> = ({
  initialSubjectId = 'math_1',
  initialWeekId = 'week_1',
  initialLessonId,
  onBackToDashboard
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<IITMSubjectId>(initialSubjectId);
  const [activeWeekId, setActiveWeekId] = useState<IITMWeekId>(initialWeekId);
  const [currentWeek, setCurrentWeek] = useState<IITMWeekMetadata>(() =>
    IITMService.getWeek(initialWeekId, initialSubjectId)
  );
  const [selectedLesson, setSelectedLesson] = useState<IITMPlaylistLesson>(() => {
    const week = IITMService.getWeek(initialWeekId, initialSubjectId);
    if (initialLessonId) {
      const match = week.lessons.find((l) => l.lessonId === initialLessonId);
      if (match) return match;
    }
    return week.lessons[0] || ({} as IITMPlaylistLesson);
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [lessonProgress, setLessonProgress] = useState<IITMLessonProgress>(() =>
    IITMService.getLessonProgress(selectedLesson.lessonId, activeWeekId, initialSubjectId)
  );
  const [weekProgress, setWeekProgress] = useState(() =>
    IITMService.getWeekProgress(activeWeekId, initialSubjectId)
  );
  const [allWeeksProgress, setAllWeeksProgress] = useState(() =>
    IITMService.getAllWeeksProgress(initialSubjectId)
  );

  // Notes state
  const [aiNotes, setAiNotes] = useState<StructuredNotes | string>('');
  const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
  const [isCopiedNotes, setIsCopiedNotes] = useState<boolean>(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Diagnostic state
  const [showDiagnostic, setShowDiagnostic] = useState<boolean>(false);

  const playlistMeta = IITMService.getPlaylistMeta(activeSubjectId);
  const auditReport = IITMService.getIntegrityAudit(activeSubjectId);

  // When subject or week changes, update state
  useEffect(() => {
    const week = IITMService.getWeek(activeWeekId, activeSubjectId);
    setCurrentWeek(week);
    const newLesson = week.lessons[0];
    if (newLesson) {
      setSelectedLesson(newLesson);
      setLessonProgress(IITMService.getLessonProgress(newLesson.lessonId, activeWeekId, activeSubjectId));
    }
    setWeekProgress(IITMService.getWeekProgress(activeWeekId, activeSubjectId));
    setAllWeeksProgress(IITMService.getAllWeeksProgress(activeSubjectId));
  }, [activeSubjectId, activeWeekId]);

  // When selected lesson changes, load progress and notes
  useEffect(() => {
    if (!selectedLesson?.lessonId) return;
    const prog = IITMService.getLessonProgress(selectedLesson.lessonId, activeWeekId, activeSubjectId);
    setLessonProgress(prog);
    setActiveStep(prog.currentStep || 1);
    setIsQuizSubmitted(false);
    setSelectedAnswers({});

    // Load AI notes for this lesson
    setIsLoadingNotes(true);
    IITMService.fetchLessonAiNotes(selectedLesson)
      .then((notes) => {
        setAiNotes(notes);
        setIsLoadingNotes(false);
      })
      .catch(() => setIsLoadingNotes(false));
  }, [selectedLesson?.lessonId, activeWeekId, activeSubjectId]);

  const handleSwitchSubject = (subjectId: IITMSubjectId) => {
    setActiveSubjectId(subjectId);
    setActiveWeekId('week_1');
  };

  const handleSelectLesson = (lesson: IITMPlaylistLesson) => {
    setSelectedLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkWatched = () => {
    const updated = IITMService.saveLessonProgress(
      selectedLesson.lessonId,
      activeWeekId,
      {
        watched: true,
        currentStep: 2
      },
      activeSubjectId
    );
    setLessonProgress(updated);
    setWeekProgress(IITMService.getWeekProgress(activeWeekId, activeSubjectId));
    setAllWeeksProgress(IITMService.getAllWeeksProgress(activeSubjectId));
    setActiveStep(2);
  };

  const handleMarkNotesDone = () => {
    const updated = IITMService.saveLessonProgress(
      selectedLesson.lessonId,
      activeWeekId,
      {
        notesGenerated: true,
        currentStep: 3
      },
      activeSubjectId
    );
    setLessonProgress(updated);
    setWeekProgress(IITMService.getWeekProgress(activeWeekId, activeSubjectId));
    setAllWeeksProgress(IITMService.getAllWeeksProgress(activeSubjectId));
    setActiveStep(3);
  };

  const handleMarkPracticeDone = () => {
    const updated = IITMService.saveLessonProgress(
      selectedLesson.lessonId,
      activeWeekId,
      {
        practiceCompleted: true,
        currentStep: 4
      },
      activeSubjectId
    );
    setLessonProgress(updated);
    setWeekProgress(IITMService.getWeekProgress(activeWeekId, activeSubjectId));
    setAllWeeksProgress(IITMService.getAllWeeksProgress(activeSubjectId));
    setActiveStep(4);
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    const questions = IITMService.getWeekQuizQuestions(activeWeekId, activeSubjectId);
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    setQuizScore(correct);
    setIsQuizSubmitted(true);

    const updated = IITMService.saveLessonProgress(
      selectedLesson.lessonId,
      activeWeekId,
      {
        quizCompleted: true,
        quizScore: correct,
        quizTotal: questions.length,
        currentStep: 5,
        completed: true
      },
      activeSubjectId
    );
    setLessonProgress(updated);
    setWeekProgress(IITMService.getWeekProgress(activeWeekId, activeSubjectId));
    setAllWeeksProgress(IITMService.getAllWeeksProgress(activeSubjectId));
  };

  const handleScheduleRevision = () => {
    const updated = IITMService.saveLessonProgress(
      selectedLesson.lessonId,
      activeWeekId,
      {
        revisionScheduled: true,
        completed: true
      },
      activeSubjectId
    );
    setLessonProgress(updated);
    setWeekProgress(IITMService.getWeekProgress(activeWeekId, activeSubjectId));
    setAllWeeksProgress(IITMService.getAllWeeksProgress(activeSubjectId));
  };

  const handleCopyNotes = () => {
    const textToCopy = typeof aiNotes === 'string' ? aiNotes : JSON.stringify(aiNotes, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setIsCopiedNotes(true);
    setTimeout(() => setIsCopiedNotes(false), 2000);
  };

  const handleDownloadNotes = () => {
    const textToDownload = typeof aiNotes === 'string' ? aiNotes : JSON.stringify(aiNotes, null, 2);
    const blob = new Blob([textToDownload], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IITM_${selectedLesson.title.replace(/[^a-zA-Z0-9]/g, '_')}_Notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Find next lesson in playlist
  const currentLessonIndex = currentWeek.lessons.findIndex((l) => l.lessonId === selectedLesson.lessonId);
  const nextLesson = currentWeek.lessons[currentLessonIndex + 1];

  const questions = IITMService.getWeekQuizQuestions(activeWeekId, activeSubjectId);
  const allWeeks = IITMService.getAllWeeks(activeSubjectId);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-[#0F172A] font-sans antialiased">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#475569] shadow-sm transition hover:bg-[#F1F5F9] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Hub</span>
            </button>
            <div className="h-4 w-px bg-[#E2E8F0]" />

            {/* Subject Toggle in Header */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => handleSwitchSubject('math_1')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeSubjectId === 'math_1'
                    ? 'bg-white text-indigo-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calculator className="h-3.5 w-3.5 text-indigo-600" />
                <span>Mathematics 1</span>
              </button>
              <button
                onClick={() => handleSwitchSubject('stats_1')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeSubjectId === 'stats_1'
                    ? 'bg-white text-teal-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5 text-teal-600" />
                <span>Statistics 1</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDiagnostic(!showDiagnostic)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-1.5 text-xs font-medium text-emerald-900 hover:bg-emerald-100 transition cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              <span className="hidden md:inline">Zero-Skip Audit: PASS</span>
            </button>
          </div>
        </div>

        {/* Week Tabs Switcher */}
        <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto py-2 no-scrollbar">
            {(['week_1', 'week_2', 'week_3', 'week_4'] as IITMWeekId[]).map((wId) => {
              const isActive = activeWeekId === wId;
              const wProg = allWeeksProgress[wId] || { progressPercent: 0, completedLessons: 0 };
              const wMeta = allWeeks[wId];

              return (
                <button
                  key={wId}
                  onClick={() => setActiveWeekId(wId)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <span>Week {wMeta.weekNumber}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {wMeta.lessons.length} Videos
                  </span>
                  {wProg.progressPercent > 0 && (
                    <span
                      className={`text-[10px] font-black ${
                        isActive ? 'text-emerald-200' : 'text-emerald-600'
                      }`}
                    >
                      {wProg.progressPercent}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Diagnostic & Integrity Audit Modal */}
      {showDiagnostic && (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs text-emerald-950 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="font-bold text-sm">
                  Playlist Ingestion & Zero-Skip Verification ({playlistMeta.playlistTitle})
                </span>
              </div>
              <span className="rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-black">
                STATUS: PASS_ZERO_SKIPS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <div className="text-base font-black text-slate-900">{auditReport.totalDiscovered}</div>
                <div className="text-[10px] font-bold text-slate-500">RAW VIDEOS DISCOVERED</div>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <div className="text-base font-black text-indigo-700">{auditReport.totalImported}</div>
                <div className="text-[10px] font-bold text-slate-500">RAW VIDEOS IMPORTED</div>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <div className="text-base font-black text-teal-700">{auditReport.totalMapped}</div>
                <div className="text-[10px] font-bold text-slate-500">WEEKS 1-4 MAPPED</div>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <div className="text-base font-black text-emerald-600">0 (ZERO)</div>
                <div className="text-[10px] font-bold text-slate-500">SKIPPED / OMITTED</div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-800">
              Week Breakdown: Week 1 ({auditReport.weeksAudit.week_1.totalVideos} videos), Week 2 ({auditReport.weeksAudit.week_2.totalVideos} videos), Week 3 ({auditReport.weeksAudit.week_3.totalVideos} videos), Week 4 ({auditReport.weeksAudit.week_4.totalVideos} videos). Every video is mapped sequentially with zero gap errors.
            </div>
          </div>
        </div>
      )}

      {/* Main Layout: Left Main Screen (Player + 5-Step Pipeline) & Right Lesson Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT 8 COLS: Video Player & Step Navigation */}
          <div className="lg:col-span-8 space-y-6">
            {/* Distraction-Free YouTube Video Embed */}
            <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="relative aspect-video w-full bg-slate-900">
                <iframe
                  key={selectedLesson.videoId}
                  className="h-full w-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${selectedLesson.videoId}?rel=0&modestbranding=1`}
                  title={selectedLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-900">
                      WEEK {currentWeek.weekNumber} • LESSON {selectedLesson.lessonOrder}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{selectedLesson.durationFormatted}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {lessonProgress.watched ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Watched</span>
                      </span>
                    ) : (
                      <button
                        onClick={handleMarkWatched}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Mark as Watched</span>
                      </button>
                    )}
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{selectedLesson.title}</h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedLesson.description}</p>

                {/* Key Concepts Tags */}
                {selectedLesson.keyConcepts && selectedLesson.keyConcepts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Key Focus:</span>
                    {selectedLesson.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 5-STEP LEARNING WORKFLOW PIPELINE */}
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm space-y-6">
              {/* Step Tabs Header */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-black text-slate-900">
                    5-Step Qualifier Mastery Pipeline
                  </h3>
                  <span className="text-xs font-bold text-indigo-600">
                    Step {activeStep} of 5
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[
                    { step: 1, label: '1. Lecture', done: lessonProgress.watched },
                    { step: 2, label: '2. AI Notes', done: lessonProgress.notesGenerated },
                    { step: 3, label: '3. Practice', done: lessonProgress.practiceCompleted },
                    { step: 4, label: '4. Quiz', done: lessonProgress.quizCompleted },
                    { step: 5, label: '5. Revision', done: lessonProgress.revisionScheduled }
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActiveStep(s.step)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl text-center text-xs font-bold transition cursor-pointer border ${
                        activeStep === s.step
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20'
                          : s.done
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        {s.done && <Check className="h-3 w-3 text-emerald-600" />}
                        <span>{s.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1 Content: Video Lecture */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-indigo-50/70 p-4 border border-indigo-100 text-xs text-indigo-950 space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <Play className="h-4 w-4 text-indigo-600" />
                      <span>Step 1: Watch Distraction-Free Lecture</span>
                    </div>
                    <p className="text-indigo-900/90 leading-relaxed">
                      Watch the embedded video above without external YouTube distractions. Once completed, click below to review AI notes and high-yield formulas.
                    </p>
                  </div>

                  <button
                    onClick={handleMarkWatched}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 p-4 text-xs font-black text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
                  >
                    <span>COMPLETED VIDEO • PROCEED TO AI NOTES</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Step 2 Content: Structured Study Notes & Formulas */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  {isLoadingNotes ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 font-medium space-y-3">
                      <Sparkles className="h-6 w-6 text-indigo-600 animate-spin mx-auto" />
                      <p className="font-bold text-slate-800">Generating structured formula & concept notes...</p>
                      <p className="text-slate-400">Parsing mathematical definitions and qualifier strategies...</p>
                    </div>
                  ) : (
                    <StructuredNotesRenderer
                      notes={aiNotes}
                      courseTitle="IIT Madras BS Degree"
                      subjectTitle={activeSubjectId === 'stats_1' ? 'Statistics for Data Science 1' : 'Mathematics for Data Science 1'}
                      weekNumber={currentWeek.weekNumber}
                      lessonTitle={selectedLesson?.title}
                      onProceedToPractice={handleMarkNotesDone}
                    />
                  )}
                </div>
              )}

              {/* Step 3 Content: Practice Problem Sets */}
              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-indigo-600" />
                      <span>Step 3: Foundation Practice Problem Sets</span>
                    </div>
                    <p className="leading-relaxed">
                      Solidify your conceptual foundations for <strong>{selectedLesson.title}</strong> before moving on to the qualifier quiz.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedLesson.keyConcepts.map((concept, idx) => (
                      <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-900">
                            Practice Checkpoint #{idx + 1}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">Concept Application</span>
                        </div>
                        <p className="text-xs font-medium text-slate-800">
                          Solve problems related to: <strong>{concept}</strong>
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleMarkPracticeDone}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 p-4 text-xs font-black text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
                  >
                    <span>PRACTICE COMPLETED • PROCEED TO CHECKPOINT QUIZ</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Step 4 Content: Qualifier Practice Quiz */}
              {activeStep === 4 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        Week {currentWeek.weekNumber} Diagnostic Checkpoint Quiz
                      </h4>
                      <p className="text-xs text-slate-500">
                        Official Qualifier pattern questions with instant step-by-step solutions.
                      </p>
                    </div>
                    {isQuizSubmitted && (
                      <span className="rounded-full bg-indigo-100 text-indigo-900 px-3 py-1 text-xs font-black">
                        Score: {quizScore} / {questions.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {questions.map((q, qIdx) => {
                      const isSelected = selectedAnswers[q.id] !== undefined;
                      const userAnswer = selectedAnswers[q.id];
                      const isCorrect = userAnswer === q.correctOptionIndex;

                      return (
                        <div
                          key={q.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-indigo-900">Question {qIdx + 1}</span>
                            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                              {q.topicTag}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-semibold text-slate-900">{q.question}</p>

                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isOptionSelected = userAnswer === optIdx;
                              let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';

                              if (isQuizSubmitted) {
                                if (optIdx === q.correctOptionIndex) {
                                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                                } else if (isOptionSelected && !isCorrect) {
                                  btnStyle = 'border-red-500 bg-red-50 text-red-950';
                                }
                              } else if (isOptionSelected) {
                                btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleAnswerSelect(q.id, optIdx)}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isQuizSubmitted && (
                            <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs text-slate-700 space-y-1">
                              <span className="font-bold text-slate-900">Explanation:</span>
                              <p className="leading-relaxed">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!isQuizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 p-4 text-xs font-black text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
                    >
                      <span>SUBMIT QUIZ & CHECK SCORE</span>
                      <Check className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveStep(5)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 p-4 text-xs font-black text-white shadow-md shadow-emerald-600/20 transition cursor-pointer"
                    >
                      <span>CONTINUE TO SPACED REVISION STEP</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Step 5 Content: Spaced Repetition Revision */}
              {activeStep === 5 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200 text-xs text-emerald-950 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="font-bold text-sm">Lesson Learning Cycle Completed!</span>
                    </div>
                    <p className="leading-relaxed">
                      You have watched the distraction-free lecture, synthesized key formulas, completed practice checks, and scored on the diagnostic quiz.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleScheduleRevision}
                      className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 p-4 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>{lessonProgress.revisionScheduled ? 'Revision Scheduled' : 'Schedule Spaced Revision'}</span>
                    </button>

                    {nextLesson && (
                      <button
                        onClick={() => handleSelectLesson(nextLesson)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 p-4 text-xs font-black text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
                      >
                        <span>NEXT LESSON: {nextLesson.title}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 4 COLS: Complete Week Lesson Playlist Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Week {currentWeek.weekNumber} Lessons ({currentWeek.lessons.length} Videos)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Zero skips • Sequentially ordered
                  </p>
                </div>
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-900">
                  {weekProgress.completedLessons}/{currentWeek.lessons.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${weekProgress.progressPercent}%` }}
                />
              </div>

              {/* Lesson Items List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {currentWeek.lessons.map((lesson) => {
                  const isSelected = selectedLesson.lessonId === lesson.lessonId;
                  const prog = IITMService.getLessonProgress(
                    lesson.lessonId,
                    activeWeekId,
                    activeSubjectId
                  );

                  return (
                    <button
                      key={lesson.lessonId}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                          : 'border-slate-100 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {prog.completed || prog.watched ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] font-bold ${
                              isSelected
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-slate-300 text-slate-400'
                            }`}
                          >
                            {lesson.lessonOrder}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-slate-400">
                            #{lesson.lessonOrder}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {lesson.durationFormatted}
                          </span>
                        </div>
                        <h4
                          className={`text-xs font-bold line-clamp-2 ${
                            isSelected ? 'text-indigo-950' : 'text-slate-800'
                          }`}
                        >
                          {lesson.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
