import { youtubeLiveService as CoreLiveService, LiveEngineStatus } from '../youtubeLiveService';
import { OFFICIAL_CHANNELS_REGISTRY, OfficialChannelConfig } from '../../data/officialChannels';
import { YouTubeAnalytics } from './youtubeAnalytics';

export class YouTubeLiveEngineService {
  private static instance: YouTubeLiveEngineService | null = null;

  public static getInstance(): YouTubeLiveEngineService {
    if (!YouTubeLiveEngineService.instance) {
      YouTubeLiveEngineService.instance = new YouTubeLiveEngineService();
    }
    return YouTubeLiveEngineService.instance;
  }

  public subscribeToLiveUpdates(listener: (status: LiveEngineStatus) => void): () => void {
    return CoreLiveService.subscribe((status) => {
      if (status.isLive) {
        YouTubeAnalytics.logEvent({
          videoId: status.videoId,
          title: status.title,
          teacherName: status.teacherName,
          event: 'live_attendance',
          watchTimeSeconds: 60,
        });
      }
      listener(status);
    });
  }

  public async getLiveStatus(forceRefresh = false): Promise<LiveEngineStatus> {
    return CoreLiveService.checkLiveStatus(forceRefresh);
  }

  public getOfficialChannels(): OfficialChannelConfig[] {
    return OFFICIAL_CHANNELS_REGISTRY;
  }
}

export const youtubeLiveEngine = YouTubeLiveEngineService.getInstance();
