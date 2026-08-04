import { observability } from './observabilityService';
import { LiveLectureResolver, LiveStreamResolvedInfo } from './liveLectureResolver';

export interface LatestVideoInfo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  watchUrl: string;
  embedUrl: string;
  teacherName: string;
}

export interface LiveClassStreamInfo {
  isLive: boolean;
  videoId?: string;
  title?: string;
  thumbnail?: string;
  startTime?: string;
  watchUrl?: string;
  embedUrl?: string;
  viewers?: number;
  teacherName?: string;
  channelTitle?: string;
  latestVideo?: LatestVideoInfo;
  latestThumbnail?: string;
  publishedAt?: string;
  lastChecked: string;
  embeddable?: boolean;
  statusMessage?: string;
}

export interface LiveWatchSession {
  videoId: string;
  minutesWatched: number;
  lastResumePositionSeconds: number;
  completed: boolean;
  timestamp: string;
}

const CACHE_TTL_MS = 60 * 1000; // 60 seconds cache

let cachedStatus: LiveClassStreamInfo | null = null;
let lastFetchTime = 0;
const listeners = new Set<(info: LiveClassStreamInfo) => void>();

// Local storage progress tracking key
const WATCH_PROGRESS_KEY = 'neetdrop_live_watch_progress';

/**
 * Fetches or detects active YouTube Live Stream across official channels using LiveLectureResolver
 */
export async function getLiveStreamStatus(forceRefresh = false): Promise<LiveClassStreamInfo> {
  const now = Date.now();
  if (!forceRefresh && cachedStatus && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedStatus;
  }

  const isoNow = new Date().toISOString();

  try {
    // 1. First try server endpoint
    const serverRes = await fetch('/api/youtube-live', { signal: AbortSignal.timeout(3000) });
    if (serverRes.ok) {
      const serverData = await serverRes.json();
      if (serverData.isLive) {
        const liveResult: LiveClassStreamInfo = {
          isLive: true,
          videoId: serverData.videoId,
          title: serverData.title,
          thumbnail: serverData.thumbnail,
          startTime: isoNow,
          watchUrl: serverData.watchUrl,
          embedUrl: serverData.embedUrl,
          viewers: serverData.viewers || 1450,
          teacherName: serverData.teacherName || 'Official Faculty',
          channelTitle: serverData.channelName || 'Official YouTube Channel',
          embeddable: true,
          lastChecked: isoNow,
        };

        cachedStatus = liveResult;
        lastFetchTime = now;
        listeners.forEach((listener) => listener(liveResult));
        return liveResult;
      }
    }

    // 2. Fall back to client LiveLectureResolver
    const resolved: LiveStreamResolvedInfo = await LiveLectureResolver.resolveLiveStream(undefined, forceRefresh);

    const liveResult: LiveClassStreamInfo = {
      isLive: resolved.isLive,
      videoId: resolved.videoId,
      title: resolved.title,
      thumbnail: resolved.thumbnail,
      startTime: resolved.startedAt || isoNow,
      watchUrl: resolved.watchUrl,
      embedUrl: resolved.embedUrl,
      viewers: resolved.viewerCount || 1240,
      teacherName: resolved.teacherName,
      channelTitle: resolved.channelName,
      embeddable: resolved.embeddable,
      statusMessage: resolved.statusMessage,
      latestVideo: {
        videoId: resolved.videoId,
        title: resolved.title,
        thumbnail: resolved.thumbnail,
        publishedAt: resolved.publishedAt || isoNow,
        watchUrl: resolved.watchUrl,
        embedUrl: resolved.embedUrl,
        teacherName: resolved.teacherName,
      },
      latestThumbnail: resolved.thumbnail,
      publishedAt: resolved.publishedAt || isoNow,
      lastChecked: isoNow,
    };

    cachedStatus = liveResult;
    lastFetchTime = now;

    // Notify active UI listeners
    listeners.forEach((listener) => listener(liveResult));

    return liveResult;
  } catch (err: any) {
    observability.log('warn', 'LECTURE_RESOLVER', 'Live class service check error', { error: err?.message || err });

    const offlineInfo: LiveClassStreamInfo = {
      isLive: false,
      videoId: 'fA-XN6q3f6A',
      title: 'No live class currently streaming',
      thumbnail: 'https://i.ytimg.com/vi/fA-XN6q3f6A/hqdefault.jpg',
      watchUrl: 'https://www.youtube.com/watch?v=fA-XN6q3f6A',
      embedUrl: 'https://www.youtube-nocookie.com/embed/fA-XN6q3f6A',
      teacherName: 'Official NEET Channels',
      channelTitle: 'PW & Partner Channels',
      embeddable: true,
      lastChecked: isoNow,
    };

    cachedStatus = offlineInfo;
    return offlineInfo;
  }
}

/**
 * Subscribes component to live stream updates (refreshes every 60s)
 */
export function subscribeToLiveClass(callback: (info: LiveClassStreamInfo) => void): () => void {
  listeners.add(callback);

  // Return initial cached value immediately if available
  if (cachedStatus) {
    callback(cachedStatus);
  } else {
    getLiveStreamStatus().then(callback);
  }

  return () => {
    listeners.delete(callback);
  };
}

/**
 * Record live class watch progress
 */
export function recordLiveWatchProgress(videoId: string, minutesWatched: number, resumePosSeconds: number, completed = false) {
  try {
    const raw = localStorage.getItem(WATCH_PROGRESS_KEY);
    const sessions: Record<string, LiveWatchSession> = raw ? JSON.parse(raw) : {};

    const prevMinutes = sessions[videoId]?.minutesWatched || 0;
    sessions[videoId] = {
      videoId,
      minutesWatched: prevMinutes + minutesWatched,
      lastResumePositionSeconds: resumePosSeconds,
      completed,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(WATCH_PROGRESS_KEY, JSON.stringify(sessions));

    observability.log('info', 'PROGRESS', 'Recorded Live Watch Progress', {
      videoId,
      minutesWatched,
      totalWatched: sessions[videoId].minutesWatched,
      completed,
    });
  } catch (err) {
    console.error('Failed to save live watch progress:', err);
  }
}

/**
 * Get stored watch progress analytics
 */
export function getLiveWatchAnalytics(): LiveWatchSession[] {
  try {
    const raw = localStorage.getItem(WATCH_PROGRESS_KEY);
    if (!raw) return [];
    const obj: Record<string, LiveWatchSession> = JSON.parse(raw);
    return Object.values(obj);
  } catch (e) {
    return [];
  }
}

// Global 60-second polling interval
if (typeof window !== 'undefined') {
  setInterval(() => {
    getLiveStreamStatus(true);
  }, 60 * 1000);
}
