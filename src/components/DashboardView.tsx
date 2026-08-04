import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import { LiveClassBanner } from './LiveClassBanner';
import {
  Play,
  CheckCircle2,
  Circle,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Tv,
  FileText,
  BookOpen,
  HelpCircle,
  Target,
  Zap,
  Bot,
  Sparkles,
  BrainCircuit,
  Send
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();
  const {
    openTopicDetail,
    topicProgress,
    revisionQueue,
    dailyTasks,
    toggleTaskComplete,
    completeRevisionItem,
    openAIMentorModal
  } = useApp();

  const allTopics = getAllTopics();
  const completedCount = Object.values(topicProgress).filter((p) => p.completed).length;
  const progressPercent = Math.round((completedCount / (allTopics.length || 1)) * 100);

  // Continue Learning Topic
  const continueTopic = allTopics.find((t) => !topicProgress[t.id]?.completed) || allTopics[0];

  // Weak Topics (Maximum 3)
  const weakTopics = [
    {
      id: 'topic-phy-rolling',
      title: 'Rotational Motion: Rolling on Incline',
      subject: 'Physics',
      tag: 'High Weightage'
    },
    {
      id: 'topic-bio-transcription',
      title: 'Molecular Genetics: RNA Polymerases & Transcription',
      subject: 'Biology',
      tag: 'NCERT Must-Read'
    },
    {
      id: 'topic-chem-goc',
      title: 'Organic Chemistry: Resonance & Acidic Strength',
      subject: 'Chemistry',
      tag: 'Core Concept'
    }
  ].slice(0, 3);

  // Upcoming Revision (Maximum 3)
  const dueRevisions = revisionQueue.filter((r) => r.status === 'due').slice(0, 3);

  // Circular progress math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* 🔴 Live Class Sticky Card */}
      <LiveClassBanner />

      {/* 1. Welcome Back & Today's Goal */}
      <div className="rounded-[20px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Welcome back</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {user?.displayName || 'NEET Aspirant'}
          </h1>
          <p className="text-sm text-slate-500">
            <span className="font-bold text-slate-900">Today's Goal:</span> Complete 4 core study tasks and maintain your {user?.streakDays || 14}-day streak.
          </p>
        </div>

        {/* Circular Progress Widget */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[20px] border border-slate-100 shrink-0">
          <div className="relative flex items-center justify-center">
            <svg className="h-24 w-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-[#2563EB] transition-all duration-500"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-base font-extrabold text-slate-900">
              {progressPercent}%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Progress</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{completedCount} of {allTopics.length} Topics</p>
            <p className="text-xs text-slate-500 mt-1">Target Syllabus Finish: Dec 30</p>
          </div>
        </div>
      </div>

      {/* 🚀 ASK NEET AI MENTOR HERO CARD */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-6 sm:p-7 text-white shadow-xl border border-blue-500/30">
        {/* Glow ambient background effect */}
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-12 h-40 w-40 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md shadow-blue-500/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-bold text-blue-300 border border-blue-400/30">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                  24/7 ALL-IN-ONE NEET AI MENTOR & TEACHER
                </span>
              </div>
            </div>

            <button
              onClick={() => openAIMentorModal()}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white px-5 py-2.5 text-xs font-extrabold transition-all shadow-lg shadow-blue-600/30 shrink-0 active:scale-95"
            >
              <Sparkles className="h-4 w-4 fill-white" />
              <span>Ask AI Mentor 1-on-1</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Stuck on an NCERT Concept, Numerical Step, or Study Schedule?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ask your personal AI Mentor for NCERT line-by-line doubt clearance, step-by-step formula derivations, custom dropper study plans, and instant motivation.
            </p>
          </div>

          {/* Quick Prompt Pills */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Popular Student Doubts (Click to Ask):
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap sm:flex-nowrap">
              {[
                '⚡ Moment of Inertia of disc about tangent parallel to plane',
                '🧪 GOC Acidic & Basic strength rules with examples',
                '🧬 How to memorize Biology Class 11 chapters fast?',
                '📅 Create a 30-day Physics backlog recovery plan'
              ].map((promptText, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => openAIMentorModal(promptText)}
                  className="rounded-xl border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/20 hover:text-white hover:border-blue-400/50 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <Send className="h-3 w-3 text-blue-400" />
                  <span>{promptText}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Continue Learning */}
      <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Continue Learning</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase">
              OFFICIAL SOURCE: {continueTopic.subjectId === 'biology' ? 'PW / UNACADEMY' : 'PW'}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {continueTopic.subjectName}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] bg-slate-50 p-5 border border-slate-100">
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
              <Play className="h-5 w-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{continueTopic.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{continueTopic.chapterName}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span>{continueTopic.durationMinutes} mins video</span>
                <span>•</span>
                <span>NCERT Mapped</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openTopicDetail(continueTopic.id)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-all shrink-0 shadow-sm"
          >
            <span>Resume Lecture</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3. Today's Study Plan (Step Sequence) */}
      <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Today's Study Plan</h2>
            <p className="text-xs text-slate-500 mt-0.5">Sequential step-by-step learning pipeline</p>
          </div>
        </div>

        {/* Step Flow Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          {[
            { step: 'Lecture', icon: Tv, desc: 'Watch Video' },
            { step: 'Notes', icon: FileText, desc: 'Read High-Yield' },
            { step: 'NCERT', icon: BookOpen, desc: 'Line Highlight' },
            { step: 'MCQ', icon: HelpCircle, desc: 'Topic Practice' },
            { step: 'PYQ', icon: Target, desc: '10-Yr Solved' },
            { step: 'AI Test', icon: Zap, desc: 'Diagnostic' },
            { step: 'Revision', icon: RotateCcw, desc: 'Spaced Queue' }
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 ${
                  idx === 0
                    ? 'border-[#2563EB] bg-blue-50/60 text-[#2563EB] font-bold'
                    : 'border-slate-100 bg-slate-50 text-slate-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-bold">{s.step}</span>
                <span className="text-[10px] text-slate-400">{s.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Daily Tasks List */}
        <div className="space-y-2.5 pt-2">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTaskComplete(task.id)}
              className={`flex items-center justify-between rounded-xl border p-3.5 transition-all cursor-pointer ${
                task.completed
                  ? 'border-emerald-200 bg-emerald-50/40 text-slate-500'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-400 shrink-0" />
                )}
                <div>
                  <p className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{task.topicTitle}</p>
                </div>
              </div>

              <span className="text-xs font-medium text-slate-500">{task.estimatedMinutes}m</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Two Column Grid: Weak Topics & Upcoming Revision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Topics (Maximum 3) */}
        <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Weak Topics</span>
            </h3>
            <span className="text-xs text-slate-400">Max 3</span>
          </div>

          <div className="space-y-3">
            {weakTopics.map((wt) => (
              <div
                key={wt.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{wt.subject} • {wt.tag}</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{wt.title}</p>
                </div>
                <button
                  onClick={() => openTopicDetail(wt.id)}
                  className="flex items-center gap-1 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-50 transition-colors shrink-0"
                >
                  <span>Revise</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Revision (Maximum 3) */}
        <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-purple-600" />
              <span>Upcoming Revision</span>
            </h3>
            <span className="text-xs text-slate-400">Max 3</span>
          </div>

          <div className="space-y-3">
            {dueRevisions.length === 0 ? (
              <div className="p-4 text-center rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
                🎉 No revisions due right now!
              </div>
            ) : (
              dueRevisions.map((rev) => (
                <div
                  key={rev.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Stage {rev.stage} Review</span>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{rev.topicTitle}</p>
                  </div>
                  <button
                    onClick={() => completeRevisionItem(rev.id)}
                    className="flex items-center gap-1.5 rounded-xl bg-purple-50 border border-purple-200 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition-colors shrink-0"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Revised</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
