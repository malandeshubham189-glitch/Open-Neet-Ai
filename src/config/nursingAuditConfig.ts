import { ResourceQualityLevel, SyllabusVersion } from '../types/nursing';

/**
 * Quality & Coverage thresholds for B.Sc Nursing Learning Resources.
 * Configurable without hardcoding throughout the codebase.
 */
export interface NursingResourceThresholdConfig {
  HIGH_CONFIDENCE: number; // >= 85: Full syllabus alignment & complete concept mapping
  GOOD: number;            // 70–84: Good coverage with minor concept supplement recommended
  PARTIAL: number;         // 50–69: Partial coverage, supplementary resources mandatory
  REJECT: number;          // < 50: Rejected candidate, insufficient academic depth
}

export const NURSING_RESOURCE_THRESHOLDS: NursingResourceThresholdConfig = {
  HIGH_CONFIDENCE: 85,
  GOOD: 70,
  PARTIAL: 50,
  REJECT: 50
};

export const getResourceQualityLevel = (score: number): ResourceQualityLevel => {
  if (score >= NURSING_RESOURCE_THRESHOLDS.HIGH_CONFIDENCE) return 'HIGH_CONFIDENCE';
  if (score >= NURSING_RESOURCE_THRESHOLDS.GOOD) return 'GOOD';
  if (score >= NURSING_RESOURCE_THRESHOLDS.PARTIAL) return 'PARTIAL';
  return 'REJECT';
};

export const getQualityBadge = (score: number): { label: string; color: string; bg: string } => {
  if (score >= NURSING_RESOURCE_THRESHOLDS.HIGH_CONFIDENCE) {
    return { label: 'High Confidence', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' };
  }
  if (score >= NURSING_RESOURCE_THRESHOLDS.GOOD) {
    return { label: 'Good Quality', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800' };
  }
  if (score >= NURSING_RESOURCE_THRESHOLDS.PARTIAL) {
    return { label: 'Partial Coverage', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' };
  }
  return { label: 'Insufficient Depth', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' };
};

/**
 * Official Statutory & University Source Authorities Registry
 */
export const OFFICIAL_SYLLABUS_SOURCES: Record<
  SyllabusVersion,
  {
    authority: string;
    sourceUrl: string;
    sourceDocument: string;
    notificationNumber: string;
    gazetteYear: string;
    lastVerifiedDate: string;
    parbhaniJurisdiction: string;
  }
> = {
  MUHS_ANNUAL_2022: {
    authority: 'Maharashtra University of Health Sciences (MUHS), Nashik',
    sourceUrl: 'https://www.muhs.ac.in/syllabus_nursing.aspx',
    sourceDocument: 'MUHS Basic B.Sc. Nursing Academic Regulations & Syllabus (Annual Exam Pattern)',
    notificationNumber: 'MUHS Academic Council Notification No. 14/2022 & Circular 32/2023',
    gazetteYear: '2022–2023',
    lastVerifiedDate: '2025-01-15',
    parbhaniJurisdiction: 'Direct Statutory Affiliation for Blessing College of Nursing, Parbhani'
  },
  MUHS_REVISED_CBCS_2024: {
    authority: 'Maharashtra University of Health Sciences (MUHS), Nashik',
    sourceUrl: 'https://www.muhs.ac.in/syllabus_nursing.aspx',
    sourceDocument: 'MUHS Choice Based Credit System (CBCS) & Semesterized Nursing Syllabus',
    notificationNumber: 'MUHS Resolution AC-2024/B.Sc.N-CBCS',
    gazetteYear: '2024–2025',
    lastVerifiedDate: '2025-01-15',
    parbhaniJurisdiction: 'Applicable to Ingested 2024+ CBCS Batches in Parbhani Center'
  },
  INC_REVISED_SEMESTER_2021: {
    authority: 'Indian Nursing Council (INC), New Delhi',
    sourceUrl: 'https://www.indiannursingcouncil.org',
    sourceDocument: 'INC Revised Regulations and Curriculum for B.Sc Nursing Program (Semesters I–VIII)',
    notificationNumber: 'Gazette Notification No. 11-1/2021-INC (Extraordinary Part III Sec 4)',
    gazetteYear: '2021–2022',
    lastVerifiedDate: '2025-01-15',
    parbhaniJurisdiction: 'National Statutory Apex Framework (Standard Competencies)'
  }
};
