import React from 'react';
import { useApp } from '../context/AppContext';
import { TargetScoreMode } from '../types';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Video,
  FileText,
  RotateCcw,
  Target,
  ArrowRight,
  Award,
  AlertTriangle,
  RefreshCw,
  Zap,
  Layers,
  CalendarCheck
} from 'lucide-react';

export const AIDailyPlannerView: React.FC = () => {
  const {
    dailyTasks,
    toggleTaskComplete,
    revisionQueue,
    openTopicDetail,
    targetScoreMode,
    setTargetScoreMode,
    targetScoreConfig,
    backlogSummary,
    autoRebalanceBacklog,
    scheduleNextSpacedRepetition
  } = useApp();

  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`${currentYear}-12-30`);
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));

  const completedCount = dailyTasks.filter((t) => t.completed).length;
  const totalTasks = dailyTasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const totalEstimatedMinutes = dailyTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 30), 0);
  const totalHours = (totalEstimatedMinutes / 60).toFixed(1);

  const scoreModes: TargetScoreMode[] = ['500+', '600+', '650+', '700+'];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Target Score Mode Selector Bar */}
      <div className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <Target className="h-4 w-4 text-[#2563EB]" />
              <span>Target NEET Score Mode & AI Calibration</span>
            </h2>
            <p className="text-xs text-[#6B7280]">
              Select your goal score. The AI automatically scales daily study hours, MCQ targets, and revision intensity.
            </p>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#2563EB]">
            Current Goal: {targetScoreConfig.mode} ({targetScoreConfig.targetMarks} Marks)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {scoreModes.map((mode) => {
            const isSelected = targetScoreMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setTargetScoreMode(mode)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-[#2563EB] bg-blue-50/60 shadow-sm ring-2 ring-[#2563EB]/20'
                    : 'border-[#E5E7EB] bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#111827]">{mode} Target</span>
                  {isSelected && <Zap className="h-4 w-4 text-[#2563EB]" />}
                </div>
                <div className="mt-2 space-y-1 text-[11px] text-[#6B7280]">
                  <p><strong className="text-[#111827]">{mode === '500+' ? '4.5' : mode === '600+' ? '6.0' : mode === '650+' ? '7.5' : '9.0'} hrs</strong> / day</p>
                  <p><strong className="text-[#111827]">{mode === '500+' ? '15' : mode === '600+' ? '25' : mode === '650+' ? '40' : '60'} MCQs</strong> / topic</p>
                  <p className="text-emerald-700 font-semibold">{mode === '500+' ? 'Biweekly' : mode === '600+' ? 'Weekly' : mode === '650+' ? 'Twice Weekly' : 'Every 2 Days'} Mocks</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Backlog Recovery Auto-Rebalance Engine */}
      {backlogSummary.pendingCount > 0 && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  Backlog Recovery Engine Active: {backlogSummary.pendingCount} Pending Tasks ({Math.round(backlogSummary.estimatedOverdueMinutes / 60)} hrs overdue)
                </h3>
                <p className="text-xs text-amber-800/90 mt-0.5 max-w-xl">
                  Uncompleted topics detected ({backlogSummary.overdueTopics.slice(0, 3).join(', ')}...). Rebalance schedule now to stay strictly on track for Dec 30 without burnout.
                </p>
              </div>
            </div>

            <button
              onClick={() => autoRebalanceBacklog()}
              className="flex items-center gap-2 rounded-2xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-all shadow-md shrink-0 active:scale-95"
            >
              <RefreshCw className="h-4 w-4 animate-spin-once" />
              <span>Auto-Rebalance Backlog Schedule</span>
            </button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl border border-[#E5E7EB] bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Target className="h-64 w-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-bold text-blue-300 backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                AI Daily Dropper Planner ({targetScoreMode})
              </span>
              <span className="rounded-full bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-300">
                Target Dec 30 Mission
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Today's Syllabus Execution Target
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Calibrated for {targetScoreConfig.dailyStudyHours} hrs daily workload & {targetScoreConfig.mcqsPerTopic} MCQs per topic to complete 100% NCERT Physics, Chemistry, and Biology.
            </p>
          </div>

          {/* Countdown & Target Box */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Countdown</p>
              <p className="text-2xl font-black text-amber-400 mt-0.5">{daysLeft} Days</p>
              <p className="text-[10px] font-semibold text-slate-300">To Dec 30 Target</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Target Daily Workload</p>
              <p className="text-2xl font-black text-white mt-0.5">{totalHours} Hours</p>
              <p className="text-[10px] font-semibold text-emerald-400">{targetScoreConfig.mockTestLabel}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Today's Execution Progress ({completedCount}/{totalTasks} Completed)</span>
            <span className="text-amber-400">{completionPercent}% Complete</span>
          </div>
          <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Spaced Repetition Engine Schedule Widget */}
      <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#7C3AED]" />
              <span>Automatic Spaced Repetition Schedule (1d, 3d, 7d, 15d, 30d)</span>
            </h2>
            <p className="text-xs text-[#6B7280]">
              Automated memory retention intervals calculated specifically for {targetScoreMode} target retention.
            </p>
          </div>
          <span className="text-xs font-bold text-[#7C3AED] bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
            {revisionQueue.filter((r) => r.status === 'due').length} Topics Due Today
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {revisionQueue.slice(0, 3).map((item) => (
            <div key={item.id} className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7C3AED]">Stage {item.stage} Repetition</span>
                <span className="text-[10px] font-semibold text-slate-500">Due: {item.dueAt}</span>
              </div>
              <p className="text-xs font-bold text-[#111827] truncate">{item.topicTitle}</p>
              <p className="text-[11px] text-slate-500 truncate">{item.chapterName}</p>
              <button
                onClick={() => {
                  scheduleNextSpacedRepetition(item.topicId);
                  openTopicDetail(item.topicId);
                }}
                className="w-full mt-1 rounded-xl bg-purple-600 py-1.5 text-xs font-bold text-white hover:bg-purple-700 transition-colors"
              >
                Review Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Task Execution List */}
      <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#111827]">Today's Step-by-Step Execution Schedule</h2>
            <p className="text-xs text-[#6B7280]">Complete tasks in order to maintain maximum AI confidence score</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-bold flex items-center gap-1">
              <Award className="h-3.5 w-3.5" />
              Syllabus On Track
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {dailyTasks.map((task, idx) => {
            let Icon = BookOpen;
            let iconColor = 'text-[#2563EB] bg-blue-50 border-blue-200';

            if (task.type === 'Video') {
              Icon = Video;
              iconColor = 'text-rose-600 bg-rose-50 border-rose-200';
            } else if (task.type === 'Notes' || task.type === 'NCERT') {
              Icon = FileText;
              iconColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
            } else if (task.type === 'Revision') {
              Icon = RotateCcw;
              iconColor = 'text-[#7C3AED] bg-purple-50 border-purple-200';
            }

            return (
              <div
                key={task.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                  task.completed
                    ? 'border-emerald-200 bg-emerald-50/30 text-slate-500'
                    : 'border-[#E5E7EB] bg-slate-50/50 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                      task.completed
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white hover:border-[#2563EB]'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded-lg border text-xs font-bold ${iconColor}`}>
                        <Icon className="h-3.5 w-3.5 inline mr-1" />
                        {task.type}
                      </span>

                      <span
                        className={`text-xs font-bold ${
                          task.completed ? 'line-through text-slate-400' : 'text-[#111827]'
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#6B7280]">
                      Topic: <span className="font-semibold text-[#111827]">{task.topicTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#6B7280]">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{task.estimatedMinutes} mins</span>
                  </div>

                  {task.topicId && (
                    <button
                      onClick={() => openTopicDetail(task.topicId!)}
                      className="flex items-center gap-1 rounded-xl bg-white border border-[#E5E7EB] px-3 py-1 text-xs font-bold text-[#2563EB] hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      <span>Study Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
