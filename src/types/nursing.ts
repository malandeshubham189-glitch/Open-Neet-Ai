export type NursingYear = '2nd_year' | '3rd_year' | '4th_year';

export type NursingUniversity = 'MUHS' | 'INC';

export type NursingCourse = 'Basic B.Sc Nursing';

export type SyllabusVersion = 'MUHS_ANNUAL_2022' | 'INC_REVISED_SEMESTER_2021' | 'MUHS_REVISED_CBCS_2024';

export type TopicLearningStatus =
  | 'NOT_STARTED'
  | 'LEARNING'
  | 'NOTES_COMPLETED'
  | 'PRACTICING'
  | 'TEST_COMPLETED'
  | 'REVISION_DUE'
  | 'MASTERED';

export type ResourceValidationStatus = 'VALID' | 'UNAVAILABLE' | 'PRIVATE' | 'DELETED' | 'LOW_RELEVANCE' | 'PENDING_VALIDATION';

export interface SyllabusProfile {
  university: string;
  college: string;
  course: NursingCourse;
  academicBatch?: string; // e.g. "2022–2026", "2023–2027", "2024–2028"
  activeYear: NursingYear;
  syllabusVersion: SyllabusVersion;
  syllabusAuthority: 'Maharashtra University of Health Sciences (MUHS)' | 'Indian Nursing Council (INC)';
  sourceUrl: string;
  retrievedDate: string;
  isBatchExplicitlySelected: boolean;
}

export interface SyllabusResolutionResult {
  syllabusVersion: SyllabusVersion;
  authority: 'Maharashtra University of Health Sciences (MUHS)' | 'Indian Nursing Council (INC)';
  source: string;
  sourceDocument: string;
  subjects: NursingSubjectSummary[];
  confidence: number;
  isResolved: boolean;
  promptBatchSelection: boolean;
  message?: string;
}

export interface NursingSubjectSummary {
  id: NursingSubjectId;
  name: string;
  code: string;
  theoryHours: number;
  practicalHours?: number;
  muhsMarks: number;
  totalTopics: number;
}

export type NursingSubjectId =
  // 2nd Year Subjects
  | 'med_surg_1'
  | 'pharmacology'
  | 'pathology_genetics'
  | 'community_health_1'
  | 'cet'
  | 'sociology'
  // 3rd Year Subjects
  | 'med_surg_2'
  | 'child_health'
  | 'mental_health'
  // 4th / Final Year Subjects
  | 'midwifery_obg'
  | 'community_health_2'
  | 'nursing_research'
  | 'nursing_mgmt';

export interface NursingCarePlanItem {
  assessment: string;
  nursingDiagnosis: string; // NANDA-I formatted
  expectedOutcome: string; // SMART Goal
  interventions: string[];
  rationales: string[];
  evaluation: string;
}

export interface NursingUniversityQuestion {
  id: string;
  type: 'LAQ' | 'SAQ' | 'Short_Notes' | 'Clinical_Scenario';
  marks: number; // 15 for LAQ, 5 for SAQ
  question: string;
  frequency?: 'Frequently Asked in MUHS' | 'High Weightage' | 'University Repeater';
  sourceCategory?: 'Verified Previous Question' | 'AI Practice Question';
  examSession?: string; // e.g. "MUHS Summer 2023", "MUHS Winter 2022"
  modelAnswerOutline: string;
  keyPointsToInclude?: string[];
}

export interface NursingDefinition {
  term: string;
  definition: string;
  referenceSource: string;
}

export interface NursingReferenceExcerpt {
  sourceTitle: string;
  bookReference: string;
  chapter: string;
  pages?: string;
  excerpt: string;
  officialSyllabusMapping: string;
}

export interface ConceptCoverageBreakdown {
  conceptName: string;
  isCovered: boolean;
  timestamp?: string;
  notes?: string;
}

export interface NursingLectureResource {
  id: string;
  topicId: string;
  videoId: string;
  playlistId?: string;
  playlistTitle?: string;
  title: string;
  channel: string;
  teacherName: string;
  durationMinutes: number;
  sourceUrl: string;
  coverageScore: number; // 0 to 100
  relevanceScore?: number; // 0 to 100
  lectureScore: number; // weighted quality score 0 to 100
  confidenceScore: number; // 0 to 100
  isPlaylist: boolean;
  playlistPosition?: number;
  totalPlaylistVideos?: number;
  status: ResourceValidationStatus;
  lastValidated: string;
  qualityRating: number;
  verifiedBadge: boolean;
  teachingLanguage: 'Hindi' | 'English' | 'Hinglish';
  recommendationReason: string;
  matchedConcepts: string[];
  missingConcepts: string[];
  scoringExplanation?: {
    topicRelevance: number;
    syllabusCoverage: number;
    nursingSpecificity: number;
    playlistCompleteness: number;
    teachingQuality: number;
    durationScore: number;
  };
}

export interface NursingMCQOption {
  id: string;
  text: string;
}

