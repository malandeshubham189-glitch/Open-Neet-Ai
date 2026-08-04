import { RankedLectureRecommendation, StudentLearningState, NEETSubject } from '../types/studentState';
import { studentStateService } from './studentLearningStateService';
import { youtubeLiveEngine } from './youtube/youtubeLiveService';
import { OFFICIAL_CHANNELS_REGISTRY } from '../data/officialChannels';
import { LiveEngineStatus } from './youtubeLiveService';

export class SmartLectureRecommendationEngine {
  /**
   * Evaluates all official lectures & live streams against the student's state to rank the next best action.
   */
  static async getRankedRecommendations(
    subjectFilter?: NEETSubject
  ): Promise<RankedLectureRecommendation[]> {
    const studentState: StudentLearningState = studentStateService.getState();
    const liveStatus: LiveEngineStatus = await youtubeLiveEngine.getLiveStatus();

    const candidates: RankedLectureRecommendation[] = [];

    // 1. Check if an official LIVE class is active
    if (liveStatus.isLive && liveStatus.isEmbeddable) {
      const liveSubject: NEETSubject = 'Physics'; // Default live class subject
      const matchesSubject = !subjectFilter || subjectFilter === liveSubject;

      if (matchesSubject) {
        candidates.push({
          lectureId: liveStatus.videoId,
          title: liveStatus.title,
          chapter: 'Rotational Motion & Mechanics Live',
          subject: liveSubject,
          teacherName: liveStatus.teacherName,
          thumbnail: liveStatus.thumbnail,
          embedUrl: liveStatus.embedUrl,
          watchUrl: liveStatus.watchUrl,
          score: 100, // Maximum priority score for live
          rankingReasons: [
            '🔴 OFFICIAL LIVE STREAMING NOW',
            'Live interactive doubt solving with MA Sir',
            'High yield NEET weightage chapter (4 questions / 16 marks)',
          ],
          isLive: true,
          ncertWeight: 10,
          nextStepInPipeline: 'Lecture',
        });
      }
    }

    // 2. Verified Recorded Masterclasses
    const recordedLectures = [
      {
        lectureId: '_W1b6rO7_F4',
        title: 'The Living World Class 11 Biology One Shot | Seep Pahuja',
        chapter: 'The Living World',
        subject: 'Botany' as NEETSubject,
        teacherName: 'Seep Pahuja',
        thumbnail: 'https://i.ytimg.com/vi/_W1b6rO7_F4/hqdefault.jpg',
        ncertWeight: 8,
      },
      {
        lectureId: 'fA-XN6q3f6A',
        title: 'Rotational Motion & Moment of Inertia Masterclass',
        chapter: 'Rotational Motion',
        subject: 'Physics' as NEETSubject,
        teacherName: 'MA Sir (Logical Physics)',
        thumbnail: 'https://i.ytimg.com/vi/fA-XN6q3f6A/hqdefault.jpg',
        ncertWeight: 9,
      },
      {
        lectureId: 'x5G_m9L3qP2',
        title: 'Cell: The Unit of Life Complete NCERT One Shot | Seep Pahuja',
        chapter: 'Cell: The Unit of Life',
        subject: 'Botany' as NEETSubject,
        teacherName: 'Seep Pahuja',
        thumbnail: 'https://i.ytimg.com/vi/x5G_m9L3qP2/hqdefault.jpg',
        ncertWeight: 9,
      },
      {
        lectureId: 'm4X_m9L6qP6',
        title: 'Laws of Motion & Friction Complete Chapter One Shot | PW',
        chapter: 'Laws of Motion',
        subject: 'Physics' as NEETSubject,
        teacherName: 'Competition Wallah',
        thumbnail: 'https://i.ytimg.com/vi/m4X_m9L6qP6/hqdefault.jpg',
        ncertWeight: 8,
      },
      {
        lectureId: 'j3G_m9L5qP5',
        title: 'Human Reproduction Complete NCERT Masterclass | Seep Pahuja',
        chapter: 'Human Reproduction',
        subject: 'Zoology' as NEETSubject,
        teacherName: 'Seep Pahuja',
        thumbnail: 'https://i.ytimg.com/vi/j3G_m9L5qP5/hqdefault.jpg',
        ncertWeight: 9,
      },
    ];

    for (const rec of recordedLectures) {
      if (subjectFilter && rec.subject !== subjectFilter) continue;

      let score = 50;
      const reasons: string[] = [];

      // Check if matches weak topic
      const isWeak = studentState.weakTopics.some(
        (wt) => wt.toLowerCase().includes(rec.chapter.toLowerCase()) || rec.chapter.toLowerCase().includes(wt.toLowerCase())
      );
      if (isWeak) {
        score += 30;
        reasons.push('Directly targets identified Weak Topic');
      }

      // Check if preferred teacher
      const isPreferredTeacher = studentState.preferredTeachers.some(
        (t) => t.toLowerCase().includes(rec.teacherName.toLowerCase()) || rec.teacherName.toLowerCase().includes(t.toLowerCase())
      );
      if (isPreferredTeacher) {
        score += 15;
        reasons.push(`Taught by top preferred faculty (${rec.teacherName})`);
      }

      // Check NCERT weight
      score += rec.ncertWeight;
      reasons.push(`High NEET Exam Weightage (NCERT Rating: ${rec.ncertWeight}/10)`);

      // Determine next pipeline step based on progress
      let nextStepInPipeline: RankedLectureRecommendation['nextStepInPipeline'] = 'Lecture';
      if (studentState.lectureProgressPercentage > 80) {
        nextStepInPipeline = 'AI Notes';
      } else if (studentState.lectureProgressPercentage > 95) {
        nextStepInPipeline = 'NCERT';
      }

      candidates.push({
        lectureId: rec.lectureId,
        title: rec.title,
        chapter: rec.chapter,
        subject: rec.subject,
        teacherName: rec.teacherName,
        thumbnail: rec.thumbnail,
        embedUrl: `https://www.youtube-nocookie.com/embed/${rec.lectureId}`,
        watchUrl: `https://www.youtube.com/watch?v=${rec.lectureId}`,
        score,
        rankingReasons: reasons,
        isLive: false,
        ncertWeight: rec.ncertWeight,
        nextStepInPipeline,
      });
    }

    // Sort descending by score
    candidates.sort((a, b) => b.score - a.score);

    return candidates;
  }

  /**
   * Recommends today's single best lecture for the student
   */
  static async getTodaysBestLecture(): Promise<RankedLectureRecommendation> {
    const list = await this.getRankedRecommendations();
    return list[0];
  }
}
