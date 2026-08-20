export type CourseId = 'neet' | 'nursing' | 'iitm_bs' | 'iitm';
export type CanonicalCourseId = 'neet' | 'nursing' | 'iitm_bs';

export interface CourseConfig {
  id: CanonicalCourseId;
  label: string;
  shortLabel: string;
  icon: 'stethoscope' | 'hospital' | 'graduation-cap' | 'calculator';
  emoji: string;
  badge: string;
  type: 'competitive_exam' | 'degree';
  color: string;
  accentColor: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  description: string;
  defaultView: string;
}

export interface CourseNavigationState {
  neet: {
    view: string;
    selectedTopicId: string;
    selectedSubjectFilter: string;
  };
  nursing: {
    view: string;
    selectedNursingTopicId: string;
    selectedYear: '1st_year' | '2nd_year' | '3rd_year' | '4th_year';
  };
  iitm_bs: {
    view: string;
    selectedIITMSubjectId: 'math_1' | 'stats_1';
    selectedIITMWeekId: 'week_1' | 'week_2' | 'week_3' | 'week_4';
    selectedIITMLessonId?: string;
    iitmActiveTrack: 'playlist' | 'oneshot';
  };
}

export interface AIActiveCourseContext {
  courseId: CanonicalCourseId;
  courseName: string;
  examOrDegree: string;
  currentSubject?: string;
  currentChapterOrUnit?: string;
  currentTopicOrLesson?: string;
  currentWeekOrYear?: string;
  progressSummary?: string;
}
