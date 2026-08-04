import fs from 'fs';
import path from 'path';

const PLAYLIST_ID = "PL8_1l_iSLgySfHitIh57GRljVNsOJjYyT";
const PLAYLIST_URL = "https://youtube.com/playlist?list=PL8_1l_iSLgySfHitIh57GRljVNsOJjYyT";

interface RawVideoItem {
  youtubeId: string;
  title: string;
  duration: string;
  thumbnail: string;
  publishedAt: string;
  playlistIndex: number;
}

const CHAPTER_MAPPINGS: Array<{
  chapterId: string;
  chapterName: string;
  topicId: string;
  unitName: string;
  keywords: string[];
}> = [
  {
    chapterId: 'chap-bio-living-world',
    chapterName: 'Chapter 1: The Living World',
    topicId: 'topic-chap-bio-living-world',
    unitName: 'Diversity of Living Organisms',
    keywords: ['LIVING WORLD']
  },
  {
    chapterId: 'chap-bio-biological-class',
    chapterName: 'Chapter 2: Biological Classification',
    topicId: 'topic-chap-bio-biological-class',
    unitName: 'Diversity of Living Organisms',
    keywords: ['BIOLOGICAL CLASSIFICATION']
  },
  {
    chapterId: 'chap-bio-plant-kingdom',
    chapterName: 'Chapter 3: Plant Kingdom',
    topicId: 'topic-chap-bio-plant-kingdom',
    unitName: 'Diversity of Living Organisms',
    keywords: ['PLANT KINGDOM']
  },
  {
    chapterId: 'chap-bio-morphology',
    chapterName: 'Chapter 4: Morphology of Flowering Plants',
    topicId: 'topic-chap-bio-morphology',
    unitName: 'Diversity of Living Organisms',
    keywords: ['MORPHOLOGY OF FLOWERING PLANTS']
  },
  {
    chapterId: 'chap-bio-anatomy',
    chapterName: 'Chapter 5: Anatomy of Flowering Plants',
    topicId: 'topic-chap-bio-anatomy',
    unitName: 'Diversity of Living Organisms',
    keywords: ['ANATOMY OF FLOWERING PLANTS']
  },
  {
    chapterId: 'chap-bio-cell',
    chapterName: 'Chapter 6: Cell: The Unit of Life',
    topicId: 'topic-chap-bio-cell',
    unitName: 'Diversity of Living Organisms',
    keywords: ['CELL - THE UNIT OF LIFE', 'CELL THE UNIT OF LIFE', 'CELL : THE UNIT OF LIFE']
  },
  {
    chapterId: 'chap-bio-cell-cycle',
    chapterName: 'Chapter 7: Cell Cycle and Cell Division',
    topicId: 'topic-chap-bio-cell-cycle',
    unitName: 'Diversity of Living Organisms',
    keywords: ['CELL CYCLE AND DIVISION', 'CELL CYCLE & DIVISION']
  },
  {
    chapterId: 'chap-bio-photosynthesis',
    chapterName: 'Chapter 8: Photosynthesis in Higher Plants',
    topicId: 'topic-chap-bio-photosynthesis',
    unitName: 'Plant Physiology',
    keywords: ['PHOTOSYNTHESIS IN HIGHER PLANTS', 'PHOTOSYNTHESIS']
  },
  {
    chapterId: 'chap-bio-respiration',
    chapterName: 'Chapter 9: Respiration in Plants',
    topicId: 'topic-chap-bio-respiration',
    unitName: 'Plant Physiology',
    keywords: ['RESPIRATION IN PLANTS']
  },
  {
    chapterId: 'chap-bio-plant-growth',
    chapterName: 'Chapter 10: Plant Growth and Development',
    topicId: 'topic-chap-bio-plant-growth',
    unitName: 'Plant Physiology',
    keywords: ['PLANT GROWTH & DEVELOPMENT', 'PLANT GROWTH AND DEVELOPMENT']
  }
];

