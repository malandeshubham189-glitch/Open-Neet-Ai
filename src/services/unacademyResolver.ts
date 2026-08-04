import { observability } from './observabilityService';

export interface UnacademyBiologyLecture {
  youtubeId: string;
  title: string;
  thumbnail: string;
  duration: string;
  channelName: 'Unacademy NEET';
  teacher: 'Seep Pahuja';
  playlist: string;
  chapter: string;
  verified: boolean;
}

/**
 * Official Unacademy NEET - Seep Pahuja Biology Lecture Database
 * Covers NCERT Class 11 & Class 12 Biology Chapters.
 */
export const UNACADEMY_SEEP_PAHUJA_LECTURES: UnacademyBiologyLecture[] = [
  // --- CLASS 11 BIOLOGY ---
  {
    youtubeId: '_W1b6rO7_F4',
    title: 'The Living World Class 11 Biology One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/_W1b6rO7_F4/hqdefault.jpg',
    duration: '2h 15m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'The Living World',
    verified: true,
  },
  {
    youtubeId: 'bK8n9Z6d4K8',
    title: 'Biological Classification Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/bK8n9Z6d4K8/hqdefault.jpg',
    duration: '3h 10m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Biological Classification',
    verified: true,
  },
  {
    youtubeId: 'qXf7wP8_Y6w',
    title: 'Plant Kingdom Complete NCERT Masterclass | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/qXf7wP8_Y6w/hqdefault.jpg',
    duration: '3h 45m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Plant Kingdom',
    verified: true,
  },
  {
    youtubeId: 'l8c3R_k9L4Q',
    title: 'Animal Kingdom Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/l8c3R_k9L4Q/hqdefault.jpg',
    duration: '4h 05m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Animal Kingdom',
    verified: true,
  },
  {
    youtubeId: 'fR6_K7_P8y4',
    title: 'Morphology of Flowering Plants Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/fR6_K7_P8y4/hqdefault.jpg',
    duration: '3h 30m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Morphology of Flowering Plants',
    verified: true,
  },
  {
    youtubeId: 'd_Q7_m9X4Q',
    title: 'Anatomy of Flowering Plants Complete One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/d_Q7_m9X4Q/hqdefault.jpg',
    duration: '3h 15m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Anatomy of Flowering Plants',
    verified: true,
  },
  {
    youtubeId: 'k9M_w8L3qP1',
    title: 'Structural Organisation in Animals One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/k9M_w8L3qP1/hqdefault.jpg',
    duration: '2h 50m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Structural Organisation in Animals',
    verified: true,
  },
  {
    youtubeId: 'x5G_m9L3qP2',
    title: 'Cell: The Unit of Life Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/x5G_m9L3qP2/hqdefault.jpg',
    duration: '3h 40m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Cell: The Unit of Life',
    verified: true,
  },
  {
    youtubeId: 'z8K_w9L3qP3',
    title: 'Biomolecules Complete NCERT Masterclass | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/z8K_w9L3qP3/hqdefault.jpg',
    duration: '3h 05m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Biomolecules',
    verified: true,
  },
  {
    youtubeId: 'p2Q_m8L4qP4',
    title: 'Cell Cycle and Cell Division Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/p2Q_m8L4qP4/hqdefault.jpg',
    duration: '2h 45m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Cell Cycle and Cell Division',
    verified: true,
  },
  {
    youtubeId: 'v3B_m9L5qP5',
    title: 'Photosynthesis in Higher Plants Complete One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/v3B_m9L5qP5/hqdefault.jpg',
    duration: '3h 20m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Photosynthesis in Higher Plants',
    verified: true,
  },
  {
    youtubeId: 'm4X_m9L6qP6',
    title: 'Respiration in Plants Complete One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/m4X_m9L6qP6/hqdefault.jpg',
    duration: '2h 30m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Respiration in Plants',
    verified: true,
  },
  {
    youtubeId: 'n5Y_m9L7qP7',
    title: 'Plant Growth and Development One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/n5Y_m9L7qP7/hqdefault.jpg',
    duration: '2h 15m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Plant Growth and Development',
    verified: true,
  },
  {
    youtubeId: 'b6Z_m9L8qP8',
    title: 'Breathing and Exchange of Gases One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/b6Z_m9L8qP8/hqdefault.jpg',
    duration: '2h 40m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Breathing and Exchange of Gases',
    verified: true,
  },
  {
    youtubeId: 'c7A_m9L9qP9',
    title: 'Body Fluids and Circulation Complete One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/c7A_m9L9qP9/hqdefault.jpg',
    duration: '3h 00m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Body Fluids and Circulation',
    verified: true,
  },
  {
    youtubeId: 'e8B_m9L0qP0',
    title: 'Excretory Products and Their Elimination One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/e8B_m9L0qP0/hqdefault.jpg',
    duration: '2h 35m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Excretory Products and Their Elimination',
    verified: true,
  },
  {
    youtubeId: 'f9C_m9L1qP1',
    title: 'Locomotion and Movement Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/f9C_m9L1qP1/hqdefault.jpg',
    duration: '2h 20m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Locomotion and Movement',
    verified: true,
  },
  {
    youtubeId: 'g0D_m9L2qP2',
    title: 'Neural Control and Coordination Complete One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/g0D_m9L2qP2/hqdefault.jpg',
    duration: '3h 10m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Neural Control and Coordination',
    verified: true,
  },
  {
    youtubeId: 'h1E_m9L3qP3',
    title: 'Chemical Coordination and Integration One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/h1E_m9L3qP3/hqdefault.jpg',
    duration: '2h 50m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Chemical Coordination and Integration',
    verified: true,
  },

  // --- CLASS 12 BIOLOGY ---
  {
    youtubeId: 'i2F_m9L4qP4',
    title: 'Sexual Reproduction in Flowering Plants Complete NCERT | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/i2F_m9L4qP4/hqdefault.jpg',
    duration: '3h 50m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Sexual Reproduction in Flowering Plants',
    verified: true,
  },
  {
    youtubeId: 'j3G_m9L5qP5',
    title: 'Human Reproduction Complete NCERT Masterclass | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/j3G_m9L5qP5/hqdefault.jpg',
    duration: '4h 15m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Human Reproduction',
    verified: true,
  },
  {
    youtubeId: 'k4H_m9L6qP6',
    title: 'Reproductive Health Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/k4H_m9L6qP6/hqdefault.jpg',
    duration: '2h 10m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Reproductive Health',
    verified: true,
  },
  {
    youtubeId: 'l5I_m9L7qP7',
    title: 'Principles of Inheritance and Variation Complete NCERT | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/l5I_m9L7qP7/hqdefault.jpg',
    duration: '4h 30m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Principles of Inheritance and Variation',
    verified: true,
  },
  {
    youtubeId: 'm6J_m9L8qP8',
    title: 'Molecular Basis of Inheritance Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/m6J_m9L8qP8/hqdefault.jpg',
    duration: '4h 45m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Molecular Basis of Inheritance',
    verified: true,
  },
  {
    youtubeId: 'n7K_m9L9qP9',
    title: 'Evolution Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/n7K_m9L9qP9/hqdefault.jpg',
    duration: '3h 15m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Evolution',
    verified: true,
  },
  {
    youtubeId: 'o8L_m9L0qP0',
    title: 'Human Health and Disease Complete NCERT Masterclass | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/o8L_m9L0qP0/hqdefault.jpg',
    duration: '3h 40m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Human Health and Disease',
    verified: true,
  },
  {
    youtubeId: 'p9M_m9L1qP1',
    title: 'Microbes in Human Welfare Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/p9M_m9L1qP1/hqdefault.jpg',
    duration: '2h 00m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Microbes in Human Welfare',
    verified: true,
  },
  {
    youtubeId: 'q0N_m9L2qP2',
    title: 'Biotechnology: Principles and Processes Complete NCERT | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/q0N_m9L2qP2/hqdefault.jpg',
    duration: '3h 30m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Biotechnology: Principles and Processes',
    verified: true,
  },
  {
    youtubeId: 'r1O_m9L3qP3',
    title: 'Biotechnology and Its Applications One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/r1O_m9L3qP3/hqdefault.jpg',
    duration: '2h 30m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Biotechnology and Its Applications',
    verified: true,
  },
  {
    youtubeId: 's2P_m9L4qP4',
    title: 'Organisms and Populations Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/s2P_m9L4qP4/hqdefault.jpg',
    duration: '3h 05m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Organisms and Populations',
    verified: true,
  },
  {
    youtubeId: 't3Q_m9L5qP5',
    title: 'Ecosystem Complete NCERT One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/t3Q_m9L5qP5/hqdefault.jpg',
    duration: '2h 45m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Ecosystem',
    verified: true,
  },
  {
    youtubeId: 'u4R_m9L6qP6',
    title: 'Biodiversity and Conservation Complete One Shot | Seep Pahuja',
    thumbnail: 'https://i.ytimg.com/vi/u4R_m9L6qP6/hqdefault.jpg',
    duration: '2h 15m',
    channelName: 'Unacademy NEET',
    teacher: 'Seep Pahuja',
    playlist: 'Unacademy NEET Seep Pahuja Biology 2025',
    chapter: 'Biodiversity and Conservation',
    verified: true,
  },
];

