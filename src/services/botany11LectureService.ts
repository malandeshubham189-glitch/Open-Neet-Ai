import { BOTANY_11_LECTURE_DATABASE, Botany11LectureRecord, BOTANY_11_PLAYLIST_ID } from '../data/botany11LectureDatabase';

export class Botany11LectureService {
  private static lectures: Botany11LectureRecord[] = [...BOTANY_11_LECTURE_DATABASE];

  /**
   * Official Playlist ID
   */
  static getPlaylistId(): string {
    return BOTANY_11_PLAYLIST_ID;
  }

  /**
   * Retrieves all verified imported Class 11 Botany lectures
   */
  static getAllLectures(): Botany11LectureRecord[] {
    return this.lectures;
  }

  /**
   * Retrieves lecture record by chapter ID or Chapter Name
   */
  static getLectureForChapter(chapterQuery: string): Botany11LectureRecord | undefined {
    if (!chapterQuery) return undefined;
    const normalized = chapterQuery.toLowerCase().trim();

    return this.lectures.find((lec) => {
      if (lec.chapterId.toLowerCase() === normalized) return true;
      if (lec.chapterName.toLowerCase().includes(normalized) || normalized.includes(lec.chapterName.toLowerCase())) return true;

      // Cleaned chapter name check
      const cleanName = lec.chapterName.replace(/^Chapter\s+\d+:\s*/i, '').toLowerCase();
      if (cleanName === normalized || normalized.includes(cleanName)) return true;

      return false;
    });
  }

  /**
   * Retrieves lecture record by topic ID or Topic title
   */
  static getLectureForTopic(topicQuery: string): Botany11LectureRecord | undefined {
    if (!topicQuery) return undefined;
    const normalized = topicQuery.toLowerCase().trim();

    // Direct topicId match
    const byTopicId = this.lectures.find((lec) => lec.topicId.toLowerCase() === normalized);
    if (byTopicId) return byTopicId;

    // Fuzzy or title match
    const byTitle = this.lectures.find((lec) => {
      const cleanChapter = lec.chapterName.replace(/^Chapter\s+\d+:\s*/i, '').toLowerCase();
      return normalized.includes(cleanChapter) || lec.title.toLowerCase().includes(normalized);
    });
    if (byTitle) return byTitle;

    // Handle topic queries like "living world", "cell", "photosynthesis", etc.
    return this.getLectureForChapter(normalized);
  }

  /**
   * Verifies a YouTube video embeddability programmatically using oEmbed
   */
  static async verifyEmbed(youtubeId: string): Promise<boolean> {
    if (!youtubeId || youtubeId.length !== 11) return false;
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;
      const res = await fetch(oembedUrl);
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Live verification of all imported playlist lectures
   */
  static async verifyAllLectures(): Promise<{
    total: number;
    embedVerified: number;
    failed: string[];
  }> {
    let embedVerified = 0;
    const failed: string[] = [];

    for (const lec of this.lectures) {
      const ok = await this.verifyEmbed(lec.youtubeId);
      if (ok) {
        embedVerified++;
      } else {
        failed.push(lec.youtubeId);
      }
    }

    return {
      total: this.lectures.length,
      embedVerified,
      failed
    };
  }
}