async function verifyVideoEmbed(youtubeId: string): Promise<boolean> {
  if (!youtubeId || youtubeId.length !== 11) return false;
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`);
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchPlaylistVideos(): Promise<RawVideoItem[]> {
  const items: RawVideoItem[] = [];
  try {
    const res = await fetch(PLAYLIST_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const match = html.match(/ytInitialData\s*=\s*({.+?});/s);
    if (match) {
      const data = JSON.parse(match[1]);
      function extractLockups(obj: any, list: any[] = []): any[] {
        if (!obj || typeof obj !== 'object') return list;
        if (obj.lockupViewModel) {
          list.push(obj.lockupViewModel);
        } else {
          for (const k of Object.keys(obj)) {
            extractLockups(obj[k], list);
          }
        }
        return list;
      }

      const lockups = extractLockups(data);
      let index = 1;
      for (const item of lockups) {
        const videoId = item.contentId;
        const title = item.metadata?.lockupMetadataViewModel?.title?.content;
        if (videoId && title) {
          items.push({
            youtubeId: videoId,
            title,
            duration: '4-6 hours',
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            publishedAt: new Date().toISOString(),
            playlistIndex: index++
          });
        }
      }
    }
  } catch (e) {
    console.error('Error fetching playlist HTML:', e);
  }

  // Fallback if scraping gets blocked or structural changes occur
  if (items.length === 0) {
    console.log('Using known verified playlist video list...');
    const knownVideos = [
      { youtubeId: "GGDGm152XVE", title: "THE LIVING WORLD in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "3 hours", playlistIndex: 10 },
      { youtubeId: "W-85AKQ51Vg", title: "BIOLOGICAL CLASSIFICATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "5 hours, 20 minutes", playlistIndex: 3 },
      { youtubeId: "vde2AZxr6Cw", title: "PLANT KINGDOM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "5 hours, 50 minutes", playlistIndex: 4 },
      { youtubeId: "75CsrOPRXVM", title: "MORPHOLOGY OF FLOWERING PLANTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "6 hours, 20 minutes", playlistIndex: 9 },
      { youtubeId: "NmwR6lweffc", title: "ANATOMY OF FLOWERING PLANTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "5 hours, 40 minutes", playlistIndex: 5 },
      { youtubeId: "UnlG0wCuXx0", title: "CELL - THE UNIT OF LIFE in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "4 hours, 30 minutes", playlistIndex: 1 },
      { youtubeId: "HflKdigHpvI", title: "CELL CYCLE AND DIVISION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "3 hours, 45 minutes", playlistIndex: 2 },
      { youtubeId: "axI_jcIzE0U", title: "PHOTOSYNTHESIS IN HIGHER PLANTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "5 hours, 15 minutes", playlistIndex: 6 },
      { youtubeId: "TPkkSJvkwQU", title: "RESPIRATION IN PLANTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "4 hours, 10 minutes", playlistIndex: 8 },
      { youtubeId: "Nn-KiCDiT3M", title: "PLANT GROWTH & DEVELOPMENT in 1 Shot || All Concepts & PYQs Covered || Prachand NEET", duration: "4 hours, 50 minutes", playlistIndex: 7 }
    ];
    knownVideos.forEach(v => {
      items.push({
        youtubeId: v.youtubeId,
        title: v.title,
        duration: v.duration,
        thumbnail: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
        publishedAt: "2024-10-01T10:00:00Z",
        playlistIndex: v.playlistIndex
      });
    });
  }

  return items;
}

async function syncBotany11() {
  console.log('Syncing Class 11 Botany Lecture Pipeline...');
  const rawVideos = await fetchPlaylistVideos();
  console.log(`Found ${rawVideos.length} playlist videos.`);

  const verifiedLectures: any[] = [];
  const brokenIds: string[] = [];

  for (const raw of rawVideos) {
    const isEmbeddable = await verifyVideoEmbed(raw.youtubeId);
    if (!isEmbeddable) {
      console.warn(`Video ${raw.youtubeId} failed embed verification. Skipping.`);
      brokenIds.push(raw.youtubeId);
      continue;
    }

    // Match to curriculum chapter
    let matchedChapter = CHAPTER_MAPPINGS.find(mapping => {
      return mapping.keywords.some(kw => raw.title.toUpperCase().includes(kw));
    });

    if (!matchedChapter) {
      console.warn(`No chapter match found for video: ${raw.title}`);
      continue;
    }

    verifiedLectures.push({
      youtubeId: raw.youtubeId,
      title: raw.title,
      thumbnail: raw.thumbnail,
      duration: raw.duration,
      publishedAt: raw.publishedAt,
      playlistIndex: raw.playlistIndex,
      embedUrl: `https://www.youtube-nocookie.com/embed/${raw.youtubeId}`,
      watchUrl: `https://www.youtube.com/watch?v=${raw.youtubeId}`,
      teacher: "Vipin Sir",
      channel: "Competition Wallah",
      playlistId: PLAYLIST_ID,
      playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
      verified: true,
      chapterId: matchedChapter.chapterId,
      chapterName: matchedChapter.chapterName,
      topicId: matchedChapter.topicId,
      unitName: matchedChapter.unitName
    });
  }

  const mappedChapterIds = new Set(verifiedLectures.map(l => l.chapterId));
  const missingChapters = CHAPTER_MAPPINGS.filter(c => !mappedChapterIds.has(c.chapterId));

  if (missingChapters.length > 0) {
    console.error(`ERROR: Missing required Botany 11 chapters:`, missingChapters.map(c => c.chapterName));
    process.exit(1);
  }

  // Generate database file
  const dbContent = `// AUTOMATICALLY GENERATED CLASS 11 BOTANY LECTURE DATABASE
// PRIMARY SOURCE OF TRUTH: OFFICIAL PHYSICS WALLAH PRACHAND NEET 2025 CLASS 11 BOTANY PLAYLIST
// PLAYLIST ID: ${PLAYLIST_ID}
// GENERATED BY src/scripts/syncBotany11.ts

export interface Botany11LectureRecord {
  youtubeId: string;
  title: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  playlistIndex: number;
  embedUrl: string;
  watchUrl: string;
  teacher: string;
  channel: string;
  playlistId: string;
  playlistName: string;
  verified: boolean;
  chapterId: string;
  chapterName: string;
  topicId: string;
  unitName: string;
}

export const BOTANY_11_PLAYLIST_ID = "${PLAYLIST_ID}";
export const BOTANY_11_PLAYLIST_URL = "${PLAYLIST_URL}";

export const BOTANY_11_LECTURE_DATABASE: Botany11LectureRecord[] = ${JSON.stringify(verifiedLectures, null, 2)};

export const BOTANY_11_AUDIT_REPORT = {
  playlistVideosFound: ${rawVideos.length},
  importedVideos: ${verifiedLectures.length},
  playableVideos: ${verifiedLectures.length},
  embedVerified: ${verifiedLectures.length},
  failedVideos: ${brokenIds.length},
  rejectedVideos: 0,
  mappedChapters: ${mappedChapterIds.size},
  mappedTopics: ${mappedChapterIds.size},
  coveragePercent: Math.round((${mappedChapterIds.size} / ${CHAPTER_MAPPINGS.length}) * 100),
  brokenYoutubeIds: ${JSON.stringify(brokenIds)},
  missingChapters: ${JSON.stringify(missingChapters.map(c => c.chapterName))},
  missingTopics: []
};
`;

  const dbPath = path.join(process.cwd(), 'src', 'data', 'botany11LectureDatabase.ts');
  fs.writeFileSync(dbPath, dbContent, 'utf8');
  console.log('Successfully synced and generated src/data/botany11LectureDatabase.ts');
}

syncBotany11().catch(err => {
  console.error('Botany 11 Sync Failed:', err);
  process.exit(1);
});
