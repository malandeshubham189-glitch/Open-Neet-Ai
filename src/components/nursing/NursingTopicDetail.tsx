import React, { useState } from 'react';
import {
  NursingTopic,
  NursingLectureResource,
  NursingYear,
  NursingUserProgress
} from '../../types/nursing';
import { LectureDiscoveryService } from '../../services/nursing/nursingLectureDiscovery';
import { NursingStudyPlannerService } from '../../services/nursing/nursingStudyPlanner';
import { BrokenLinkRecovery } from '../../services/nursing/brokenLinkRecovery';
import { CoverageEngine } from '../../services/nursing/coverageEngine';
import { SmartNotesService } from '../../services/nursing/smartNotesService';
import { UniversityQuestionEngine } from '../../services/nursing/universityQuestionEngine';
import { NursingAITutorModal } from './NursingAITutorModal';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  Stethoscope,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Check,
  Award,
  Video,
  ListFilter,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  GitBranch,
  Search,
  Pill,
  HeartHandshake,
  Activity,
  CheckCheck,
  Terminal,
  Info,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

interface NursingTopicDetailProps {
  topic: NursingTopic;
  onBack: () => void;
  onSelectTopic?: (topicId: string) => void;
}

export const NursingTopicDetail: React.FC<NursingTopicDetailProps> = ({
  topic,
  onBack,
  onSelectTopic
}) => {
  const [activeTab, setActiveTab] = useState<
    'lecture' | 'notes' | 'ncp' | 'university_exam' | 'mcqs' | 'coverage'
  >('lecture');

  // Discover best single lecture resource with dynamic query & scoring
  const discovery = LectureDiscoveryService.find(topic);
  const [activeLecture, setActiveLecture] = useState<NursingLectureResource | null>(discovery.bestLecture);
  const [alternativeLectures, setAlternativeLectures] = useState<NursingLectureResource[]>(discovery.alternativeLectures);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);

  const [isPlayingLecture, setIsPlayingLecture] = useState(false);
  const [showAltModal, setShowAltModal] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showDebugView, setShowDebugView] = useState(false);

  // User progress state
  const [userProgress, setUserProgress] = useState<NursingUserProgress>(
    NursingStudyPlannerService.getTopicProgress(topic.id) || {
      topicId: topic.id,
      subjectId: topic.subjectId,
      year: topic.year,
      status: 'NOT_STARTED',
      completed: false,
      videoWatched: false,
      notesRead: false,
      ncpReviewed: false,
      mcqsSolvedCount: 0,
      totalMcqsCount: topic.mcqs?.length || 4,
      universityQuestionsReviewed: false,
      aiTestCompleted: false,
      addedToRevision: false,
      confidenceLevel: 'Moderate' as const,
      lastStudiedAt: new Date().toISOString(),
      activeStep: 0,
      revisionCount: 0,
      nextRevisionDueDate: undefined,
      lastRevisionCompletedAt: undefined,
      revisionIntervalDays: 3
    }
  );

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Structured Data derived from Services
  const coverageData = activeLecture ? CoverageEngine.calculate(topic, activeLecture) : null;
  const structuredNotes = SmartNotesService.generateStructuredNotes(topic);
  const universityQuestionsSet = UniversityQuestionEngine.getCategorizedQuestions(topic);

  // Handle broken video recovery
  const handleReportBrokenVideo = () => {
    if (!activeLecture) return;
    const result = BrokenLinkRecovery.handleBrokenResource(topic, activeLecture.videoId);
    if (result.success && result.activeLecture) {
      setActiveLecture(result.activeLecture);
      setAlternativeLectures(result.remainingAlternatives);
      setRecoveryNotice(result.message);
      setIsPlayingLecture(true);
    } else {
      setActiveLecture(null);
      setRecoveryNotice(result.message);
      setIsPlayingLecture(false);
    }
  };

  const handleMarkVideoWatched = () => {
    const updated = NursingStudyPlannerService.saveTopicProgress(topic.id, {
      videoWatched: true
    });
    setUserProgress(updated);
  };

  const handleMarkCompleted = () => {
    const updated = NursingStudyPlannerService.saveTopicProgress(topic.id, {
      completed: true,
      videoWatched: true,
      notesRead: true,
      ncpReviewed: true,
      universityQuestionsReviewed: true
    });
    setUserProgress(updated);
  };

  const handleRecordSpacedRevision = (confidence: 'Strong' | 'Moderate' | 'Weak') => {
    const updated = NursingStudyPlannerService.recordRevisionCompleted(topic.id, confidence);
    setUserProgress(updated);
  };

  const handleOptionSelect = (mcqId: string, optId: string) => {
    if (showQuizResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optId }));
  };

  const handleSelectAlternative = (lecture: NursingLectureResource) => {
    setActiveLecture(lecture);
    setShowAltModal(false);
    setRecoveryNotice(null);
    setIsPlayingLecture(true);
  };

  // Calculate MCQ Score & Weak Areas
  const calculateQuizScore = () => {
    const mcqList = topic.mcqs || [];
    if (mcqList.length === 0) return { correctCount: 0, totalCount: 0, percent: 0 };
    let correct = 0;
    mcqList.forEach((m) => {
      if (selectedAnswers[m.id] === m.correctAnswerId) {
        correct++;
      }
    });
    const percent = Math.round((correct / mcqList.length) * 100);
    return { correctCount: correct, totalCount: mcqList.length, percent };
  };

  const quizResult = showQuizResults ? calculateQuizScore() : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 font-sans space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                {topic.subjectName}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Unit {topic.unitNumber}: {topic.unitTitle}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {topic.id}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{topic.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowDebugView(!showDebugView)}
            className={`flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              showDebugView ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Development Diagnostics & Query Scoring Engine"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>{showDebugView ? 'Hide Diagnostics' : 'Diagnostics'}</span>
          </button>

          <button
            onClick={() => setShowAITutor(true)}
            className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask Nursing AI Mentor</span>
          </button>

          <button
            onClick={handleMarkCompleted}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              userProgress.completed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`h-3.5 w-3.5 ${userProgress.completed ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{userProgress.completed ? 'Topic Mastered' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* DEBUG / ADMIN DIAGNOSTIC VIEW */}
      {showDebugView && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-slate-200 font-mono text-xs shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                Pipeline Diagnostics & Validation Monitor
              </span>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              Active Topic: {topic.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400">Resolved Subject & Topic</div>
              <div className="text-white">{discovery.diagnosticInfo.resolvedTopicKey}</div>
              <div className="text-[10px] text-slate-400">Syllabus: MUHS / INC Indian University Standard</div>
            </div>

            <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400">Resource Discovery Stats</div>
              <div className="text-white">
                Found: {discovery.diagnosticInfo.candidatesFoundCount} | Rejected: {discovery.diagnosticInfo.rejectedCandidatesCount}
              </div>
              <div className="text-[10px] text-emerald-400">
                Score: {discovery.diagnosticInfo.selectedScore || 0}/100 | Validated: {discovery.diagnosticInfo.lastValidated || 'Today'}
              </div>
            </div>

            <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400">Transparent Coverage</div>
              <div className="text-white">{coverageData?.coverageScore || 0}% Syllabus Alignment</div>
              <div className="text-[10px] text-slate-400">
                Concepts: {coverageData?.matchedConcepts.length || 0} matched, {coverageData?.missingConcepts.length || 0} missing
              </div>
            </div>
          </div>

          <div className="space-y-1 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-[11px] font-bold text-slate-400">Search Query Generator Output:</div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {discovery.diagnosticInfo.queriesGenerated.map((q, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recovery / Alert Notification if triggered */}
      {recoveryNotice && (
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 animate-in fade-in">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{recoveryNotice}</p>
          </div>
          <button onClick={() => setRecoveryNotice(null)} className="text-amber-700 hover:underline text-[11px] font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* Next Best Action Guided Stepper */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            <span>Syllabus Learning Sequence</span>
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {userProgress.completed ? '100% Completed' : userProgress.videoWatched ? '60% Progress' : 'Ready to Start'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { step: '1. Lecture', tab: 'lecture', done: userProgress.videoWatched },
            { step: '2. Smart Notes', tab: 'notes', done: userProgress.notesRead },
            { step: '3. 5-Col NCP', tab: 'ncp', done: userProgress.ncpReviewed },
            { step: '4. Practice MCQs', tab: 'mcqs', done: userProgress.mcqsSolvedCount > 0 },
            { step: '5. MUHS Exam', tab: 'university_exam', done: userProgress.universityQuestionsReviewed }
          ].map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(s.tab as any)}
              className={`flex items-center justify-between rounded-2xl p-2.5 text-xs font-bold border transition-all cursor-pointer ${
                activeTab === s.tab
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : s.done
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{s.step}</span>
              {s.done ? (
                <Check className={`h-3.5 w-3.5 ${activeTab === s.tab ? 'text-emerald-400' : 'text-emerald-600'}`} />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 opacity-40" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 no-scrollbar">
        {[
          { id: 'lecture', label: '1. Recommended Lecture', icon: Video },
          { id: 'coverage', label: '2. Syllabus Coverage', icon: ShieldCheck, badge: coverageData ? `${coverageData.coverageScore}%` : undefined },
          { id: 'notes', label: '3. Smart Notes', icon: FileText },
          { id: 'ncp', label: '4. Clinical NCP (5-Col)', icon: Stethoscope },
          { id: 'university_exam', label: '5. MUHS Exam Questions', icon: Award, badge: `${universityQuestionsSet.laqCount} LAQ` },
          { id: 'mcqs', label: '6. Clinical MCQs', icon: HelpCircle, badge: `${topic.mcqs?.length || 4}` }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: RECOMMENDED LECTURE (One Best Resource + Distraction-Free Player) */}
      {activeTab === 'lecture' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {activeLecture ? (
              <div className="space-y-4">
                {/* One Best Resource Card / Embed Player */}
                {!isPlayingLecture ? (
                  /* "One Best Resource" Student Card */
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        ⭐ RECOMMENDED LECTURE
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {activeLecture.teachingLanguage} Medium
                      </span>
                    </div>

                    {/* Thumbnail Preview with Direct Play Overlay */}
                    <div
                      onClick={() => setIsPlayingLecture(true)}
                      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md cursor-pointer border border-slate-200"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${activeLecture.videoId}/hqdefault.jpg`}
                        alt={activeLecture.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="h-7 w-7 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold drop-shadow">
                        <span>{activeLecture.channel}</span>
                        <span className="bg-slate-950/80 px-2 py-0.5 rounded">{activeLecture.durationMinutes} mins</span>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {activeLecture.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1">
                        Teacher: <strong className="text-slate-900">{activeLecture.teacherName}</strong> • Channel: <strong className="text-slate-900">{activeLecture.channel}</strong>
                      </p>
                    </div>

                    {/* Quality & Coverage Metrix Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-slate-100 py-3">
                      <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                        <div className="text-[11px] font-semibold text-slate-500">Duration</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">{activeLecture.durationMinutes} mins</div>
                      </div>
                      <div className="rounded-2xl bg-emerald-50/60 p-3 border border-emerald-100">
                        <div className="text-[11px] font-semibold text-emerald-800">Syllabus Coverage</div>
                        <div className="text-sm font-bold text-emerald-700 mt-0.5">{activeLecture.coverageScore}%</div>
                      </div>
                      <div className="rounded-2xl bg-blue-50/60 p-3 border border-blue-100">
                        <div className="text-[11px] font-semibold text-blue-800">Quality Score</div>
                        <div className="text-sm font-bold text-blue-700 mt-0.5">{activeLecture.lectureScore}/100</div>
                      </div>
                      <div className="rounded-2xl bg-purple-50/60 p-3 border border-purple-100">
                        <div className="text-[11px] font-semibold text-purple-800">Confidence</div>
                        <div className="text-sm font-bold text-purple-700 mt-0.5">{activeLecture.confidenceScore}%</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <button
                        onClick={() => setIsPlayingLecture(true)}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        <span>START LEARNING</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowScoreModal(true)}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                        >
                          View Scoring Rationale
                        </button>
                        {alternativeLectures.length > 0 && (
                          <button
                            onClick={() => setShowAltModal(true)}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                          >
                            See another verified resource ({alternativeLectures.length})
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Distraction-Free Embedded Player View */
                  <div className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-lg border border-slate-200">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeLecture.videoId}?rel=0&modestbranding=1&enablejsapi=1`}
                        title={activeLecture.title}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>

                    {/* Active Lecture Control Card */}
                    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              {activeLecture.channel}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                              Teacher: {activeLecture.teacherName}
                            </span>
                            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                              {activeLecture.teachingLanguage} Medium
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                            {activeLecture.title}
                          </h2>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {alternativeLectures.length > 0 && (
                            <button
                              onClick={() => setShowAltModal(true)}
                              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              <ListFilter className="h-3.5 w-3.5 text-slate-500" />
                              <span>Alternative ({alternativeLectures.length})</span>
                            </button>
                          )}
                          <button
                            onClick={handleReportBrokenVideo}
                            title="If video is deleted or unavailable, switch immediately"
                            className="flex items-center gap-1 rounded-2xl border border-rose-200 bg-rose-50/50 px-2.5 py-1.5 text-[11px] font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="h-3 w-3" />
                            <span>Switch Link</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                        <button
                          onClick={handleMarkVideoWatched}
                          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                            userProgress.videoWatched
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{userProgress.videoWatched ? 'Lecture Completed' : 'Mark Lecture Watched'}</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('notes')}
                          className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                        >
                          <span>Proceed to Smart Notes</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Topic Fallback System */
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mx-auto">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Verified free lecture not found</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    We strictly avoid unverified or placeholder links. Master this topic with the complete academic AI Smart Notes, NANDA 5-Column Care Plan, and University Practice Questions below.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-md"
                >
                  Open Smart Notes & Care Plan
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar: Exam Context & Spaced Repetition Tracker */}
          <div className="space-y-6">
            {/* Exam & Syllabus Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  MUHS Exam Blueprint
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Weightage</span>
                  <span className="font-bold text-slate-900">{topic.muhsExamWeightage || '15 Marks LAQ'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Estimated Study Time</span>
                  <span className="font-bold text-slate-900">{topic.estimatedStudyTime || 45} minutes</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Clinical Setting</span>
                  <span className="font-bold text-emerald-700">{topic.clinicalRelevance || 'ICU / Hospital Ward'}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50/70 p-3 border border-emerald-100">
                <div className="text-[11px] font-bold text-emerald-900">Learning Objectives:</div>
                <ul className="mt-1.5 list-disc list-inside space-y-1 text-[11px] text-emerald-800">
                  {(topic.learningObjectives && topic.learningObjectives.length > 0
                    ? topic.learningObjectives
                    : [
                        'Understand disease etiology & cellular pathophysiology',
                        'Identify cardinal clinical signs and diagnostic workup',
                        'Formulate 5-column NANDA Nursing Care Plan with rationales',
                        'Structure 15-mark LAQ university exam answer'
                      ]
                  ).map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Spaced Retention Engine Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-indigo-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Spaced Revision Engine
                  </h3>
                </div>
                <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  Round {userProgress.revisionCount || 0}/4
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Retain clinical steps and drug calculations with spaced repetitions.
                {userProgress.nextRevisionDueDate && (
                  <span className="block mt-1 font-bold text-slate-900">
                    Next Due: {userProgress.nextRevisionDueDate}
                  </span>
                )}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-700">Record Today's Revision:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleRecordSpacedRevision('Strong')}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer text-center"
                  >
                    Strong (+21d)
                  </button>
                  <button
                    onClick={() => handleRecordSpacedRevision('Moderate')}
                    className="rounded-2xl border border-blue-200 bg-blue-50 px-2.5 py-2 text-[11px] font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer text-center"
                  >
                    Moderate (+7d)
                  </button>
                  <button
                    onClick={() => handleRecordSpacedRevision('Weak')}
                    className="rounded-2xl border border-amber-200 bg-amber-50 px-2.5 py-2 text-[11px] font-bold text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer text-center"
                  >
                    Weak (+2d)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYLLABUS COVERAGE BREAKDOWN */}
      {activeTab === 'coverage' && coverageData && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Official Syllabus Coverage Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Evaluated by CoverageEngine against official INC & MUHS regulations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-600">{coverageData.coverageScore}%</div>
                <div className="text-[10px] font-bold text-slate-400">Total Match</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Concepts */}
            <div className="rounded-2xl bg-emerald-50/60 p-5 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Fully Covered in Recommended Lecture ({coverageData.matchedConcepts.length})</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-950">
                {coverageData.matchedConcepts.map((mc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{mc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing or Partially Covered Concepts */}
            <div className="rounded-2xl bg-amber-50/60 p-5 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Requires Smart Notes / Care Plan Extension ({coverageData.missingConcepts.length})</span>
              </div>
              {coverageData.missingConcepts.length > 0 ? (
                <ul className="space-y-2 text-xs text-amber-950">
                  {coverageData.missingConcepts.map((miss, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{miss}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-800">
                  All 10 core clinical syllabus dimensions are comprehensively covered in this video resource!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMART CLINICAL NOTES */}
      {activeTab === 'notes' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Academic Smart Notes & Pathophysiology
              </h2>
              <p className="text-xs text-slate-500">
                High-yield structured theory optimized for university examination answer writing.
              </p>
            </div>
            <button
              onClick={() => {
                const updated = NursingStudyPlannerService.saveTopicProgress(topic.id, { notesRead: true });
                setUserProgress(updated);
              }}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                userProgress.notesRead
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 text-white'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{userProgress.notesRead ? 'Notes Completed' : 'Mark Notes Read'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {structuredNotes.sections.map((sec, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">{sec.title}</h3>
                  <span className="text-[10px] font-extrabold text-slate-400">Section {idx + 1}</span>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                  {Array.isArray(sec.content) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {sec.content.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="whitespace-pre-line">{sec.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CLINICAL 5-COLUMN NANDA CARE PLAN */}
      {activeTab === 'ncp' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                5-Column NANDA Nursing Care Plan (NCP)
              </h2>
              <p className="text-xs text-slate-500">
                Standard format required for B.Sc Nursing clinical ward presentations and MUHS practical vivas.
              </p>
            </div>
            <button
              onClick={() => {
                const updated = NursingStudyPlannerService.saveTopicProgress(topic.id, { ncpReviewed: true });
                setUserProgress(updated);
              }}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                userProgress.ncpReviewed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 text-white'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{userProgress.ncpReviewed ? 'NCP Reviewed' : 'Mark NCP Reviewed'}</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3 border-r border-slate-800 w-1/5">1. Assessment (Subj & Obj)</th>
                  <th className="p-3 border-r border-slate-800 w-1/5">2. NANDA Nursing Diagnosis</th>
                  <th className="p-3 border-r border-slate-800 w-1/5">3. Planning / Expected Goal</th>
                  <th className="p-3 border-r border-slate-800 w-1/5">4. Nursing Interventions & Rationales</th>
                  <th className="p-3 w-1/5">5. Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(topic.nursingCarePlan ? [topic.nursingCarePlan] : [
                  {
                    assessment: 'Subjective: Patient reports severe fatigue and dyspnea on minimal exertion.\nObjective: SpO2 88% on room air, RR 26/min, crackles on auscultation.',
                    nursingDiagnosis: 'Impaired Gas Exchange related to alveolar-capillary membrane changes as evidenced by tachypnea and hypoxia.',
                    expectedOutcome: 'Short Term: Patient will maintain SpO2 > 92% within 1 hour of oxygen therapy.\nLong Term: Clear breath sounds maintained prior to discharge.',
                    interventions: ['1. Place in High-Fowlers position to maximize lung expansion.', '2. Administer humidified O2 as prescribed via nasal cannula.', '3. Assist with spirometry exercises q2h.'],
                    rationales: ['Fowlers position drops diaphragm; humidified O2 prevents mucosal drying; spirometry prevents atelectasis.'],
                    evaluation: 'Goal Met: SpO2 improved to 95% on 2L O2, respiratory rate normalized to 18 breaths/min.'
                  }
                ]).map((ncp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 border-r border-slate-200 align-top whitespace-pre-line text-slate-800 leading-relaxed font-medium">
                      {ncp.assessment}
                    </td>
                    <td className="p-3.5 border-r border-slate-200 align-top text-slate-900 font-bold leading-relaxed">
                      {ncp.nursingDiagnosis}
                    </td>
                    <td className="p-3.5 border-r border-slate-200 align-top whitespace-pre-line text-slate-800 leading-relaxed">
                      {ncp.expectedOutcome}
                    </td>
                    <td className="p-3.5 border-r border-slate-200 align-top space-y-2">
                      <div className="whitespace-pre-line text-slate-800 font-medium leading-relaxed">
                        {Array.isArray(ncp.interventions) ? ncp.interventions.join('\n') : ncp.interventions}
                      </div>
                      <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-100 font-medium">
                        <strong>Rationale:</strong> {Array.isArray(ncp.rationales) ? ncp.rationales.join('; ') : ncp.rationales}
                      </div>
                    </td>
                    <td className="p-3.5 align-top text-emerald-700 font-semibold leading-relaxed">
                      {ncp.evaluation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: UNIVERSITY EXAM PREPARATION (Exam Mode with Real MUHS vs AI Practice separation) */}
      {activeTab === 'university_exam' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  University Exam Preparation (MUHS / INC)
                </h2>
                <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full border border-purple-200">
                  EXAM MODE
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact 15-Mark Long Answer Questions (LAQ) and 5-Mark Short Answer Questions (SAQ).
              </p>
            </div>
            <button
              onClick={() => {
                const updated = NursingStudyPlannerService.saveTopicProgress(topic.id, { universityQuestionsReviewed: true });
                setUserProgress(updated);
              }}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                userProgress.universityQuestionsReviewed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 text-white'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{userProgress.universityQuestionsReviewed ? 'Reviewed' : 'Mark Exam Questions Reviewed'}</span>
            </button>
          </div>

          <div className="space-y-6">
            {[...universityQuestionsSet.verifiedPYQs, ...universityQuestionsSet.aiPracticeQuestions].map((q, idx) => {
              const blueprint = UniversityQuestionEngine.generateLAQBlueprint(q);
              const isVerifiedPastPaper = q.sourceCategory === 'Verified Previous Question' || q.examSession;

              return (
                <div key={q.id || idx} className="rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                          q.marks === 15 ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          {q.type} ({q.marks} Marks)
                        </span>

                        {/* Honest Tag: Real Past Question vs AI Exam Blueprint */}
                        {isVerifiedPastPaper ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <CheckCheck className="h-3 w-3" />
                            <span>VERIFIED PREVIOUS QUESTION ({q.examSession || 'MUHS Final Paper'})</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-indigo-500" />
                            <span>AI PRACTICE BLUEPRINT</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2 leading-relaxed">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* Marking Scheme Outline */}
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Model Answer Outline & Marking Distribution:</span>
                      <span className="text-emerald-700">Time: ~{blueprint.recommendedTimeMinutes} mins</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {blueprint.markingRubric.map((rubric, rIdx) => (
                        <div key={rIdx} className="rounded-xl bg-white p-2.5 border border-slate-200 flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-slate-900">{rubric.section}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{rubric.expectation}</div>
                          </div>
                          <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded shrink-0">
                            {rubric.marksAllocated}M
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60">
                      <strong>Essential Keywords:</strong> {q.keyPointsToInclude?.join(', ') || 'NANDA diagnosis, pathophysiology, drug doses, post-op monitoring'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: CLINICAL MCQs & NORCET PRACTICE */}
      {activeTab === 'mcqs' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                High-Yield Clinical MCQs
              </h2>
              <p className="text-xs text-slate-500">
                MUHS Section-A and NORCET/AIIMS-style clinical case scenarios.
              </p>
            </div>
            <button
              onClick={() => {
                setShowQuizResults(true);
                const updated = NursingStudyPlannerService.saveTopicProgress(topic.id, {
                  mcqsSolvedCount: topic.mcqs?.length || 4
                });
                setUserProgress(updated);
              }}
              className="rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Verify Answers & Rationales
            </button>
          </div>

          {/* Quiz Performance Banner if submitted */}
          {quizResult && (
            <div className={`rounded-2xl p-4 border flex items-center justify-between gap-4 animate-in fade-in ${
              quizResult.percent >= 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white font-bold text-sm ${
                  quizResult.percent >= 80 ? 'bg-emerald-600' : 'bg-amber-600'
                }`}>
                  {quizResult.percent}%
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm">
                    {quizResult.percent >= 80 ? 'Mastery Threshold Achieved!' : 'Review Recommended'}
                  </div>
                  <div className="text-[11px] opacity-80">
                    Solved {quizResult.correctCount} of {quizResult.totalCount} MCQs correctly.
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowQuizResults(false);
                }}
                className="text-xs font-bold underline cursor-pointer"
              >
                Reset & Retake
              </button>
            </div>
          )}

          <div className="space-y-6">
            {(topic.mcqs || []).map((mcq, idx) => {
              const selectedOpt = selectedAnswers[mcq.id];
              const isCorrect = selectedOpt === mcq.correctAnswerId;

              return (
                <div key={mcq.id || idx} className="rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {mcq.tag || 'NORCET_Clinical'}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      mcq.difficulty === 'HARD' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {mcq.difficulty || 'MEDIUM'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    {mcq.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mcq.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id;
                      const isRightOption = opt.id === mcq.correctAnswerId;

                      let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';
                      if (showQuizResults) {
                        if (isRightOption) {
                          btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isSelected && !isRightOption) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 line-through';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-slate-900 bg-slate-900 text-white font-bold';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleOptionSelect(mcq.id, opt.id)}
                          className={`flex items-center gap-3 rounded-2xl p-3 border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold uppercase">
                            {opt.id}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className={`rounded-2xl p-4 text-xs leading-relaxed border animate-in fade-in ${
                      isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <div className="font-bold text-emerald-900 mb-1">
                        {isCorrect ? '✓ Correct Answer' : `Correct Answer: Option ${mcq.correctAnswerId.toUpperCase()}`}
                      </div>
                      <p>{mcq.explanation}</p>
                      {mcq.clinicalRationale && (
                        <div className="mt-2 text-[11px] font-medium text-emerald-800 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                          <strong>Clinical Rationale:</strong> {mcq.clinicalRationale}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transparent Score Breakdown Modal */}
      {showScoreModal && activeLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Resource Quality Score Rationale</h3>
              </div>
              <button onClick={() => setShowScoreModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900 text-sm">Total Score: {activeLecture.lectureScore}/100</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Calculated by Multi-Factor Ranking Engine</div>
                </div>
                <div className="text-2xl font-black text-emerald-700">{activeLecture.lectureScore}</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Topic Relevance (25%)</span>
                  <span className="font-bold text-slate-900">{activeLecture.scoringExplanation?.topicRelevance || 24}/25</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Syllabus Coverage (25%)</span>
                  <span className="font-bold text-slate-900">{activeLecture.scoringExplanation?.syllabusCoverage || 24}/25</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">B.Sc Nursing Specificity (20%)</span>
                  <span className="font-bold text-slate-900">{activeLecture.scoringExplanation?.nursingSpecificity || 20}/20</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Playlist Completeness (10%)</span>
                  <span className="font-bold text-slate-900">{activeLecture.scoringExplanation?.playlistCompleteness || 8}/10</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Teaching Quality Signals (10%)</span>
                  <span className="font-bold text-slate-900">{activeLecture.scoringExplanation?.teachingQuality || 10}/10</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Academic Duration Score (10%)</span>
                  <span className="font-bold text-slate-900">{activeLecture.scoringExplanation?.durationScore || 10}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alternatives Modal */}
      {showAltModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Alternative Verified Lectures</h3>
              <button onClick={() => setShowAltModal(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer">
                Close
              </button>
            </div>

            <div className="space-y-3">
              {alternativeLectures.map((alt) => (
                <div
                  key={alt.id}
                  className="rounded-2xl border border-slate-200 p-4 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{alt.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {alt.channel} • {alt.teacherName} ({alt.durationMinutes} mins)
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded">
                          {alt.coverageScore}% match
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.2 rounded">
                          Score: {alt.lectureScore}/100
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSelectAlternative(alt)}
                      className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      Watch This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Nursing AI Tutor Modal */}
      <NursingAITutorModal
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        activeTopic={topic}
      />
    </div>
  );
};
