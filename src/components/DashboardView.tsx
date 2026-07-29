import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import {
  Flame,
  Clock,
  Play,
  CheckCircle2,
  Circle,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Target,
  BookOpen,
  HelpCircle,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();
  const {
    setCurrentView,
    openTopicDetail,
    topicProgress,
    revisionQueue,
    dailyTasks,
    toggleTaskComplete,
    completeRevisionItem,
    studentMetrics,
    targetScoreMode,
    targetScoreConfig,
    backlogSummary,
    autoRebalanceBacklog
  } = useApp();

  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<string | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  // Curriculum & Progress Metrics
  const allTopics = getAllTopics();
  const completedCount = Object.values(topicProgress).filter((p) => p.completed).length;
  const physicsTopics = allTopics.filter((t) => t.subjectId === 'physics');
  const chemTopics = allTopics.filter((t) => t.subjectId === 'chemistry');
  const bioTopics = allTopics.filter((t) => t.subjectId === 'biology');

  const physicsCompleted = physicsTopics.filter((t) => topicProgress[t.id]?.completed).length;
  const chemCompleted = chemTopics.filter((t) => topicProgress[t.id]?.completed).length;
  const bioCompleted = bioTopics.filter((t) => topicProgress[t.id]?.completed).length;

  const dueRevisions = revisionQueue.filter((r) => r.status === 'due');
  const pendingTasks = dailyTasks.filter((t) => !t.completed);

  // Continue Last Lecture topic (default to first uncompleted or active topic)
  const continueTopic = allTopics.find((t) => !topicProgress[t.id]?.completed) || allTopics[0];

  // Target Dec 30 Countdown Calculation
  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`${currentYear}-12-30`);
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));

  // Sample Today's MCQ Question
  const todaysMcq = continueTopic.mcqs[0] || {
    id: 'sample-mcq-1',
    question: 'A thin uniform circular disc of mass M and radius R rotates about its central axis. Its moment of inertia about a tangent parallel to its plane is:',
    options: [
      { id: 'a', text: '(1/2) M R²' },
      { id: 'b', text: '(5/4) M R²' },
      { id: 'c', text: '(3/2) M R²' },
      { id: 'd', text: '(2/5) M R²' }
    ],
    correctAnswerId: 'b',
    explanation: 'By Parallel Axis Theorem: I_tangent = I_dia + M R² = (1/4) M R² + M R² = (5/4) M R².',
    hint: 'I_dia = (1/4) M R². Add M R² for parallel tangent.',
    tag: 'NCERT Line'
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-[#111827]">
      {/* SECTION 1: WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB] border border-blue-100">
            <Flame className="h-3.5 w-3.5 fill-[#2563EB]" />
            <span>NEET 2027 DROPPER PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Welcome back, <span className="text-[#2563EB]">{user?.displayName || 'NEET Aspirant'}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Target Syllabus Completion: <span className="font-bold text-[#111827]">30 December</span> • You have <span className="font-bold text-[#2563EB]">{dueRevisions.length} due revisions</span> and <span className="font-bold text-[#2563EB]">{pendingTasks.length} study tasks</span> today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('focus-room')}
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
          >
            <Clock className="h-4 w-4" />
            <span>Start Zen Focus Room</span>
          </button>
        </div>
      </div>

      {/* SECTION 7: DAYS REMAINING COUNTDOWN + QUICK METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Days Remaining to Dec 30 */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold">
            <span>Target Deadline</span>
            <Target className="h-4 w-4 text-[#2563EB]" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-extrabold text-[#2563EB]">{daysRemaining}</span>
            <span className="text-xs font-bold text-[#6B7280]">Days Remaining</span>
          </div>
          <p className="text-[11px] font-medium text-[#6B7280]">Target Date: 30 December</p>
        </div>

        {/* Syllabus Completed */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold">
            <span>Syllabus Covered</span>
            <BookOpen className="h-4 w-4 text-[#7C3AED]" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-extrabold text-[#111827]">{completedCount} / {allTopics.length}</span>
            <span className="text-xs font-bold text-[#7C3AED]">Topics</span>
          </div>
          <p className="text-[11px] font-medium text-[#6B7280]">
            {Math.round((completedCount / (allTopics.length || 1)) * 100)}% Complete
          </p>
        </div>

        {/* Active Streak */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold">
            <span>Study Streak</span>
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-extrabold text-amber-600">{user?.streakDays || 14}</span>
            <span className="text-xs font-bold text-amber-600">Days</span>
          </div>
          <p className="text-[11px] font-medium text-[#6B7280]">Consistent Daily Progress</p>
        </div>

        {/* Due Revisions */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold">
            <span>Spaced Revision Queue</span>
            <RotateCcw className="h-4 w-4 text-[#2563EB]" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-extrabold text-[#2563EB]">{dueRevisions.length}</span>
            <span className="text-xs font-bold text-[#2563EB]">Items Due</span>
          </div>
          <p className="text-[11px] font-medium text-[#6B7280]">Active Recall Spaced Repetition</p>
        </div>
      </div>

      {/* QUALITY SCORE & REAL STUDENT DIAGNOSTICS */}
      <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#2563EB]" />
              <span>Real Student Performance & Mastery Quality Index</span>
            </h2>
            <p className="text-xs text-[#6B7280]">
              Dynamic analytics aggregated from lectures, MCQs, PYQs, NCERT reading, and AI diagnostic test runs.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentView('ai-planner')}
              className="rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-colors"
            >
              Mode: {targetScoreMode} Target ({targetScoreConfig.dailyStudyHours} hrs/day)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-1">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Watch Time</p>
            <p className="text-lg font-extrabold text-[#111827]">{Math.round(studentMetrics.totalWatchTimeMinutes / 60)} Hours</p>
            <p className="text-[10px] text-emerald-600 font-semibold">Active Lectures</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-1">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">MCQ Accuracy</p>
            <p className="text-lg font-extrabold text-[#2563EB]">{studentMetrics.overallMcqAccuracy}%</p>
            <p className="text-[10px] text-[#2563EB] font-semibold">Target {targetScoreConfig.mcqsPerTopic} / Topic</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-1">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">PYQ Accuracy</p>
            <p className="text-lg font-extrabold text-emerald-600">{studentMetrics.overallPyqAccuracy}%</p>
            <p className="text-[10px] text-emerald-600 font-semibold">10-Year Trend</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-1">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">NCERT Read</p>
            <p className="text-lg font-extrabold text-[#7C3AED]">{studentMetrics.ncertCompletionPercent}%</p>
            <p className="text-[10px] text-[#7C3AED] font-semibold">Line-by-Line</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-1">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Avg Test Score</p>
            <p className="text-lg font-extrabold text-amber-600">{studentMetrics.averageTestScorePercent}%</p>
            <p className="text-[10px] text-amber-600 font-semibold">Diagnostic Mocks</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-1">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Mastery Score</p>
            <p className="text-lg font-extrabold text-slate-900">{studentMetrics.masteryScorePercent}%</p>
            <p className="text-[10px] text-slate-500 font-semibold">Syllabus Index</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Strong Chapters:</span>
            <div className="flex flex-wrap gap-1.5">
              {studentMetrics.strongChapters.map((ch) => (
                <span key={ch} className="rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 font-bold">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Focus Weak Areas:</span>
            <div className="flex flex-wrap gap-1.5">
              {studentMetrics.weakChapters.map((ch) => (
                <span key={ch} className="rounded-lg bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 font-bold">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION 2: CONTINUE LAST LECTURE */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">
                CONTINUE LAST LECTURE
              </span>
              <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#2563EB] border border-blue-100">
                {continueTopic.subjectName} • {continueTopic.importance} Weightage
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 border border-[#E5E7EB]">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white font-extrabold">
                  <Play className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">{continueTopic.title}</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">{continueTopic.chapterName}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] font-medium text-[#6B7280]">
                    <span>{continueTopic.durationMinutes} mins video</span>
                    <span>•</span>
                    <span>Channel: {continueTopic.channelName}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openTopicDetail(continueTopic.id)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shrink-0 shadow-sm"
              >
                <span>Resume Lecture</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* SECTION 3: TODAY'S STUDY PLAN */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#2563EB]" />
                  <span>Today's AI Daily Planner</span>
                </h3>
                <p className="text-xs text-[#6B7280]">Target plan auto-generated for Dec 30 syllabus completion</p>
              </div>
              <button
                onClick={() => setCurrentView('ai-planner')}
                className="flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-colors shadow-xs"
              >
                <span>Full AI Planner</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskComplete(task.id)}
                  className={`flex items-center justify-between rounded-xl border p-3.5 transition-all cursor-pointer ${
                    task.completed
                      ? 'border-emerald-200 bg-emerald-50/50 text-[#6B7280]'
                      : 'border-[#E5E7EB] bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-[#6B7280] shrink-0" />
                    )}
                    <div>
                      <p className={`text-xs font-bold ${task.completed ? 'line-through text-[#6B7280]' : 'text-[#111827]'}`}>
                        {task.title}
                      </p>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">{task.topicTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-white border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#111827]">
                      {task.type}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B7280]">{task.estimatedMinutes}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: TODAY'S REVISION */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-[#7C3AED]" />
                  <span>Today's Revision Queue</span>
                </h3>
                <p className="text-xs text-[#6B7280]">Active recall topics due today for maximum long-term retention</p>
              </div>
              <button
                onClick={() => setCurrentView('revision')}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View Full Queue
              </button>
            </div>

            <div className="space-y-3">
              {dueRevisions.length === 0 ? (
                <div className="p-4 text-center rounded-xl bg-slate-50 border border-[#E5E7EB] text-xs text-[#6B7280]">
                  🎉 All revisions for today are complete!
                </div>
              ) : (
                dueRevisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-slate-50 p-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#7C3AED] tracking-wider">
                        Stage {rev.stage} Review
                      </span>
                      <h4 className="text-xs font-bold text-[#111827] mt-0.5">{rev.topicTitle}</h4>
                      <p className="text-[11px] text-[#6B7280]">{rev.chapterName}</p>
                    </div>

                    <button
                      onClick={() => completeRevisionItem(rev.id)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition-all shrink-0"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB]" />
                      <span>Mark Revised</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN */}
        <div className="space-y-6">
          {/* SECTION 5: TODAY'S MCQs */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[#2563EB]" />
                <span>Today's High-Yield MCQ</span>
              </h3>
              <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-[#7C3AED]">
                {todaysMcq.tag}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#111827] leading-relaxed">
                {todaysMcq.question}
              </p>

              <div className="space-y-2">
                {todaysMcq.options.map((opt) => {
                  const isSelected = selectedMcqAnswer === opt.id;
                  const isCorrect = opt.id === todaysMcq.correctAnswerId;

                  let btnStyle = 'border-[#E5E7EB] bg-slate-50 text-[#111827] hover:bg-slate-100';
                  if (mcqSubmitted) {
                    if (isCorrect) btnStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                    else if (isSelected) btnStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={mcqSubmitted}
                      onClick={() => setSelectedMcqAnswer(opt.id)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${btnStyle}`}
                    >
                      <span className="font-bold mr-2">{opt.id.toUpperCase()}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {!mcqSubmitted ? (
                <button
                  disabled={!selectedMcqAnswer}
                  onClick={() => setMcqSubmitted(true)}
                  className="w-full py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold disabled:opacity-50 hover:bg-blue-700 transition-all shadow-sm"
                >
                  Check Answer
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-[#111827] space-y-1">
                  <p className="font-bold text-[#2563EB]">Explanation:</p>
                  <p className="text-[11px] text-[#6B7280] leading-relaxed">{todaysMcq.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 6: SYLLABUS PROGRESS */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#2563EB]" />
                <span>Syllabus Breakdown</span>
              </h3>
              <button
                onClick={() => setCurrentView('syllabus')}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View Details
              </button>
            </div>

            <div className="space-y-3">
              {/* Physics */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Physics</span>
                  <span className="text-[#2563EB]">{physicsCompleted} / {physicsTopics.length} Topics</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-[#2563EB]"
                    style={{ width: `${Math.round((physicsCompleted / (physicsTopics.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Chemistry */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Chemistry</span>
                  <span className="text-[#7C3AED]">{chemCompleted} / {chemTopics.length} Topics</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-[#7C3AED]"
                    style={{ width: `${Math.round((chemCompleted / (chemTopics.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Biology */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Biology (Botany & Zoology)</span>
                  <span className="text-emerald-600">{bioCompleted} / {bioTopics.length} Topics</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-emerald-600"
                    style={{ width: `${Math.round((bioCompleted / (bioTopics.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 8: WEAK TOPICS */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Weak Topic Focus Areas</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                  <span>Physics • High Weightage</span>
                  <span>45% Accuracy</span>
                </div>
                <p className="text-xs font-bold text-[#111827]">Rotational Motion: Rolling on Incline</p>
                <p className="text-[11px] text-[#6B7280]">Formula review: a = (g sin θ) / (1 + K²/R²)</p>
                <button
                  onClick={() => openTopicDetail('topic-phy-rolling')}
                  className="mt-2 text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>Revise Topic</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                  <span>Biology • High Weightage</span>
                  <span>50% Accuracy</span>
                </div>
                <p className="text-xs font-bold text-[#111827]">Molecular Genetics: RNA Polymerases</p>
                <p className="text-[11px] text-[#6B7280]">Review RNA Pol I (rRNA), II (mRNA), III (tRNA)</p>
                <button
                  onClick={() => openTopicDetail('topic-bio-transcription')}
                  className="mt-2 text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>Revise Topic</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
