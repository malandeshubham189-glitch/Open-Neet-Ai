import React, { useState } from 'react';
import {
  NursingYear,
  NursingSubjectId,
  NursingTopic,
  SyllabusProfile,
  TopicLearningStatus
} from '../../types/nursing';
import {
  NURSING_CURRICULUM_DATA,
  getAllNursingTopics,
  getNursingTopicById
} from '../../data/nursingCurriculumData';
import { LectureDiscoveryService } from '../../services/nursing/nursingLectureDiscovery';
import {
  NursingStudyPlannerService,
  TodayNursingGoal
} from '../../services/nursing/nursingStudyPlanner';
import { StudentProfileService, NursingStudentProfile } from '../../services/nursing/studentProfileService';
import { NursingWeakTopicEngine } from '../../services/nursing/nursingWeakTopicEngine';
import { SpacedRevisionEngine } from '../../services/nursing/spacedRevisionEngine';
import { NursingBacklogEngine, BacklogAssessment } from '../../services/nursing/nursingBacklogEngine';
import { AICompletionPredictor, CompletionPrediction } from '../../services/nursing/aiCompletionPredictor';
import { SyllabusAuditEngine } from '../../services/nursing/syllabusAuditEngine';

import { NursingOnboardingModal } from './NursingOnboardingModal';
import { NursingBacklogRecoveryModal } from './NursingBacklogRecoveryModal';
import { NursingMockTestModal } from './NursingMockTestModal';
import { NursingStudySession } from './NursingStudySession';
import { NursingQuestionBankModal } from './NursingQuestionBankModal';
import { NursingAITutorModal } from './NursingAITutorModal';
import { SyllabusSettingsModal } from './SyllabusSettingsModal';
import { NursingAuditModal } from './NursingAuditModal';

import {
  Stethoscope,
  BookOpen,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Play,
  Building2,
  Calendar,
  Settings,
  ChevronRight,
  ShieldCheck,
  Flame,
  FileText,
  HelpCircle,
  Bookmark,
  Check,
  RotateCcw,
  AlertTriangle,
  Layers,
  Search,
  CheckCircle,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Activity,
  ListTodo
} from 'lucide-react';

interface NursingDashboardProps {
  onSelectTopic: (topicId: string) => void;
  onSelectSubject?: (subjectId: NursingSubjectId) => void;
}

