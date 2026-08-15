import { NursingTopic, NursingYear, NursingSubjectId } from '../../types/nursing';

export interface GeneratedSearchQueries {
  exactTopic: string;
  topicWithDegree: string;
  topicWithSubject: string;
  topicWithClinicalManagement: string;
  topicWithPlaylist: string;
  allQueries: string[];
  sanitizedKeywords: string[];
  youtubeSearchUrl: string;
}

export class NursingSearchQueryService {
  /**
   * Automatically generates 5 hierarchical, high-yield search queries tailored specifically
   * for Indian B.Sc Nursing university curriculum (MUHS / INC), preventing generic MBBS/NEET content.
   */
  public static generateQueries(topic: NursingTopic): GeneratedSearchQueries {
    const rawTitle = topic.title || '';
    
    // Clean topic title by removing secondary notes or parens for clean search queries
    const primaryTitle = rawTitle.replace(/\(.*?\)/g, '').replace(/[:/-]+/g, ' ').replace(/\s+/g, ' ').trim();
    
    const yearLabel = this.getYearSearchLabel(topic.year);
    const subjectLabel = this.getSubjectSearchLabel(topic.subjectId, topic.subjectName);

    // Query 1: Exact Clean Topic
    const exactTopic = primaryTitle;

    // Query 2: Exact Topic + B.Sc Nursing
    const topicWithDegree = `BSc Nursing ${primaryTitle}`;

    // Query 3: Exact Topic + Subject + B.Sc Nursing
    const topicWithSubject = `BSc Nursing ${subjectLabel} ${primaryTitle}`;

    // Query 4: Topic + Nursing Management Complete Lecture
    const topicWithClinicalManagement = `BSc Nursing ${primaryTitle} nursing management complete lecture`;

    // Query 5: Year + Subject + B.Sc Nursing Playlist
    const topicWithPlaylist = `BSc Nursing ${yearLabel} ${subjectLabel} ${primaryTitle} playlist`;

    const allQueries = [
      exactTopic,
      topicWithDegree,
      topicWithSubject,
      topicWithClinicalManagement,
      topicWithPlaylist
    ];

    const sanitizedKeywords = this.extractKeywords(primaryTitle);
    const primaryQuery = encodeURIComponent(topicWithSubject);
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${primaryQuery}`;

    return {
      exactTopic,
      topicWithDegree,
      topicWithSubject,
      topicWithClinicalManagement,
      topicWithPlaylist,
      allQueries,
      sanitizedKeywords,
      youtubeSearchUrl
    };
  }

  /**
   * Filters out search results that are not relevant to B.Sc Nursing education
   * (e.g. UPSC, NEET-UG physics/chemistry, general gaming, or unrelated MBBS surgery).
   */
  public static isCandidateSuitableForNursing(title: string, channelName: string): boolean {
    const lowerTitle = title.toLowerCase();
    const lowerChannel = channelName.toLowerCase();

    // Positive indicators
    const nursingSignals = [
      'nursing',
      'bsc nursing',
      'gnm',
      'muhs',
      'inc syllabus',
      'norcet',
      'ncp',
      'nursing care plan',
      'pediatric nursing',
      'psychiatric nursing',
      'community health nursing',
      'midwifery',
      'obg nursing',
      'msn',
      'pharmacology for nurses'
    ];

    // Explicit negative exclusion signals
    const bannedSignals = [
      'neet ug physics',
      'neet ug chemistry',
      'upsc cse',
      'ssc cgl',
      'class 10',
      'class 12 board',
      'roblox',
      'minecraft',
      'reaction video',
      'vlog',
      'trailer'
    ];

    if (bannedSignals.some((b) => lowerTitle.includes(b) || lowerChannel.includes(b))) {
      return false;
    }

    const hasNursingInTitle = nursingSignals.some((s) => lowerTitle.includes(s));
    const hasNursingInChannel = nursingSignals.some((s) => lowerChannel.includes(s));

    return hasNursingInTitle || hasNursingInChannel;
  }

  private static getYearSearchLabel(year: NursingYear): string {
    switch (year) {
      case '2nd_year':
        return '2nd year';
      case '3rd_year':
        return '3rd year';
      case '4th_year':
        return '4th year final year';
      default:
        return 'BSc Nursing';
    }
  }

  private static getSubjectSearchLabel(subjectId: NursingSubjectId, defaultName: string): string {
    switch (subjectId) {
      case 'med_surg_1':
        return 'Medical Surgical Nursing 1';
      case 'pharmacology':
        return 'Pharmacology';
      case 'pathology_genetics':
        return 'Pathology Genetics';
      case 'community_health_1':
        return 'Community Health Nursing 1';
      case 'cet':
        return 'CET Communication Educational Technology';
      case 'sociology':
        return 'Sociology';
      case 'med_surg_2':
        return 'Medical Surgical Nursing 2';
      case 'child_health':
        return 'Child Health Nursing Pediatrics';
      case 'mental_health':
        return 'Mental Health Nursing Psychiatry';
      case 'midwifery_obg':
        return 'Midwifery and Obstetrical Nursing OBG';
      case 'community_health_2':
        return 'Community Health Nursing 2';
      case 'nursing_research':
        return 'Nursing Research and Statistics';
      case 'nursing_mgmt':
        return 'Management of Nursing Services';
      default:
        return defaultName || 'Nursing';
    }
  }

  private static extractKeywords(text: string): string[] {
    const stopWords = new Set([
      'and', 'or', 'the', 'in', 'of', 'for', 'with', 'to', 'from', 'by',
      'on', 'at', 'is', 'a', 'an', 'management', 'care', 'nursing'
    ]);

    return text
      .toLowerCase()
      .split(/[\s,:/&-]+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));
  }
}
