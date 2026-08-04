import { YouTubeVideoValidator, VideoValidationResult } from './youtubeVideoValidator';

export interface EmbedConfig {
  embedUrl: string;
  watchUrl: string;
  videoId: string;
  isValid: boolean;
  isEmbeddable: boolean;
  statusMessage?: string;
}

export class YouTubeEmbedService {
  /**
   * Generates a strict, privacy-enhanced no-cookie embed URL for a valid videoId.
   * NEVER generates channel, playlist, or watch URLs as embed src.
   */
  static getEmbedUrl(videoId: string): string {
    const cleanId = YouTubeVideoValidator.extractVideoId(videoId);
    if (!cleanId) {
      throw new Error(`Invalid YouTube video ID provided to EmbedService: ${videoId}`);
    }
    return `https://www.youtube-nocookie.com/embed/${cleanId}`;
  }

  /**
   * Generates the official YouTube watch page URL.
   */
  static getWatchUrl(videoId: string): string {
    const cleanId = YouTubeVideoValidator.extractVideoId(videoId) || videoId;
    return `https://www.youtube.com/watch?v=${cleanId}`;
  }

  /**
   * Validates video and creates an EmbedConfig.
   */
  static async createEmbedConfig(inputUrlOrId: string): Promise<EmbedConfig> {
    const validation: VideoValidationResult = await YouTubeVideoValidator.validateVideo(inputUrlOrId);

    if (!validation.isValid || !validation.isEmbeddable) {
      const videoId = validation.videoId || inputUrlOrId;
      return {
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        watchUrl: this.getWatchUrl(videoId),
        videoId,
        isValid: false,
        isEmbeddable: false,
        statusMessage:
          validation.rejectionReason ||
          'This lecture cannot be embedded because the uploader has disabled embedding.',
      };
    }

    return {
      embedUrl: this.getEmbedUrl(validation.videoId),
      watchUrl: this.getWatchUrl(validation.videoId),
      videoId: validation.videoId,
      isValid: true,
      isEmbeddable: true,
    };
  }
}
