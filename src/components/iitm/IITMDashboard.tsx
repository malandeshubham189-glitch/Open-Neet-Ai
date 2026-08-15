import React, { useState, useEffect } from 'react';
import {
  IITMSubjectId,
  IITMSubjectMeta,
  IITMUserProgress
} from '../../types/iitm';
import {
  IITM_SUBJECTS_METADATA
} from '../../data/iitmData';
import {
  IITMService,
  IITMSmartResumeState,
  IITMNextAction
} from '../../services/iitmService';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Calculator,
  BarChart3,
  Flame,
  ArrowRight,
  Layers,
  FileText,
  HelpCircle,
  RotateCcw,
  Check
} from 'lucide-react';

interface IITMDashboardProps {
  onOpenSubject: (subjectId: IITMSubjectId) => void;
}

export const IITMDashboard: React.FC<IITMDashboardProps> = ({ onOpenSubject }) => {
  const [progressMap, setProgressMap] = useState<Record<IITMSubjectId, IITMUserProgress>>(
    IITMService.getAllProgress()
  );
  const [smartResume, setSmartResume] = useState<IITMSmartResumeState>(
    IITMService.getSmartResume()
  );
  const [nextAction, setNextAction] = useState<IITMNextAction>(
    IITMService.getNextAction()
  );

  useEffect(() => {
    const p = IITMService.getAllProgress();
    setProgressMap(p);
    setSmartResume(IITMService.getSmartResume());
    setNextAction(IITMService.getNextAction());
  }, []);

  const mathMeta = IITM_SUBJECTS_METADATA.math_1;
  const statsMeta = IITM_SUBJECTS_METADATA.stats_1;

  const mathProg = progressMap.math_1;
  const statsProg = progressMap.stats_1;

  const calculatePercent = (prog: IITMUserProgress) => {
    let steps = 0;
    if (prog.videoWatched) steps++;
    if (prog.notesGenerated) steps++;
    if (prog.practiceCompleted) steps++;
    if (prog.quizCompleted) steps++;
    if (prog.revisionScheduled) steps++;
    return Math.round((steps / 5) * 100);
  };

  const mathPercent = calculatePercent(mathProg);
  const statsPercent = calculatePercent(statsProg);
  const totalCompleted = (mathProg.completed ? 1 : 0) + (statsProg.completed ? 1 : 0);

  const isResuming = mathProg.videoWatched || statsProg.videoWatched || smartResume.progressPercent > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 font-sans">
      {/* 1. TOP HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-900/60">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-300 border border-indigo-400/30">
              <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
              <span>IIT Madras BS Degree • Foundation Level</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Qualifier Exam & Quiz 1 Mastery Portal
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official user-provided one-shot marathon lectures for <strong>Mathematics 1</strong> and <strong>Statistics 1</strong>. Complete the 5-step learning pipeline to ensure 100% conceptual mastery and high scores.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified User-Provided Resources</span>
              </span>
              <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Qualifier & Quiz 1 Aligned</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="flex sm:flex-col gap-3 shrink-0">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 text-center min-w-[130px]">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalCompleted}/2</div>
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-0.5">
                Subjects Mastered
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-500/20 p-4 backdrop-blur-md border border-indigo-400/30 text-center min-w-[130px]">
              <div className="text-2xl sm:text-3xl font-black text-indigo-300">
                {Math.round((mathPercent + statsPercent) / 2)}%
              </div>
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-0.5">
                Overall Progress
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO ACTION / SMART RESUME CARD */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Flame className="h-3.5 w-3.5 fill-white" />
              </span>
              <span className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                {isResuming ? `CONTINUE ${smartResume.subjectTitle.toUpperCase()}` : "START TODAY'S STUDY"}
              </span>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-800 border border-indigo-200">
                {isResuming ? smartResume.stepLabel : `${nextAction.estimatedMinutes} MINS`}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {isResuming ? smartResume.subjectTitle : nextAction.actionTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {isResuming
                ? `Pick up right where you left off in ${smartResume.subjectTitle} (${smartResume.stepLabel}). Complete all 5 steps to master the concepts.`
                : nextAction.reason}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenSubject(isResuming ? smartResume.subjectId : nextAction.subjectId)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-xs font-black text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>{isResuming ? `CONTINUE ${smartResume.subjectTitle.toUpperCase()}` : 'START NOW'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. CORE SUBJECTS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">IIT Madras BS Foundation Subjects</h2>
            <p className="text-xs text-slate-500">Official curated lectures with complete concept notes and practice quizzes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SUBJECT 1: MATHEMATICS 1 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600">{mathMeta.code}</span>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-800">
                        {mathMeta.credits} CREDITS
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{mathMeta.title}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-blue-700">{mathPercent}%</span>
                  <span className="block text-[10px] text-slate-400 font-bold">Progress</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${mathPercent}%` }}
                />
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">OneShot Marathon Lecture</span>
                  <span className="font-black text-slate-500">~{mathMeta.lectureResource.durationMinutes} mins</span>
                </div>
                <p className="text-xs text-slate-600 font-medium line-clamp-2">
                  {mathMeta.lectureResource.title}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                    Functions & Inverses
                  </span>
                  <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                    Straight Lines
                  </span>
                  <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                    Matrices & Ax = b
                  </span>
                </div>
              </div>

              {/* 5 Steps Tracker */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[
                  { label: 'Lecture', done: mathProg.videoWatched },
                  { label: 'Notes', done: mathProg.notesGenerated },
                  { label: 'Practice', done: mathProg.practiceCompleted },
                  { label: 'Quiz', done: mathProg.quizCompleted },
                  { label: 'Revision', done: mathProg.revisionScheduled }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-2 text-center border text-[10px] font-bold transition-all ${
                      step.done
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-center mb-0.5">
                      {step.done ? <Check className="h-3 w-3 text-emerald-600" /> : <span>{idx + 1}</span>}
                    </div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenSubject('math_1')}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <span>{mathProg.videoWatched ? 'CONTINUE MATHEMATICS 1' : 'START MATHEMATICS 1'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* SUBJECT 2: STATISTICS 1 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-200">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-teal-600">{statsMeta.code}</span>
                      <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-black text-teal-800">
                        {statsMeta.credits} CREDITS
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{statsMeta.title}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-teal-700">{statsPercent}%</span>
                  <span className="block text-[10px] text-slate-400 font-bold">Progress</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${statsPercent}%` }}
                />
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">OneShot Marathon Lecture</span>
                  <span className="font-black text-slate-500">~{statsMeta.lectureResource.durationMinutes} mins</span>
                </div>
                <p className="text-xs text-slate-600 font-medium line-clamp-2">
                  {statsMeta.lectureResource.title}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                    Data Types & Mean
                  </span>
                  <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                    Bayes Theorem
                  </span>
                  <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                    PMF & Tukey IQR
                  </span>
                </div>
              </div>

              {/* 5 Steps Tracker */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[
                  { label: 'Lecture', done: statsProg.videoWatched },
                  { label: 'Notes', done: statsProg.notesGenerated },
                  { label: 'Practice', done: statsProg.practiceCompleted },
                  { label: 'Quiz', done: statsProg.quizCompleted },
                  { label: 'Revision', done: statsProg.revisionScheduled }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-2 text-center border text-[10px] font-bold transition-all ${
                      step.done
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-center mb-0.5">
                      {step.done ? <Check className="h-3 w-3 text-emerald-600" /> : <span>{idx + 1}</span>}
                    </div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenSubject('stats_1')}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-700 px-5 py-3 text-xs font-bold text-white shadow-md shadow-teal-600/20 transition-all cursor-pointer"
            >
              <span>{statsProg.videoWatched ? 'CONTINUE STATISTICS 1' : 'START STATISTICS 1'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. DISTRACTION-FREE IN-APP LEARNING NOTICE */}
      <div className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-5 text-xs text-indigo-900 flex items-start gap-3.5 shadow-sm">
        <ShieldCheck className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-indigo-950">Distraction-Free In-App Learning Experience</div>
          <p className="text-indigo-800/90 leading-relaxed">
            Within NEETDrop, you study directly without external video feeds, algorithm feeds, or comment sections. Official YouTube embeds are utilized for reliable video playback in full compliance with YouTube terms.
          </p>
        </div>
      </div>
    </div>
  );
};
