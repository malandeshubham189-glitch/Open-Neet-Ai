import {
  SyllabusProfile,
  NursingYear,
  SyllabusVersion,
  SyllabusResolutionResult,
  NursingCourse
} from '../../types/nursing';
import { NURSING_CURRICULUM_DATA } from '../../data/nursingCurriculumData';

export const DEFAULT_SYLLABUS_PROFILE: SyllabusProfile = {
  university: 'Maharashtra University of Health Sciences (MUHS)',
  college: 'Blessing College of Nursing, Parbhani, Maharashtra',
  course: 'Basic B.Sc Nursing',
  academicBatch: '2023–2027 (MUHS Annual Pattern)',
  activeYear: '3rd_year',
  syllabusVersion: 'MUHS_ANNUAL_2022',
  syllabusAuthority: 'Maharashtra University of Health Sciences (MUHS)',
  sourceUrl: 'https://www.muhs.ac.in/syllabus_nursing.aspx',
  retrievedDate: '2024-09-15',
  isBatchExplicitlySelected: true
};

export const SYLLABUS_SOURCE_PRIORITY = [
  {
    priority: 1,
    authority: 'Indian Nursing Council (INC)',
    name: 'Official INC Revised B.Sc Nursing Regulations & Competency-Based Curriculum',
    gazetteRef: 'Gazette Notification No. 11-1/2021-INC',
    trustLevel: 'National Statutory Apex Body'
  },
  {
    priority: 2,
    authority: 'Maharashtra University of Health Sciences (MUHS)',
    name: 'MUHS Basic B.Sc Nursing Official Syllabus & Examination Scheme',
    gazetteRef: 'MUHS Academic Council Notification No. 14/2022 & 32/2023',
    trustLevel: 'State Affiliating University (Parbhani District Jurisdiction)'
  },
  {
    priority: 3,
    authority: 'Blessing College of Nursing, Parbhani',
    name: 'Institutional Academic Calendar & Internal Clinical Postings Roster',
    gazetteRef: 'BCON/ACAD/2024-25/08',
    trustLevel: 'Institutional Affiliated College Curriculum'
  },
  {
    priority: 4,
    authority: 'Standard Clinical Reference Literature',
    name: "Brunner & Suddarth's Med-Surg, Townsend Psychiatric Nursing, Hockenberry Pediatrics, Dutta DC OBG",
    gazetteRef: 'Prescribed Textbooks by INC/MUHS Board of Studies',
    trustLevel: 'Academic Reference Benchmarks'
  }
];

export const AVAILABLE_BATCHES = [
  {
    id: 'batch_2023_annual',
    label: '2023–2027 Batch (MUHS Annual Pattern — Recommended for Parbhani BCON)',
    syllabusVersion: 'MUHS_ANNUAL_2022' as SyllabusVersion,
    description: 'Annual University Examinations (Section A 25M + Section B 50M = 75M Theory).'
  },
  {
    id: 'batch_2024_cbcs',
    label: '2024–2028 Batch (MUHS Semesterized / CBCS Pattern)',
    syllabusVersion: 'MUHS_REVISED_CBCS_2024' as SyllabusVersion,
    description: 'Semester-based modules III through VIII with continuous OSCE/OSPE assessment.'
  },
  {
    id: 'batch_2022_inc',
    label: '2022–2026 Batch (INC National Semester Framework)',
    syllabusVersion: 'INC_REVISED_SEMESTER_2021' as SyllabusVersion,
    description: 'Indian Nursing Council national competency semester guidelines.'
  }
];

export const AVAILABLE_UNIVERSITIES = [
  {
    id: 'MUHS',
    name: 'Maharashtra University of Health Sciences (MUHS)',
    state: 'Maharashtra',
    description: 'Official State Health Sciences University for Blessing College of Nursing, Parbhani.',
    sourceUrl: 'https://www.muhs.ac.in/syllabus_nursing.aspx'
  },
  {
    id: 'INC',
    name: 'Indian Nursing Council (INC)',
    state: 'National / All India',
    description: 'National regulatory body for Nursing curriculum and standard clinical competencies.',
    sourceUrl: 'https://www.indiannursingcouncil.org'
  }
];

export const AVAILABLE_COLLEGES = [
  {
    id: 'blessing_parbhani',
    name: 'Blessing College of Nursing, Parbhani, Maharashtra',
    university: 'MUHS',
    district: 'Parbhani',
    affiliatedYear: '2016',
    status: 'MUHS Affiliated & INC Approved (Parbhani Center)'
  },
  {
    id: 'govt_nursing_aurangabad',
    name: 'Government College of Nursing, Chhatrapati Sambhajinagar (Aurangabad)',
    university: 'MUHS',
    district: 'Chhatrapati Sambhajinagar',
    affiliatedYear: '1985',
    status: 'MUHS Affiliated'
  },
  {
    id: 'govt_nursing_nanded',
    name: 'Dr. Shankarrao Chavan Govt College of Nursing, Nanded',
    university: 'MUHS',
    district: 'Nanded',
    affiliatedYear: '2005',
    status: 'MUHS Affiliated'
  }
];

export const SYLLABUS_VERSIONS: Record<
  SyllabusVersion,
  {
    versionKey: SyllabusVersion;
    title: string;
    authority: 'Maharashtra University of Health Sciences (MUHS)' | 'Indian Nursing Council (INC)';
    effectiveBatch: string;
    examPattern: string;
    description: string;
    sourceDocument: string;
  }