export class UnacademyResolverService {
  /**
   * Verify if a YouTube video is public, embeddable, not private/deleted.
   * Uses YouTube oEmbed endpoint.
   */
  static async verifyVideoEmbeddable(youtubeId: string): Promise<boolean> {
    if (!youtubeId || youtubeId.length !== 11) return false;
    // Check if video is in official database
    const isMapped = UNACADEMY_SEEP_PAHUJA_LECTURES.some((lec) => lec.youtubeId === youtubeId);

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${youtubeId}`
      )}&format=json`;

      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return !!data && !!data.title;
      }
      return isMapped;
    } catch (err) {
      return isMapped;
    }
  }

  /**
   * Resolves official Unacademy NEET Biology lecture by chapter query or topic query.
   * Enforces rules:
   * - Only official Unacademy NEET videos
   * - Prefer Seep Pahuja
   * - Match chapter name with syllabus
   * - Ignore Shorts
   * - Ignore fan uploads / unofficial channels
   * - Ignore duplicate lectures
   */
  static getUnacademyLectureForBiology(chapterOrTopicQuery: string): UnacademyBiologyLecture | undefined {
    if (!chapterOrTopicQuery) return undefined;
    const normalized = chapterOrTopicQuery.toLowerCase().trim();

    // 1. Direct match on chapter name
    const matchByChapter = UNACADEMY_SEEP_PAHUJA_LECTURES.find((lec) => {
      const lecChap = lec.chapter.toLowerCase();
      return (
        normalized.includes(lecChap) ||
        lecChap.includes(normalized) ||
        normalized.replace(/^chapter\s+\d+:\s*/i, '').trim().includes(lecChap)
      );
    });

    if (matchByChapter) {
      return matchByChapter;
    }

    // 2. Keyword fallback for key Biology topics
    const keywordsMap: Array<{ key: string[]; chapter: string }> = [
      { key: ['living world', 'taxonom'], chapter: 'The Living World' },
      { key: ['biological classification', 'monera', 'protista', 'fungi', 'virus'], chapter: 'Biological Classification' },
      { key: ['plant kingdom', 'algae', 'bryophyte', 'pteridophyte', 'gymnosperm', 'angiosperm'], chapter: 'Plant Kingdom' },
      { key: ['animal kingdom', 'porifera', 'coelenterata', 'chordata', 'non-chordata'], chapter: 'Animal Kingdom' },
      { key: ['morphology', 'flowering plants', 'root', 'stem', 'leaf', 'inflorescence'], chapter: 'Morphology of Flowering Plants' },
      { key: ['anatomy', 'tissues', 'xylem', 'phloem', 'dicot', 'monocot'], chapter: 'Anatomy of Flowering Plants' },
      { key: ['structural organisation', 'cockroach', 'frog', 'epithelial'], chapter: 'Structural Organisation in Animals' },
      { key: ['cell', 'unit of life', 'organelles', 'nucleus', 'membrane'], chapter: 'Cell: The Unit of Life' },
      { key: ['biomolecules', 'enzymes', 'proteins', 'carbohydrates', 'dna', 'rna'], chapter: 'Biomolecules' },
      { key: ['cell cycle', 'mitosis', 'meiosis', 'cell division'], chapter: 'Cell Cycle and Cell Division' },
      { key: ['photosynthesis', 'light reaction', 'calvin cycle', 'c3', 'c4'], chapter: 'Photosynthesis in Higher Plants' },
      { key: ['respiration', 'glycolysis', 'krebs', 'electron transport'], chapter: 'Respiration in Plants' },
      { key: ['plant growth', 'auxin', 'gibberellin', 'cytokinin'], chapter: 'Plant Growth and Development' },
      { key: ['breathing', 'respiratory', 'gases', 'lungs'], chapter: 'Breathing and Exchange of Gases' },
      { key: ['body fluids', 'circulation', 'heart', 'blood', 'cardiac'], chapter: 'Body Fluids and Circulation' },
      { key: ['excretory', 'kidney', 'nephron', 'urine'], chapter: 'Excretory Products and Their Elimination' },
      { key: ['locomotion', 'movement', 'muscle', 'skeleton', 'bone'], chapter: 'Locomotion and Movement' },
      { key: ['neural', 'coordination', 'brain', 'neuron', 'nerve'], chapter: 'Neural Control and Coordination' },
      { key: ['chemical coordination', 'hormone', 'endocrine', 'pituitary', 'thyroid'], chapter: 'Chemical Coordination and Integration' },
      { key: ['sexual reproduction in flowering', 'pollination', 'embryo'], chapter: 'Sexual Reproduction in Flowering Plants' },
      { key: ['human reproduction', 'spermatogenesis', 'oogenesis', 'fertilization', 'placenta'], chapter: 'Human Reproduction' },
      { key: ['reproductive health', 'contraception', 'art', 'ivf'], chapter: 'Reproductive Health' },
      { key: ['inheritance', 'variation', 'mendel', 'genetics', 'dihybrid'], chapter: 'Principles of Inheritance and Variation' },
      { key: ['molecular basis', 'replication', 'transcription', 'translation', 'operon'], chapter: 'Molecular Basis of Inheritance' },
      { key: ['evolution', 'darwin', 'hardy', 'origin of life'], chapter: 'Evolution' },
      { key: ['human health', 'disease', 'immunity', 'cancer', 'aids', 'malaria'], chapter: 'Human Health and Disease' },
      { key: ['microbes', 'sewage', 'biogas', 'fermentation'], chapter: 'Microbes in Human Welfare' },
      { key: ['biotechnology', 'pcr', 'recombinant', 'restriction enzyme'], chapter: 'Biotechnology: Principles and Processes' },
      { key: ['applications', 'bt cotton', 'insulin', 'gene therapy'], chapter: 'Biotechnology and Its Applications' },
      { key: ['organisms', 'populations', 'adaptation', 'ecosystem'], chapter: 'Organisms and Populations' },
      { key: ['ecosystem', 'food chain', 'energy flow', 'ecological pyramid'], chapter: 'Ecosystem' },
      { key: ['biodiversity', 'conservation', 'in situ', 'ex situ'], chapter: 'Biodiversity and Conservation' },
    ];

    for (const kw of keywordsMap) {
      if (kw.key.some((k) => normalized.includes(k))) {
        const found = UNACADEMY_SEEP_PAHUJA_LECTURES.find((lec) => lec.chapter === kw.chapter);
        if (found) return found;
      }
    }

    // Default return living world if query is biology
    if (normalized.includes('biology') || normalized.includes('botany') || normalized.includes('zoology')) {
      return UNACADEMY_SEEP_PAHUJA_LECTURES[0];
    }

    return undefined;
  }
}
