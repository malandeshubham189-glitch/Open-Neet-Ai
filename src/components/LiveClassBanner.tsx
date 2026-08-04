import React, { useState, useEffect } from 'react';
import { getLiveStreamStatus, subscribeToLiveClass, LiveClassStreamInfo } from '../services/liveClassService';
import { LivePlayer } from './LivePlayer';
import { OFFICIAL_CHANNELS } from '../services/liveLectureResolver';
import {
  Radio,
  Tv,
  Play,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bell,
  RefreshCw,
  Video,
  X,
  ExternalLink
} from 'lucide-react';

interface LiveClassBannerProps {
  onOpenLivePlayer?: (videoId: string, title: string, isLive: boolean) => void;
  compact?: boolean;
}

export const LiveClassBanner: React.FC<LiveClassBannerProps> = ({ onOpenLivePlayer, compact = false }) => {
  const [streamInfo, setStreamInfo] = useState<LiveClassStreamInfo | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ videoId: string; title: string; isLive: boolean } | null>(null);
  const [showRecentUploadsModal, setShowRecentUploadsModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStatus = async (force = false) => {
    setIsRefreshing(true);
    try {
      const data = await getLiveStreamStatus(force);
      setStreamInfo(data);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus(false);

    // Auto-refresh every 2 minutes (120,000 ms)
    const interval = setInterval(() => {
      fetchStatus(true);
    }, 120000);

    const unsubscribe = subscribeToLiveClass((updatedInfo) => {
      setStreamInfo(updatedInfo);
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  if (!streamInfo) {
    return (
      <div className="rounded-[20px] bg-slate-900 text-white p-5 border border-slate-800 animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-800 rounded-xl" />
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-slate-800 rounded" />
            <div className="h-4 w-48 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const isLive = streamInfo.isLive;
  const activeTitle = isLive ? (streamInfo.title || 'Live NEET Masterclass') : 'No Live Class Currently Streaming';
  const activeVideoId = isLive ? (streamInfo.videoId || 'fA-XN6q3f6A') : 'fA-XN6q3f6A';
  const teacherName = isLive ? (streamInfo.teacherName || 'Official Faculty') : 'PW & Partner Channels';
  const viewers = streamInfo.viewers || 1240;

  const handleOpenPlayer = (vidId: string, titleStr: string, liveState: boolean) => {
    if (onOpenLivePlayer) {
      onOpenLivePlayer(vidId, titleStr, liveState);
    } else {
      setActiveVideoModal({ videoId: vidId, title: titleStr, isLive: liveState });
    }
  };

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-[20px] transition-all border shadow-md ${
          isLive
            ? 'bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border-rose-500/40 text-white'
            : 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-slate-800/80 text-white'
        } ${compact ? 'p-4' : 'p-5 sm:p-6'}`}
      >
        {/* Glow ambient background effect */}
        {isLive ? (
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />
        ) : (
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Info Column */}
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-black text-white shadow-lg shadow-rose-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  🔴 LIVE NOW
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80 px-3 py-1 text-xs font-bold">
                  <Tv className="h-3.5 w-3.5 text-slate-400" />
                  CHANNEL OFFLINE
                </span>
              )}

              <span className="text-xs font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                {teacherName}
              </span>

              {isLive && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800/50 px-2.5 py-0.5 rounded-full">
                  <Users className="h-3 w-3" />
                  {viewers.toLocaleString()} watching
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight line-clamp-2">
              {activeTitle}
            </h2>

            <p className="text-xs text-slate-300 flex items-center gap-2">
              <span>{isLive ? `Channel: ${streamInfo.channelTitle || 'Official Channel'}` : 'PW, Competition Wallah & Logical Physics'}</span>
              <span>•</span>
              <span>{isLive ? 'Active Live Stream' : 'No live class streaming right now'}</span>
            </p>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {isLive ? (
              <button
                onClick={() => handleOpenPlayer(activeVideoId, activeTitle, true)}
                className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold text-white transition-all shadow-lg shrink-0 bg-rose-600 hover:bg-rose-500 shadow-rose-600/30"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Watch Live Stream</span>
              </button>
            ) : (
              <button
                onClick={() => setShowRecentUploadsModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-md shrink-0"
              >
                <Video className="h-4 w-4" />
                <span>Browse Recent Uploads</span>
              </button>
            )}

            <button
              onClick={() => fetchStatus(true)}
              disabled={isRefreshing}
              title="Refresh live status"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2.5 text-xs font-bold text-slate-200 transition-colors shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Checking...' : 'Check Live'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Browse Recent Uploads */}
      {showRecentUploadsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl text-slate-900 border border-slate-200 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#2563EB] mb-1">
                  <Video className="h-3.5 w-3.5" />
                  <span>OFFICIAL RECENT UPLOADS</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Recommended Masterclass Lectures</h3>
                <p className="text-xs text-slate-500">Explore top uploaded full-length NEET lectures from connected channels.</p>
              </div>
              <button
                onClick={() => setShowRecentUploadsModal(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {OFFICIAL_CHANNELS.map((ch, idx) => (
                <div
                  key={`${ch.id}-${idx}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={ch.fallbackThumbnail}
                      alt={ch.fallbackTitle}
                      className="h-14 w-24 rounded-lg object-cover bg-slate-200 shrink-0 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{ch.fallbackTitle}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ch.name} • {ch.teacherName}</p>
                      <span className="inline-block mt-1 text-[10px] text-blue-600 font-medium bg-blue-100/60 px-2 py-0.5 rounded">
                        Full NEET Masterclass
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowRecentUploadsModal(false);
                      handleOpenPlayer(ch.fallbackVideoId, ch.fallbackTitle, false);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] text-white px-3 py-2 text-xs font-bold hover:bg-blue-700 transition-colors shrink-0"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Watch</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Embedded Modal Player if triggered locally */}
      {activeVideoModal && (
        <LivePlayer
          videoId={activeVideoModal.videoId}
          title={activeVideoModal.title}
          isLive={activeVideoModal.isLive}
          teacherName={teacherName}
          viewers={viewers}
          watchUrl={streamInfo.watchUrl}
          embeddable={streamInfo.embeddable}
          onClose={() => setActiveVideoModal(null)}
          onReturnedToSyllabus={() => setActiveVideoModal(null)}
        />
      )}
    </>
  );
};
