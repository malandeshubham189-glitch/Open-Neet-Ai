import { CourseConfig, CanonicalCourseId, CourseId, CourseNavigationState } from '../types/course';

export const COURSES_CONFIG: Record<CanonicalCourseId, CourseConfig> = {
  neet: {
    id: 'neet',
    label: 'NEET 2027',
    shortLabel: 'NEET',
    icon: 'stethoscope',
    emoji: '🩺',
    badge: 'Competitive Exam',
    type: 'competitive_exam',
    color: 'blue',
    accentColor: '#2563EB',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-200',
    description: 'NEET 2027 Syllabus, Physics, Chemistry, Biology & AI Study Engine',
    defaultView: 'dashboard'
  },
  nursing: {
    id: 'nursing',
    label: 'B.Sc Nursing',
    shortLabel: 'Nursing',
    icon: 'hospital',
    emoji: '🏥',
    badge: 'MUHS Degree',
    type: 'degree',
    color: 'emerald',
    accentColor: '#059669',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-200',
    description: 'MUHS Semester Curriculum, Anatomy, Physiology, MSN, Clinical Procedures',
    defaultView: 'nursing-dashboard'
  },
  iitm_bs: {
    id: 'iitm_bs',
    label: 'IITM BS Degree',
    shortLabel: 'IITM BS',
    icon: 'graduation-cap',
    emoji: '🎓',
    badge: 'Foundation Degree',
    type: 'degree',
    color: 'indigo',
    accentColor: '#4F46E5',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-700',
    accentBorder: 'border-indigo-200',
    description: 'IIT Madras BS in Data Science • Mathematics 1 & Statistics 1 (Weeks 1-4)',
    defaultView: 'iitm-dashboard'
  }
};

export const COURSES_LIST: CourseConfig[] = [
  COURSES_CONFIG.neet,
  COURSES_CONFIG.nursing,
  COURSES_CONFIG.iitm_bs
];

export function toCanonicalCourseId(courseId: CourseId): CanonicalCourseId {
  if (courseId === 'iitm' || courseId === 'iitm_bs') {
    return 'iitm_bs';
  }
  if (courseId === 'nursing') {
    return 'nursing';
  }
  return 'neet';
}

export const DEFAULT_COURSE_NAVIGATION_STATE: CourseNavigationState = {
  neet: {
    view: 'dashboard',
    selectedTopicId: 'topic-phy-moi',
    selectedSubjectFilter: 'all'
  },
  nursing: {
    view: 'nursing-dashboard',
    selectedNursingTopicId: 'topic-msn2-stroke',
    selectedYear: '3rd_year'
  },
  iitm_bs: {
    view: 'iitm-dashboard',
    selectedIITMSubjectId: 'math_1',
    selectedIITMWeekId: 'week_1',
    selectedIITMLessonId: 'iitm-m1-w1-l1',
    iitmActiveTrack: 'playlist'
  }
};
