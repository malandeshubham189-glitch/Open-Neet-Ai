import React, { useState, useEffect, useRef } from 'react';
import { recordLiveWatchProgress } from '../services/liveClassService';
import { observability } from '../services/observabilityService';
import {
  X,
  Maximize2,
  Minimize2,
  Tv,
  MessageSquare,
  Volume2,
  Radio,
  Users,
  ArrowLeft,
  CheckCircle2,
  Play,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface LivePlayerProps {
  videoId: string;
  title: string;
  teacherName?: string;
  viewers?: number;
  isLive?: boolean;
  watchUrl?: string;
  embeddable?: boolean;
  onClose: () => void;
  onReturnedToSyllabus?: () => void;
}

export const LivePlayer: React.FC<LivePlayerProps> = ({
  videoId,
  title,
  teacherName = 'MA Sir (Logical Physics)',
  viewers = 1240,
  isLive = true,
  watchUrl,
  embeddable = true,
  onClose,
  onReturnedToSyllabus,
}) => {
  const [showChat, setShowChat] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [minutesWatched, setMinutesWatched] = useState(0);
  const [embedError, setEmbedError] = useState(!embeddable);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const directWatchUrl = watchUrl || `https://www.youtube.com/watch?v=${videoId}`;

  // Automatically open watch page in a new window/tab if embed is not allowed
  useEffect(() => {
    if (!embeddable) {
      console.warn('Embed restricted for videoId:', videoId, '- Auto-launching YouTube watch page');
      window.open(directWatchUrl, '_blank', 'noopener,noreferrer');
      observability.log('info', 'LECTURE_RESOLVER', 'Auto-opened YouTube watch page due to embed restriction', { videoId });
    }
  }, [embeddable, videoId, directWatchUrl]);

  // Track analytics on mount
  useEffect(() => {
    observability.log('info', 'LECTURE_RESOLVER', 'Live Player Opened', { videoId, title, isLive });
    observability.recordMetric('live_player_opened', 1, 'count');

    // Timer every 60 seconds to increment minutes watched
    const interval = setInterval(() => {
      setMinutesWatched((prev) => {
        const updated = prev + 1;
        recordLiveWatchProgress(videoId, 1, updated * 60, false);
        observability.recordMetric('live_minutes_watched', 1, 'ms');
        return updated;
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [videoId, title, isLive]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  // Handle Return to syllabus
  const handleReturnToSyllabus = () => {
    recordLiveWatchProgress(videoId, minutesWatched, minutesWatched * 60, true);
    observability.log('info', 'LECTURE_RESOLVER', 'Returned to Syllabus from Live Class', { minutesWatched });
    if (onReturnedToSyllabus) {
      onReturnedToSyllabus();
    } else {
      onClose();
    }
  };

  const domain = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
  const chatUrl = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-2 sm:p-4 md:p-6 text-white font-sans overflow-hidden"
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 gap-2 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleReturnToSyllabus}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Return to Syllabus</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-extrabold text-rose-400 border border-rose-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  LIVE NOW
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold">
                  RECORDED LECTURE
                </span>
              )}
              <span className="text-xs font-bold text-slate-400 truncate">{teacherName}</span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white truncate mt-0.5">{title}</h2>
          </div>
        </div>

        {/* Right Stats & Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-md shrink-0"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {isLive && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-400 font-bold">
              <Users className="h-3.5 w-3.5" />
              <span>{viewers.toLocaleString()} watching</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-bold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{minutesWatched}m watched</span>
          </div>

          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              showChat
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Live Chat"
          >
            <MessageSquare className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 transition-all"
            title="Close Player"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Video & Live Chat Grid */}
      <div className="flex-1 mt-3 sm:mt-4 grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 overflow-hidden min-h-0">
        {/* Video Player Frame */}
        <div className={`${showChat ? 'lg:col-span-3' : 'lg:col-span-4'} bg-black rounded-2xl border border-slate-800 overflow-hidden relative flex flex-col h-full shadow-2xl justify-center items-center`}>
          {!embedError ? (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => {
                setEmbedError(true);
                window.open(directWatchUrl, '_blank', 'noopener,noreferrer');
              }}
            />
          ) : (
            <div className="p-8 text-center space-y-4 max-w-md">
              <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Embedding Disabled by Uploader</h3>
                <p className="text-xs text-rose-300 font-medium mt-1">
                  This lecture cannot be embedded because the uploader has disabled embedding.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={directWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={directWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
                >
                  <span>Open Official Source</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Live Chat Drawer */}
        {showChat && (
          <div className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col overflow-hidden h-full shadow-xl">
            <div className="p-3 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#2563EB]" />
                <span className="text-xs font-bold text-slate-200">Official Live Chat</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                Moderated
              </span>
            </div>

            <div className="flex-1 bg-slate-950">
              <iframe
                src={chatUrl}
                title="Live Chat"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
