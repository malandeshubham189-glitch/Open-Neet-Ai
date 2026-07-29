import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  CheckCircle2,
  Flame
} from 'lucide-react';

export const StudyFocusRoom: React.FC = () => {
  const { logStudySession } = useApp();

  const [mode, setMode] = useState<'Pomodoro' | 'Deep Work'>('Pomodoro');
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [scratchpadText, setScratchpadText] = useState<string>('');
  const [completedSessionsCount, setCompletedSessionsCount] = useState<number>(3);

  useEffect(() => {
    let timer: any = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            logStudySession(mode === 'Pomodoro' ? 25 : 50, 'physics', 'Focus Room', 'Zen Deep Study');
            setCompletedSessionsCount((c) => c + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const resetTimer = (newMode = mode) => {
    setIsRunning(false);
    if (newMode === 'Pomodoro') setSecondsLeft(25 * 60);
    else if (newMode === 'Deep Work') setSecondsLeft(50 * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8 min-h-[80vh] flex flex-col justify-center text-[#111827]">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#2563EB]">
          <Sparkles className="h-4 w-4 text-[#2563EB]" />
          <span>ZEN DISTRACTION-FREE FOCUS ROOM</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827] sm:text-4xl">Deep Work Timer</h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
          Zero notification noise. Lock in for uninterrupted NEET preparation.
        </p>
      </div>

      {/* Timer Controls Card */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-12 shadow-sm text-center space-y-8 relative overflow-hidden">
        {/* Mode Selector */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 p-1.5 border border-[#E5E7EB]">
          <button
            onClick={() => {
              setMode('Pomodoro');
              resetTimer('Pomodoro');
            }}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              mode === 'Pomodoro'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Pomodoro (25m)
          </button>
          <button
            onClick={() => {
              setMode('Deep Work');
              resetTimer('Deep Work');
            }}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              mode === 'Deep Work'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Deep Work (50m)
          </button>
        </div>

        {/* Clock Display */}
        <div className="font-mono text-6xl sm:text-8xl font-extrabold tracking-tight text-[#111827]">
          {formatTime(secondsLeft)}
        </div>

        {/* Play Pause Reset Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-all hover:scale-105"
          >
            {isRunning ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
            <span>{isRunning ? 'Pause Timer' : 'Start Focus Session'}</span>
          </button>

          <button
            onClick={() => resetTimer()}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-slate-50 text-[#6B7280] hover:bg-slate-100 hover:text-[#111827] transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${
              soundEnabled
                ? 'border-blue-300 bg-blue-50 text-[#2563EB]'
                : 'border-[#E5E7EB] bg-slate-50 text-[#6B7280] hover:bg-slate-100'
            }`}
            title={soundEnabled ? 'Mute Ambient White Noise' : 'Enable Ambient White Noise'}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 text-xs font-bold text-[#6B7280] pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{completedSessionsCount} Sessions Completed Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Target: 6 Sessions</span>
          </div>
        </div>
      </div>

      {/* Focus Scratchpad */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#2563EB]" />
          <span>Distraction Buffer Scratchpad</span>
        </h3>
        <p className="text-xs text-[#6B7280]">
          Got a distracting thought during focus time? Write it here and clear it after the session.
        </p>
        <textarea
          value={scratchpadText}
          onChange={(e) => setScratchpadText(e.target.value)}
          placeholder="e.g., Check organic chemistry reaction exception at 6:00 PM..."
          className="h-28 w-full rounded-xl border border-[#E5E7EB] bg-slate-50 p-3.5 text-xs text-[#111827] placeholder-[#6B7280] focus:border-[#2563EB] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};
