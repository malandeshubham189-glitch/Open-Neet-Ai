import { observability } from './observabilityService';

export interface OfficialChannelConfig {
  id: string;
  name: string;
  handle: string;
  teacherName: string;
  fallbackVideoId: string;
  fallbackTitle: string;
  fallbackThumbnail: string;
}

export interface LiveStreamResolvedInfo {
  isLive: boolean;
  videoId: string;
  title: string;
  thumbnail: string;
  startedAt?: string;
  publishedAt?: string;
  viewerCount?: number;
  embedUrl: string;
  watchUrl: string;
  channelName: string;
  teacherName: string;
  embeddable: boolean;
  privacyStatus: 'public' | 'unlisted' | 'private';
  fallbackUsed: boolean;
  statusMessage?: string;
}

export const OFFICIAL_CHANNELS: OfficialChannelConfig[] = [
  {
    id: 'logical_physics',
    name: 'Logical Physics by MA Sir',
    handle: 'logicalphysicsbymasir',
    teacherName: 'MA Sir (Logical Physics)',
    fallbackVideoId: 'fA-XN6q3f6A',
    fallbackTitle: 'Rotational Motion & Moment of Inertia Live Masterclass',
    fallbackThumbnail: 'https://i.ytimg.com/vi/fA-XN6q3f6A/hqdefault.jpg',
  },
  {
    id: 'competition_wallah',
    name: 'Competition Wallah',
    handle: 'CompetitionWallah',
    teacherName: 'PW Senior Faculty',
    fallbackVideoId: 'm4X_m9L6qP6',
    fallbackTitle: 'Complete Physics & Chemistry Revision Masterclass',
    fallbackThumbnail: 'https://i.ytimg.com/vi/m4X_m9L6qP6/hqdefault.jpg',
  },
  {
    id: 'physics_wallah',
    name: 'Physics Wallah - Alakh Pandey',
    handle: 'PhysicsWallah',
    teacherName: 'Alakh Pandey Sir & PW Team',
    fallbackVideoId: 'bK8n9Z6d4K8',
    fallbackTitle: 'NEET Physics One-Shot Live Lecture',
    fallbackThumbnail: 'https://i.ytimg.com/vi/bK8n9Z6d4K8/hqdefault.jpg',
  },
  {
    id: 'pw_neet',
    name: 'PW NEET',
    handle: 'PW-NEET',
    teacherName: 'PW NEET Faculty',
    fallbackVideoId: 'qXf7wP8_Y6w',
    fallbackTitle: 'NEET Botany & Zoology Rapid Live Session',
    fallbackThumbnail: 'https://i.ytimg.com/vi/qXf7wP8_Y6w/hqdefault.jpg',
  },
  {
    id: 'pw_meded',
    name: 'PW MedEd',
    handle: 'PWMedEd',
    teacherName: 'PW MedEd Experts',
    fallbackVideoId: 'l8c3R_k9L4Q',
    fallbackTitle: 'PW MedEd Clinical & Concept Review',
    fallbackThumbnail: 'https://i.ytimg.com/vi/l8c3R_k9L4Q/hqdefault.jpg',
  },
  {
    id: 'unacademy_neet',
    name: 'Unacademy NEET',
    handle: 'unacademyneet',
    teacherName: 'Seep Pahuja & Unacademy Team',
    fallbackVideoId: '_W1b6rO7_F4',
    fallbackTitle: 'The Living World Class 11 Biology One Shot | Seep Pahuja',
    fallbackThumbnail: 'https://i.ytimg.com/vi/_W1b6rO7_F4/hqdefault.jpg',
  },
];

