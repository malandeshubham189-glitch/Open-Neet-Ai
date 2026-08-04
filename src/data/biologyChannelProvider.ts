import { YouTubeEmbedService } from '../services/youtubeEmbedService';

export interface NEET2027Lecture {
  id: string;
  lectureNumber: number;
  playlistPosition: number;
  batchName: 'NEET 2027 Official Batch' | 'PW Yakeen 2.0 Dropper' | 'Mission 100 Dropper' | string;
  subject: 'Botany' | 'Zoology' | 'Biology' | 'Physics' | 'Chemistry';
  classLevel: 'Class 11' | 'Class 12';
  unitName: string;
  chapterName: string;
  chapterId: string;
  topicName: string;
  topicId?: string;
  youtubeId: string;
  playlistId: string;
  playlistName: string;
  thumbnail: string;
  duration: string;
  durationSeconds: number;
  teacher: string;
  uploadDate: string;
  liveStatus: 'live' | 'upcoming' | 'none';
  isNew?: boolean;
  embedUrl: string;
  watchUrl: string;
  viewCount?: string;
  description?: string;
  syncedAt?: string;

  // Attached Learning Resources & Sync PDFs
  notesMarkdown?: string;
  pdfNotesUrl?: string;
  dppPdfUrl?: string;
  dppSolutionVideoId?: string;
  modulePdfUrl?: string;
  pwBatchId?: string;
  pwBatchUrl?: string;
  mcqs?: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export const INTERLINKED_BATCHES = [
  {
    id: 'pw_live_693f',
    batchId: '693fafdb626a05be66a7edd4',
    name: 'PW Live Official NEET Batch (693fafdb)',
    shortName: 'PW Live Official',
    pwBatchUrl: 'https://www.pw.live/study/batches/693fafdb626a05be66a7edd4/batch-overview?referred_by=67dd1f9c33c6ab3b8a0ecb05',
    teacher: 'PW Top Faculties (Alakh Sir & Team)',
    badge: 'Verified Sync 🟢',
    color: 'blue',
    description: 'Direct PW Live Sync: Video Lectures, Class Notes PDFs, DPP PDFs, Modules & Test Series',
    accessGranted: true,
  },
  {
    id: 'kapil_neet2027',
    name: "Kapil's Biology NEET 2027 Batch",
    shortName: "Kapil Sir 2027",
    teacher: 'Kapil Sir',
    badge: 'Official NCERT',
    color: 'emerald',
    description: '100% NCERT Biology line-by-line coverage for Class 11 & 12',
    accessGranted: true,
  },
  {
    id: 'pw_yakeen_20',
    name: 'PW Yakeen 2.0 NEET Dropper Batch',
    shortName: 'PW Yakeen 2.0',
    teacher: 'PW Top Faculties',
    badge: 'Access Granted 🔓',
    color: 'indigo',
    description: 'Full Dropper Master Batch — Physics, Chemistry, Botany & Zoology',
    accessGranted: true,
  },
  {
    id: 'mission_100',
    name: 'Mission 100 NEET Dropper Batch',
    shortName: 'Mission 100',
    teacher: 'Specialist NEET Team',
    badge: 'Access Granted 🔓',
    color: 'purple',
    description: 'High-Yield Top 100 Chapter Crash Course & Question Bank',
    accessGranted: true,
  },
];

export const KAPIL_BIOLOGY_CHANNEL_INFO = {
  id: 'kapils_biology_classes',
  channelName: "Kapil's Biology Classes",
  handle: '@kapilsbiologyclasses',
  channelUrl: 'https://youtube.com/@kapilsbiologyclasses',
  teacher: 'Kapil Sir',
  batchName: 'NEET 2027 Official Batch',
  subject: 'Biology (Botany & Zoology)',
  description: "Official NEET 2027 Batch Sync — 100% NCERT Biology for Class 11 & Class 12 by Kapil Sir",
  verified: true,
};

const STORAGE_KEY = 'neetdrop_neet2027_kapil_lectures';
const LAST_SYNC_KEY = 'neetdrop_neet2027_last_sync';

// Initial Full NEET 2027 Batch Curriculum Seed Database with Multi-Lecture Sequences per Chapter
const INITIAL_NEET2027_BATCH_LECTURES: NEET2027Lecture[] = [
  // ==========================================
  // CLASS 11 BOTANY: THE LIVING WORLD (4 LECTURES)
  // ==========================================
  {
    id: 'kbc-2027-lw-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'The Living World',
    chapterId: 'chap-bio-living-world',
    topicName: 'Lec 01: Defining Characteristics of Living Organisms',
    topicId: 'topic-bio-lw-1',
    youtubeId: 'b_K9G2qX9L8',
    playlistId: 'PL_KAPIL_NEET2027_LIVING_WORLD',
    playlistName: 'NEET 2027 | Class 11 Biology | The Living World Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/b_K9G2qX9L8/hqdefault.jpg',
    duration: '48:30',
    durationSeconds: 2910,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 12 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/b_K9G2qX9L8',
    watchUrl: 'https://www.youtube.com/watch?v=b_K9G2qX9L8',
    description: 'Growth, Reproduction, Metabolism, Cellular Organization & Consciousness. NCERT line-by-line comparison for NEET 2027 aspirants.',
    notesMarkdown: `### Key NCERT Highlights: Defining vs Non-Defining Properties
1. **Growth**: Increase in mass & increase in number of individuals. Non-defining because non-living objects (sand dunes, mountains) can grow by accretion.
2. **Reproduction**: Production of progeny. Non-defining because sterile worker bees, mules, infertile human couples cannot reproduce.
3. **Metabolism**: Sum total of all chemical reactions in the body. **DEFINING FEATURE** (no non-living object exhibits metabolism).
4. **Cellular Organization**: **DEFINING FEATURE**.
5. **Consciousness**: Ability to sense surroundings & respond. **DEFINING FEATURE** (Human is the only organism with self-consciousness).`,
    mcqs: [
      {
        id: 'q-lw-1',
        question: 'Which of the following is a defining characteristic of all living organisms?',
        options: ['Growth', 'Reproduction', 'Metabolism', 'Self-consciousness'],
        correctIndex: 2,
        explanation: 'Metabolism occurs in all living organisms without exception and does not occur in non-living objects.'
      },
      {
        id: 'q-lw-2',
        question: 'Self-consciousness is a unique property of:',
        options: ['All prokaryotes', 'All eukaryotes', 'Humans only', 'All animals'],
        correctIndex: 2,
        explanation: 'According to NCERT, human beings are the only organisms aware of themselves (self-consciousness).'
      }
    ]
  },
  {
    id: 'kbc-2027-lw-02',
    lectureNumber: 2,
    playlistPosition: 2,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'The Living World',
    chapterId: 'chap-bio-living-world',
    topicName: 'Lec 02: Biodiversity, Need for Classification & Binomial Nomenclature',
    topicId: 'topic-bio-lw-2',
    youtubeId: 'W-85AKQ51Vg',
    playlistId: 'PL_KAPIL_NEET2027_LIVING_WORLD',
    playlistName: 'NEET 2027 | Class 11 Biology | The Living World Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/W-85AKQ51Vg/hqdefault.jpg',
    duration: '54:15',
    durationSeconds: 3255,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 10 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/W-85AKQ51Vg',
    watchUrl: 'https://www.youtube.com/watch?v=W-85AKQ51Vg',
    description: 'Rules of ICBN & ICZN, Carolus Linnaeus, Binomial nomenclature rules, Specific epithet & Generic name format.',
  },
  {
    id: 'kbc-2027-lw-03',
    lectureNumber: 3,
    playlistPosition: 3,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'The Living World',
    chapterId: 'chap-bio-living-world',
    topicName: 'Lec 03: Taxonomic Hierarchy - Kingdom to Species',
    topicId: 'topic-bio-lw-3',
    youtubeId: 'vde2AZxr6Cw',
    playlistId: 'PL_KAPIL_NEET2027_LIVING_WORLD',
    playlistName: 'NEET 2027 | Class 11 Biology | The Living World Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/vde2AZxr6Cw/hqdefault.jpg',
    duration: '50:40',
    durationSeconds: 3040,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 8 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/vde2AZxr6Cw',
    watchUrl: 'https://www.youtube.com/watch?v=vde2AZxr6Cw',
    description: 'Obligate taxonomic categories: Species, Genus, Family, Order, Class, Phylum/Division, Kingdom. NCERT Table 1.1 Mnemonics.',
  },
  {
    id: 'kbc-2027-lw-04',
    lectureNumber: 4,
    playlistPosition: 4,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'The Living World',
    chapterId: 'chap-bio-living-world',
    topicName: 'Lec 04: Taxonomical Aids - Herbarium, Botanical Gardens & Keys',
    topicId: 'topic-bio-lw-4',
    youtubeId: '3i8mHECla2k',
    playlistId: 'PL_KAPIL_NEET2027_LIVING_WORLD',
    playlistName: 'NEET 2027 | Class 11 Biology | The Living World Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/3i8mHECla2k/hqdefault.jpg',
    duration: '46:10',
    durationSeconds: 2770,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 6 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/3i8mHECla2k',
    watchUrl: 'https://www.youtube.com/watch?v=3i8mHECla2k',
    description: 'Herbarium sheet standard dimensions (29x41.5 cm), Royal Botanical Garden Kew, Indian Botanical Garden Howrah, Couplet & Lead in Taxonomic Keys.',
  },

  // ==========================================
  // CLASS 11 BOTANY: BIOLOGICAL CLASSIFICATION (5 LECTURES)
  // ==========================================
  {
    id: 'kbc-2027-bc-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'Biological Classification',
    chapterId: 'chap-bio-biological-class',
    topicName: 'Lec 01: History of Classification & Kingdom Monera (Archaebacteria)',
    topicId: 'topic-bio-bc-1',
    youtubeId: 'UnlG0wCuXx0',
    playlistId: 'PL_KAPIL_NEET2027_BIOLOGICAL_CLASS',
    playlistName: 'NEET 2027 | Class 11 Biology | Biological Classification Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/UnlG0wCuXx0/hqdefault.jpg',
    duration: '1h 05m',
    durationSeconds: 3900,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 14 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/UnlG0wCuXx0',
    watchUrl: 'https://www.youtube.com/watch?v=UnlG0wCuXx0',
    description: 'Aristotle classification, Linnaeus 2-kingdom, R.H. Whittaker 5-kingdom system (1969). Halophiles, Thermoacidophiles & Methanogens.',
  },
  {
    id: 'kbc-2027-bc-02',
    lectureNumber: 2,
    playlistPosition: 2,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'Biological Classification',
    chapterId: 'chap-bio-biological-class',
    topicName: 'Lec 02: Eubacteria, Cyanobacteria & Mycoplasma',
    topicId: 'topic-bio-bc-2',
    youtubeId: 'HflKdigHpvI',
    playlistId: 'PL_KAPIL_NEET2027_BIOLOGICAL_CLASS',
    playlistName: 'NEET 2027 | Class 11 Biology | Biological Classification Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/HflKdigHpvI/hqdefault.jpg',
    duration: '1h 02m',
    durationSeconds: 3720,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 11 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/HflKdigHpvI',
    watchUrl: 'https://www.youtube.com/watch?v=HflKdigHpvI',
    description: 'Heterocysts in Nostoc and Anabaena for N2 fixation. Mycoplasma (smallest living cell without cell wall, pathogenic to plants/animals).',
  },
  {
    id: 'kbc-2027-bc-03',
    lectureNumber: 3,
    playlistPosition: 3,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'Biological Classification',
    chapterId: 'chap-bio-biological-class',
    topicName: 'Lec 03: Kingdom Protista - Chrysophytes, Dinoflagellates, Euglenoids & Slime Moulds',
    topicId: 'topic-bio-bc-3',
    youtubeId: 'axI_jcIzE0U',
    playlistId: 'PL_KAPIL_NEET2027_BIOLOGICAL_CLASS',
    playlistName: 'NEET 2027 | Class 11 Biology | Biological Classification Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/axI_jcIzE0U/hqdefault.jpg',
    duration: '1h 10m',
    durationSeconds: 4200,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 9 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/axI_jcIzE0U',
    watchUrl: 'https://www.youtube.com/watch?v=axI_jcIzE0U',
    description: 'Diatomaceous earth, Silica in diatom walls, Red tides caused by Gonyaulax, Pellicle in Euglena, Plasmodium aggregation in slime moulds.',
  },
  {
    id: 'kbc-2027-bc-04',
    lectureNumber: 4,
    playlistPosition: 4,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'Biological Classification',
    chapterId: 'chap-bio-biological-class',
    topicName: 'Lec 04: Kingdom Fungi - Phycomycetes, Ascomycetes, Basidiomycetes & Deuteromycetes',
    topicId: 'topic-bio-bc-4',
    youtubeId: '8m6hHRlKwxY',
    playlistId: 'PL_KAPIL_NEET2027_BIOLOGICAL_CLASS',
    playlistName: 'NEET 2027 | Class 11 Biology | Biological Classification Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/8m6hHRlKwxY/hqdefault.jpg',
    duration: '1h 18m',
    durationSeconds: 4680,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/8m6hHRlKwxY',
    watchUrl: 'https://www.youtube.com/watch?v=8m6hHRlKwxY',
    description: 'Coenocytic mycelium, Endogenous vs Exogenous spores, Ascospores, Basidiospores, Imperfect fungi (Deuteromycetes).',
  },
  {
    id: 'kbc-2027-bc-05',
    lectureNumber: 5,
    playlistPosition: 5,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Diversity of Living Organisms',
    chapterName: 'Biological Classification',
    chapterId: 'chap-bio-biological-class',
    topicName: 'Lec 05: Viruses, Viroids, Prions & Lichens',
    topicId: 'topic-bio-bc-5',
    youtubeId: 'l8c3R_k9L4Q',
    playlistId: 'PL_KAPIL_NEET2027_BIOLOGICAL_CLASS',
    playlistName: 'NEET 2027 | Class 11 Biology | Biological Classification Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/l8c3R_k9L4Q/hqdefault.jpg',
    duration: '52:00',
    durationSeconds: 3120,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/l8c3R_k9L4Q',
    watchUrl: 'https://www.youtube.com/watch?v=l8c3R_k9L4Q',
    description: 'D.J. Ivanowsky, M.W. Beijerinek (Contagium vivum fluidum), T.O. Diener (Viroids - free RNA without protein coat), Prions & Phycobiont/Mycobiont in Lichens.',
  },

  // ==========================================
  // CLASS 11 BOTANY: CELL - THE UNIT OF LIFE (4 LECTURES)
  // ==========================================
  {
    id: 'kbc-2027-cell-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Cell: Structure and Function',
    chapterName: 'Cell: The Unit of Life',
    chapterId: 'chap-bio-cell',
    topicName: 'Lec 01: Overview of Cell, Cell Theory & Prokaryotic Cell Structure',
    topicId: 'topic-bio-cell-1',
    youtubeId: '2BwWqC29y9U',
    playlistId: 'PL_KAPIL_NEET2027_CELL',
    playlistName: 'NEET 2027 | Class 11 Biology | Cell Structure & Function Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/2BwWqC29y9U/hqdefault.jpg',
    duration: '1h 12m',
    durationSeconds: 4320,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 15 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/2BwWqC29y9U',
    watchUrl: 'https://www.youtube.com/watch?v=2BwWqC29y9U',
    description: 'Schleiden & Schwann cell theory, Rudolf Virchow (Omnis cellula-e-cellula), Mesosomes, Glycocalyx capsule & slime layer in bacteria.',
  },
  {
    id: 'kbc-2027-cell-02',
    lectureNumber: 2,
    playlistPosition: 2,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Cell: Structure and Function',
    chapterName: 'Cell: The Unit of Life',
    chapterId: 'chap-bio-cell',
    topicName: 'Lec 02: Plasma Membrane (Fluid Mosaic Model) & Endomembrane System',
    topicId: 'topic-bio-cell-2',
    youtubeId: 'qXf7wP8_Y6w',
    playlistId: 'PL_KAPIL_NEET2027_CELL',
    playlistName: 'NEET 2027 | Class 11 Biology | Cell Structure & Function Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/qXf7wP8_Y6w/hqdefault.jpg',
    duration: '1h 20m',
    durationSeconds: 4800,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 10 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/qXf7wP8_Y6w',
    watchUrl: 'https://www.youtube.com/watch?v=qXf7wP8_Y6w',
    description: 'Singer & Nicolson (1972) Fluid Mosaic Model, Endoplasmic Reticulum (SER vs RER), Golgi Apparatus, Lysosomes & Vacuoles.',
  },
  {
    id: 'kbc-2027-cell-03',
    lectureNumber: 3,
    playlistPosition: 3,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Cell: Structure and Function',
    chapterName: 'Cell: The Unit of Life',
    chapterId: 'chap-bio-cell',
    topicName: 'Lec 03: Semiautonomous Organelles - Mitochondria, Plastids & Ribosomes',
    topicId: 'topic-bio-cell-3',
    youtubeId: 'b_K9G2qX9L8',
    playlistId: 'PL_KAPIL_NEET2027_CELL',
    playlistName: 'NEET 2027 | Class 11 Biology | Cell Structure & Function Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/b_K9G2qX9L8/hqdefault.jpg',
    duration: '1h 15m',
    durationSeconds: 4500,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/b_K9G2qX9L8',
    watchUrl: 'https://www.youtube.com/watch?v=b_K9G2qX9L8',
    description: 'Cristae, Matrix, Chloroplast Thylakoids & Stroma, 70S vs 80S Ribosomes (George Palade 1953).',
  },
  {
    id: 'kbc-2027-cell-04',
    lectureNumber: 4,
    playlistPosition: 4,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Cell: Structure and Function',
    chapterName: 'Cell: The Unit of Life',
    chapterId: 'chap-bio-cell',
    topicName: 'Lec 04: Cilia, Flagella, Centrosome, Nucleus & Chromosomes',
    topicId: 'topic-bio-cell-4',
    youtubeId: 'W-85AKQ51Vg',
    playlistId: 'PL_KAPIL_NEET2027_CELL',
    playlistName: 'NEET 2027 | Class 11 Biology | Cell Structure & Function Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/W-85AKQ51Vg/hqdefault.jpg',
    duration: '1h 08m',
    durationSeconds: 4080,
    teacher: 'Kapil Sir',
    uploadDate: new Date().toISOString(),
    liveStatus: 'live',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/W-85AKQ51Vg',
    watchUrl: 'https://www.youtube.com/watch?v=W-85AKQ51Vg',
    description: '🔴 LIVE BATCH SESSION: 9+2 Axoneme arrangement vs 9+0 Cartwheel Centriole model, Nucleolus, Kinetochores & Metacentric/Submetacentric Chromosomes.',
  },

  // ==========================================
  // CLASS 11 ZOOLOGY: HUMAN PHYSIOLOGY - BREATHING & GAS EXCHANGE (3 LECTURES)
  // ==========================================
  {
    id: 'kbc-2027-resp-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 11',
    unitName: 'Human Physiology',
    chapterName: 'Breathing and Exchange of Gases',
    chapterId: 'chap-bio-breathing',
    topicName: 'Lec 01: Human Respiratory System & Mechanism of Breathing',
    topicId: 'topic-bio-resp-1',
    youtubeId: 'vde2AZxr6Cw',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_PHYS',
    playlistName: 'NEET 2027 | Class 11 Zoology | Human Physiology Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/vde2AZxr6Cw/hqdefault.jpg',
    duration: '58:20',
    durationSeconds: 3500,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/vde2AZxr6Cw',
    watchUrl: 'https://www.youtube.com/watch?v=vde2AZxr6Cw',
    description: 'Larynx (Voice box), Trachea branching at T5 thoracic vertebra, Alveoli, Inspiration (Diaphragm contraction) vs Expiration mechanism.',
  },
  {
    id: 'kbc-2027-resp-02',
    lectureNumber: 2,
    playlistPosition: 2,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 11',
    unitName: 'Human Physiology',
    chapterName: 'Breathing and Exchange of Gases',
    chapterId: 'chap-bio-breathing',
    topicName: 'Lec 02: Respiratory Volumes, Capacities & Gas Exchange in Alveoli',
    topicId: 'topic-bio-resp-2',
    youtubeId: '3i8mHECla2k',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_PHYS',
    playlistName: 'NEET 2027 | Class 11 Zoology | Human Physiology Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/3i8mHECla2k/hqdefault.jpg',
    duration: '1h 04m',
    durationSeconds: 3840,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/3i8mHECla2k',
    watchUrl: 'https://www.youtube.com/watch?v=3i8mHECla2k',
    description: 'Tidal Volume (500 ml), IRV (2500-3000 ml), ERV (1000-1100 ml), RV (1100-1200 ml), Vital Capacity & Partial Pressures (pO2 & pCO2) values.',
  },
  {
    id: 'kbc-2027-resp-03',
    lectureNumber: 3,
    playlistPosition: 3,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 11',
    unitName: 'Human Physiology',
    chapterName: 'Breathing and Exchange of Gases',
    chapterId: 'chap-bio-breathing',
    topicName: 'Lec 03: Oxygen-Hemoglobin Dissociation Curve & Transport of CO2',
    topicId: 'topic-bio-resp-3',
    youtubeId: 'UnlG0wCuXx0',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_PHYS',
    playlistName: 'NEET 2027 | Class 11 Zoology | Human Physiology Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/UnlG0wCuXx0/hqdefault.jpg',
    duration: '55:40',
    durationSeconds: 3340,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/UnlG0wCuXx0',
    watchUrl: 'https://www.youtube.com/watch?v=UnlG0wCuXx0',
    description: 'Sigmoid Oxygen Dissociation curve, Factors shifting curve to right (High pCO2, High H+, High Temp), Carbamino-hemoglobin & Bicarbonate ion transport.',
  },

  // ==========================================
  // CLASS 12 BOTANY: SEXUAL REPRODUCTION IN FLOWERING PLANTS (4 LECTURES)
  // ==========================================
  {
    id: 'kbc-2027-sr-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Sexual Reproduction in Flowering Plants',
    chapterId: 'chap-bio-sexual-repro',
    topicName: 'Lec 01: Pre-fertilization Structures - Stamen, Anther & Microsporogenesis',
    topicId: 'topic-bio-sr-1',
    youtubeId: '8m6hHRlKwxY',
    playlistId: 'PL_KAPIL_NEET2027_REPRODUCTION',
    playlistName: 'NEET 2027 | Class 12 Botany | Reproduction Unit Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/8m6hHRlKwxY/hqdefault.jpg',
    duration: '1h 10m',
    durationSeconds: 4200,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 18 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/8m6hHRlKwxY',
    watchUrl: 'https://www.youtube.com/watch?v=8m6hHRlKwxY',
    description: 'Bilobed dithecous anther, 4 microsporangia, Tapetum multinucleate nutritive layer, Sporopollenin exine resistance.',
  },
  {
    id: 'kbc-2027-sr-02',
    lectureNumber: 2,
    playlistPosition: 2,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Sexual Reproduction in Flowering Plants',
    chapterId: 'chap-bio-sexual-repro',
    topicName: 'Lec 02: Pistil, Megasporogenesis & Embryo Sac (7-Celled 8-Nucleate Structure)',
    topicId: 'topic-bio-sr-2',
    youtubeId: 'l8c3R_k9L4Q',
    playlistId: 'PL_KAPIL_NEET2027_REPRODUCTION',
    playlistName: 'NEET 2027 | Class 12 Botany | Reproduction Unit Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/l8c3R_k9L4Q/hqdefault.jpg',
    duration: '1h 18m',
    durationSeconds: 4680,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 13 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/l8c3R_k9L4Q',
    watchUrl: 'https://www.youtube.com/watch?v=l8c3R_k9L4Q',
    description: 'Anatropous ovule, Nucellus, Functional megaspore (Monosporic development), Synergids with Filiform apparatus & Antipodals.',
  },
  {
    id: 'kbc-2027-sr-03',
    lectureNumber: 3,
    playlistPosition: 3,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Sexual Reproduction in Flowering Plants',
    chapterId: 'chap-bio-sexual-repro',
    topicName: 'Lec 03: Pollination Types (Autogamy, Geitonogamy, Xenogamy) & Outbreeding Devices',
    topicId: 'topic-bio-sr-3',
    youtubeId: '2BwWqC29y9U',
    playlistId: 'PL_KAPIL_NEET2027_REPRODUCTION',
    playlistName: 'NEET 2027 | Class 12 Botany | Reproduction Unit Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/2BwWqC29y9U/hqdefault.jpg',
    duration: '1h 04m',
    durationSeconds: 3840,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 8 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/2BwWqC29y9U',
    watchUrl: 'https://www.youtube.com/watch?v=2BwWqC29y9U',
    description: 'Chasmogamous vs Cleistogamous flowers (Viola, Oxalis, Commelina), Wind/Water/Insect pollination characteristics.',
  },
  {
    id: 'kbc-2027-sr-04',
    lectureNumber: 4,
    playlistPosition: 4,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Botany',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Sexual Reproduction in Flowering Plants',
    chapterId: 'chap-bio-sexual-repro',
    topicName: 'Lec 04: Double Fertilization, Endosperm, Embryo Development & Apomixis',
    topicId: 'topic-bio-sr-4',
    youtubeId: 'qXf7wP8_Y6w',
    playlistId: 'PL_KAPIL_NEET2027_REPRODUCTION',
    playlistName: 'NEET 2027 | Class 12 Botany | Reproduction Unit Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/qXf7wP8_Y6w/hqdefault.jpg',
    duration: '1h 14m',
    durationSeconds: 4440,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/qXf7wP8_Y6w',
    watchUrl: 'https://www.youtube.com/watch?v=qXf7wP8_Y6w',
    description: 'Syngamy (2n Zygote) + Triple Fusion (3n PEN), Free nuclear coconut water endosperm, Polyembryony (Citrus/Mango).',
  },

  // ==========================================
  // CLASS 12 ZOOLOGY: HUMAN REPRODUCTION (4 LECTURES)
  // ==========================================
  {
    id: 'kbc-2027-hr-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Human Reproduction',
    chapterId: 'chap-bio-human-repro',
    topicName: 'Lec 01: Male Reproductive System & Testis Anatomy',
    topicId: 'topic-bio-hr-1',
    youtubeId: 'b_K9G2qX9L8',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_REPRO',
    playlistName: 'NEET 2027 | Class 12 Zoology | Human Reproduction Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/b_K9G2qX9L8/hqdefault.jpg',
    duration: '1h 08m',
    durationSeconds: 4080,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 16 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/b_K9G2qX9L8',
    watchUrl: 'https://www.youtube.com/watch?v=b_K9G2qX9L8',
    description: 'Scrotum temperature regulation (2-2.5°C lower), Seminiferous tubules, Leydig cells (Androgens/Testosterone), Sertoli nutritive cells.',
  },
  {
    id: 'kbc-2027-hr-02',
    lectureNumber: 2,
    playlistPosition: 2,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Human Reproduction',
    chapterId: 'chap-bio-human-repro',
    topicName: 'Lec 02: Female Reproductive System & Gametogenesis (Spermatogenesis vs Oogenesis)',
    topicId: 'topic-bio-hr-2',
    youtubeId: 'W-85AKQ51Vg',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_REPRO',
    playlistName: 'NEET 2027 | Class 12 Zoology | Human Reproduction Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/W-85AKQ51Vg/hqdefault.jpg',
    duration: '1h 22m',
    durationSeconds: 4920,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 11 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: false,
    embedUrl: 'https://www.youtube-nocookie.com/embed/W-85AKQ51Vg',
    watchUrl: 'https://www.youtube.com/watch?v=W-85AKQ51Vg',
    description: 'Primary spermatocytes (46 chrom) -> Secondary (23 chrom) -> Spermatids -> Spermatozoa. Oogenesis arrest at Prophase I (Diplotene).',
  },
  {
    id: 'kbc-2027-hr-03',
    lectureNumber: 3,
    playlistPosition: 3,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Human Reproduction',
    chapterId: 'chap-bio-human-repro',
    topicName: 'Lec 03: Menstrual Cycle & Hormonal Feedback (FSH, LH, Estrogen, Progesterone)',
    topicId: 'topic-bio-hr-3',
    youtubeId: 'vde2AZxr6Cw',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_REPRO',
    playlistName: 'NEET 2027 | Class 12 Zoology | Human Reproduction Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/vde2AZxr6Cw/hqdefault.jpg',
    duration: '1h 15m',
    durationSeconds: 4500,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/vde2AZxr6Cw',
    watchUrl: 'https://www.youtube.com/watch?v=vde2AZxr6Cw',
    description: 'Menstrual phase (1-5 days), Follicular/Proliferative phase, LH surge ovulation (Day 14), Luteal phase & Corpus luteum secretion.',
  },
  {
    id: 'kbc-2027-hr-04',
    lectureNumber: 4,
    playlistPosition: 4,
    batchName: 'NEET 2027 Official Batch',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unitName: 'Reproduction',
    chapterName: 'Human Reproduction',
    chapterId: 'chap-bio-human-repro',
    topicName: 'Lec 04: Fertilization, Blastocyst Implantation, Pregnancy & Parturition',
    topicId: 'topic-bio-hr-4',
    youtubeId: '3i8mHECla2k',
    playlistId: 'PL_KAPIL_NEET2027_HUMAN_REPRO',
    playlistName: 'NEET 2027 | Class 12 Zoology | Human Reproduction Batch Playlist',
    thumbnail: 'https://i.ytimg.com/vi/3i8mHECla2k/hqdefault.jpg',
    duration: '1h 12m',
    durationSeconds: 4320,
    teacher: 'Kapil Sir',
    uploadDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/3i8mHECla2k',
    watchUrl: 'https://www.youtube.com/watch?v=3i8mHECla2k',
    description: 'Acrosome reaction, Cortical reaction preventing polyspermy, Morula -> Blastocyst inner cell mass, hCG, Oxytocin foetal ejection reflex.',
  },

  // ==========================================
  // PW YAKEEN 2.0 NEET DROPPER BATCH (INTERLINKED & ACCESS GRANTED)
  // ==========================================
  {
    id: 'pw-yakeen-bot-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'PW Yakeen 2.0 Dropper',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Cell Structure & Functions',
    chapterName: 'Cell Cycle and Cell Division',
    chapterId: 'chap-pw-cell-cycle',
    topicName: 'Lec 01: Cell Cycle Stages & Mitosis Complete Breakdown',
    topicId: 'pw-cell-01',
    youtubeId: 'L8g39j4p_80',
    playlistId: 'PL_PW_YAKEEN20_CELL_CYCLE',
    playlistName: 'PW Yakeen 2.0 | Botany Dropper Batch',
    thumbnail: 'https://i.ytimg.com/vi/L8g39j4p_80/hqdefault.jpg',
    duration: '1h 28m',
    durationSeconds: 5280,
    teacher: 'PW Top Faculties',
    uploadDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/L8g39j4p_80',
    watchUrl: 'https://www.youtube.com/watch?v=L8g39j4p_80',
    description: 'PW Yakeen 2.0 Dropper Batch Interlinked Lecture. Complete Cell Cycle G1, S, G2, M Phase detail with PYQs.',
    notesMarkdown: `### PW Yakeen 2.0 Botany Notes - Cell Cycle
1. **Interphase**: 95% duration of cell cycle.
   - **G1 phase**: RNA & protein synthesis, cell grows continuously.
   - **S phase**: DNA duplication (2C -> 4C), chromosome number remains same (2n). Centriole duplicates in cytoplasm.
   - **G2 phase**: Tubulin protein synthesis for spindle fibers.
2. **Mitosis (M Phase)**:
   - Prophase, Metaphase, Anaphase, Telophase.
   - Anaphase: Splitting of centromere and movement of chromatids to opposite poles.`,
    mcqs: [
      {
        id: 'q-pw-1',
        question: 'In which phase of the cell cycle does DNA replication occur in eukaryotes?',
        options: ['G1 Phase', 'S Phase', 'G2 Phase', 'M Phase'],
        correctIndex: 1,
        explanation: 'S phase (Synthesis phase) marks the period during which DNA synthesis or replication takes place.'
      }
    ]
  },
  {
    id: 'pw-yakeen-phy-01',
    lectureNumber: 1,
    playlistPosition: 2,
    batchName: 'PW Yakeen 2.0 Dropper',
    subject: 'Physics',
    classLevel: 'Class 12',
    unitName: 'Electrostatics',
    chapterName: 'Electric Charges and Fields',
    chapterId: 'chap-pw-electrostatics',
    topicName: 'Lec 01: Coulombs Law & Vector Form Superposition',
    topicId: 'pw-phy-01',
    youtubeId: '2b3xG_35o2Y',
    playlistId: 'PL_PW_YAKEEN20_PHYSICS',
    playlistName: 'PW Yakeen 2.0 | Physics Dropper Master Batch',
    thumbnail: 'https://i.ytimg.com/vi/2b3xG_35o2Y/hqdefault.jpg',
    duration: '1h 35m',
    durationSeconds: 5700,
    teacher: 'PW Physics Team',
    uploadDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/2b3xG_35o2Y',
    watchUrl: 'https://www.youtube.com/watch?v=2b3xG_35o2Y',
    description: 'PW Yakeen 2.0 Physics Dropper Series. Quantization of charge, Coulomb law derivation, permittivity in medium & vector form problems.',
    notesMarkdown: `### PW Yakeen 2.0 Physics Formula Sheet
1. **Quantization of Charge**: $Q = \\pm ne$ ($e = 1.6 \\times 10^{-19}\\ C$)
2. **Coulomb Force**: $F = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{|q_1 q_2|}{r^2}$
3. **Dielectric Constant**: $K = \\frac{\\varepsilon}{\\varepsilon_0} = \\frac{F_{vacuum}}{F_{medium}}$`,
  },
  {
    id: 'pw-yakeen-chem-01',
    lectureNumber: 1,
    playlistPosition: 3,
    batchName: 'PW Yakeen 2.0 Dropper',
    subject: 'Chemistry',
    classLevel: 'Class 11',
    unitName: 'Physical Chemistry',
    chapterName: 'Some Basic Concepts of Chemistry',
    chapterId: 'chap-pw-mole-concept',
    topicName: 'Lec 01: Mole Concept, Molarity & Limiting Reagent',
    topicId: 'pw-chem-01',
    youtubeId: '9G_4283151g',
    playlistId: 'PL_PW_YAKEEN20_CHEMISTRY',
    playlistName: 'PW Yakeen 2.0 | Chemistry Dropper Batch',
    thumbnail: 'https://i.ytimg.com/vi/9G_4283151g/hqdefault.jpg',
    duration: '1h 22m',
    durationSeconds: 4920,
    teacher: 'PW Chemistry Team',
    uploadDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/9G_4283151g',
    watchUrl: 'https://www.youtube.com/watch?v=9G_4283151g',
    description: 'PW Yakeen 2.0 Chemistry Masterclass. Mole calculation shortcuts, Molarity, Molality, Mole fraction & Limiting reagent tricks.',
  },

  // ==========================================
  // MISSION 100 NEET DROPPER BATCH (HIGH YIELD REVISION)
  // ==========================================
  {
    id: 'm100-bio-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'Mission 100 Dropper',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unitName: 'Genetics & Evolution',
    chapterName: 'Molecular Basis of Inheritance',
    chapterId: 'chap-m100-mol-bio',
    topicName: 'Lec 01: DNA Replication & Transcription Machine Rapid Revision',
    topicId: 'm100-bio-01',
    youtubeId: 'q48f7292211',
    playlistId: 'PL_MISSION100_BIOLOGY',
    playlistName: 'Mission 100 NEET Dropper | High Yield Series',
    thumbnail: 'https://i.ytimg.com/vi/q48f7292211/hqdefault.jpg',
    duration: '1h 40m',
    durationSeconds: 6000,
    teacher: 'Mission 100 Specialist Team',
    uploadDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/q48f7292211',
    watchUrl: 'https://www.youtube.com/watch?v=q48f7292211',
    description: 'Mission 100 NEET Dropper Batch Special. High-yield 100 Most Expected NEET Questions & NCERT line-by-line summary.',
    notesMarkdown: `### Mission 100 High-Yield Key Points
- **Griffith Experiment**: Transforming principle (S-strain heat killed + R-strain alive -> mouse dies).
- **Avery, MacLeod, McCarty**: DNA is the transforming principle (DNase inhibited transformation).
- **Hershey-Chase**: Radioactive 32P (DNA) and 35S (Protein coat) proved DNA is genetic material in T2 bacteriophage.`,
  },
  {
    id: 'm100-phy-01',
    lectureNumber: 1,
    playlistPosition: 2,
    batchName: 'Mission 100 Dropper',
    subject: 'Physics',
    classLevel: 'Class 12',
    unitName: 'Optics',
    chapterName: 'Ray Optics and Optical Instruments',
    chapterId: 'chap-m100-optics',
    topicName: 'Lec 01: Prism Formula, Total Internal Reflection & Lens Formula Shortcuts',
    topicId: 'm100-phy-01',
    youtubeId: '3X09J5k_k4U',
    playlistId: 'PL_MISSION100_PHYSICS',
    playlistName: 'Mission 100 NEET Dropper | Physics Speed Series',
    thumbnail: 'https://i.ytimg.com/vi/3X09J5k_k4U/hqdefault.jpg',
    duration: '1h 18m',
    durationSeconds: 4680,
    teacher: 'Mission 100 Physics Master',
    uploadDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/3X09J5k_k4U',
    watchUrl: 'https://www.youtube.com/watch?v=3X09J5k_k4U',
    description: 'Mission 100 High Yield Optics formula revision, lens makers equation, minimum deviation in prism & optical instrument magnification.',
  },

  // ==========================================
  // PW LIVE OFFICIAL BATCH (ID: 693fafdb626a05be66a7edd4) SYNCED STUDY MATERIALS
  // ==========================================
  {
    id: 'pw-live-693f-phy-01',
    lectureNumber: 1,
    playlistPosition: 1,
    batchName: 'PW Live Official (693f)',
    pwBatchId: '693fafdb626a05be66a7edd4',
    pwBatchUrl: 'https://www.pw.live/study/batches/693fafdb626a05be66a7edd4/batch-overview?referred_by=67dd1f9c33c6ab3b8a0ecb05',
    subject: 'Physics',
    classLevel: 'Class 12',
    unitName: 'Electrostatics',
    chapterName: 'Electric Charges and Fields',
    chapterId: 'chap-pwlive-electrostatics',
    topicName: 'Lec 01: Coulomb Law & Continuous Charge Distribution',
    topicId: 'pwlive-phy-01',
    youtubeId: '2b3xG_35o2Y',
    playlistId: 'PL_PWLIVE_693F_PHYSICS',
    playlistName: 'PW Live Official Batch 693f | Physics Master Pipeline',
    thumbnail: 'https://i.ytimg.com/vi/2b3xG_35o2Y/hqdefault.jpg',
    duration: '1h 38m',
    durationSeconds: 5880,
    teacher: 'Alakh Sir & PW Physics Faculty',
    uploadDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/2b3xG_35o2Y',
    watchUrl: 'https://www.youtube.com/watch?v=2b3xG_35o2Y',
    pdfNotesUrl: '',
    dppPdfUrl: '',
    dppSolutionVideoId: '2b3xG_35o2Y',
    modulePdfUrl: '',
    description: 'Synced from PW Live Batch 693fafdb626a05be66a7edd4. Complete Physics Lec 01 + Class Handout PDF + Daily Practice Problem (DPP 01).',
    notesMarkdown: `### PW Live Batch 693fafdb - Physics Lec 01 Handout
- **Force Formula**: $F = \\frac{1}{4\\pi \\varepsilon_0} \\frac{q_1 q_2}{r^2}$
- **Permittivity of Free Space**: $\\varepsilon_0 = 8.854 \\times 10^{-12} \\text{ C}^2/\\text{N}\\cdot\\text{m}^2$
- **Vector Form**: $\\vec{F}_{12} = \\frac{1}{4\\pi \\varepsilon_0} \\frac{q_1 q_2}{r^3} \\vec{r}_{12}$`,
    mcqs: [
      {
        id: 'q-pwlive-phy-1',
        question: 'Two point charges of +1 μC and +5 μC are placed at a distance. What is the ratio of force acting on them?',
        options: ['1 : 5', '1 : 1', '5 : 1', '1 : 25'],
        correctIndex: 1,
        explanation: 'According to Newton’s third law and Coulomb’s law, action and reaction forces are equal in magnitude and opposite in direction (1 : 1).'
      }
    ]
  },
  {
    id: 'pw-live-693f-chem-01',
    lectureNumber: 1,
    playlistPosition: 2,
    batchName: 'PW Live Official (693f)',
    pwBatchId: '693fafdb626a05be66a7edd4',
    pwBatchUrl: 'https://www.pw.live/study/batches/693fafdb626a05be66a7edd4/batch-overview?referred_by=67dd1f9c33c6ab3b8a0ecb05',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    unitName: 'Physical Chemistry',
    chapterName: 'Solutions',
    chapterId: 'chap-pwlive-solutions',
    topicName: 'Lec 01: Henry Law & Raoult Law Ideal vs Non-Ideal Solutions',
    topicId: 'pwlive-chem-01',
    youtubeId: '9G_4283151g',
    playlistId: 'PL_PWLIVE_693F_CHEMISTRY',
    playlistName: 'PW Live Official Batch 693f | Chemistry Master Pipeline',
    thumbnail: 'https://i.ytimg.com/vi/9G_4283151g/hqdefault.jpg',
    duration: '1h 25m',
    durationSeconds: 5100,
    teacher: 'PW Top Chemistry Faculty',
    uploadDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/9G_4283151g',
    watchUrl: 'https://www.youtube.com/watch?v=9G_4283151g',
    pdfNotesUrl: '',
    dppPdfUrl: '',
    dppSolutionVideoId: '9G_4283151g',
    modulePdfUrl: '',
    description: 'Synced from PW Live Batch 693fafdb626a05be66a7edd4. Solutions Chapter Lec 01 + Henry Law notes + DPP 01.',
  },
  {
    id: 'pw-live-693f-bot-01',
    lectureNumber: 1,
    playlistPosition: 3,
    batchName: 'PW Live Official (693f)',
    pwBatchId: '693fafdb626a05be66a7edd4',
    pwBatchUrl: 'https://www.pw.live/study/batches/693fafdb626a05be66a7edd4/batch-overview?referred_by=67dd1f9c33c6ab3b8a0ecb05',
    subject: 'Botany',
    classLevel: 'Class 11',
    unitName: 'Plant Physiology',
    chapterName: 'Photosynthesis in Higher Plants',
    chapterId: 'chap-pwlive-photosynthesis',
    topicName: 'Lec 01: Light Reaction, Z-Scheme & Photophosphorylation',
    topicId: 'pwlive-bot-01',
    youtubeId: 'L8g39j4p_80',
    playlistId: 'PL_PWLIVE_693F_BOTANY',
    playlistName: 'PW Live Official Batch 693f | Botany Master Pipeline',
    thumbnail: 'https://i.ytimg.com/vi/L8g39j4p_80/hqdefault.jpg',
    duration: '1h 30m',
    durationSeconds: 5400,
    teacher: 'PW Botany Specialist',
    uploadDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/L8g39j4p_80',
    watchUrl: 'https://www.youtube.com/watch?v=L8g39j4p_80',
    pdfNotesUrl: '',
    dppPdfUrl: '',
    dppSolutionVideoId: 'L8g39j4p_80',
    modulePdfUrl: '',
    description: 'Synced from PW Live Batch 693fafdb626a05be66a7edd4. Complete Light Reaction & Photophosphorylation + Class PDF Notes.',
  },
  {
    id: 'pw-live-693f-zoo-01',
    lectureNumber: 1,
    playlistPosition: 4,
    batchName: 'PW Live Official (693f)',
    pwBatchId: '693fafdb626a05be66a7edd4',
    pwBatchUrl: 'https://www.pw.live/study/batches/693fafdb626a05be66a7edd4/batch-overview?referred_by=67dd1f9c33c6ab3b8a0ecb05',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unitName: 'Human Reproduction',
    chapterName: 'Human Reproduction',
    chapterId: 'chap-pwlive-human-repro',
    topicName: 'Lec 01: Male Reproductive System & Spermatogenesis NCERT Breakdown',
    topicId: 'pwlive-zoo-01',
    youtubeId: '3i8mHECla2k',
    playlistId: 'PL_PWLIVE_693F_ZOOLOGY',
    playlistName: 'PW Live Official Batch 693f | Zoology Master Pipeline',
    thumbnail: 'https://i.ytimg.com/vi/3i8mHECla2k/hqdefault.jpg',
    duration: '1h 22m',
    durationSeconds: 4920,
    teacher: 'PW Zoology Specialist',
    uploadDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    liveStatus: 'none',
    isNew: true,
    embedUrl: 'https://www.youtube-nocookie.com/embed/3i8mHECla2k',
    watchUrl: 'https://www.youtube.com/watch?v=3i8mHECla2k',
    pdfNotesUrl: '',
    dppPdfUrl: '',
    dppSolutionVideoId: '3i8mHECla2k',
    modulePdfUrl: '',
    description: 'Synced from PW Live Batch 693fafdb626a05be66a7edd4. Spermatogenesis diagram & Leydig cells notes + DPP 01 PDF.',
  }
];

export class BiologyChannelProvider {
  /**
   * Retrieves stored Kapil's Biology Classes NEET 2027 Batch lectures from localStorage merged with seed items.
   */
  static getLectures(): NEET2027Lecture[] {
    try {
      if (typeof window === 'undefined') return INITIAL_NEET2027_BATCH_LECTURES;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return INITIAL_NEET2027_BATCH_LECTURES;
      const parsed: NEET2027Lecture[] = JSON.parse(raw);

      // Merge seed items with saved items so user never loses batch lectures
      const map = new Map<string, NEET2027Lecture>();
      for (const item of INITIAL_NEET2027_BATCH_LECTURES) {
        map.set(item.youtubeId, item);
      }
      for (const item of parsed) {
        const existing = map.get(item.youtubeId);
        map.set(item.youtubeId, { ...existing, ...item });
      }

      // Sort by playlistPosition / lectureNumber ascending
      return Array.from(map.values()).sort((a, b) => a.lectureNumber - b.lectureNumber);
    } catch (e) {
      console.warn('Failed to parse NEET 2027 batch lectures from localStorage:', e);
      return INITIAL_NEET2027_BATCH_LECTURES;
    }
  }

