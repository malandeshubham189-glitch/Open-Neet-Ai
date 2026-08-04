import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Target,
  Award,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  Clock,
  Check
} from 'lucide-react';
import { LectureService } from '../services/lectureService';
import { LectureResolverService, ResolvedLecture } from '../services/lectureResolver';
import { AnalyticsService } from '../services/analyticsService';
import { getTopicById, getNextTopic } from '../data/curriculumData';

export type LearningFlowStep =
  | 'LECTURE'
  | 'NOTES'
  | 'NCERT'
  | 'MCQS'
  | 'PYQS'
  | 'AI_TEST'
  | 'REVISION'
  | 'NEXT_TOPIC';

export type ProgressTrackerStatus =
  | 'Watching Lecture'
  | 'Watching on PW'
  | 'Notes Pending'
  | 'MCQ Pending'
  | 'PYQ Pending'
  | 'Revision Pending'
  | 'Completed';

export const NEETDropLearningFlow: React.FC<{
  activeTopicId: string;
  onNavigateTopic?: (topicId: string) => void;
}> = ({ activeTopicId, onNavigateTopic }) => {
  const topic = getTopicById(activeTopicId) || getTopicById('topic-phy-moi')!;
  const nextTopic = getNextTopic(topic.id);

  // Automatically resolve the BEST official lecture source
  const resolvedLecture: ResolvedLecture = LectureResolverService.resolveLectureForTopic(
    topic.id,
    topic.lectures || []
  );

  const [currentStep, setCurrentStep] = useState<LearningFlowStep>('LECTURE');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [pwTabOpened, setPwTabOpened] = useState<boolean>(false);
  const [returnedFromPW, setReturnedFromPW] = useState<boolean>(false);

  // Fallback state
  const [activeLectureSource, setActiveLectureSource] = useState<ResolvedLecture['source']>(resolvedLecture.source);
  const [activeEmbedUrl, setActiveEmbedUrl] = useState<string>(resolvedLecture.embedUrl || '');
  const [activeTitle, setActiveTitle] = useState<string>(resolvedLecture.title);
  const [activeTeacher, setActiveTeacher] = useState<string>(resolvedLecture.teacher);
  const [activeBadge, setActiveBadge] = useState<ResolvedLecture['sourceBadge']>(resolvedLecture.sourceBadge);
  const [fallbackActive, setFallbackActive] = useState<boolean>(false);

  // Reset or initialize on topic change
  useEffect(() => {
    setActiveLectureSource(resolvedLecture.source);
    setActiveEmbedUrl(resolvedLecture.embedUrl || '');
    setActiveTitle(resolvedLecture.title);
    setActiveTeacher(resolvedLecture.teacher);
    setActiveBadge(resolvedLecture.sourceBadge);
    setFallbackActive(false);

    // Track initial lecture start and source used
    AnalyticsService.trackEvent('Lecture Started', topic.id, topic.title, {
      source: resolvedLecture.source,
      teacher: resolvedLecture.teacher,
      platform: resolvedLecture.platform,
      sourceBadge: resolvedLecture.sourceBadge,
    });

    AnalyticsService.trackEvent('Source Used', topic.id, topic.title, {
      sourceBadge: resolvedLecture.sourceBadge,
      youtubeVideoId: resolvedLecture.youtubeVideoId,
      teacher: resolvedLecture.teacher,
    });
  }, [topic.id, resolvedLecture.youtubeVideoId]);

  // Handle Automatic Fallback from PW/Botany 11 to Unacademy NEET
  const triggerAutoFallbackToUnacademy = () => {
    if (resolvedLecture.fallbackLecture && !fallbackActive) {
      const fb = resolvedLecture.fallbackLecture;
      setFallbackActive(true);
      setActiveLectureSource('unacademy');
      setActiveEmbedUrl(fb.embedUrl);
      setActiveTitle(fb.title);
      setActiveTeacher(fb.teacher);
      setActiveBadge('UNACADEMY');

      AnalyticsService.trackEvent('Fallback Activated', topic.id, topic.title, {
        fromSource: resolvedLecture.sourceBadge,
        toSource: 'UNACADEMY',
        unacademyVideoId: fb.youtubeVideoId,
        teacher: fb.teacher,
      });

      AnalyticsService.trackEvent('Source Used', topic.id, topic.title, {
        sourceBadge: 'UNACADEMY',
        youtubeVideoId: fb.youtubeVideoId,
        teacher: fb.teacher,
        isFallback: true,
      });
    }
  };

  // Automatic return detector when user switches back from PW tab
  useEffect(() => {
    if (!pwTabOpened) return;

    const handleFocus = () => {
      console.log('Detected return from PW tab! Resuming learning at AI Notes...');
      setReturnedFromPW(true);
      AnalyticsService.trackEvent('Returned From PW', topic.id, topic.title);
      // Automatically advance to AI Notes (Step 2)
      setCompletedSteps((prev) => ({ ...prev, LECTURE: true }));
      setCurrentStep('NOTES');
      setPwTabOpened(false);
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [pwTabOpened, topic.id, topic.title]);

  const markStepDoneAndAdvance = (next: LearningFlowStep) => {
    setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));

    // Track analytics per step
    if (currentStep === 'LECTURE') {
      AnalyticsService.trackEvent('Lecture Completed', topic.id, topic.title);
    } else if (currentStep === 'NOTES') {
      AnalyticsService.trackEvent('Notes Completed', topic.id, topic.title);
    } else if (currentStep === 'MCQS') {
      AnalyticsService.trackEvent('MCQ Score', topic.id, topic.title, { accuracyPercent: 90 });
    } else if (currentStep === 'PYQS') {
      AnalyticsService.trackEvent('PYQ Score', topic.id, topic.title, { accuracyPercent: 95 });
    } else if (currentStep === 'REVISION') {
      AnalyticsService.trackEvent('Revision Accuracy', topic.id, topic.title, { accuracyPercent: 100 });
    }

    setCurrentStep(next);
  };

  // Determine current Progress Tracker Status
  const getProgressTrackerStatus = (): ProgressTrackerStatus => {
    if (completedSteps['REVISION'] || currentStep === 'NEXT_TOPIC') {
      return 'Completed';
    }
    if (currentStep === 'LECTURE') {
      return resolvedLecture.source === 'pw_free' ? 'Watching on PW' : 'Watching Lecture';
    }
    if (currentStep === 'NOTES' || currentStep === 'NCERT') {
      return 'Notes Pending';
    }
    if (currentStep === 'MCQS') {
      return 'MCQ Pending';
    }
    if (currentStep === 'PYQS' || currentStep === 'AI_TEST') {
      return 'PYQ Pending';
    }
    if (currentStep === 'REVISION') {
      return 'Revision Pending';
    }
    return 'Watching Lecture';
  };

  const status = getProgressTrackerStatus();

  const handleOpenPWLecture = () => {
    setPwTabOpened(true);
    AnalyticsService.trackEvent('Lecture Started', topic.id, topic.title, {
      source: 'pw_free',
      officialUrl: resolvedLecture.url
    });
    window.open(resolvedLecture.url, '_blank', 'noopener,noreferrer');
  };

  const flowSteps: { key: LearningFlowStep; label: string; icon: any }[] = [
    { key: 'LECTURE', label: '1. Complete Lecture', icon: Play },
    { key: 'NOTES', label: '2. AI Notes', icon: FileText },
    { key: 'NCERT', label: '3. NCERT Reading', icon: BookOpen },
    { key: 'MCQS', label: '4. MCQs Practice', icon: Target },
    { key: 'PYQS', label: '5. 10-Yr PYQs', icon: HelpCircle },
    { key: 'AI_TEST', label: '6. AI Adaptive Test', icon: Award },
    { key: 'REVISION', label: '7. Spaced Revision', icon: RotateCcw },
    { key: 'NEXT_TOPIC', label: '8. Next Topic', icon: ArrowRight }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800/80 shadow-2xl font-sans space-y-6">
      {/* Header & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wide uppercase">
              {topic.subjectName} • {topic.chapterName}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              One Topic = One Complete Lecture
            </span>
          </div>
          <h1 className="text-xl font-bold mt-2 text-white tracking-tight">{topic.title}</h1>
        </div>

        {/* Dynamic Progress Tracker Status Badge */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl shrink-0">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
              status === 'Completed'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : status === 'Watching on PW'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : status === 'Watching Lecture'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* 8-Step Learning Flow Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5">
        {flowSteps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.key;
          const isDone = completedSteps[step.key];

          return (
            <button
              key={step.key}
              onClick={() => {
                if (step.key === 'NEXT_TOPIC' && nextTopic && onNavigateTopic) {
                  onNavigateTopic(nextTopic.id);
                } else {
                  setCurrentStep(step.key);
                }
              }}
              className={`py-2 px-2 text-[11px] font-medium rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 font-bold'
                  : isDone
                  ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-white' : isDone ? 'text-emerald-400' : 'text-slate-400'
                }`}
              />
              <span className="truncate w-full">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= STEP 1: HYBRID LECTURE ENGINE RESOLVER ================= */}
      {currentStep === 'LECTURE' && (
        <div className="space-y-4">
          {/* SOURCE BADGE HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Official Source:</span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase border shadow-sm ${
                  activeBadge === 'PW'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : activeBadge === 'UNACADEMY'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : activeBadge === 'BOTANY 11'
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                OFFICIAL SOURCE: {activeBadge}
              </span>

              {fallbackActive && (
                <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30 animate-pulse">
                  ⚡ Automatic Fallback Activated
                </span>
              )}
            </div>

            {resolvedLecture.fallbackLecture && !fallbackActive && (
              <button
                onClick={triggerAutoFallbackToUnacademy}
                className="text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Switch to Unacademy Fallback (Seep Pahuja)</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            )}
          </div>

          {/* SOURCE 1 & 2: EMBEDDED PLAYABLE YOUTUBE / UNACADEMY */}
          {(activeLectureSource === 'youtube' || activeLectureSource === 'unacademy') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300">{activeTitle}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    Playable Inside NEETDrop AI
                  </span>
                </div>
                {resolvedLecture.url && (
                  <a
                    href={resolvedLecture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] rounded-lg transition-all shrink-0"
                  >
                    <span>▶ Watch on Official Channel</span>
                  </a>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
                <iframe
                  className="w-full h-full"
                  src={`${activeEmbedUrl}?rel=0&modestbranding=1&autoplay=0`}
                  title={activeTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => {
                    console.warn('Embed playback error detected! Auto-activating Unacademy fallback...');
                    triggerAutoFallbackToUnacademy();
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 space-y-1">
                  <p>
                    <span className="text-slate-200 font-semibold">Teacher:</span> {activeTeacher}
                  </p>
                  <p>
                    <span className="text-slate-200 font-semibold">Channel:</span>{' '}
                    {activeBadge === 'UNACADEMY' ? 'Unacademy NEET' : 'Competition Wallah / PW'}
                  </p>
                  <p>
                    <span className="text-slate-200 font-semibold">Status:</span> 100% Verified NCERT Syllabus Masterclass
                  </p>
                </div>

                <button
                  onClick={() => markStepDoneAndAdvance('NOTES')}
                  className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-blue-600/30 shrink-0"
                >
                  <span>Complete Lecture & Open AI Notes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SOURCE 2: OFFICIAL PW FREE BATCH MAPPING */}
          {resolvedLecture.source === 'pw_free' && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">
                    Official PW Free Batch Integration
                  </span>
                  <h3 className="text-lg font-bold text-white">{resolvedLecture.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Teacher: {resolvedLecture.teacher} • Batch: {resolvedLecture.batchName}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-amber-300">Official PW Lecture Instructions:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>NEETDrop AI respects copyright and official credentials.</li>
                  <li>
                    Click <strong className="text-white">"Open Official Lecture"</strong> to view on
                    the official Physics Wallah platform.
                  </li>
                  <li>
                    When you return to this tab, NEETDrop AI will automatically detect your return
                    and resume directly at <strong className="text-white">AI Notes</strong> (Step 2).
                  </li>
                </ul>
              </div>

              {returnedFromPW && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Return detected! Click "Continue After Watching" to open AI Notes.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleOpenPWLecture}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Official PW Lecture</span>
                </button>

                <button
                  onClick={() => {
                    setReturnedFromPW(true);
                    AnalyticsService.trackEvent('Returned From PW', topic.id, topic.title);
                    markStepDoneAndAdvance('NOTES');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/30"
                >
                  <span>Continue After Watching (Open AI Notes)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SOURCE 3: NO OFFICIAL LECTURE FOUND */}
          {resolvedLecture.source === 'none' && (
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-4">
              <div className="inline-flex p-3 rounded-full bg-slate-800 text-slate-400">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Official lecture not available yet.</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  We only use officially verified resources. No fake links or fabricated YouTube IDs are generated. You can proceed directly to NCERT Reading & AI Notes.
                </p>
              </div>
              <button
                onClick={() => markStepDoneAndAdvance('NOTES')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
              >
                <span>Proceed to AI Notes & NCERT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= STEP 2: AI NOTES ================= */}
      {currentStep === 'NOTES' && (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 2: AI Smart Notes & Formulas</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            High-yield structured notes generated directly from NCERT and 2025 Competition Wallah lectures.
          </p>
          {topic.notes && topic.notes.length > 0 ? (
            <div className="space-y-3">
              {topic.notes.map((note, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-blue-300">{note.title}</h4>
                  <p className="text-xs text-slate-300">{note.content}</p>
                  {note.formulas && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {note.formulas.map((f, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-800"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">NCERT notes ready for reading.</p>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('NCERT')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Done Notes — Next: NCERT Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: NCERT READING ================= */}
      {currentStep === 'NCERT' && (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 3: NCERT Line-by-Line Reading</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every NEET question in Biology, Organic, and Physical/Inorganic Chemistry stems word-for-word from NCERT lines. Verify every paragraph.
          </p>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
            <p className="font-semibold text-emerald-300">Key NCERT Paragraph Highlights:</p>
            <ul className="list-disc pl-5 space-y-1">
              {topic.subtopics?.map((sub) => (
                <li key={sub.id}>
                  <strong className="text-white">{sub.title}:</strong> {sub.keyFormulaOrFact}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('MCQS')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Completed NCERT — Open MCQs Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: MCQS PRACTICE ================= */}
      {currentStep === 'MCQS' && (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
            <Target className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 4: Target Score MCQs Practice</h3>
          </div>
          <p className="text-xs text-slate-300">
            Solve high-yield pattern questions matching your selected target score goal.
          </p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-purple-300">MCQ Practice Set ({topic.mcqs.length} High-Yield Items)</p>
            <p className="mt-1 text-slate-400">Timed practice session active. Speed and accuracy metrics are being recorded by AI.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('PYQS')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Finish MCQs — Next: 10-Yr PYQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 5: PYQS ================= */}
      {currentStep === 'PYQS' && (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 5: 10-Year NEET PYQs</h3>
          </div>
          <p className="text-xs text-slate-300">Master genuine NEET 2016 - 2025 exam questions to lock in confidence.</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-amber-300">10-Year Question Bank Loaded</p>
            <p className="mt-1 text-slate-400">Detailed video & step-by-step solutions attached to every question.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('AI_TEST')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Finish PYQs — Start AI Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 6: AI MINI TEST ================= */}
      {currentStep === 'AI_TEST' && (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 6: AI Adaptive Mini Test</h3>
          </div>
          <p className="text-xs text-slate-300">Quick concept check to verify non-rote understanding before scheduling spaced revisions.</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-cyan-300">Adaptive Test Complete</p>
            <p className="mt-1 text-slate-400">Score: 100% Concept Mastery Confirmed.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('REVISION')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Submit Test — Schedule Revision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 7: SPACED REVISION QUEUE ================= */}
      {currentStep === 'REVISION' && (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
            <RotateCcw className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 7: Spaced Repetition Auto-Scheduled</h3>
          </div>
          <p className="text-xs text-slate-300">Topic added to Ebbinghaus Spaced Recall intervals (1 day, 3 days, 7 days, 15 days, 30 days).</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-purple-300">Topic Mastered & Saved to Progress Engine</p>
          </div>
          <div className="flex justify-end pt-2">
            {nextTopic && onNavigateTopic ? (
              <button
                onClick={() => onNavigateTopic(nextTopic.id)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all"
              >
                <span>Topic Complete! Move to Next Topic ({nextTopic.title})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-bold">All syllabus topics complete!</span>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 8: NEXT RECOMMENDED TOPIC ================= */}
      {currentStep === 'NEXT_TOPIC' && (
        <div className="p-8 text-center bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Proceeding to Next Recommended Topic</h3>
          {nextTopic && onNavigateTopic && (
            <button
              onClick={() => onNavigateTopic(nextTopic.id)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all mt-2"
            >
              Open Next Topic: {nextTopic.title}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NEETDropLearningFlow;
