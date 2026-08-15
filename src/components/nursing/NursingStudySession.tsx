import React, { useState, useEffect } from 'react';
import {
  NursingTopic,
  NursingUserProgress,
  TopicLearningStatus,
  NursingLectureResource
} from '../../types/nursing';
import { NursingStudyPlannerService } from '../../services/nursing/nursingStudyPlanner';
import { StudentProfileService } from '../../services/nursing/studentProfileService';
import { NursingWeakTopicEngine } from '../../services/nursing/nursingWeakTopicEngine';
import { SmartNotesService } from '../../services/nursing/smartNotesService';
import { BrokenLinkRecovery } from '../../services/nursing/brokenLinkRecovery';
import {
  Play,
  FileText,
  HelpCircle,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  BookOpen,
  X,
  RefreshCw,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';

interface NursingStudySessionProps {
  topic: NursingTopic;
  onClose: () => void;
  onCompleted?: () => void;
}

export const NursingStudySession: React.FC<NursingStudySessionProps> = ({
  topic,
  onClose,
  onCompleted
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeLecture, setActiveLecture] = useState<NursingLectureResource | null>(topic.recommendedLecture || null);
  const [alternativeLectures, setAlternativeLectures] = useState<NursingLectureResource[]>(topic.alternativeLectures || []);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);
  const [notesViewMode, setNotesViewMode] = useState<'quick' | 'detailed' | 'lastMinute'>('quick');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [miniTestAnswers, setMiniTestAnswers] = useState<Record<string, string>>({});
  const [isMiniTestSubmitted, setIsMiniTestSubmitted] = useState<boolean>(false);
  const [sessionStartTime] = useState<number>(Date.now());
  const [revisionPerformance, setRevisionPerformance] = useState<'Strong' | 'Moderate' | 'Weak'>('Strong');

  const progress = NursingStudyPlannerService.getTopicProgress(topic.id);
  const structuredNotes = SmartNotesService.generateStructuredNotes(topic);

  // Initialize smart resume state on mount
  useEffect(() => {
    NursingStudyPlannerService.saveSmartResumeState({
      topicId: topic.id,
      topicTitle: topic.title,
      subjectName: topic.subjectName,
      subjectId: topic.subjectId,
      unitNumber: topic.unitNumber,
      unitTitle: topic.unitTitle,
      year: topic.year,
      stepNumber: currentStep,
      stepLabel: currentStep === 1 ? 'Step 1: Watch Lecture' : currentStep === 2 ? 'Step 2: Read Notes & NCP' : currentStep === 3 ? 'Step 3: Solve MCQs' : currentStep === 4 ? 'Step 4: Mini Test' : 'Step 5: Schedule Revision'
    });
  }, [topic.id, currentStep]);

  const handleReportBrokenLecture = () => {
    if (!activeLecture) return;
    const result = BrokenLinkRecovery.handleBrokenResource(topic, activeLecture.videoId);
    if (result.success && result.activeLecture) {
      setActiveLecture(result.activeLecture);
      setAlternativeLectures(result.remainingAlternatives);
      setRecoveryNotice(result.message);
    } else {
      setActiveLecture(null);
      setRecoveryNotice(result.message);
    }
  };

  const handleSelectAlternativeLecture = (alt: NursingLectureResource) => {
    setActiveLecture(alt);
    setRecoveryNotice(null);
  };

  const totalSteps = 5;

  const handleAdvanceStep = (nextStep: number) => {
    // Save incremental progress
    if (currentStep === 1) {
      NursingStudyPlannerService.saveTopicProgress(topic.id, {
        videoWatched: true,
        status: 'LEARNING'
      });
      StudentProfileService.recordStudyActivity(25, false);
    } else if (currentStep === 2) {
      NursingStudyPlannerService.saveTopicProgress(topic.id, {
        notesRead: true,
        ncpReviewed: true,
        status: 'NOTES_COMPLETED'
      });
      StudentProfileService.recordStudyActivity(15, false);
    } else if (currentStep === 3) {
      const solvedCount = Object.keys(selectedAnswers).length;
      NursingStudyPlannerService.saveTopicProgress(topic.id, {
        mcqsSolvedCount: solvedCount,
        status: 'PRACTICING'
      });
    } else if (currentStep === 4) {
      NursingStudyPlannerService.saveTopicProgress(topic.id, {
        aiTestCompleted: true,
        status: 'TEST_COMPLETED'
      });
    } else if (currentStep === 5) {
      NursingStudyPlannerService.recordRevisionCompleted(topic.id, revisionPerformance);
      StudentProfileService.recordStudyActivity(10, true);
      if (onCompleted) onCompleted();
      onClose();
      return;
    }

    setCurrentStep(nextStep);
  };

  const stepsList = [
    { num: 1, label: 'Watch Lecture', icon: Play },
    { num: 2, label: 'Read Notes & NCP', icon: FileText },
    { num: 3, label: 'Solve MCQs', icon: HelpCircle },
    { num: 4, label: 'Mini Test', icon: Award },
    { num: 5, label: 'Schedule Revision', icon: Calendar }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
        {/* Top Session Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                FOCUS STUDY SESSION
              </span>
              <span className="text-xs font-bold text-slate-500">{topic.subjectName}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-800">
              Step {currentStep} of {totalSteps}
            </span>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-5 gap-2">
          {stepsList.map((st) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            const Icon = st.icon;

            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className={`flex flex-col items-center gap-1 rounded-2xl p-2.5 text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-md'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                  <span className="text-[11px] font-extrabold">{st.num}</span>
                </div>
                <span className="text-[10px] font-semibold truncate w-full">{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= STEP 1: WATCH LECTURE ================= */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Step 1: Curated Video Lecture ({activeLecture?.durationMinutes || 45} mins)
                </h3>
                <p className="text-xs text-slate-500">
                  Faculty: {activeLecture?.teacherName || 'Nursing Faculty'} • {activeLecture?.channel || 'Verified Channel'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {activeLecture && (
                  <button
                    type="button"
                    onClick={handleReportBrokenLecture}
                    className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer"
                    title="If video is unavailable, click to instantly find replacement"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Report / Replace</span>
                  </button>
                )}
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Free Lecture</span>
                </span>
              </div>
            </div>

            {/* Recovery notification if video was switched */}
            {recoveryNotice && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 p-3.5 border border-amber-200 text-xs text-amber-900">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{recoveryNotice}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRecoveryNotice(null)}
                  className="text-amber-700 hover:underline text-[11px] font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}

            {activeLecture?.videoId ? (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-200">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeLecture.videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={activeLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mx-auto">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-800">This lecture is currently being verified.</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You can proceed directly to the complete Smart Clinical Notes, 5-Column NANDA Care Plan, and Exam Questions below.
                </p>
                <button
                  type="button"
                  onClick={() => handleAdvanceStep(2)}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer"
                >
                  Continue with Smart Notes & NCP
                </button>
              </div>
            )}

            {/* Alternative resources picker if available */}
            {alternativeLectures.length > 0 && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-600 font-medium">
                  Alternative Faculty Lecture Available: <strong>{alternativeLectures[0].teacherName} ({alternativeLectures[0].channel})</strong>
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectAlternativeLecture(alternativeLectures[0])}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0 cursor-pointer"
                >
                  Switch to this lecture
                </button>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleAdvanceStep(2)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                <span>Complete Lecture & Read Notes</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: READ SMART NOTES & NCP ================= */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Step 2: Smart Clinical Notes & 5-Column NANDA Care Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Aligned with MUHS theory questions & clinical guidelines
                </p>
              </div>

              <div className="flex rounded-xl bg-slate-100 p-1">
                {(['quick', 'detailed', 'lastMinute'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setNotesViewMode(mode)}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                      notesViewMode === mode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    {mode === 'quick' ? 'Quick Notes (2m)' : mode === 'detailed' ? 'Detailed Notes' : 'Last-Minute Revision'}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Content */}
            <div className="max-h-80 overflow-y-auto space-y-4 pr-1 text-xs text-slate-800 leading-relaxed">
              {notesViewMode === 'quick' && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <h4 className="font-bold text-slate-900">Core Summary</h4>
                  <p>{structuredNotes.overview}</p>
                  <div className="space-y-1">
                    <strong className="text-emerald-900">Clinical Pearls:</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {structuredNotes.clinicalPearls.map((cp, idx) => (
                        <li key={idx}>{cp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {notesViewMode === 'detailed' && (
                <div className="space-y-3">
                  {structuredNotes.sections.map((sec, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 p-4 space-y-2">
                      <h4 className="font-bold text-slate-900">{sec.title}</h4>
                      {Array.isArray(sec.content) ? (
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          {sec.content.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="whitespace-pre-line text-slate-700">{sec.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {notesViewMode === 'lastMinute' && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 space-y-3">
                  <h4 className="font-bold text-amber-950">⚡ Last-Minute Exam Focus Points</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-amber-900 text-xs">
                    {structuredNotes.quickRevisionPoints.map((qrp, idx) => (
                      <li key={idx}>{qrp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5-Column NCP */}
              {topic.nursingCarePlan && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 space-y-2">
                  <h4 className="font-bold text-emerald-950">5-Column NANDA Nursing Care Plan</h4>
                  <div className="text-[11px] space-y-1.5">
                    <div>
                      <strong>Diagnosis:</strong> {topic.nursingCarePlan.nursingDiagnosis}
                    </div>
                    <div>
                      <strong>Outcome:</strong> {topic.nursingCarePlan.expectedOutcome}
                    </div>
                    <div>
                      <strong>Key Interventions:</strong> {topic.nursingCarePlan.interventions.join('; ')}
                    </div>
                    <div className="text-emerald-800">
                      <strong>Rationales:</strong> {topic.nursingCarePlan.rationales.join('; ')}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Lecture</span>
              </button>
              <button
                type="button"
                onClick={() => handleAdvanceStep(3)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                <span>Proceed to MCQ Practice</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SOLVE MCQS ================= */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Step 3: Clinical Vignette MCQs (NORCET & MUHS Section-A)
              </h3>
              <p className="text-xs text-slate-500">
                Practice clinical decision-making and rationale analysis
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
              {(topic.mcqs || []).map((mcq, idx) => {
                const selected = selectedAnswers[mcq.id];
                return (
                  <div key={mcq.id || idx} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {idx + 1}. {mcq.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mcq.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [mcq.id]: opt.id
                            }))
                          }
                          className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all cursor-pointer ${
                            selected === opt.id
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                          }`}
                        >
                          <span>
                            {opt.id}. {opt.text}
                          </span>
                          {selected === opt.id && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                        </button>
                      ))}
                    </div>

                    {selected && (
                      <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-700 space-y-1">
                        <div>
                          <strong>Correct:</strong> {mcq.correctAnswerId}
                        </div>
                        <p>{mcq.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Notes</span>
              </button>
              <button
                type="button"
                onClick={() => handleAdvanceStep(4)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                <span>Take Mini Test</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: MINI TEST ================= */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Step 4: 5-Question Mastery Mini Test
              </h3>
              <p className="text-xs text-slate-500">
                Verifies immediate knowledge retention and clinical diagnosis accuracy
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
              {(topic.mcqs || []).slice(0, 5).map((mcq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    Q{idx + 1}: {mcq.question}
                  </p>
                  <div className="space-y-1.5">
                    {mcq.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setMiniTestAnswers((prev) => ({
                            ...prev,
                            [mcq.id]: opt.id
                          }))
                        }
                        className={`w-full flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition-all cursor-pointer ${
                          miniTestAnswers[mcq.id] === opt.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                            : 'border-slate-200 bg-white text-slate-800'
                        }`}
                      >
                        <span>
                          {opt.id}. {opt.text}
                        </span>
                        {miniTestAnswers[mcq.id] === opt.id && (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Practice</span>
              </button>
              <button
                type="button"
                onClick={() => handleAdvanceStep(5)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                <span>Proceed to Revision Scheduler</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: SCHEDULE REVISION ================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Step 5: Automated Spaced Repetition Scheduling
              </h3>
              <p className="text-xs text-slate-500">
                Prevents clinical concept memory decay before university examinations
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Topic Study Cycle Completed!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Rate your mastery confidence to set your spaced revision interval:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'Strong' as const, label: 'Strong', desc: 'Interval: +7 Days', color: 'border-emerald-500 bg-emerald-100 text-emerald-950' },
                  { key: 'Moderate' as const, label: 'Moderate', desc: 'Interval: +3 Days', color: 'border-amber-500 bg-amber-100 text-amber-950' },
                  { key: 'Weak' as const, label: 'Needs Review', desc: 'Interval: +1 Day', color: 'border-rose-500 bg-rose-100 text-rose-950' }
                ].map((perf) => (
                  <button
                    key={perf.key}
                    type="button"
                    onClick={() => setRevisionPerformance(perf.key)}
                    className={`rounded-2xl border p-3.5 text-center transition-all cursor-pointer ${
                      revisionPerformance === perf.key
                        ? `${perf.color} font-extrabold shadow-sm`
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-sm">{perf.label}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">{perf.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Mini Test</span>
              </button>
              <button
                type="button"
                onClick={() => handleAdvanceStep(6)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                <span>Save & Complete Focus Session</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
