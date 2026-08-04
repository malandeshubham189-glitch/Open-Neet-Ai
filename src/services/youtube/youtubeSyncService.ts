import { OFFICIAL_CHANNELS_REGISTRY, OfficialChannelConfig } from '../../data/officialChannels';
import { YouTubeResolver } from '../youtubeResolver';
import { YouTubeVideoValidator } from '../youtubeVideoValidator';
import { YouTubeCache } from './youtubeCache';
import { observability } from '../observabilityService';

export interface ChannelSyncReport {
  channelId: string;
  channelName: string;
  latestVideoId: string;
  title: string;
  isLive: boolean;
  isEmbeddable: boolean;
  syncedAt: string;
}

export class YouTubeSyncService {
  private static instance: YouTubeSyncService | null = null;
  private syncTimer: any = null;
  private syncReports: Map<string, ChannelSyncReport> = new Map();

  private constructor() {
    this.startAutoSync();
  }

  public static getInstance(): YouTubeSyncService {
    if (!YouTubeSyncService.instance) {
      YouTubeSyncService.instance = new YouTubeSyncService();
    }
    return YouTubeSyncService.instance;
  }

  /**
   * Starts 30-minute auto-sync loop (1,800,000 ms)
   */
  public startAutoSync(): void {
    if (this.syncTimer) return;

    // Run initial sync
    this.syncAllChannels();

    this.syncTimer = setInterval(() => {
      this.syncAllChannels();
    }, 1800000);
  }

  public stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  /**
   * Synchronizes all registered official channels
   */
  public async syncAllChannels(): Promise<ChannelSyncReport[]> {
    const reports: ChannelSyncReport[] = [];
    const nowIso = new Date().toISOString();

    for (const channel of OFFICIAL_CHANNELS_REGISTRY) {
      try {
        const resolved = await YouTubeResolver.resolveSource(`https://youtube.com/@${channel.handle}`);
        const validation = await YouTubeVideoValidator.validateVideo(resolved.videoId);

        const report: ChannelSyncReport = {
          channelId: channel.id,
          channelName: channel.channelName,
          latestVideoId: resolved.videoId,
          title: resolved.title,
          isLive: resolved.isLive,
          isEmbeddable: validation.isEmbeddable,
          syncedAt: nowIso,
        };

        this.syncReports.set(channel.id, report);
        reports.push(report);
      } catch (err: any) {
        observability.log('warn', 'LECTURE_RESOLVER', `Channel sync error for ${channel.channelName}`, {
          error: err?.message || err,
        });
      }
    }

    observability.log('info', 'LECTURE_RESOLVER', `YouTube Auto-Sync completed for ${reports.length} official channels`, {
      reports,
    });

    return reports;
  }

  public getSyncReports(): ChannelSyncReport[] {
    return Array.from(this.syncReports.values());
  }
}

export const youtubeSyncEngine = YouTubeSyncService.getInstance();
