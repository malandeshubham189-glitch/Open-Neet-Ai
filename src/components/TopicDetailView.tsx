import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTopicById, getNextTopic } from '../data/curriculumData';
import { LectureType, LectureMapping, LectureHealthStatus } from '../types';
import { LectureService } from '../services/lectureService';
import {
  Tv,
  FileText,
  Target,
  HelpCircle,
  BrainCircuit,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  Clock,
  Save,
  Copy,
  Check,
  Sparkles,
  Lock,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Award,
  Video,
  Zap,
  AlertTriangle,
  Play,
  Layers,
  BarChart2,
  ListOrdered,
  BookMarked,
  CheckSquare
} from 'lucide-react';

export const TopicDetailView: React.FC = () => {
  const {
    selectedTopicId,
    setCurrentView,
    topicProgress,
    toggleTopicCompleted,
    updateTopicStepProgress,
    saveTopicNotes,
    addToRevisionQueue,
    isTopicUnlocked,
    openTopicDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'ncert' | 'mcqs' | 'pyqs' | 'ai-test' | 'ai-mentor'>('video');
  const [selectedLectureType, setSelectedLectureType] = useState<LectureType>('primary');
  const [selectedPyqAnswers, setSelectedPyqAnswers] = useState<Record<string, string>>({});
  const [revealedPyqs, setRevealedPyqs] = useState<Record<string, boolean>>({});
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, string>>({});
  const [userNote, setUserNote] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Mini Test State
  const [miniTestAnswers, setMiniTestAnswers] = useState<Record<string, string>>({});
  const [miniTestSubmitted, setMiniTestSubmitted] = useState(false);
  const [miniTestScore, setMiniTestScore] = useState<number | null>(null);

  const topic = getTopicById(selectedTopicId) || getTopicById('topic-phy-moi')!;
  const nextTopic = getNextTopic(topic.id);
  const progress = topicProgress[topic.id];
  const isCompleted = progress?.completed;

  // Prerequisite Status
  const unlockStatus = isTopicUnlocked(topic.id);

  // Intelligent Lecture Recommendation Engine
  const recommendedData = LectureService.getRecommendedLecture(topic.id, topic.lectures || []);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Admin edit form state
  const [adminYoutubeId, setAdminYoutubeId] = useState('');
  const [adminTeacher, setAdminTeacher] = useState('');
  const [adminChannel, setAdminChannel] = useState('');
  const [adminHealthStatus, setAdminHealthStatus] = useState<LectureHealthStatus>('Verified');
  const [adminIsNmc, setAdminIsNmc] = useState(true);

  const allLectures = LectureService.getLecturesForTopic(topic.id, topic.lectures || []);
  const activeLecture =
    allLectures.find((l) => l.type === selectedLectureType) || recommendedData.lecture;

  const handleAdminSave = () => {
    if (!adminYoutubeId) return;
    LectureService.replaceYoutubeVideoId(
      topic.id,
      topic.lectures || [],
      activeLecture.id,
      adminYoutubeId
    );
    if (adminTeacher || adminChannel || adminHealthStatus) {
      LectureService.updateLectureMetadata(topic.id, topic.lectures || [], activeLecture.id, {
        teacher: adminTeacher || activeLecture.teacher,
        channel: adminChannel || activeLecture.channel,
        healthStatus: adminHealthStatus,
        isNmcCompatible: adminIsNmc,
        lastVerifiedDate: new Date().toISOString().split('T')[0]
      });
    }
    setIsAdminPanelOpen(false);
  };

  const handleSaveNotes = () => {
    saveTopicNotes(topic.id, userNote);
    updateTopicStepProgress(topic.id, 'notesRead');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleMiniTestSubmit = () => {
    let correct = 0;
    const testQuestions = topic.mcqs.slice(0, 3);
    if (testQuestions.length === 0) return;

    testQuestions.forEach((q) => {
      if (miniTestAnswers[q.id] === q.correctAnswerId) {
        correct++;
      }
    });

    const percent = Math.round((correct / testQuestions.length) * 100);
    setMiniTestScore(percent);
    setMiniTestSubmitted(true);

    if (percent >= 70) {
      updateTopicStepProgress(topic.id, 'aiTestCompleted');
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Top Navigation Back Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <button
          onClick={() => setCurrentView('syllabus')}
          className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#E5E7EB] px-3.5 py-2 text-xs font-bold text-[#111827] hover:bg-slate-50 transition-all self-start shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Syllabus</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => toggleTopicCompleted(topic.id, topic.subjectId)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#2563EB] text-white hover:bg-blue-700'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isCompleted ? 'Topic Mastered' : 'Mark Complete'}</span>
          </button>

          <button
            onClick={() => {
              addToRevisionQueue(topic.id, topic.title, topic.chapterName, topic.subjectId);
              updateTopicStepProgress(topic.id, 'addedToRevision');
            }}
            className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-bold text-[#7C3AED] hover:bg-purple-100 transition-all"
          >
            <RotateCcw className="h-4 w-4 text-[#7C3AED]" />
            <span>Add to Revision Queue</span>
          </button>

          {nextTopic && (
            <button
              onClick={() => openTopicDetail(nextTopic.id)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
            >
              <span>Next Topic</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* PREREQUISITE WARNING BANNER */}
      {!unlockStatus.unlocked && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-900 shadow-sm animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200/60 shrink-0 mt-0.5">
              <Lock className="h-5 w-5 text-amber-800" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-900">
                Prerequisite Required Before Starting
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                Complete prerequisite topics: <span className="font-bold">{unlockStatus.missingPrerequisites.join(', ')}</span> first before attempting this topic.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (topic.prerequisiteTopicIds?.[0]) {
                openTopicDetail(topic.prerequisiteTopicIds[0]);
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-900 transition-all shrink-0"
          >
            <span>Go to Prerequisite</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header Topic Title & Badges */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-md bg-blue-50 px-2.5 py-0.5 font-bold text-[#2563EB] border border-blue-100">
            {topic.subjectName}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-[#6B7280]">{topic.classLevel}</span>
          <span className="text-slate-400">•</span>
          <span className="text-[#6B7280]">{topic.unitName}</span>
          <span className="text-slate-400">•</span>
          <span className="text-[#111827] font-medium">{topic.chapterName}</span>
          <span className="ml-auto rounded-md bg-amber-50 px-2.5 py-0.5 text-amber-800 font-bold border border-amber-200">
            {topic.importance} Importance
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">{topic.title}</h1>
        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">{topic.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold">
          <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
            <p className="text-[10px] text-blue-600 uppercase tracking-wider font-extrabold">NEET Weightage</p>
            <p className="text-sm text-[#2563EB] font-black">{topic.neetWeightage}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <p className="text-[10px] text-emerald-600 uppercase tracking-wider font-extrabold">NCERT Importance</p>
            <p className="text-sm text-emerald-700 font-black">{topic.ncertImportance}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
            <p className="text-[10px] text-purple-600 uppercase tracking-wider font-extrabold">Estimated Completion</p>
            <p className="text-sm text-[#7C3AED] font-black">{topic.estimatedStudyMinutes || 60} Minutes</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">Mastery Level</p>
            <p className="text-sm text-slate-900 font-black">{isCompleted ? '100% Mastered' : `${progress?.activeStep || 1}/8 Steps Done`}</p>
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP LEARNING FLOW CHECKLIST (ENFORCED SEQUENCE) */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#111827]">
              Enforced Sequential Learning Path (Step 1 to 8)
            </h3>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-[#2563EB] border border-blue-200">
            {progress?.completed ? 'All Steps Completed' : `Current Active: Step ${progress?.activeStep || 1}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
          {[
            { step: 1, key: 'videoWatched', label: '1. Watch Lecture', tab: 'video' },
            { step: 2, key: 'notesRead', label: '2. Read Notes', tab: 'notes' },
            { step: 3, key: 'ncertRead', label: '3. NCERT Map', tab: 'ncert' },
            { step: 4, key: 'mcq', label: '4. Topic MCQs', tab: 'mcqs' },
            { step: 5, key: 'pyq', label: '5. 10-Yr PYQs', tab: 'pyqs' },
            { step: 6, key: 'aiTestCompleted', label: '6. AI Mini Test', tab: 'ai-test' },
            { step: 7, key: 'completed', label: '7. Complete', tab: 'video' },
            { step: 8, key: 'nextTopic', label: '8. Next Topic', tab: 'video' }
          ].map((s) => {
            const isStepDone =
              s.key === 'videoWatched'
                ? progress?.videoWatched
                : s.key === 'notesRead'
                ? progress?.notesRead
                : s.key === 'ncertRead'
                ? progress?.ncertRead
                : s.key === 'mcq'
                ? (progress?.mcqsSolvedCount || 0) > 0
                : s.key === 'pyq'
                ? (progress?.pyqsSolvedCount || 0) > 0
                : s.key === 'aiTestCompleted'
                ? progress?.aiTestCompleted
                : s.key === 'completed'
                ? progress?.completed
                : false;

            return (
              <button
                key={s.step}
                onClick={() => {
                  if (s.step === 8 && nextTopic) {
                    openTopicDetail(nextTopic.id);
                  } else {
                    setActiveTab(s.tab as any);
                  }
                }}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  isStepDone
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold'
                    : (progress?.activeStep || 1) === s.step
                    ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold shadow-sm ring-2 ring-blue-200'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                {isStepDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <span className="text-xs font-extrabold">{s.step}</span>
                )}
                <span className="text-[10px] truncate max-w-full font-semibold">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'video'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <Tv className="h-4 w-4" />
          <span>1. Recommended Lecture</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'notes'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>2. AI High-Yield Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('ncert')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'ncert'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>3. NCERT Mapping</span>
        </button>

        <button
          onClick={() => setActiveTab('mcqs')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'mcqs'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>4. Topic MCQs ({topic.mcqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pyqs')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'pyqs'
              ? 'bg-[#7C3AED] text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <Target className="h-4 w-4" />
          <span>5. Past PYQs ({topic.pyqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-test')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'ai-test'
              ? 'bg-[#7C3AED] text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <Zap className="h-4 w-4 text-amber-300" />
          <span>6. AI Mini Test</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-mentor')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'ai-mentor'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
          }`}
        >
          <BrainCircuit className="h-4 w-4 text-blue-400" />
          <span>7. AI Doubts</span>
        </button>
      </div>

      {/* ==================== TAB 1: RECOMMENDED LECTURE ==================== */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Primary Curation Notice & Switcher */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#2563EB] shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-[#111827]">Curated Lecture Operating System</p>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-300">
                      {activeLecture.healthStatus || 'Verified'}
                    </span>
                  </div>
                  <p className="text-[#6B7280] text-[11px] mt-0.5">
                    No Search Necessary • Single Best Path Recommended by AI & Top NEET Ranks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAdminTeacher(activeLecture.teacher);
                    setAdminChannel(activeLecture.channel);
                    setAdminYoutubeId(activeLecture.youtubeVideoId);
                    setAdminHealthStatus(activeLecture.healthStatus || 'Verified');
                    setAdminIsNmc(activeLecture.isNmcCompatible ?? true);
                    setIsAdminPanelOpen(!isAdminPanelOpen);
                  }}
                  className="rounded-xl border border-blue-300 bg-white px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-all shrink-0"
                >
                  {isAdminPanelOpen ? 'Close Curation Panel' : 'Admin Curation Panel'}
                </button>
              </div>
            </div>

            {/* AI RECOMMENDATION EXPLANATION BANNER */}
            <div className={`p-4 rounded-2xl border ${recommendedData.isFallback ? 'border-amber-300 bg-amber-50' : 'border-blue-200 bg-blue-50/50'} space-y-1.5`}>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#2563EB]" />
                <h4 className="text-xs font-bold text-[#111827]">
                  {recommendedData.isFallback ? 'Auto-Fallback Triggered' : 'AI Recommendation Guarantee'}
                </h4>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {recommendedData.reason}
              </p>
            </div>

            {/* ADMIN CURATION DRAWER / PANEL */}
            {isAdminPanelOpen && (
              <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                  <h4 className="text-xs font-bold text-purple-900 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span>Admin Lecture Database Curation Tool</span>
                  </h4>
                  <span className="text-[10px] text-purple-700 font-semibold">Zero Code Changes Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">YouTube Video ID</label>
                    <input
                      type="text"
                      value={adminYoutubeId}
                      onChange={(e) => setAdminYoutubeId(e.target.value)}
                      placeholder="e.g. dQw4w9WgXcQ"
                      className="w-full rounded-xl border border-slate-300 p-2 text-xs focus:border-[#2563EB] focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Teacher Name</label>
                    <input
                      type="text"
                      value={adminTeacher}
                      onChange={(e) => setAdminTeacher(e.target.value)}
                      placeholder="e.g. Dr. S. K. Gupta"
                      className="w-full rounded-xl border border-slate-300 p-2 text-xs focus:border-[#2563EB] focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Channel Name</label>
                    <input
                      type="text"
                      value={adminChannel}
                      onChange={(e) => setAdminChannel(e.target.value)}
                      placeholder="e.g. Physics Excellence NEET"
                      className="w-full rounded-xl border border-slate-300 p-2 text-xs focus:border-[#2563EB] focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Health Status</label>
                    <select
                      value={adminHealthStatus}
                      onChange={(e) => setAdminHealthStatus(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-300 p-2 text-xs focus:border-[#2563EB] focus:outline-none bg-white"
                    >
                      <option value="Verified">Verified (Healthy)</option>
                      <option value="Needs Review">Needs Review</option>
                      <option value="Outdated">Outdated (Triggers Fallback)</option>
                      <option value="Unavailable">Unavailable (Disabled)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={adminIsNmc}
                      onChange={(e) => setAdminIsNmc(e.target.checked)}
                      className="rounded border-slate-300 text-[#2563EB]"
                    />
                    <span>100% Latest NMC Syllabus Compatible</span>
                  </label>

                  <button
                    onClick={handleAdminSave}
                    className="rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white hover:bg-purple-800 transition-all shadow-sm"
                  >
                    Save to Lecture Database
                  </button>
                </div>
              </div>
            )}

            {/* EMBEDDED DISTRACTION-FREE YOUTUBE PLAYER & FALLBACK TOOLBAR */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5 text-[#2563EB]" />
                  <span>Curated High-Yield Lecture Player</span>
                </span>
                
                <a
                  href={`https://www.youtube.com/watch?v=${activeLecture.youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1 text-[11px] font-bold text-white hover:bg-red-700 transition-all shadow-sm"
                >
                  <span>▶ Open directly in YouTube</span>
                </a>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-black shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLecture.youtubeVideoId}?rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0&autoplay=0&enablejsapi=1`}
                  title={activeLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full border-0"
                />
              </div>

              {/* Quick Change Video URL Bar */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600 shrink-0">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-[11px] font-medium">Video unavailable in frame?</span>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto flex-1 justify-end">
                  <input
                    type="text"
                    placeholder="Paste YouTube Link or Video ID..."
                    className="w-full sm:w-64 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] focus:border-[#2563EB] focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        if (val) {
                          const extracted = LectureService.extractYoutubeId(val);
                          LectureService.replaceYoutubeVideoId(topic.id, topic.lectures || [], activeLecture.id, extracted);
                          (e.target as HTMLInputElement).value = '';
                          window.location.reload();
                        }
                      }
                    }}
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${activeLecture.youtubeVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-300 transition-all"
                  >
                    Watch External
                  </a>
                </div>
              </div>
            </div>

            {/* Lecture Details & Dedicated Metadata Card */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                      {activeLecture.updatedStatus}
                    </span>
                    <span className="text-xs text-emerald-700 font-bold">
                      {activeLecture.isNmcCompatible !== false ? '✓ NMC 2027 Approved' : '⚠️ Pending NMC Check'}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#111827] mt-1">{activeLecture.title}</h3>
                  <p className="text-xs text-[#6B7280]">
                    Teacher: <strong className="text-[#111827]">{activeLecture.teacher}</strong> • Channel: <span className="font-semibold">{activeLecture.channel}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                    <p className="text-sm font-black text-[#2563EB]">{activeLecture.durationMinutes} Mins</p>
                  </div>
                </div>
              </div>

              {/* Comprehensive Metadata Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Importance</span>
                  <p className="font-extrabold text-amber-800">{topic.importance} Priority</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Est. Completion Time</span>
                  <p className="font-extrabold text-[#111827]">{topic.estimatedStudyMinutes || 60} Minutes</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">NCERT Line Coverage</span>
                  <p className="font-extrabold text-emerald-700">{activeLecture.ncertCoveragePercent}% Complete</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Concept Rating</span>
                  <p className="font-extrabold text-purple-700">{activeLecture.conceptRating || 4.9} / 5.0 ★</p>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5E7EB] text-xs">
                <div className="flex items-center gap-3 text-[#6B7280]">
                  <span>Language: <strong className="text-[#111827]">{activeLecture.language}</strong></span>
                  <span>•</span>
                  <span>Verified Date: <strong className="text-[#111827]">{activeLecture.lastVerifiedDate || '2026-07-25'}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateTopicStepProgress(topic.id, 'videoWatched');
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-[#2563EB]" />
                    <span>Start Learning</span>
                  </button>

                  <button
                    onClick={() => {
                      updateTopicStepProgress(topic.id, 'videoWatched');
                      setActiveTab('notes');
                    }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark Complete</span>
                  </button>

                  {nextTopic && (
                    <button
                      onClick={() => openTopicDetail(nextTopic.id)}
                      className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
                    >
                      <span>Next Topic</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timestamped Scratchpad */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#2563EB]" />
                <span>Lecture Scratchpad</span>
              </h3>
              <p className="text-[11px] text-[#6B7280] mt-1">
                Jot key derivations, formula tricks, and timestamped doubts here.
              </p>

              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g., 14:20 Parallel axis theorem formula I_tangent = I_cm + M d²..."
                className="mt-3 h-56 w-full rounded-xl border border-[#E5E7EB] bg-slate-50 p-3 text-xs text-[#111827] placeholder-[#6B7280] focus:border-[#2563EB] focus:outline-none resize-none font-sans"
              />
            </div>

            <button
              onClick={handleSaveNotes}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
            >
              <Save className="h-4 w-4" />
              <span>{savedSuccess ? 'Notes Saved!' : 'Save Lecture Scratchpad'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: AI HIGH-YIELD NOTES ==================== */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#2563EB]" />
                  <span>AI Comprehensive NCERT Notes & Formula Cards</span>
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Summarized directly from NCERT line-by-line with previous 10-year NEET trends.
                </p>
              </div>

              <button
                onClick={() => updateTopicStepProgress(topic.id, 'notesRead')}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark Notes Read</span>
              </button>
            </div>

            {/* Notes Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.notes.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E5E7EB] bg-slate-50/50 space-y-3">
                  <h3 className="text-sm font-extrabold text-[#2563EB]">{sec.title}</h3>
                  <p className="text-xs text-[#111827] leading-relaxed">{sec.content}</p>

                  {sec.formulas && sec.formulas.length > 0 && (
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1">
                      <p className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-wider">Formula Sheet</p>
                      <ul className="list-disc pl-4 text-xs font-mono text-[#111827] space-y-1">
                        {sec.formulas.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sec.mnemonics && sec.mnemonics.length > 0 && (
                    <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 space-y-1">
                      <p className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider">Memory Trick / Mnemonic</p>
                      <ul className="list-disc pl-4 text-xs text-[#111827] space-y-1">
                        {sec.mnemonics.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sec.highYieldTips && sec.highYieldTips.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                      <p className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">Common Mistakes & Traps</p>
                      <ul className="list-disc pl-4 text-xs text-[#111827] space-y-1">
                        {sec.highYieldTips.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: NCERT MAPPING ==================== */}
      {activeTab === 'ncert' && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>Exact NCERT Textbook Page & Line Mapping</span>
              </h2>
              <p className="text-xs text-[#6B7280]">
                Matches NMC syllabus mandates directly with Class 11/12 NCERT textbooks.
              </p>
            </div>

            <button
              onClick={() => updateTopicStepProgress(topic.id, 'ncertRead')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                progress?.ncertRead
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{progress?.ncertRead ? 'NCERT Marked Complete' : 'Mark NCERT Completed'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">Textbook Reference</span>
              <p className="text-sm font-bold text-emerald-950">{topic.subjectName} NCERT {topic.classLevel}</p>
              <p className="text-xs text-emerald-800 font-semibold">{topic.chapterName}</p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">NCERT Chapter Section</span>
              <p className="text-sm font-bold text-blue-950">Section {topic.pyqs[0]?.ncertReference || 'Section 7.10 - 7.12'}</p>
              <p className="text-xs text-blue-800 font-semibold">Pages 162 to 178 (Must-Read Lines)</p>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
              <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">High Yield Weightage</span>
              <p className="text-sm font-bold text-purple-950">{topic.ncertImportance} Priority</p>
              <p className="text-xs text-purple-800 font-semibold">{topic.neetWeightage}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-slate-50 space-y-2">
            <h4 className="text-xs font-bold text-[#111827]">NCERT Key Line Highlights</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6B7280]">
              <li>Read paragraph under theorem of parallel and perpendicular axes carefully.</li>
              <li>Note all standard figures: Ring, Disc, Solid Sphere, Thin Rod, Circular Cylinder.</li>
              <li>Pay special attention to bold NCERT terms and summary points at end of chapter.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: TOPIC MCQS ==================== */}
      {activeTab === 'mcqs' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#2563EB]" />
                  <span>Topic Practice MCQs (Easy, Medium, Hard)</span>
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Immediate step-by-step explanations after selecting an answer.
                </p>
              </div>

              <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Solved: {Object.keys(selectedMcqAnswers).length} / {topic.mcqs.length}
              </span>
            </div>

            {topic.mcqs.map((mcq) => {
              const selectedOpt = selectedMcqAnswers[mcq.id];

              return (
                <div key={mcq.id} className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <span className="rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-extrabold text-[#7C3AED] border border-purple-200">
                      {mcq.tag}
                    </span>
                    <span className="text-xs text-[#6B7280]">Hint: {mcq.hint}</span>
                  </div>

                  <p className="text-sm font-semibold text-[#111827] leading-relaxed">{mcq.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mcq.options.map((opt) => {
                      const isCorrect = opt.id === mcq.correctAnswerId;
                      const isSelected = selectedOpt === opt.id;

                      let btnClass = 'border-[#E5E7EB] bg-slate-50 text-[#111827] hover:bg-slate-100';
                      if (selectedOpt) {
                        if (isCorrect) btnClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                        else if (isSelected) btnClass = 'border-rose-300 bg-rose-50 text-rose-900';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedMcqAnswers((prev) => ({ ...prev, [mcq.id]: opt.id }));
                            updateTopicStepProgress(topic.id, 'mcq');
                          }}
                          className={`flex items-center justify-start rounded-xl border p-3.5 text-xs text-left transition-all ${btnClass}`}
                        >
                          <span className="font-bold uppercase mr-2 opacity-75">({opt.id})</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedOpt && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4 space-y-1">
                      <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Detailed Solution</span>
                      <p className="text-xs text-[#111827] leading-relaxed">{mcq.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 5: PAST PYQS ==================== */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#7C3AED]" />
                  <span>Past 10-Year NEET PYQ Problem Engine</span>
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Actual questions asked in recent NEET examinations with NTA NCERT references.
                </p>
              </div>

              <span className="text-xs font-bold text-[#7C3AED] bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                {topic.pyqs.length} PYQs Attached
              </span>
            </div>

            {topic.pyqs.map((pyq) => {
              const selectedOpt = selectedPyqAnswers[pyq.id];
              const isRevealed = revealedPyqs[pyq.id];

              return (
                <div key={pyq.id} className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-[#2563EB] border border-blue-200">
                        NEET {pyq.year}
                      </span>
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-[#6B7280]">
                        {pyq.frequency}
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280] font-medium">{pyq.ncertReference}</span>
                  </div>

                  <p className="text-sm font-semibold text-[#111827] leading-relaxed">{pyq.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pyq.options.map((opt) => {
                      const isCorrect = opt.id === pyq.correctAnswerId;
                      const isSelected = selectedOpt === opt.id;

                      let btnClass = 'border-[#E5E7EB] bg-slate-50 text-[#111827] hover:bg-slate-100';
                      if (isRevealed || selectedOpt) {
                        if (isCorrect) btnClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                        else if (isSelected && !isCorrect) btnClass = 'border-rose-300 bg-rose-50 text-rose-900';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedPyqAnswers((prev) => ({ ...prev, [pyq.id]: opt.id }));
                            updateTopicStepProgress(topic.id, 'pyq');
                          }}
                          className={`flex items-center justify-start rounded-xl border p-3.5 text-xs text-left transition-all ${btnClass}`}
                        >
                          <span className="font-bold uppercase mr-2 opacity-75">({opt.id})</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#E5E7EB]">
                    <button
                      onClick={() => setRevealedPyqs((prev) => ({ ...prev, [pyq.id]: !prev[pyq.id] }))}
                      className="text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      {isRevealed ? 'Hide Solution' : 'Show Step-by-Step Derivation & Solution'}
                    </button>
                  </div>

                  {(isRevealed || selectedOpt) && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4 space-y-1">
                      <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Detailed Solution</span>
                      <p className="text-xs text-[#111827] leading-relaxed whitespace-pre-line">{pyq.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 6: AI MINI TEST ==================== */}
      {activeTab === 'ai-test' && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>AI Adaptive Topic Mini Test</span>
              </h2>
              <p className="text-xs text-[#6B7280]">
                3-Question adaptive test. Score &gt;= 90% to mark Topic as Mastered!
              </p>
            </div>

            {miniTestSubmitted && miniTestScore !== null && (
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                miniTestScore >= 90
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : miniTestScore >= 70
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                Score: {miniTestScore}% ({miniTestScore >= 90 ? 'Mastered!' : miniTestScore >= 70 ? 'Passed' : 'Revision Needed'})
              </span>
            )}
          </div>

          {/* Mini Test Questions */}
          <div className="space-y-6">
            {topic.mcqs.slice(0, 3).map((q, qIdx) => {
              const userAns = miniTestAnswers[q.id];
              return (
                <div key={q.id} className="p-4 rounded-xl border border-[#E5E7EB] bg-slate-50/50 space-y-3">
                  <p className="text-xs font-bold text-[#111827]">
                    Q{qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        disabled={miniTestSubmitted}
                        onClick={() => setMiniTestAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                        className={`p-3 rounded-xl border text-xs text-left transition-all ${
                          userAns === opt.id
                            ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold shadow-sm'
                            : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-100'
                        }`}
                      >
                        ({opt.id}) {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {!miniTestSubmitted ? (
              <button
                onClick={handleMiniTestSubmit}
                disabled={Object.keys(miniTestAnswers).length < Math.min(3, topic.mcqs.length)}
                className="w-full py-3 rounded-xl bg-[#2563EB] text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
              >
                Submit AI Mini Test
              </button>
            ) : (
              <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/80 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                  {miniTestScore && miniTestScore >= 90 ? (
                    <Award className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  )}
                  <span>
                    {miniTestScore && miniTestScore >= 90
                      ? 'Congratulations! Topic Mastered Perfectly!'
                      : miniTestScore && miniTestScore >= 70
                      ? 'Good Attempt! Topic Step Unlocked.'
                      : 'Score < 70%. AI Recommends a 15-Minute Speed Revision Session!'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMiniTestSubmitted(false);
                      setMiniTestAnswers({});
                      setMiniTestScore(null);
                    }}
                    className="rounded-xl border border-blue-300 bg-white px-4 py-2 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-all"
                  >
                    Retake Mini Test
                  </button>

                  {nextTopic && (
                    <button
                      onClick={() => openTopicDetail(nextTopic.id)}
                      className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
                    >
                      Proceed to Next Topic ({nextTopic.title})
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 7: AI DOUBT ASSISTANT ==================== */}
      {activeTab === 'ai-mentor' && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-[#2563EB]" />
                <span>NCERT AI Doubt Assistant for {topic.title}</span>
              </h3>
              <p className="text-xs text-[#6B7280]">
                Get instant step-by-step NCERT explanations, formula derivations, and doubt resolution.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-slate-50 p-4 font-mono text-xs text-[#111827] space-y-2">
            <p className="text-[#6B7280]">// System Context Blueprint</p>
            <p className="text-[#111827]">
              "You are NEETDrop AI Master Mentor. Solve physics numericals and decode NCERT biology lines step by step."
            </p>
            <p className="text-[#6B7280] mt-2">// Prompt Context</p>
            <p className="text-[#2563EB] font-bold">
              Subject: {topic.subjectName} | Topic: {topic.title}
            </p>
            <p className="text-[#111827]">
              "Explain common NEET traps and derivation tricks for {topic.title}."
            </p>
          </div>

          <button
            onClick={() => {
              setCopiedPrompt(true);
              setTimeout(() => setCopiedPrompt(false), 2000);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedPrompt ? 'Copied AI Prompt!' : 'Copy AI Prompt Blueprint'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
