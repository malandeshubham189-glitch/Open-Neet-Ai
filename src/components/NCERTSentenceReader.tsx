import React, { useEffect, useState, useRef } from 'react';
import {
  ttsService,
  TTSState,
  SentenceChunk,
  parseSentences
} from '../services/TTSService';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  Gauge,
  Loader2,
  Sparkles,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface NCERTSentenceReaderProps {
  text: string;
  chapterTitle?: string;
  topicTitle?: string;
  className?: string;
}

export const NCERTSentenceReader: React.FC<NCERTSentenceReaderProps> = ({
  text,
  chapterTitle,
  topicTitle,
  className = ''
}) => {
  const [ttsState, setTtsState] = useState<TTSState>(ttsService.getState());
  const [sentences, setSentences] = useState<SentenceChunk[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Initialize and subscribe to TTSService
  useEffect(() => {
    const parsed = parseSentences(text);
    setSentences(parsed);
    ttsService.loadText(text);

    const unsubscribe = ttsService.subscribe((state) => {
      setTtsState(state);
    });

    return () => {
      unsubscribe();
      ttsService.stop();
    };
  }, [text]);

  // Handle Auto-Scroll to current sentence
  useEffect(() => {
    if (ttsState.status === 'playing' && ttsState.currentIndex >= 0) {
      const activeEl = sentenceRefs.current[ttsState.currentIndex];
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }, [ttsState.currentIndex, ttsState.status]);

  // Controls Handlers
  const handlePlayPause = () => {
    if (ttsState.status === 'playing') {
      ttsService.pause();
    } else if (ttsState.status === 'paused') {
      ttsService.resume();
    } else {
      ttsService.play(text, ttsState.currentIndex);
    }
  };

  const handleStop = () => {
    ttsService.stop();
  };

  const handleRestart = () => {
    ttsService.restart();
  };

  const handleSeek = (index: number) => {
    ttsService.seek(index);
  };

  const handleSetSpeed = (speed: number) => {
    ttsService.setSpeed(speed);
  };

  const handleSentenceClick = (idx: number) => {
    ttsService.play(text, idx);
  };

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className={`space-y-4 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm ${className}`}>
      {/* Top Header & Read-Aloud Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Volume2 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900">
                NCERT Read-Aloud Engine
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Sparkles className="h-3 w-3 text-emerald-600" />
                <span>Zero-Break Streaming</span>
              </span>
            </div>
            {sentences.length > 0 && (
              <p className="text-[11px] font-semibold text-slate-500">
                Sentence {ttsState.currentIndex + 1} of {sentences.length}
              </p>
            )}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preloading / Loading Indicator */}
          {ttsState.isPreloading && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
              <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
              <span>Preloading...</span>
            </div>
          )}

          {/* Prev / Next Seek */}
          <button
            onClick={() => handleSeek(Math.max(0, ttsState.currentIndex - 1))}
            disabled={ttsState.currentIndex === 0}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 transition-all"
            title="Previous Sentence"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>

          {/* Primary Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className={`px-4 py-2 rounded-xl text-xs font-black text-white transition-all flex items-center gap-2 shadow-sm ${
              ttsState.status === 'playing'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {ttsState.status === 'playing' ? (
              <>
                <Pause className="h-4 w-4 fill-white" />
                <span>Pause</span>
              </>
            ) : ttsState.status === 'paused' ? (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Read Chapter Aloud</span>
              </>
            )}
          </button>

          {/* Stop Button */}
          {ttsState.status !== 'idle' && ttsState.status !== 'stopped' && (
            <button
              onClick={handleStop}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-700 transition-all"
              title="Stop Playback"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          )}

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all"
            title="Restart from beginning"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Next Sentence */}
          <button
            onClick={() => handleSeek(Math.min(sentences.length - 1, ttsState.currentIndex + 1))}
            disabled={ttsState.currentIndex >= sentences.length - 1}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 transition-all"
            title="Next Sentence"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>

          {/* Speed Control Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Gauge className="h-3.5 w-3.5 text-slate-500 ml-1" />
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => handleSetSpeed(speed)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  ttsState.speed === speed
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {sentences.length > 0 && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{
              width: `${((ttsState.currentIndex + 1) / sentences.length) * 100}%`
            }}
          />
        </div>
      )}

      {/* Error Retry Banner */}
      {ttsState.error && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{ttsState.error}</span>
          </div>
          <button
            onClick={() => ttsService.retryCurrentChunk()}
            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-all flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Retry Chunk</span>
          </button>
        </div>
      )}

      {/* Sentence Highlighting Container with Click-to-Read */}
      <div
        ref={containerRef}
        className="rounded-xl bg-amber-50/60 p-5 border border-amber-200 max-h-[420px] overflow-y-auto leading-relaxed text-slate-900 font-serif text-sm sm:text-base space-y-1 transition-all"
      >
        <p className="inline">
          {sentences.map((chunk, idx) => {
            const isCurrent = ttsState.currentIndex === idx && (ttsState.status === 'playing' || ttsState.status === 'paused');
            const isPlayed = idx < ttsState.currentIndex;

            let highlightClasses = 'cursor-pointer hover:bg-amber-200/70 transition-all rounded px-0.5 py-0.5 ';
            if (isCurrent) {
              highlightClasses += 'bg-emerald-300 text-slate-950 font-bold ring-2 ring-emerald-500 shadow-xs px-1 ';
            } else if (isPlayed) {
              highlightClasses += 'text-slate-800 ';
            } else {
              highlightClasses += 'text-slate-900 ';
            }

            return (
              <span
                key={chunk.id}
                ref={(el) => {
                  sentenceRefs.current[idx] = el;
                }}
                onClick={() => handleSentenceClick(idx)}
                className={highlightClasses}
                title="Click to speak this sentence"
              >
                {chunk.text}{' '}
              </span>
            );
          })}
        </p>
      </div>

      <p className="text-[11px] text-slate-500 font-sans italic text-right">
        💡 Tip: Click any sentence directly in the text box above to start read-aloud from that point.
      </p>
    </div>
  );
};
