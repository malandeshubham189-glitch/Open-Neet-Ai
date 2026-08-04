import { LectureService } from './lectureService';
import { PWFreeBatchService } from './pwFreeBatchService';
import { Botany11LectureService } from './botany11LectureService';
import { UnacademyResolverService, UnacademyBiologyLecture } from './unacademyResolver';
import { BiologyChannelProvider } from '../data/biologyChannelProvider';
import { getTopicById } from '../data/curriculumData';
import { LectureMapping } from '../types';

export type LectureSourceType = 'youtube' | 'unacademy' | 'pw_free' | 'none';
export type SourceBadgeType = 'PW' | 'UNACADEMY' | 'BOTANY 11' | 'KAPIL BIOLOGY' | 'NONE';

export interface FallbackLectureInfo {
  source: 'unacademy';
  title: string;
  teacher: string;
  channelName: string;
  youtubeVideoId: string;
  embedUrl: string;
  sourceBadge: 'UNACADEMY';
}

export interface ResolvedLecture {
  source: LectureSourceType;
  title: string;
  teacher: string;
  platform: string;
  channelName?: string;
  url: string;
  embedUrl?: string;
  playable: boolean;
  official: boolean;
  youtubeVideoId?: string;
  durationMinutes?: number;
  batchName?: string;
  sourceBadge: SourceBadgeType;
  fallbackLecture?: FallbackLectureInfo;
}

