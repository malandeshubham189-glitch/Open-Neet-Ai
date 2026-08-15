import {
  NursingYear,
  SyllabusVersion,
  NursingSubjectId,
  NursingCourse
} from '../../types/nursing';

export interface NursingStudentProfile {
  studentName: string;
  university: string;
  college: string;
  course: NursingCourse;
  academicBatch: string; // e.g. "2023–2027 (MUHS Revised Annual)"
  activeYear: NursingYear;
  syllabusVersion: SyllabusVersion;
  targetExamDate: string; // YYYY-MM-DD
  dailyAvailableStudyHours: number; // 1, 2, 4, 6
  isExamMode: boolean;
  isOnboarded: boolean;
  streakDays: number;
  studyStreakDays?: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalMinutesStudied: number;
  completedTopicCount: number;
}

const PROFILE_STORAGE_KEY = 'nursing_student_profile_v2';

export const DEFAULT_NURSING_PROFILE: NursingStudentProfile = {
  studentName: 'Blessing Student',
  university: 'Maharashtra University of Health Sciences (MUHS)',
  college: 'Blessing College of Nursing, Parbhani',
  course: 'Basic B.Sc Nursing',
  academicBatch: '2023–2027 (MUHS Annual Pattern)',
  activeYear: '3rd_year',
  syllabusVersion: 'MUHS_ANNUAL_2022',
  targetExamDate: `${new Date().getFullYear() + 1}-05-15`, // May MUHS Summer Exam
  dailyAvailableStudyHours: 4,
  isExamMode: false,
  isOnboarded: false,
  streakDays: 1,
  studyStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalMinutesStudied: 0,
  completedTopicCount: 0
};

export class StudentProfileService {
  public static getProfile(): NursingStudentProfile {
    try {
      const data = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        const streak = parsed.streakDays || parsed.studyStreakDays || 1;
        return {
          ...DEFAULT_NURSING_PROFILE,
          ...parsed,
          streakDays: streak,
          studyStreakDays: streak
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_NURSING_PROFILE;
  }

  public static saveProfile(updates: Partial<NursingStudentProfile>): NursingStudentProfile {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage error fallback
    }
    return updated;
  }

  public static recordStudyActivity(minutesStudied: number, topicCompleted: boolean = false): NursingStudentProfile {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    const lastDate = profile.lastActiveDate;

    let newStreak = profile.streakDays;
    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const updated = this.saveProfile({
      streakDays: newStreak,
      lastActiveDate: today,
      totalMinutesStudied: profile.totalMinutesStudied + minutesStudied,
      completedTopicCount: profile.completedTopicCount + (topicCompleted ? 1 : 0)
    });

    return updated;
  }

  public static toggleExamMode(): boolean {
    const profile = this.getProfile();
    const newMode = !profile.isExamMode;
    this.saveProfile({ isExamMode: newMode });
    return newMode;
  }
}