export interface NursingMCQ {
  id: string;
  topicId: string;
  question: string;
  options: NursingMCQOption[];
  correctAnswerId: string;
  explanation: string;
  clinicalRationale?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  tag?: 'NORCET_Clinical' | 'MUHS_Theory' | 'Drug_Dosage' | 'Emergency_Action';
}

export interface NursingTopic {
  id: string; // Deterministic ID e.g. BSCN2-MSN1-U01-T01
  subjectId: NursingSubjectId;
  subjectName: string;
  year: NursingYear;
  unitNumber: number;
  unitTitle: string;
  title: string;
  description: string;
  learningObjectives?: string[];
  syllabusSource?: string; // e.g. "MUHS Basic B.Sc Nursing Syllabus Notification 14/2022"
  priority?: 'High' | 'Medium' | 'Low';
  importance?: 'High' | 'Medium' | 'Low';
  estimatedStudyTime?: number; // minutes
  estimatedStudyMinutes?: number; // minutes
  prerequisites?: string[]; // prerequisite topic IDs or concepts
  status?: TopicLearningStatus;

  // MUHS Specific Exam Attributes
  muhsExamWeightage: string; // e.g. '15 Marks LAQ', '5 Marks SAQ'
  clinicalRelevance: string;
  officialSyllabusCode?: string;

  // Best recommended lecture (Playlist-First & Validated)
  recommendedLecture?: NursingLectureResource;
  alternativeLectures?: NursingLectureResource[];

  // Clinical Notes & NCP
  definitions?: NursingDefinition[];
  notes?: {
    overview: string;
    classifications?: string[];
    etiologyAndRiskFactors?: string[];
    pathophysiologySteps?: string[];
    clinicalManifestations?: string[];
    diagnosticEvaluation?: string[];
    medicalManagement?: string[];
    surgicalManagement?: string[];
    nursingManagement?: string[];
    complications?: string[];
    clinicalPearls?: string[];
    quickRevision?: string[];
  };
  nursingCarePlan?: NursingCarePlanItem;
  universityQuestions?: NursingUniversityQuestion[];
  mcqs?: NursingMCQ[];
  referenceReader?: NursingReferenceExcerpt;
}

export interface NursingUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  subjectId: NursingSubjectId;
  topics: NursingTopic[];
}

export interface NursingSubject {
  id: NursingSubjectId;
  name: string;
  shortName: string;
  year: NursingYear;
  code: string;
  color: string;
  badge: string;
  icon: string;
  theoryHoursRequired: number;
  practicalHoursRequired?: number;
  muhsMarksWeightage: number;
  totalUnits: number;
  totalTopics: number;
  units: NursingUnit[];
}

export interface NursingCurriculumYear {
  year: NursingYear;
  title: string;
  subtitle: string;
  description: string;
  totalSubjects: number;
  totalTopics: number;
  subjects: NursingSubject[];
}

export interface NursingUserProgress {
  topicId: string;
  subjectId: NursingSubjectId;
  year: NursingYear;
  status: TopicLearningStatus;
  completed: boolean;
  videoWatched: boolean;
  notesRead: boolean;
  ncpReviewed: boolean;
  mcqsSolvedCount: number;
  totalMcqsCount: number;
  universityQuestionsReviewed: boolean;
  aiTestCompleted: boolean;
  addedToRevision: boolean;
  confidenceLevel: 'Strong' | 'Moderate' | 'Weak';
  lastStudiedAt: string;
  notesSaved?: string;
  activeStep: number;
  watchTimeMinutes?: number;
  
  // Spaced revision tracking
  revisionCount: number;
  nextRevisionDueDate?: string;
  lastRevisionCompletedAt?: string;
  revisionIntervalDays: number;
}

export interface NursingStudyPlanTask {
  id: string;
  topicId: string;
  topicTitle: string;
  subjectId: NursingSubjectId;
  subjectName: string;
  year: NursingYear;
  type: 'Lecture' | 'Smart Notes' | 'Nursing Care Plan' | 'University LAQ/SAQ' | 'MCQ Practice' | 'Revision';
  estimatedMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  dueDate: string;
  targetTime?: string;
  reason: string;
}

export interface NursingStudyPlannerConfig {
  targetExamDate: string; // YYYY-MM-DD
  dailyStudyHours: number;
  collegeAttendance: 'Full-time' | 'Partial' | 'Remote / Self-Study Only';
  weakSubjectIds: NursingSubjectId[];
  strongSubjectIds: NursingSubjectId[];
  missedDays: number;
  autoRebalanceEnabled: boolean;
}

export interface NursingSyllabusCoverage {
  subjectId: NursingSubjectId;
  subjectName: string;
  totalTopics: number;
  coveredWithVerifiedLecture: number;
  partiallyCoveredTopics: number;
  missingLectures: number;
  coveragePercentage: number;
  verifiedResourcesCount: number;
  topicsWithoutVerifiedLecture: string[];
}

// =========================================================================
// QUALITY CONTROL & SYLLABUS AUDITOR TYPES
// =========================================================================

export type TopicAuditStatus =
  | 'FULLY_COVERED'
  | 'PARTIALLY_COVERED'
  | 'RESOURCE_MISSING'
  | 'SYLLABUS_UNVERIFIED';