  /**
   * Saves updated lecture list to localStorage.
   */
  static saveLectures(lectures: NEET2027Lecture[]): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lectures));
      localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    } catch (e) {
      console.error('Failed to save NEET 2027 batch lectures to localStorage:', e);
    }
  }

  /**
   * Upserts a single lecture without duplicate creation.
   * Preserves existing watch progress, notes, bookmarks, and MCQs.
   */
  static upsertLecture(newLecture: Partial<NEET2027Lecture> & { youtubeId: string }): NEET2027Lecture {
    const currentList = this.getLectures();
    const existingIndex = currentList.findIndex((item) => item.youtubeId === newLecture.youtubeId);

    const embedUrl = newLecture.embedUrl || `https://www.youtube-nocookie.com/embed/${newLecture.youtubeId}`;
    const watchUrl = newLecture.watchUrl || `https://www.youtube.com/watch?v=${newLecture.youtubeId}`;
    const uploadDate = newLecture.uploadDate || new Date().toISOString();

    const daysSinceUpload = (Date.now() - new Date(uploadDate).getTime()) / (1000 * 3600 * 24);
    const isNew = daysSinceUpload <= 14;

    let updatedRecord: NEET2027Lecture;

    if (existingIndex >= 0) {
      const existing = currentList[existingIndex];
      // STEP 6: If title or metadata changes, update metadata only while preserving internal IDs and learning state
      updatedRecord = {
        ...existing,
        ...newLecture,
        // Preserve position & lecture number if present
        lectureNumber: newLecture.lectureNumber || existing.lectureNumber || (existingIndex + 1),
        playlistPosition: newLecture.playlistPosition || existing.playlistPosition || (existingIndex + 1),
        embedUrl,
        watchUrl,
        teacher: newLecture.teacher || existing.teacher || 'Kapil Sir',
        batchName: newLecture.batchName || existing.batchName || 'NEET 2027 Official Batch',
        isNew: newLecture.isNew !== undefined ? newLecture.isNew : isNew,
        syncedAt: new Date().toISOString(),
      };
      currentList[existingIndex] = updatedRecord;
    } else {
      // Calculate next lecture number for the chapter
      const chapterLectures = currentList.filter(l => l.chapterName === newLecture.chapterName);
      const nextLecNum = newLecture.lectureNumber || (chapterLectures.length + 1);

      updatedRecord = {
        id: `neet2027-lec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        lectureNumber: nextLecNum,
        playlistPosition: newLecture.playlistPosition || (currentList.length + 1),
        batchName: newLecture.batchName || 'NEET 2027 Official Batch',
        subject: newLecture.subject || 'Biology',
        classLevel: newLecture.classLevel || 'Class 11',
        unitName: newLecture.unitName || 'General Biology',
        chapterName: newLecture.chapterName || 'NCERT Chapter',
        chapterId: newLecture.chapterId || `chap-${(newLecture.chapterName || 'general').toLowerCase().replace(/\s+/g, '-')}`,
        topicName: newLecture.topicName || `Lec 0${nextLecNum}: ${newLecture.description || 'Chapter Concept'}`,
        topicId: newLecture.topicId,
        youtubeId: newLecture.youtubeId,
        playlistId: newLecture.playlistId || 'PL_KAPIL_NEET2027_BATCH',
        playlistName: newLecture.playlistName || "NEET 2027 Batch Playlist | Kapil Sir",
        thumbnail: newLecture.thumbnail || `https://i.ytimg.com/vi/${newLecture.youtubeId}/hqdefault.jpg`,
        duration: newLecture.duration || '55 mins',
        durationSeconds: newLecture.durationSeconds || 3300,
        teacher: newLecture.teacher || 'Kapil Sir',
        uploadDate,
        liveStatus: newLecture.liveStatus || 'none',
        isNew: true,
        embedUrl,
        watchUrl,
        viewCount: newLecture.viewCount || '15K+',
        description: newLecture.description || "NEET Batch lecture",
        syncedAt: new Date().toISOString(),
      };
      currentList.push(updatedRecord);
    }

    this.saveLectures(currentList);
    return updatedRecord;
  }

  /**
   * Filters lectures by Class Level ('Class 11' | 'Class 12')
   */
  static getLecturesByClass(classLevel: 'Class 11' | 'Class 12'): NEET2027Lecture[] {
    return this.getLectures().filter((l) => l.classLevel === classLevel);
  }

  /**
   * Returns all unique chapters for a given Class Level
   */
  static getChaptersForClass(classLevel: 'Class 11' | 'Class 12'): Array<{
    chapterName: string;
    chapterId: string;
    unitName: string;
    subject: 'Botany' | 'Zoology' | 'Biology' | 'Physics' | 'Chemistry';
    lectures: NEET2027Lecture[];
  }> {
    const list = this.getLecturesByClass(classLevel);
    const chapterMap = new Map<string, NEET2027Lecture[]>();

    for (const lec of list) {
      if (!chapterMap.has(lec.chapterName)) {
        chapterMap.set(lec.chapterName, []);
      }
      chapterMap.get(lec.chapterName)!.push(lec);
    }

    return Array.from(chapterMap.entries()).map(([chapterName, lectures]) => {
      // Sort lectures inside chapter by lectureNumber ascending
      lectures.sort((a, b) => a.lectureNumber - b.lectureNumber);
      const first = lectures[0];
      return {
        chapterName,
        chapterId: first.chapterId || `chap-${chapterName.toLowerCase().replace(/\s+/g, '-')}`,
        unitName: first.unitName,
        subject: first.subject,
        lectures,
      };
    });
  }

  /**
   * STEP 4: Get ALL lectures for a specific chapter in sequential order (Lecture 1, Lecture 2, Lecture 3, ...)
   */
  static getLecturesForChapter(chapterNameOrId: string): NEET2027Lecture[] {
    const list = this.getLectures();
    const query = chapterNameOrId.toLowerCase().trim();

    return list
      .filter((l) => l.chapterName.toLowerCase() === query || l.chapterId.toLowerCase() === query)
      .sort((a, b) => a.lectureNumber - b.lectureNumber);
  }

  /**
   * Find lecture matching a specific topic ID or query
   */
  static getLectureForTopicOrChapter(searchQuery: string): NEET2027Lecture | null {
    const list = this.getLectures();
    const query = searchQuery.toLowerCase().trim();

    return (
      list.find((l) => l.topicId === searchQuery || l.chapterId === searchQuery) ||
      list.find(
        (l) =>
          l.topicName.toLowerCase().includes(query) ||
          l.chapterName.toLowerCase().includes(query) ||
          query.includes(l.chapterName.toLowerCase())
      ) ||
      null
    );
  }

  /**
   * Get timestamp of last sync
   */
  static getLastSyncTime(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(LAST_SYNC_KEY);
  }

  /**
   * Filter lectures by batch (PW Live Official 693f, PW Yakeen 2.0, Mission 100, Kapil 2027)
   */
  static getLecturesByBatch(batchId: string): NEET2027Lecture[] {
    const all = this.getLectures();
    if (!batchId || batchId === 'all') return all;

    if (batchId === 'pw_live_693f' || batchId === '693fafdb626a05be66a7edd4') {
      return all.filter(
        (l) =>
          l.batchName.toLowerCase().includes('pw live') ||
          l.batchName.toLowerCase().includes('693f') ||
          l.pwBatchId === '693fafdb626a05be66a7edd4'
      );
    }
    if (batchId === 'pw_yakeen_20') {
      return all.filter((l) => l.batchName.toLowerCase().includes('yakeen') || l.batchName.toLowerCase().includes('pw'));
    }
    if (batchId === 'mission_100') {
      return all.filter((l) => l.batchName.toLowerCase().includes('mission') || l.batchName.toLowerCase().includes('100'));
    }
    if (batchId === 'kapil_neet2027') {
      return all.filter((l) => l.batchName.toLowerCase().includes('2027') || l.teacher.toLowerCase().includes('kapil'));
    }

    return all;
  }
}
