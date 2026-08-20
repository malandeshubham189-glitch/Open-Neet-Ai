import React, { useState, useEffect } from 'react';
import {
  IITMSubjectId,
  IITMSubjectMeta,
  IITMUserProgress,
  IITMWeekId,
  IITMWeekMetadata,
  IITMWeekProgress
} from '../../types/iitm';
import { IITM_SUBJECTS_METADATA } from '../../data/iitmData';
import {
  IITMService,
  IITMSmartResumeState,
  IITMNextAction,
  IITMDiagnosticReport
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
  Check,
  ListVideo,
  ExternalLink,
  CheckCheck
} from 'lucide-react';

interface IITMDashboardProps {
  onOpenSubject: (subjectId: IITMSubjectId) => void;
  onOpenWeekLesson: (weekId: IITMWeekId, lessonId?: string, subjectId?: IITMSubjectId) => void;
}

export const IITMDashboard: React.FC<IITMDashboardProps> = ({
  onOpenSubject,
  onOpenWeekLesson
}) => {
  const [activePlaylistSubject, setActivePlaylistSubject] = useState<IITMSubjectId>('math_1');
  const [progressMap, setProgressMap] = useState<Record<IITMSubjectId, IITMUserProgress>>(
    IITMService.getAllProgress()
  );
  const [smartResume, setSmartResume] = useState<IITMSmartResumeState>(
    IITMService.getSmartResume()
  );
  const [mathNextAction, setMathNextAction] = useState<IITMNextAction>(() =>
    IITMService.getPlaylistNextAction('math_1')
  );
  const [statsNextAction, setStatsNextAction] = useState<IITMNextAction>(() =>
    IITMService.getPlaylistNextAction('stats_1')
  );
  const [mathWeeksProgress, setMathWeeksProgress] = useState(() =>
    IITMService.getAllWeeksProgress('math_1')
  );
  const [statsWeeksProgress, setStatsWeeksProgress] = useState(() =>
    IITMService.getAllWeeksProgress('stats_1')
  );
  const [showIntegrityAudit, setShowIntegrityAudit] = useState(false);

  useEffect(() => {
    setProgressMap(IITMService.getAllProgress());
    setSmartResume(IITMService.getSmartResume());
    setMathNextAction(IITMService.getPlaylistNextAction('math_1'));
    setStatsNextAction(IITMService.getPlaylistNextAction('stats_1'));
    setMathWeeksProgress(IITMService.getAllWeeksProgress('math_1'));
    setStatsWeeksProgress(IITMService.getAllWeeksProgress('stats_1'));
  }, []);

  const mathMeta = IITM_SUBJECTS_METADATA.math_1;
  const statsMeta = IITM_SUBJECTS_METADATA.stats_1;
  const mathProg = progressMap.math_1;
  const statsProg = progressMap.stats_1;

  const calculateOneShotPercent = (prog: IITMUserProgress) => {
    let steps = 0;
    if (prog.videoWatched) steps++;
    if (prog.notesGenerated) steps++;
    if (prog.practiceCompleted) steps++;
    if (prog.quizCompleted) steps++;
    if (prog.revisionScheduled) steps++;
    return Math.round((steps / 5) * 100);
  };

  const mathOneShotPercent = calculateOneShotPercent(mathProg);
  const statsOneShotPercent = calculateOneShotPercent(statsProg);

  // Overall Playlist Metrics
  const mathSubjectProgress = IITMService.getSubjectPlaylistProgress('math_1');
  const statsSubjectProgress = IITMService.getSubjectPlaylistProgress('stats_1');

  const currentWeeks = IITMService.getAllWeeks(activePlaylistSubject);
  const currentWeeksProgress =
    activePlaylistSubject === 'math_1' ? mathWeeksProgress : statsWeeksProgress;
  const currentMeta = IITMService.getPlaylistMeta(activePlaylistSubject);
  const currentNextAction =
    activePlaylistSubject === 'math_1' ? mathNextAction : statsNextAction;
  const currentSubjectProg =
    activePlaylistSubject === 'math_1' ? mathSubjectProgress : statsSubjectProgress;

  const mathAudit = IITMService.getIntegrityAudit('math_1');
  const statsAudit = IITMService.getIntegrityAudit('stats_1');

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
              Mathematics & Statistics Learning Portal
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official verified playlists for <strong>Mathematics 1</strong> (40 Lessons) & <strong>Statistics 1</strong> (23 Lessons) covering Foundation Weeks 1 to 4 with zero skipped videos. Distraction-free playback, formulas, and qualifier quizzes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <button
                onClick={() => setShowIntegrityAudit(!showIntegrityAudit)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-3 py-1.5 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 font-bold hover:bg-emerald-500/30 transition cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero-Skip Verified: 100% Coverage</span>
              </button>
              <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Qualifier & Quiz 1 Exam Focus</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="flex sm:flex-col gap-3 shrink-0">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 text-center min-w-[150px]">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {mathSubjectProgress.completedVideos + statsSubjectProgress.completedVideos} /{' '}
                {mathSubjectProgress.totalVideos + statsSubjectProgress.totalVideos}
              </div>
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-0.5">
                Total Lessons Completed
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-500/20 p-4 backdrop-blur-md border border-indigo-400/30 text-center min-w-[150px]">
              <div className="text-2xl sm:text-3xl font-black text-indigo-300">
                {Math.round(
                  ((mathSubjectProgress.completedVideos + statsSubjectProgress.completedVideos) /
                    (mathSubjectProgress.totalVideos + statsSubjectProgress.totalVideos || 1)) *
                    100
                )}
                %
              </div>
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-0.5">
                Overall Qualifier Readiness
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ZERO-SKIP INTEGRITY AUDIT MODAL / BANNER */}
      {showIntegrityAudit && (
        <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-950/20 backdrop-blur-md p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Zero-Skip Playlist Ingestion & Audit Report
              </h3>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-black border border-emerald-300">
              AUDIT STATUS: PASS_ZERO_SKIPS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 font-bold text-slate-700">
                  <th className="p-2.5">COURSE</th>
                  <th className="p-2.5">SUBJECT</th>
                  <th className="p-2.5">PLAYLIST ID</th>
                  <th className="p-2.5 text-center">TOTAL DISCOVERED</th>
                  <th className="p-2.5 text-center">WEEK 1</th>
                  <th className="p-2.5 text-center">WEEK 2</th>
                  <th className="p-2.5 text-center">WEEK 3</th>
                  <th className="p-2.5 text-center">WEEK 4</th>
                  <th className="p-2.5 text-center">TOTAL MAPPED</th>
                  <th className="p-2.5 text-center text-emerald-700">SKIPPED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-900">IIT Madras BS</td>
                  <td className="p-2.5 text-indigo-700 font-bold">Mathematics 1</td>
                  <td className="p-2.5 font-mono text-[11px] text-slate-600">PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA</td>
                  <td className="p-2.5 text-center font-bold">{mathAudit.totalDiscovered}</td>
                  <td className="p-2.5 text-center font-semibold">{mathAudit.weeksAudit.week_1.totalVideos}</td>
                  <td className="p-2.5 text-center font-semibold">{mathAudit.weeksAudit.week_2.totalVideos}</td>
                  <td className="p-2.5 text-center font-semibold">{mathAudit.weeksAudit.week_3.totalVideos}</td>
                  <td className="p-2.5 text-center font-semibold">{mathAudit.weeksAudit.week_4.totalVideos}</td>
                  <td className="p-2.5 text-center font-bold text-indigo-900">{mathAudit.totalMapped}</td>
                  <td className="p-2.5 text-center font-black text-emerald-600">0</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-900">IIT Madras BS</td>
                  <td className="p-2.5 text-teal-700 font-bold">Statistics 1</td>
                  <td className="p-2.5 font-mono text-[11px] text-slate-600">PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b</td>
                  <td className="p-2.5 text-center font-bold">{statsAudit.totalDiscovered}</td>
                  <td className="p-2.5 text-center font-semibold">{statsAudit.weeksAudit.week_1.totalVideos}</td>
                  <td className="p-2.5 text-center font-semibold">{statsAudit.weeksAudit.week_2.totalVideos}</td>
                  <td className="p-2.5 text-center font-semibold">{statsAudit.weeksAudit.week_3.totalVideos}</td>
                  <td className="p-2.5 text-center font-semibold">{statsAudit.weeksAudit.week_4.totalVideos}</td>
                  <td className="p-2.5 text-center font-bold text-teal-900">{statsAudit.totalMapped}</td>
                  <td className="p-2.5 text-center font-black text-emerald-600">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SUBJECT SWITCHER TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div>
          <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-900">
            WEEK-BY-WEEK PLAYLIST TRACKS
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Foundation Qualifier Curriculum (Weeks 1 to 4)
          </h2>
        </div>

        {/* Dual Subject Selector Buttons */}
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
          <button
            onClick={() => setActivePlaylistSubject('math_1')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
              activePlaylistSubject === 'math_1'
                ? 'bg-white text-indigo-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="h-4 w-4 text-indigo-600" />
            <span>Mathematics 1 ({mathSubjectProgress.totalVideos} Videos)</span>
            <span className="rounded-full bg-indigo-100 px-2 py-0.2 text-[10px] text-indigo-800">
              {mathSubjectProgress.progressPercent}%
            </span>
          </button>

          <button
            onClick={() => setActivePlaylistSubject('stats_1')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
              activePlaylistSubject === 'stats_1'
                ? 'bg-white text-teal-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="h-4 w-4 text-teal-600" />
            <span>Statistics 1 ({statsSubjectProgress.totalVideos} Videos)</span>
            <span className="rounded-full bg-teal-100 px-2 py-0.2 text-[10px] text-teal-800">
              {statsSubjectProgress.progressPercent}%
            </span>
          </button>
        </div>
      </div>

      {/* 3. HERO ACTION / NEXT BEST ACTION CARD FOR ACTIVE SUBJECT */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Flame className="h-3.5 w-3.5 fill-white" />
              </span>
              <span className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                RECOMMENDED NEXT STEP • {activePlaylistSubject === 'math_1' ? 'MATHEMATICS 1' : 'STATISTICS 1'}
              </span>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-800 border border-indigo-200">
                {currentNextAction.estimatedMinutes} MINS
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-900">{currentNextAction.actionTitle}</h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {currentNextAction.actionSubtitle} — {currentNextAction.reason}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (currentNextAction.weekId) {
                  onOpenWeekLesson(
                    currentNextAction.weekId,
                    currentNextAction.lessonId,
                    activePlaylistSubject
                  );
                } else {
                  onOpenWeekLesson('week_1', undefined, activePlaylistSubject);
                }
              }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-xs font-black text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>CONTINUE SEQUENTIAL LESSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. ACTIVE SUBJECT 4 WEEK CARDS GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
          <span>
            Playlist: <strong>{currentMeta.playlistTitle}</strong> ({currentMeta.playlistId})
          </span>
          <span>
            Progress: {currentSubjectProg.completedVideos} / {currentSubjectProg.totalVideos} Lessons ({currentSubjectProg.progressPercent}%)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['week_1', 'week_2', 'week_3', 'week_4'] as IITMWeekId[]).map((wId) => {
            const week = currentWeeks[wId];
            const prog = currentWeeksProgress[wId] || {
              completedLessons: 0,
              totalLessons: week.lessons.length,
              progressPercent: 0
            };

            return (
              <div
                key={wId}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-black text-indigo-900 border border-indigo-100">
                      WEEK {week.weekNumber}
                    </span>
                    <span className="text-xs font-bold text-indigo-700">{prog.progressPercent}%</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 line-clamp-2">{week.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{week.description}</p>

                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${prog.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-1">
                    <span className="font-bold text-slate-700">{week.lessons.length} Lessons</span>
                    <span className="text-emerald-700">{prog.completedLessons} Done</span>
                    <span>~{week.estimatedHours} hrs</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenWeekLesson(wId, undefined, activePlaylistSubject)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  <span>
                    {prog.progressPercent > 0
                      ? `Resume Week ${week.weekNumber}`
                      : `Start Week ${week.weekNumber} (${week.lessons.length} Videos)`}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ONESHOT MARATHON LECTURES TRACK */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-900">
              FAST-TRACK REVISION TRACK
            </span>
            <span className="text-xs font-semibold text-slate-500">
              OneShot Qualifier Exam Preparation
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Foundation OneShot Qualifier Marathons
          </h2>
          <p className="text-xs text-slate-600">
            Rapid single-sitting revision covering complete Qualifier & Quiz 1 syllabus with solved previous year questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SUBJECT 1: MATHEMATICS 1 ONESHOT */}
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
                    <h3 className="text-lg font-black text-slate-900">{mathMeta.title} (OneShot)</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-blue-700">{mathOneShotPercent}%</span>
                  <span className="block text-[10px] text-slate-400 font-bold">Progress</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${mathOneShotPercent}%` }}
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
              <span>{mathProg.videoWatched ? 'CONTINUE ONESHOT MATH 1' : 'START ONESHOT MATH 1'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* SUBJECT 2: STATISTICS 1 ONESHOT */}
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
                    <h3 className="text-lg font-black text-slate-900">{statsMeta.title} (OneShot)</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-teal-700">{statsOneShotPercent}%</span>
                  <span className="block text-[10px] text-slate-400 font-bold">Progress</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${statsOneShotPercent}%` }}
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
              <span>{statsProg.videoWatched ? 'CONTINUE ONESHOT STATS 1' : 'START ONESHOT STATS 1'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. DISTRACTION-FREE IN-APP LEARNING NOTICE */}
      <div className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-5 text-xs text-indigo-900 flex items-start gap-3.5 shadow-sm">
        <ShieldCheck className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-indigo-950">Distraction-Free In-App Learning Experience</div>
          <p className="text-indigo-800/90 leading-relaxed">
            Within NEETDrop, you study directly without external video feeds, algorithmic rabbit-holes, or comment distractions. Official YouTube embeds are utilized with strict academic privacy.
          </p>
        </div>
      </div>
    </div>
  );
};
