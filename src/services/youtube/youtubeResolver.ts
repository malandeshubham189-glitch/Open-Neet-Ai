import { YouTubeResolver as CoreResolver, ResolvedYouTubeSource } from '../youtubeResolver';
import { YouTubeEmbedService } from '../youtubeEmbedService';
import { OFFICIAL_CHANNELS_REGISTRY } from '../../data/officialChannels';

export class YouTubeResolverService {
  /**
   * Resolves any input (channel handle, channel URL, playlist URL, video URL, or ID)
   * into a verified, 11-character Video ID with https://www.youtube-nocookie.com/embed/{videoId}.
   */
  static async resolve(input: string, apiKey?: string): Promise<ResolvedYouTubeSource> {
    // Look up channel registry first
    const matchedChannel = OFFICIAL_CHANNELS_REGISTRY.find(
      (c) =>
        input.includes(c.handle) ||
        input.includes(c.channelId) ||
        input.toLowerCase().includes(c.teacher.toLowerCase())
    );

    if (matchedChannel) {
      return CoreResolver.resolveSource(`https://youtube.com/@${matchedChannel.handle}`, apiKey);
    }

    return CoreResolver.resolveSource(input, apiKey);
  }

  /**
   * Returns clean no-cookie embed URL for iframe src.
   */
  static getEmbedUrl(videoId: string): string {
    return YouTubeEmbedService.getEmbedUrl(videoId);
  }

  /**
   * Returns watch URL on official YouTube site.
   */
  static getWatchUrl(videoId: string): string {
    return YouTubeEmbedService.getWatchUrl(videoId);
  }
}
