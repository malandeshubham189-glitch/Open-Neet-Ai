export interface PWFreeLectureRecord {
  topicId: string;
  chapterId: string;
  subject: string;
  chapterName: string;
  topicTitle: string;
  teacher: string;
  batch: string;
  officialUrl: string;
}

export const PW_FREE_BATCH_DATABASE: PWFreeLectureRecord[] = [
  {
    topicId: 'topic-phy-moi',
    chapterId: 'chap-phy-rotational',
    subject: 'Physics',
    chapterName: 'Rotational Motion',
    topicTitle: 'Moment of Inertia',
    teacher: 'MR Sir',
    batch: 'Yakeen NEET 2025 Free Batch',
    officialUrl: 'https://www.pw.live/study/batches/yakeen-neet-2025/batch-overview'
  },
  {
    topicId: 'topic-chem-goc',
    chapterId: 'chap-chem-goc',
    subject: 'Chemistry',
    chapterName: 'General Organic Chemistry',
    topicTitle: 'IUPAC & Resonance',
    teacher: 'Pankaj Sir',
    batch: 'Yakeen NEET 2025 Free Batch',
    officialUrl: 'https://www.pw.live/study/batches/yakeen-neet-2025/batch-overview'
  },
  {
    topicId: 'topic-bio-human-repro',
    chapterId: 'chap-bio-reproduction',
    subject: 'Biology',
    chapterName: 'Human Reproduction',
    topicTitle: 'Male & Female Reproductive System',
    teacher: 'Akanksha Ma\'am',
    batch: 'Yakeen NEET 2025 Free Batch',
    officialUrl: 'https://www.pw.live/study/batches/yakeen-neet-2025/batch-overview'
  }
];

export class PWFreeBatchService {
  static getPWFreeLecture(topicId: string): PWFreeLectureRecord | undefined {
    if (!topicId) return undefined;
    return PW_FREE_BATCH_DATABASE.find(
      (p) => p.topicId.toLowerCase() === topicId.toLowerCase()
    );
  }

  static getAllPWFreeLectures(): PWFreeLectureRecord[] {
    return PW_FREE_BATCH_DATABASE;
  }
}