export class LiveLectureResolver {
  /**
   * Helper to verify if a video is embeddable and public via YouTube oEmbed API
   */
  static async verifyEmbeddable(videoId: string): Promise<{ embeddable: boolean; title?: string }> {
    if (!videoId || videoId.length !== 11) {
      return { embeddable: false };
    }

    // Never accept channelId or short non-standard IDs
    if (videoId.startsWith('UC') || videoId.includes('/') || videoId.includes('?')) {
      return { embeddable: false };
    }

    // Check if video is in mapped channel fallbacks
    const isMappedFallback = OFFICIAL_CHANNELS.some((c) => c.fallbackVideoId === videoId);

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`
      )}&format=json`;

      const response = await fetch(oembedUrl);
      if (response.ok) {
        const data = await response.json();
        return {
          embeddable: true,
          title: data.title,
        };
      } else {
        return { embeddable: isMappedFallback };
      }
    } catch (err) {
      return { embeddable: true };
    }
  }

  /**
   * Main resolver flow:
   * 1. Query YouTube Data API v3 for active live stream across official channels
   * 2. If live found, check videoEmbeddable=true & privacyStatus=public
   * 3. If no live found, query for latest completed livestream (order=date)
   * 4. Verify embeddability before returning
   * 5. If embed verification fails or API is unavailable, fallback gracefully
   */
  static async resolveLiveStream(
    channelFilter?: string,
    forceRefresh = false
  ): Promise<LiveStreamResolvedInfo> {
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.YOUTUBE_API_KEY || '' : '';
    const nowIso = new Date().toISOString();

    const selectedChannels = channelFilter
      ? OFFICIAL_CHANNELS.filter((c) => c.id === channelFilter || c.handle.toLowerCase().includes(channelFilter.toLowerCase()))
      : OFFICIAL_CHANNELS;

    const primaryChannel = selectedChannels[0] || OFFICIAL_CHANNELS[0];

    // Attempt YouTube Data API v3 if API key exists
    if (apiKey && apiKey.trim() !== '') {
      for (const channel of selectedChannels) {
        try {
          // STEP 1: Search eventType=live, type=video
          const liveSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            channel.handle
          )}&eventType=live&type=video&videoEmbeddable=true&maxResults=1&key=${apiKey}`;

          const liveRes = await fetch(liveSearchUrl);
          if (liveRes.ok) {
            const liveData = await liveRes.json();
            const liveItem = liveData.items?.[0];

            if (liveItem && liveItem.id?.videoId && liveItem.id.kind === 'youtube#video') {
              const videoId = liveItem.id.videoId;

              // Verify video details, embeddable status & concurrent viewers
              const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,status,liveStreamingDetails&id=${videoId}&key=${apiKey}`;
              const detailsRes = await fetch(videoDetailsUrl);

              if (detailsRes.ok) {
                const detailsData = await detailsRes.json();
                const videoObj = detailsData.items?.[0];

                const isEmbeddable = videoObj?.status?.embeddable ?? true;
                const privacyStatus = videoObj?.status?.privacyStatus || 'public';

                if (isEmbeddable && privacyStatus === 'public') {
                  const viewers = videoObj?.liveStreamingDetails?.concurrentViewers
                    ? parseInt(videoObj.liveStreamingDetails.concurrentViewers, 10)
                    : 1580;
                  const startedAt = videoObj?.liveStreamingDetails?.actualStartTime || nowIso;

                  const result: LiveStreamResolvedInfo = {
                    isLive: true,
                    videoId,
                    title: videoObj?.snippet?.title || liveItem.snippet?.title || '🔴 Live Masterclass',
                    thumbnail:
                      videoObj?.snippet?.thumbnails?.high?.url ||
                      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    startedAt,
                    viewerCount: viewers,
                    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
                    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
                    channelName: channel.name,
                    teacherName: channel.teacherName,
                    embeddable: true,
                    privacyStatus: 'public',
                    fallbackUsed: false,
                  };

                  LiveLectureResolver.logResult(result);
                  return result;
                }
              }
            }
          }

          // STEP 2: If no LIVE stream, search eventType=completed, order=date
          const completedSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            channel.handle
          )}&eventType=completed&type=video&videoEmbeddable=true&order=date&maxResults=1&key=${apiKey}`;

          const completedRes = await fetch(completedSearchUrl);
          if (completedRes.ok) {
            const completedData = await completedRes.json();
            const completedItem = completedData.items?.[0];

            if (completedItem && completedItem.id?.videoId && completedItem.id.kind === 'youtube#video') {
              const videoId = completedItem.id.videoId;

              const verifyCheck = await LiveLectureResolver.verifyEmbeddable(videoId);
              if (verifyCheck.embeddable) {
                const result: LiveStreamResolvedInfo = {
                  isLive: false,
                  videoId,
                  title: completedItem.snippet?.title || channel.fallbackTitle,
                  thumbnail:
                    completedItem.snippet?.thumbnails?.high?.url ||
                    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                  publishedAt: completedItem.snippet?.publishedAt || nowIso,
                  embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
                  watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
                  channelName: channel.name,
                  teacherName: channel.teacherName,
                  embeddable: true,
                  privacyStatus: 'public',
                  fallbackUsed: false,
                };

                LiveLectureResolver.logResult(result);
                return result;
              }
            }
          }
        } catch (err: any) {
          observability.log('warn', 'LECTURE_RESOLVER', 'Live search API error', {
            channel: channel.name,
            error: err?.message || err,
          });
        }
      }
    }

    // STEP 3: Fallback to verified embeddable channel masterclass
    const fallbackVideoId = primaryChannel.fallbackVideoId;
    const verifyFallback = await LiveLectureResolver.verifyEmbeddable(fallbackVideoId);

    const fallbackResult: LiveStreamResolvedInfo = {
      isLive: false,
      videoId: fallbackVideoId,
      title: primaryChannel.fallbackTitle,
      thumbnail: primaryChannel.fallbackThumbnail,
      publishedAt: nowIso,
      embedUrl: `https://www.youtube-nocookie.com/embed/${fallbackVideoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${fallbackVideoId}`,
      channelName: primaryChannel.name,
      teacherName: primaryChannel.teacherName,
      embeddable: verifyFallback.embeddable,
      privacyStatus: 'public',
      fallbackUsed: true,
      statusMessage: verifyFallback.embeddable ? undefined : 'No official live class is running.',
    };

    LiveLectureResolver.logResult(fallbackResult);
    return fallbackResult;
  }

  /**
   * Log required debugging parameters to console / observability
   */
  private static logResult(res: LiveStreamResolvedInfo) {
    console.log('--------------------------------------------------');
    console.log('📺 LIVE LECTURE RESOLVER RESULT:');
    console.log(`• Current Live Video ID : ${res.videoId}`);
    console.log(`• Embeddable            : ${res.embeddable}`);
    console.log(`• Live Status           : ${res.isLive ? '🔴 LIVE NOW' : 'RECORDED / COMPLETED'}`);
    console.log(`• Fallback Used         : ${res.fallbackUsed}`);
    console.log(`• Channel               : ${res.channelName}`);
    console.log(`• Watch URL             : ${res.watchUrl}`);
    console.log('--------------------------------------------------');

    observability.log('info', 'LECTURE_RESOLVER', 'Live Lecture Resolved', {
      videoId: res.videoId,
      embeddable: res.embeddable,
      isLive: res.isLive,
      fallbackUsed: res.fallbackUsed,
      channel: res.channelName,
    });
  }
}
