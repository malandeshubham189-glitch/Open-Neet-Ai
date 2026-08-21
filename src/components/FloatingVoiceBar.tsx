import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Gauge,
  X,
  ChevronUp,
  ChevronDown,
  Radio,
  UserCheck
} from 'lucide-react';
import { ttsService, TTSState } from '../services/TTSService';
import { studioDSP } from '../utils/audioDSP';
import { VOICE_PROFILES } from '../config/voiceConfig';

export const FloatingVoiceBar: React.FC = () => {
  const [ttsState, setTtsState] = useState<TTSState>(ttsService.getState());
  const [isExpanded, setIsExpanded] = useState(true);
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 60, 85, 95, 70, 50, 65, 80, 45, 30]);

  useEffect(() => {
    const unsubscribe = ttsService.subscribe((state) => {
      setTtsState(state);
    });
    return () => unsubscribe();
  }, []);

  // Real-time audio waveform animation loop
  useEffect(() => {
    let animId: number;

    const updateWave = () => {
      if (ttsState.status === 'playing') {
        const freq = studioDSP.getFrequencyData();
        if (freq && freq.length > 0) {
          const sampleCount = 10;
          const step = Math.floor(freq.length / sampleCount) || 1;
          const nextHeights = [];
          for (let i = 0; i < sampleCount; i++) {
            const val = freq[i * step] || 0;
            // Map 0..255 to 20%..100% height
            const h = Math.max(20, Math.min(100, Math.round((val / 255) * 100)));
            nextHeights.push(h);
          }
          setWaveHeights(nextHeights);
        } else {
          // Subtle natural breathing bounce
          setWaveHeights([
            30 + Math.random() * 40,
            40 + Math.random() * 50,
            50 + Math.random() * 45,
            60 + Math.random() * 35,
            45 + Math.random() * 50,
            55 + Math.random() * 40,
            65 + Math.random() * 30,
            50 + Math.random() * 45,
            40 + Math.random() * 35,
            30 + Math.random() * 30
          ]);
        }
      } else {
        setWaveHeights([15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);
      }
      animId = requestAnimationFrame(updateWave);
    };

    animId = requestAnimationFrame(updateWave);
    return () => cancelAnimationFrame(animId);
  }, [ttsState.status]);

  if (ttsState.status === 'idle' || ttsState.status === 'stopped') {
    return null;
  }

  const currentSentenceText = ttsState.currentSentence?.text || 'Listening to AI Teacher...';
  const progressPercent =
    ttsState.totalSentences > 0
      ? Math.round(((ttsState.currentIndex + 1) / ttsState.totalSentences) * 100)
      : 0;

  const currentPersona = VOICE_PROFILES[ttsState.persona] || VOICE_PROFILES['matureMentor'];

  return (
    <div
      id="floating-voice-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl transition-all duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-3 sm:p-4 overflow-hidden">
        {/* Top Header & Waveform */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Live Audio Visualizer Bars */}
            <div className="flex items-end gap-0.5 h-6 w-8 shrink-0 px-1 bg-slate-800/80 rounded-md py-1">
              {waveHeights.slice(0, 6).map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-gradient-to-t from-emerald-500 to-teal-300 rounded-full transition-all duration-75"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-200 truncate">
                  {currentPersona.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  <Sparkles className="h-2.5 w-2.5" />
                  {ttsState.engine === 'gemini-hd'
                    ? 'Gemini Studio HD'
                    : ttsState.engine === 'neural-stream'
                    ? 'Neural Human Voice'
                    : 'Natural Voice'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sentence {ttsState.currentIndex + 1} of {ttsState.totalSentences} ({progressPercent}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
            <button
              onClick={() => ttsService.stop()}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
              title="Stop voice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Spoken Text Display */}
        {isExpanded && (
          <div className="mt-2.5 bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
            <p className="text-xs sm:text-sm text-slate-100 font-medium line-clamp-2 leading-relaxed">
              "{currentSentenceText}"
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-slate-800/80">
          {/* Speed Selector */}
          <div className="flex items-center gap-1">
            {[0.8, 0.92, 1.1, 1.3].map((spd) => (
              <button
                key={spd}
                onClick={() => ttsService.setSpeed(spd)}
                className={`text-[10px] font-bold px-2 py-1 rounded-md transition ${
                  Math.abs(ttsState.speed - spd) < 0.05
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {spd === 0.92 ? 'Teacher (1x)' : `${spd}x`}
              </button>
            ))}
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => ttsService.previous()}
              disabled={ttsState.currentIndex === 0}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded-lg hover:bg-slate-800 transition"
              title="Previous Sentence"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                if (ttsState.status === 'playing') {
                  ttsService.pause();
                } else if (ttsState.status === 'paused') {
                  ttsService.resume();
                } else {
                  ttsService.play();
                }
              }}
              className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-full hover:brightness-110 shadow-md font-bold transition transform active:scale-95"
              title={ttsState.status === 'playing' ? 'Pause' : 'Play'}
            >
              {ttsState.status === 'playing' ? (
                <Pause className="h-4 w-4 fill-slate-950" />
              ) : (
                <Play className="h-4 w-4 fill-slate-950 ml-0.5" />
              )}
            </button>

            <button
              onClick={() => ttsService.next()}
              disabled={ttsState.currentIndex >= ttsState.totalSentences - 1}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded-lg hover:bg-slate-800 transition"
              title="Next Sentence"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              onClick={() => ttsService.restart()}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition ml-1"
              title="Replay from start"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Persona Switcher Dropdown */}
          <div className="flex items-center">
            <select
              value={ttsState.persona}
              onChange={(e) => {
                const newPersona = e.target.value;
                ttsService.setPersona(newPersona);
                if (ttsState.status === 'playing') {
                  ttsService.retryCurrentChunk();
                }
              }}
              className="bg-slate-800 text-slate-200 text-[11px] font-medium py-1 px-2 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="matureMentor">👨‍🏫 Indian Faculty (Sir)</option>
              <option value="brother">👦 Elder Brother (Bhaiya)</option>
              <option value="teacher">🎯 Kota Master Sir</option>
              <option value="mentor">🏆 AIR Rank Guide</option>
              <option value="sister">👧 Didi Teacher</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
