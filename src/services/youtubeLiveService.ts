import { LiveLectureResolver, LiveStreamResolvedInfo, OFFICIAL_CHANNELS } from './liveLectureResolver';
import { YouTubeVideoValidator, VideoValidationResult } from './youtubeVideoValidator';
import { observability } from './observabilityService';

export interface LiveEngineStatus {
  isLive: boolean;
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  teacherName: string;
  embedUrl: string;
  watchUrl: string;
  isEmbeddable: boolean;
  viewerCount?: number;
  lastCheckedAt: string;
  statusMessage?: string;
}

type LiveEngineListener = (status: LiveEngineStatus) => void;

export class YouTubeLiveService {
  private static instance: YouTubeLiveService | null = null;
  private timer: any = null;
  private currentStatus: LiveEngineStatus | null = null;
  private listeners: Set<LiveEngineListener> = new Set();
  private isChecking = false;

  private constructor() {
    this.startAutoRefresh();
  }

  public static getInstance(): YouTubeLiveService {
    if (!YouTubeLiveService.instance) {
      YouTubeLiveService.instance = new YouTubeLiveService();
    }
    return YouTubeLiveService.instance;
  }

  /**
   * Starts 60-second auto-refresh timer to monitor live streams
   */
  public startAutoRefresh(): void {
    if (this.timer) return;

    // Initial check
    this.checkLiveStatus();

    // Set interval every 60,000 ms (60 seconds)
    this.timer = setInterval(() => {
      this.checkLiveStatus(true);
    }, 60000);
  }

  public stopAutoRefresh(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Subscribes a callback to live status updates
   */
  public subscribe(listener: LiveEngineListener): () => void {
    this.listeners.add(listener);
    if (this.currentStatus) {
      listener(this.currentStatus);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Executes live detection logic across official channels
   */
  public async checkLiveStatus(forceRefresh = false): Promise<LiveEngineStatus> {
    if (this.isChecking && this.currentStatus && !forceRefresh) {
      return this.currentStatus;
    }

    this.isChecking = true;
    const nowIso = new Date().toISOString();

    try {
      const liveInfo: LiveStreamResolvedInfo = await LiveLectureResolver.resolveLiveStream(undefined, forceRefresh);

      // Validate video embeddability
      const validation: VideoValidationResult = await YouTubeVideoValidator.validateVideo(liveInfo.videoId);

      const status: LiveEngineStatus = {
        isLive: liveInfo.isLive,
        videoId: liveInfo.videoId,
        title: liveInfo.title,
        thumbnail: liveInfo.thumbnail,
        channelTitle: liveInfo.channelName,
        teacherName: liveInfo.teacherName,
        embedUrl: `https://www.youtube-nocookie.com/embed/${liveInfo.videoId}`,
        watchUrl: `https://www.youtube.com/watch?v=${liveInfo.videoId}`,
        isEmbeddable: validation.isEmbeddable,
        viewerCount: liveInfo.viewerCount,
        lastCheckedAt: nowIso,
        statusMessage: validation.isEmbeddable
          ? undefined
          : 'This lecture cannot be embedded because the uploader has disabled embedding.',
      };

      this.currentStatus = status;

      // Broadcast update to UI listeners
      this.listeners.forEach((listener) => listener(status));
      return status;
    } catch (err: any) {
      observability.log('warn', 'LECTURE_RESOLVER', 'YouTube Live Service check error', { error: err?.message || err });

      const fallbackStatus: LiveEngineStatus = {
        isLive: false,
        videoId: 'fA-XN6q3f6A',
        title: 'Rotational Motion & Moment of Inertia Live Masterclass',
        thumbnail: 'https://i.ytimg.com/vi/fA-XN6q3f6A/hqdefault.jpg',
        channelTitle: 'Logical Physics by MA Sir',
        teacherName: 'MA Sir (Logical Physics)',
        embedUrl: 'https://www.youtube-nocookie.com/embed/fA-XN6q3f6A',
        watchUrl: 'https://www.youtube.com/watch?v=fA-XN6q3f6A',
        isEmbeddable: true,
        lastCheckedAt: nowIso,
      };

      this.currentStatus = fallbackStatus;
      return fallbackStatus;
    } finally {
      this.isChecking = false;
    }
  }

  public getCurrentStatus(): LiveEngineStatus | null {
    return this.currentStatus;
  }
}

export const youtubeLiveService = YouTubeLiveService.getInstance();