export const NursingDashboard: React.FC<NursingDashboardProps> = ({
  onSelectTopic
}) => {
  const [studentProfile, setStudentProfile] = useState<NursingStudentProfile>(
    StudentProfileService.getProfile()
  );
  const [activeYear, setActiveYear] = useState<NursingYear>(studentProfile.activeYear);
  const [isExamMode, setIsExamMode] = useState<boolean>(false);

  // Modals state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBacklogModal, setShowBacklogModal] = useState(false);
  const [showMockTestModal, setShowMockTestModal] = useState(false);
  const [showQuestionBankModal, setShowQuestionBankModal] = useState(false);
  const [showAITutorModal, setShowAITutorModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'GAPS' | 'PARTIAL'>('ALL');
  const [activeFocusTopic, setActiveFocusTopic] = useState<NursingTopic | null>(null);

  const [selectedSubjectId, setSelectedSubjectId] = useState<NursingSubjectId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const yearCurriculum = NURSING_CURRICULUM_DATA[activeYear];
  const coverageList = LectureDiscoveryService.calculateYearCoverage(activeYear);
  const totalYearTopics = coverageList.reduce((acc, curr) => acc + curr.totalTopics, 0);
  const coveredYearTopics = coverageList.reduce((acc, curr) => acc + curr.coveredWithVerifiedLecture, 0);
  const yearCoveragePercent = totalYearTopics > 0 ? Math.round((coveredYearTopics / totalYearTopics) * 100) : 0;

  const allProgress = NursingStudyPlannerService.getAllProgress();
  const allYearTopics = getAllNursingTopics(activeYear);
  const completedTopics = allYearTopics.filter((t) => allProgress[t.id]?.completed);
  const completedCount = completedTopics.length;
  const remainingCount = allYearTopics.length - completedCount;
  const syllabusProgressPercent = allYearTopics.length > 0 ? Math.round((completedCount / allYearTopics.length) * 100) : 0;

  const nextAction = NursingStudyPlannerService.getNextBestAction(activeYear);
  const smartResume = NursingStudyPlannerService.getSmartResumeState(activeYear);
  const resumeTopic = getNursingTopicById(smartResume.topicId) || nextAction.topic;
  const isResuming = completedCount > 0 || (allProgress[smartResume.topicId]?.videoWatched ?? false);
  const todayGoal: TodayNursingGoal = NursingStudyPlannerService.getTodayGoal(activeYear);
  const weakTopics = NursingWeakTopicEngine.getWeakTopics(activeYear);
  const revisionQueue = SpacedRevisionEngine.getRevisionQueue(activeYear);
  const backlogAssessment: BacklogAssessment = NursingBacklogEngine.assessBacklog(activeYear);
  const aiPrediction: CompletionPrediction = AICompletionPredictor.predictYearCompletion(activeYear);
  const examReadiness = SyllabusAuditEngine.calculateExamReadiness(allProgress, activeYear);

  // Tri-progress calculations
  const revisionProgressPercent = allYearTopics.length > 0
    ? Math.min(100, Math.round((allYearTopics.filter((t) => (allProgress[t.id]?.revisionCount || 0) >= 1).length / allYearTopics.length) * 100))
    : 0;
  const practiceProgressPercent = allYearTopics.length > 0
    ? Math.min(100, Math.round((allYearTopics.filter((t) => (allProgress[t.id]?.mcqsSolvedCount || 0) > 0).length / allYearTopics.length) * 100))
    : 0;

  const handleYearChange = (yr: NursingYear) => {
    setActiveYear(yr);
    StudentProfileService.saveProfile({ activeYear: yr });
    setSelectedSubjectId(null);
  };

  const handleProfileUpdated = (newProf: NursingStudentProfile) => {
    setStudentProfile(newProf);
    setActiveYear(newProf.activeYear);
  };

  // Filter topics for the active year
  const filteredTopics = allYearTopics.filter((t) => {
    const matchesSubject = selectedSubjectId ? t.subjectId === selectedSubjectId : true;
    const matchesSearch = searchQuery
      ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.unitTitle.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesExamMode = isExamMode ? t.importance === 'High' || t.priority === 'High' : true;
    return matchesSubject && matchesSearch && matchesExamMode;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 font-sans space-y-8">
      {/* 1. TOP GREETING & INSTITUTIONAL HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-xs font-black text-emerald-300">
                MUHS CURRICULUM COCKPIT
              </span>
              <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-0.5 text-xs font-semibold text-slate-300">
                {studentProfile.academicBatch}
              </span>
              {isExamMode && (
                <span className="rounded-full bg-rose-500/20 border border-rose-400/30 px-3 py-0.5 text-xs font-black text-rose-300 animate-pulse">
                  ⚡ EXAM MODE ACTIVE
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {studentProfile.studentName}
            </h1>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="h-4 w-4 text-emerald-400" />
                {studentProfile.college}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {studentProfile.university}
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Curriculum Quality & Zero-Gap Audit Trigger */}
            <button
              type="button"
              onClick={() => {
                setAuditFilter('ALL');
                setShowAuditModal(true);
              }}
              className="flex items-center gap-2 rounded-2xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 px-4 py-2.5 text-xs font-bold text-teal-300 transition-all cursor-pointer backdrop-blur-sm shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              <span>Syllabus Audit & Zero-Gap</span>
            </button>

            {/* Exam Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsExamMode(!isExamMode)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
                isExamMode
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>{isExamMode ? 'Exam Mode ON' : 'Toggle Exam Mode'}</span>
            </button>

            {/* Profile Settings */}
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              <Settings className="h-4 w-4 text-emerald-400" />
              <span>Profile & Target</span>
            </button>
          </div>
        </div>

        {/* Year Tabs */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-2xl bg-slate-800/80 p-1 border border-slate-700">
            {[
              { id: '2nd_year' as NursingYear, label: '2nd Year', badge: 'MSN-I & Pharm' },
              { id: '3rd_year' as NursingYear, label: '3rd Year', badge: 'MSN-II, Child, Mental' },
              { id: '4th_year' as NursingYear, label: 'Final Year', badge: 'OBG & Community' }
            ].map((yr) => (
              <button
                key={yr.id}
                type="button"
                onClick={() => handleYearChange(yr.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                  activeYear === yr.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{yr.label}</span>
                <span className={`text-[10px] hidden sm:inline ${activeYear === yr.id ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                  ({yr.badge})
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold">
              <Flame className="h-4 w-4" />
              <span>{studentProfile.studyStreakDays} Day Streak</span>
            </div>
            <div>
              Total Time:{' '}
              <strong className="text-white font-black">
                {Math.round(studentProfile.totalMinutesStudied / 60)}h {studentProfile.totalMinutesStudied % 60}m
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BACKLOG RECOVERY BANNER (If Backlog Detected) */}
      {backlogAssessment.isBacklogDetected && (
        <div className="rounded-3xl border border-amber-300/80 bg-amber-50/90 p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-sm">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider bg-amber-200/80 px-2 py-0.5 rounded">
                  Backlog Alert
                </span>
                <span className="text-xs font-extrabold text-amber-950">
                  You are {backlogAssessment.sessionsBehind} study sessions behind target pace
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                AI has created a recovery schedule calibrated strictly to your <strong>{studentProfile.dailyAvailableStudyHours}h/day</strong> limit. 100% of 15M LAQ topics are preserved.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowBacklogModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-amber-900 hover:bg-amber-950 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>View Reorganized Plan</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 3. COCKPIT TRI-PROGRESS & EXAM COUNTDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Syllabus Mastery & Exam Readiness Gauge */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Syllabus Completion
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">
              {syllabusProgressPercent}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-black text-slate-900">
                  {completedCount}{' '}
                  <span className="text-xs font-bold text-slate-500">/ {allYearTopics.length} Topics</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {remainingCount} Topics Remaining for {activeYear.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>

            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${syllabusProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Exam Readiness Score:</span>
              <span className="font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {examReadiness.overallReadinessPercent}% ({examReadiness.readinessGrade})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <span className="text-slate-500">Curriculum Verified:</span>{' '}
                <strong className="text-slate-800">{yearCoveragePercent}%</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuditFilter('ALL');
                  setShowAuditModal(true);
                }}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 underline flex items-center cursor-pointer"
              >
                <span>Audit Details</span>
                <ChevronRight className="h-3 w-3 inline ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Spaced Revision & Clinical Practice */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Revision & Practice Depth
            </span>
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-black text-purple-800">
              Tri-Track
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">Spaced Revision Retained</span>
                <span className="text-purple-700">{revisionProgressPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-500"
                  style={{ width: `${revisionProgressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">Clinical MCQs Practiced</span>
                <span className="text-teal-700">{practiceProgressPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all duration-500"
                  style={{ width: `${practiceProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-600">
              Revision Due Today:{' '}
              <strong className="text-rose-700 font-extrabold">{revisionQueue.length} Topics</strong>
            </span>
            <span className="text-slate-600">
              Weak Topics:{' '}
              <strong className="text-amber-700 font-extrabold">{weakTopics.length} Areas</strong>
            </span>
          </div>
        </div>

        {/* Card 3: AI Exam Countdown & Velocity Predictor */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              MUHS University Exam Target
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
              aiPrediction.daysDelta >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
            }`}>
              {aiPrediction.statusHeadline}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-slate-900">
              {aiPrediction.daysRemainingToTarget}{' '}
              <span className="text-xs font-bold text-slate-500">Days to Finals</span>
            </div>
            <p className="text-xs text-slate-600">
              Target: <strong>{aiPrediction.targetExamDate}</strong>
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Projected Completion:</span>
              <span className="text-emerald-700">{aiPrediction.estimatedCompletionDate}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              {aiPrediction.paceDescription}
            </p>
          </div>
        </div>
      </div>

      {/* 4. TODAY'S BEST ACTION (HERO COMPONENT) */}
      <div className="rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Target className="h-4 w-4" />
            </span>
            <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
              {isResuming ? 'CONTINUE LEARNING' : "START TODAY'S STUDY"}
            </span>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-900 border border-emerald-200">
            {isResuming ? smartResume.stepLabel.toUpperCase() : `${nextAction.actionType.toUpperCase()} • ~${nextAction.estimatedDurationMinutes} MINS`}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold text-emerald-800">
              {resumeTopic.subjectName} • {resumeTopic.unitTitle}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {resumeTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>{isResuming ? 'Resume Point:' : 'Why this now:'}</strong>{' '}
              {isResuming
                ? `Pick up right where you left off in ${resumeTopic.title} (${smartResume.stepLabel}). Complete this topic to maintain your streak!`
                : nextAction.reason}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveFocusTopic(resumeTopic)}
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 text-xs font-black text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>{isResuming ? 'CONTINUE LEARNING' : "START TODAY'S STUDY"}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTopic(resumeTopic.id)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3.5 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <span>Explore Materials</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. TODAY'S STUDY PLAN & REVISION / WEAK TOPICS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Adaptive Study Plan */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <ListTodo className="h-5 w-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Today's Study Plan ({todayGoal.dailyGoalMinutes} Mins Allocated)
                </h3>
                <p className="text-xs text-slate-500">
                  Calibrated to your {studentProfile.dailyAvailableStudyHours}h daily target
                </p>
              </div>
            </div>

            <div className="text-xs font-extrabold text-slate-700">
              {todayGoal.tasks.filter((t) => t.isCompleted).length} / {todayGoal.tasks.length} Completed
            </div>
          </div>

          <div className="space-y-3">
            {todayGoal.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start justify-between gap-3 rounded-2xl border p-4 transition-all ${
                  task.isCompleted
                    ? 'border-emerald-200 bg-emerald-50/40 text-slate-600'
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      NursingStudyPlannerService.toggleGoalTaskCompleted(activeYear, task.id);
                    }}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                      task.isCompleted
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white hover:border-emerald-500'
                    }`}
                  >
                    {task.isCompleted && <Check className="h-3.5 w-3.5" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {task.type.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{task.subjectName}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{task.topicTitle}</h4>
                    <p className="text-xs text-slate-500">{task.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span>{task.durationMinutes}m</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      const topic = getNursingTopicById(task.topicId);
                      if (topic) setActiveFocusTopic(topic);
                    }}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Revision Due & Weak Topics Quick Actions */}
        <div className="space-y-6">
          {/* Spaced Revision Queue */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-purple-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Revision Due Today</h3>
              </div>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-black text-purple-800">
                {revisionQueue.length}
              </span>
            </div>

            {revisionQueue.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-500">
                No spaced revision due today. All active topics retained!
              </div>
            ) : (
              <div className="space-y-2.5">
                {revisionQueue.slice(0, 3).map((item) => (
                  <div
                    key={item.topic.id}
                    className="flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50/40 p-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.topic.title}</div>
                      <div className="text-[10px] text-purple-700">
                        {item.topic.subjectName} • {item.revisionDueReason}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFocusTopic(item.topic)}
                      className="rounded-xl bg-purple-700 hover:bg-purple-800 px-3 py-1 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Revise
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weak Topics Engine */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Weak Topics Identified</h3>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-800">
                {weakTopics.length}
              </span>
            </div>

            {weakTopics.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-500">
                No weak topics flagged. Minimum accuracy passed across all tested concepts.
              </div>
            ) : (
              <div className="space-y-2.5">
                {weakTopics.slice(0, 3).map((wt) => (
                  <div
                    key={wt.topic.id}
                    className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50/40 p-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{wt.topic.title}</div>
                      <div className="text-[10px] text-amber-800">
                        Accuracy: <strong>{wt.accuracyPercent}%</strong> ({wt.topic.subjectName})
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFocusTopic(wt.topic)}
                      className="rounded-xl bg-amber-700 hover:bg-amber-800 px-3 py-1 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Fix
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. SUBJECT DASHBOARD & QUICK LAUNCHERS */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {activeYear.replace('_', ' ').toUpperCase()} Subject Dashboards
            </h2>
            <p className="text-xs text-slate-500">
              Official MUHS syllabus distribution, theory marks & clinical lecture coverage
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowMockTestModal(true)}
              className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all cursor-pointer"
            >
              <Award className="h-4 w-4" />
              <span>Full Mock Test</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQuestionBankModal(true)}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-purple-600" />
              <span>Official Question Bank</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAITutorModal(true)}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Ask Nursing AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yearCurriculum.subjects.map((subject) => {
            const subTopics = allYearTopics.filter((t) => t.subjectId === subject.id);
            const subCompleted = subTopics.filter((t) => allProgress[t.id]?.completed).length;
            const subPercent = subTopics.length > 0 ? Math.round((subCompleted / subTopics.length) * 100) : 0;
            const subCoverage = coverageList.find((c) => c.subjectId === subject.id);

            return (
              <div
                key={subject.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-700">
                      {subject.code} • {subject.muhsMarksWeightage || 75} Marks Paper
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      {subPercent}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{subject.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{subject.badge || 'Official MUHS University Core Subject'}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${subPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        {subCompleted} / {subTopics.length} Topics
                      </span>
                      <span>{subCoverage?.coveredWithVerifiedLecture || subTopics.length} Verified Lectures</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedSubjectId(selectedSubjectId === subject.id ? null : subject.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    {selectedSubjectId === subject.id ? 'Show All Subjects' : 'Filter Subject Topics'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const firstUnfinished = subTopics.find((t) => !allProgress[t.id]?.completed) || subTopics[0];
                      if (firstUnfinished) setActiveFocusTopic(firstUnfinished);
                    }}
                    className="flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. ALL TOPICS EXPLORER WITH REAL-TIME MASTERY STATUS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Curriculum Topics Explorer
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredTopics.length} topics • Click any topic to open comprehensive lecture, smart notes, NCP & MUHS PYQs
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, diseases, rationales..."
              className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Topic List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic) => {
            const mastery = NursingWeakTopicEngine.evaluateTopicMastery(topic.id);
            const topicProgress = allProgress[topic.id];

            return (
              <div
                key={topic.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 truncate max-w-[200px]">
                      {topic.subjectName} • Unit {topic.unitNumber}
                    </span>

                    {/* Status Badge */}
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                      mastery.isMastered
                        ? 'bg-emerald-100 text-emerald-900'
                        : mastery.isRevisionDue
                        ? 'bg-purple-100 text-purple-900'
                        : mastery.isWeak
                        ? 'bg-rose-100 text-rose-900'
                        : topicProgress?.completed
                        ? 'bg-teal-100 text-teal-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {mastery.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{topic.title}</h4>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Play className="h-3 w-3 text-emerald-600" />
                      {topic.recommendedLecture?.durationMinutes || 45}m Verified Lecture
                    </span>
                    <span>•</span>
                    <span className="text-purple-700 font-semibold">
                      {topic.muhsExamWeightage || '15M LAQ Core'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveFocusTopic(topic)}
                    className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-emerald-700" />
                    <span>Focus Session</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTopic(topic.id)}
                    className="flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Full Topic Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. ACADEMIC & STATUTORY COMPLIANCE NOTICE */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5 text-xs text-slate-600 flex items-start gap-3.5 shadow-sm">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-800">MUHS & Indian Nursing Council (INC) Academic Compliance Notice</div>
          <p className="text-slate-500 leading-relaxed">
            NEETDrop AI Nursing is designed exclusively for university theory syllabus preparation, standardized examination formatting (15-Mark LAQs, 5-Mark SAQs, NANDA Nursing Care Plans), and clinical theory reasoning. It is not a substitute for statutory hospital clinical postings, bedside practical rotations, lab hours, or university attendance mandates.
          </p>
        </div>
      </div>

      {/* MODALS */}
      <NursingOnboardingModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onProfileSaved={handleProfileUpdated}
      />

      <NursingBacklogRecoveryModal
        isOpen={showBacklogModal}
        onClose={() => setShowBacklogModal(false)}
        assessment={backlogAssessment}
        onApplyPlan={() => {
          // Applied rebalanced plan
          alert('Rebalanced study schedule activated! High-yield topics loaded into daily queue.');
        }}
      />

      <NursingMockTestModal
        isOpen={showMockTestModal}
        onClose={() => setShowMockTestModal(false)}
        year={activeYear}
        onSelectTopic={onSelectTopic}
      />

      <NursingQuestionBankModal
        isOpen={showQuestionBankModal}
        onClose={() => setShowQuestionBankModal(false)}
        year={activeYear}
        onLaunchMockTest={() => {
          setShowQuestionBankModal(false);
          setShowMockTestModal(true);
        }}
        onSelectTopic={onSelectTopic}
      />

      <NursingAITutorModal
        isOpen={showAITutorModal}
        onClose={() => setShowAITutorModal(false)}
        contextYear={activeYear}
      />

      <NursingAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        initialYear={activeYear}
        collegeName={studentProfile.college}
        defaultFilter={auditFilter}
        onSelectTopic={(topicId) => {
          setShowAuditModal(false);
          onSelectTopic(topicId);
        }}
      />

      {activeFocusTopic && (
        <NursingStudySession
          topic={activeFocusTopic}
          onClose={() => setActiveFocusTopic(null)}
          onCompleted={() => {
            // refresh
          }}
        />
      )}
    </div>
  );
};
