import { YouTubePlaylistImporter, PlaylistImportResult, PlaylistItemRecord } from '../youtubePlaylistImporter';
import { YouTubeValidationService } from './youtubeValidationService';
import { YouTubeCache } from './youtubeCache';

export class YouTubePlaylistService {
  /**
   * Imports playlist and caches result
   */
  static async importPlaylist(
    playlistUrlOrId: string,
    apiKey?: string
  ): Promise<PlaylistImportResult> {
    const cacheKey = `pl_${playlistUrlOrId}`;
    const cached = YouTubeCache.get<PlaylistImportResult>(cacheKey);
    if (cached) return cached;

    const result = await YouTubePlaylistImporter.importPlaylist(playlistUrlOrId, apiKey);
    YouTubeCache.set(cacheKey, result, 1800000); // 30 min cache
    return result;
  }

  /**
   * Verifies all items in a playlist sequentially
   */
  static async getVerifiedPlaylistItems(
    playlistUrlOrId: string,
    apiKey?: string
  ): Promise<PlaylistItemRecord[]> {
    const result = await this.importPlaylist(playlistUrlOrId, apiKey);
    return result.importedVideos;
  }
}