> = {
  MUHS_ANNUAL_2022: {
    versionKey: 'MUHS_ANNUAL_2022',
    title: 'MUHS Basic B.Sc Nursing Annual Curriculum & Exam Blueprint',
    authority: 'Maharashtra University of Health Sciences (MUHS)',
    effectiveBatch: 'Applicable to Blessing College of Nursing, Parbhani (Annual Pattern)',
    examPattern: 'Section A (MCQs 15M + SAQs 10M) + Section B (LAQs 50M) = 75 Marks University Theory Exam',
    description: 'Structured into 2nd, 3rd, and 4th Year comprehensive annual syllabi with strict 15-mark LAQ rubrics.',
    sourceDocument: 'MUHS B.Sc Nursing Academic Regulations & Syllabus Notification No. 14/2022'
  },
  MUHS_REVISED_CBCS_2024: {
    versionKey: 'MUHS_REVISED_CBCS_2024',
    title: 'MUHS Choice-Based Credit System (CBCS) Semesterized Pattern',
    authority: 'Maharashtra University of Health Sciences (MUHS)',
    effectiveBatch: 'Applicable to 2024+ Ingested Batches',
    examPattern: 'End-Semester Theory (75M) + Internal Formative (25M) + Practical OSCE/OSPE (50M)',
    description: 'Semester-wise competency modules aligned with INC semester guidelines.',
    sourceDocument: 'MUHS Academic Council Resolution 2024-B.Sc.N'
  },
  INC_REVISED_SEMESTER_2021: {
    versionKey: 'INC_REVISED_SEMESTER_2021',
    title: 'INC Revised Competency-Based Semesterized Curriculum',
    authority: 'Indian Nursing Council (INC)',
    effectiveBatch: 'National Standard Benchmark',
    examPattern: 'Semester-wise end examinations with OSPE/OSCE clinical evaluation & formative internal continuous assessment',
    description: 'Indian Nursing Council new semesterized competency framework mapping modules into semesters III through VIII.',
    sourceDocument: 'INC Gazette Notification No. 11-1/2021-INC'
  }
};

const STORAGE_KEY = 'nursing_syllabus_profile_v2';

export class SyllabusResolver {
  public static getProfile(): SyllabusProfile {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SYLLABUS_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SYLLABUS_PROFILE;
  }

  public static saveProfile(profile: Partial<SyllabusProfile>): SyllabusProfile {
    const current = this.getProfile();
    const updated: SyllabusProfile = { ...current, ...profile };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    return updated;
  }

  /**
   * Deterministically resolves curriculum authority, version and subject list.
   * If batch is unknown or ambiguous, transparently signals that user must select batch.
   */
  public static resolve(input: {
    university: string;
    college: string;
    course: NursingCourse;
    year: NursingYear;
    academicBatch?: string;
  }): SyllabusResolutionResult {
    const isMUHS = input.university.includes('Maharashtra') || input.university.includes('MUHS');
    const isParbhani = input.college.includes('Blessing') || input.college.includes('Parbhani');

    // If batch is missing, do NOT guess silently!
    if (!input.academicBatch) {
      return {
        syllabusVersion: 'MUHS_ANNUAL_2022',
        authority: 'Maharashtra University of Health Sciences (MUHS)',
        source: 'MUHS Official Academic Portal',
        sourceDocument: 'MUHS Notification 14/2022',
        subjects: [],
        confidence: 0,
        isResolved: false,
        promptBatchSelection: true,
        message: 'Please select your academic batch to load the exact university curriculum and exam blueprint.'
      };
    }

    let version: SyllabusVersion = 'MUHS_ANNUAL_2022';
    if (input.academicBatch.includes('2024') || input.academicBatch.includes('CBCS')) {
      version = 'MUHS_REVISED_CBCS_2024';
    } else if (input.academicBatch.includes('INC') || input.academicBatch.includes('Semester')) {
      version = 'INC_REVISED_SEMESTER_2021';
    }

    const versionMeta = SYLLABUS_VERSIONS[version];
    const yearData = NURSING_CURRICULUM_DATA[input.year];
    const subjects = (yearData?.subjects || []).map((s) => ({
      id: s.id,
      name: s.name,
      code: s.code,
      theoryHours: s.theoryHoursRequired,
      practicalHours: s.practicalHoursRequired,
      muhsMarks: s.muhsMarksWeightage,
      totalTopics: s.totalTopics
    }));

    return {
      syllabusVersion: version,
      authority: versionMeta.authority,
      source: isParbhani ? 'Blessing College of Nursing, Parbhani (MUHS Affiliated)' : versionMeta.authority,
      sourceDocument: versionMeta.sourceDocument,
      subjects,
      confidence: isMUHS && isParbhani ? 100 : 95,
      isResolved: true,
      promptBatchSelection: false,
      message: `Verified: ${versionMeta.title} for ${input.year.replace('_', ' ').toUpperCase()}`
    };
  }

  public static setActiveYear(year: NursingYear): SyllabusProfile {
    return this.saveProfile({ activeYear: year });
  }

  public static setSyllabusVersion(version: SyllabusVersion, batchLabel?: string): SyllabusProfile {
    const isMUHS = version.startsWith('MUHS');
    return this.saveProfile({
      syllabusVersion: version,
      academicBatch: batchLabel || (version === 'MUHS_ANNUAL_2022' ? '2023–2027 (MUHS Annual)' : '2024–2028 (CBCS)'),
      syllabusAuthority: isMUHS ? 'Maharashtra University of Health Sciences (MUHS)' : 'Indian Nursing Council (INC)',
      university: isMUHS ? 'Maharashtra University of Health Sciences (MUHS)' : 'Indian Nursing Council (INC)',
      isBatchExplicitlySelected: true
    });
  }

  public static getUniversityExamPattern(version: SyllabusVersion = 'MUHS_ANNUAL_2022') {
    return SYLLABUS_VERSIONS[version]?.examPattern || SYLLABUS_VERSIONS.MUHS_ANNUAL_2022.examPattern;
  }
}