export type ZeroGapAuditStatus =
  | 'READY'
  | 'MOSTLY_READY'
  | 'GAPS_EXIST'
  | 'SYLLABUS_UNVERIFIED';

export type ResourceQualityLevel =
  | 'HIGH_CONFIDENCE'
  | 'GOOD'
  | 'PARTIAL'
  | 'REJECT';

export interface OfficialCurriculumNodeMetadata {
  nodeId: string;
  nodeType: 'YEAR' | 'SUBJECT' | 'UNIT' | 'TOPIC';
  title: string;
  sourceAuthority: string;
  sourceUrl: string;
  sourceDocument: string;
  syllabusVersion: SyllabusVersion;
  lastVerified: string;
  isVerified: boolean;
  verificationNotes?: string;
}

export interface SubjectAuditDetail {
  subjectId: NursingSubjectId;
  subjectName: string;
  subjectCode: string;
  year: NursingYear;
  totalUnits: number;
  totalTopics: number;
  lectureCovered: number;
  partiallyCovered: number;
  noVerifiedLecture: number;
  unverifiedCurriculumCount: number;
  overallCoverage: number;
  confidenceScore: number;
  confidenceLabel: string;
  status: 'OPTIMAL' | 'ACCEPTABLE' | 'NEEDS_SUPPLEMENT' | 'CRITICAL_GAPS';
}

export interface TopicAuditDetail {
  topicId: string;
  topicTitle: string;
  subjectId: NursingSubjectId;
  subjectName: string;
  year: NursingYear;
  unitNumber: number;
  unitTitle: string;
  muhsExamWeightage: string;
  auditStatus: TopicAuditStatus;
  curriculumVerified: boolean;
  sourceMetadata: OfficialCurriculumNodeMetadata;
  primaryResource: NursingLectureResource | null;
  supplementaryResource: {
    type: 'LECTURE_CONCEPT' | 'SMART_NOTES_NCP' | 'UNIVERSITY_LAQ_SAQ';
    title: string;
    durationMinutes?: number;
    actionUrl?: string;
    description: string;
  } | null;
  resourceChain: {
    topicTitle: string;
    primaryLectureTitle?: string;
    primaryLectureUrl?: string;
    primaryCoveragePercent: number;
    supplementaryRequired: boolean;
    supplementaryConceptText?: string;
    smartNotesAvailable: boolean;
    nandaCarePlanAvailable: boolean;
    mcqCount: number;
    laqSaqCount: number;
    mockTestAvailable: boolean;
    revisionScheduled: boolean;
  };
  coverageScore: number;
  confidenceScore: number;
  confidenceLabel: string;
  matchedConcepts: string[];
  missingConcepts: string[];
  reasons: string[];
  lastAuditedAt: string;
}

export interface AuditHistoryRecord {
  auditId: string;
  date: string;
  timestamp: number;
  syllabusVersion: SyllabusVersion;
  year: NursingYear | 'ALL';
  totalTopics: number;
  coveredTopics: number;
  partialTopics: number;
  missingTopics: number;
  unverifiedTopics: number;
  overallCoverage: number;
  zeroGapStatus: ZeroGapAuditStatus;
  notes?: string;
}

export interface NursingSyllabusAuditReport {
  auditId: string;
  date: string;
  university: string;
  college: string;
  course: NursingCourse;
  academicBatch: string;
  syllabusVersion: SyllabusVersion;
  year: NursingYear | 'ALL';
  
  totalSubjects: number;
  totalUnits: number;
  totalTopics: number;
  mappedTopics: number;
  unmappedTopics: number;
  resourceCoveredTopics: number;
  partialTopics: number;
  missingTopics: number;
  unverifiedCurriculumCount: number;
  brokenResourcesCount: number;
  overallCoverage: number;
  confidence: number;
  confidenceLabel: string;
  confidenceExplanation: string;
  
  zeroGapStatus: ZeroGapAuditStatus;
  zeroGapSummary: string;
  
  officialSource: {
    authority: string;
    sourceUrl: string;
    sourceDocument: string;
    syllabusVersion: SyllabusVersion;
    lastVerified: string;
    isVerified: boolean;
    collegeSpecificNote: string;
  };
  
  subjectsAudit: SubjectAuditDetail[];
  topicAudits: TopicAuditDetail[];
  actionableGaps: {
    missingTopics: TopicAuditDetail[];
    partialTopics: TopicAuditDetail[];
    unverifiedTopics: TopicAuditDetail[];
  };
}

export interface ExamReadinessMetric {
  overallReadinessPercent: number;
  syllabusCoveragePercent: number;
  topicMasteryPercent: number;
  mcqAccuracyPercent: number;
  mockTestScoreAverage: number;
  spacedRevisionAdherencePercent: number;
  weakTopicsResolvedPercent: number;
  highYieldLaqCompletedPercent: number;
  readinessGrade: 'EXAM_READY' | 'GOOD_PROGRESS' | 'REVISION_NEEDED' | 'CRITICAL_PREPARATION_REQUIRED';
  diagnosticSummary: string;
}