export class LectureResolverService {
  /**
   * Automatically resolves the BEST official source for a topic.
   * Priority for Biology:
   * 1. Official Playlist (Botany 11 / Competition Wallah)
   * 2. Official YouTube (PW)
   * 3. Official Unacademy NEET (Seep Pahuja)
   * 4. NCERT Reading
   * 5. AI Notes
   *
   * For Physics & Chemistry:
   * Standard PW / Internal Verified YouTube pipeline is maintained 100%.
   */
  static resolveLectureForTopic(
    topicId: string,
    baseLectures: LectureMapping[] = []
  ): ResolvedLecture {
    const topic = getTopicById(topicId);
    const isBiology =
      topic?.subjectId === 'biology' ||
      topicId.includes('-bio-') ||
      topicId.includes('-bot-') ||
      topicId.includes('-zoo-');

    // ==========================================
    // BIOLOGY DEDICATED PIPELINE
    // ==========================================
    if (isBiology) {
      // Priority 1: Check Kapil's Biology Classes Official Channel Provider
      const kapilLecture = BiologyChannelProvider.getLectureForTopicOrChapter(topic?.chapterName || topic?.title || topicId);
      if (kapilLecture && kapilLecture.youtubeId) {
        return {
          source: 'youtube',
          title: kapilLecture.topicName,
          teacher: 'Kapil Sir',
          platform: "Kapil's Biology Classes (Official Channel)",
          channelName: "Kapil's Biology Classes",
          url: kapilLecture.watchUrl,
          embedUrl: kapilLecture.embedUrl,
          playable: true,
          official: true,
          youtubeVideoId: kapilLecture.youtubeId,
          durationMinutes: Math.round((kapilLecture.durationSeconds || 2700) / 60),
          sourceBadge: 'KAPIL BIOLOGY',
        };
      }

      // Priority 2: Check Official Botany 11 Mapped Playlist
      const botany11 = Botany11LectureService.getLectureForTopic(topicId) || Botany11LectureService.getLectureForChapter(topic?.chapterName || topicId);
      const unacademyFallback = UnacademyResolverService.getUnacademyLectureForBiology(topic?.chapterName || topic?.title || topicId);

      let fallbackInfo: FallbackLectureInfo | undefined = undefined;
      if (unacademyFallback && unacademyFallback.youtubeId) {
        fallbackInfo = {
          source: 'unacademy',
          title: unacademyFallback.title,
          teacher: unacademyFallback.teacher,
          channelName: unacademyFallback.channelName,
          youtubeVideoId: unacademyFallback.youtubeId,
          embedUrl: `https://www.youtube-nocookie.com/embed/${unacademyFallback.youtubeId}`,
          sourceBadge: 'UNACADEMY',
        };
      }

      if (botany11 && botany11.youtubeId && botany11.youtubeId.length === 11) {
        return {
          source: 'youtube',
          title: botany11.title,
          teacher: botany11.teacher,
          platform: 'Botany 11 Official Playlist',
          channelName: botany11.channel || 'Competition Wallah',
          url: `https://www.youtube.com/watch?v=${botany11.youtubeId}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${botany11.youtubeId}`,
          playable: true,
          official: true,
          youtubeVideoId: botany11.youtubeId,
          durationMinutes: 240,
          sourceBadge: 'BOTANY 11',
          fallbackLecture: fallbackInfo,
        };
      }

      // Priority 2: Check Internal Verified YouTube Database (PW)
      const internalResult = LectureService.getRecommendedLecture(topicId, baseLectures);
      if (
        internalResult &&
        internalResult.lecture &&
        internalResult.lecture.youtubeVideoId &&
        internalResult.lecture.youtubeVideoId.length === 11 &&
        internalResult.lecture.healthStatus !== 'WAITING_FOR_OFFICIAL_LECTURE'
      ) {
        const lec = internalResult.lecture;
        return {
          source: 'youtube',
          title: lec.title,
          teacher: lec.teacher,
          platform: 'PW YouTube (Embedded)',
          channelName: 'Competition Wallah',
          url: `https://www.youtube.com/watch?v=${lec.youtubeVideoId}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${lec.youtubeVideoId}`,
          playable: true,
          official: true,
          youtubeVideoId: lec.youtubeVideoId,
          durationMinutes: lec.durationMinutes || 240,
          sourceBadge: 'PW',
          fallbackLecture: fallbackInfo,
        };
      }

      // Priority 3: Check Official Unacademy NEET (Seep Pahuja)
      if (unacademyFallback && unacademyFallback.youtubeId) {
        return {
          source: 'unacademy',
          title: unacademyFallback.title,
          teacher: unacademyFallback.teacher,
          platform: 'Unacademy NEET (Embedded)',
          channelName: unacademyFallback.channelName,
          url: `https://www.youtube.com/watch?v=${unacademyFallback.youtubeId}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${unacademyFallback.youtubeId}`,
          playable: true,
          official: true,
          youtubeVideoId: unacademyFallback.youtubeId,
          durationMinutes: 180,
          sourceBadge: 'UNACADEMY',
        };
      }

      // Priority 4: PW Free App/Web Batch mapping
      const pwFreeRecord = PWFreeBatchService.getPWFreeLecture(topicId);
      if (pwFreeRecord) {
        return {
          source: 'pw_free',
          title: `${pwFreeRecord.topicTitle} (${pwFreeRecord.chapterName})`,
          teacher: pwFreeRecord.teacher,
          platform: 'Physics Wallah App/Web',
          channelName: 'Physics Wallah',
          url: pwFreeRecord.officialUrl,
          playable: false,
          official: true,
          batchName: pwFreeRecord.batch,
          sourceBadge: 'PW',
          fallbackLecture: fallbackInfo,
        };
      }

      // Priority 5: None -> NCERT + AI Notes
      return {
        source: 'none',
        title: 'Official lecture pending - proceed to NCERT Reading & AI Notes',
        teacher: 'Pending Official Release',
        platform: 'N/A',
        url: '',
        playable: false,
        official: false,
        sourceBadge: 'NONE',
      };
    }

    // ==========================================
    // PHYSICS & CHEMISTRY PIPELINE (UNTOUCHED)
    // ==========================================
    // 1. Check Internal Verified YouTube Database
    const internalResult = LectureService.getRecommendedLecture(topicId, baseLectures);
    if (
      internalResult &&
      internalResult.lecture &&
      internalResult.lecture.youtubeVideoId &&
      internalResult.lecture.youtubeVideoId.length === 11 &&
      internalResult.lecture.healthStatus !== 'WAITING_FOR_OFFICIAL_LECTURE'
    ) {
      const lec = internalResult.lecture;
      return {
        source: 'youtube',
        title: lec.title,
        teacher: lec.teacher,
        platform: 'YouTube (Embedded)',
        channelName: 'Competition Wallah',
        url: `https://www.youtube.com/watch?v=${lec.youtubeVideoId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${lec.youtubeVideoId}`,
        playable: true,
        official: true,
        youtubeVideoId: lec.youtubeVideoId,
        durationMinutes: lec.durationMinutes || 300,
        sourceBadge: 'PW',
      };
    }

    // 2. Check Official PW Free Batch Mapping
    const pwFreeRecord = PWFreeBatchService.getPWFreeLecture(topicId);
    if (pwFreeRecord) {
      return {
        source: 'pw_free',
        title: `${pwFreeRecord.topicTitle} (${pwFreeRecord.chapterName})`,
        teacher: pwFreeRecord.teacher,
        platform: 'Physics Wallah App/Web',
        channelName: 'Physics Wallah',
        url: pwFreeRecord.officialUrl,
        playable: false,
        official: true,
        batchName: pwFreeRecord.batch,
        sourceBadge: 'PW',
      };
    }

    // 3. No Official Lecture Found
    return {
      source: 'none',
      title: 'Official lecture not available yet.',
      teacher: 'Pending Official Release',
      platform: 'N/A',
      url: '',
      playable: false,
      official: false,
      sourceBadge: 'NONE',
    };
  }
}

export function lectureResolver(
  topicId: string,
  baseLectures: LectureMapping[] = []
): ResolvedLecture {
  return LectureResolverService.resolveLectureForTopic(topicId, baseLectures);
}

