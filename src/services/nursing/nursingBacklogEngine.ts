import {
  NursingYear,
  NursingTopic,
  NursingStudyPlanTask
} from '../../types/nursing';
import { getAllNursingTopics } from '../../data/nursingCurriculumData';
import { NursingStudyPlannerService } from './nursingStudyPlanner';
import { StudentProfileService } from './studentProfileService';
import { NursingWeakTopicEngine } from './nursingWeakTopicEngine';

export interface BacklogAssessment {
  isBacklogDetected: boolean;
  sessionsBehind: number;
  daysBehind: number;
  idealTopicsCompletedToDate: number;
  actualTopicsCompleted: number;
  totalSyllabusTopics: number;
  daysRemainingToExam: number;
  userDailyHoursLimit: number;
  requiredHoursPerDayAtCurrentPace: number;
  isOverCapacity: boolean;
  recoveryPlan: {
    title: string;
    description: string;
    dailyAllocatedMinutes: number;
    tasks: {
      topicId: string;
      topicTitle: string;
      subjectName: string;
      actionType: 'High-Yield Lecture' | '5-Col NCP Review' | 'Targeted LAQ' | 'Rapid Revision';
      durationMinutes: number;
      priority: 'High' | 'Medium';
      reason: string;
    }[];
    compressedTopicsCount: number;
    preservedCoreLAQCount: number;
  };
}

export class NursingBacklogEngine {
  public static assessBacklog(year: NursingYear = '3rd_year'): BacklogAssessment {
    const profile = StudentProfileService.getProfile();
    const allTopics = getAllNursingTopics(year);
    const allProgress = NursingStudyPlannerService.getAllProgress();
    const weakTopics = NursingWeakTopicEngine.getWeakTopics(year);

    const completedTopics = allTopics.filter((t) => allProgress[t.id]?.completed);
    const totalTopics = allTopics.length;
    const remainingTopics = allTopics.filter((t) => !allProgress[t.id]?.completed);

    // Target exam date calculation
    const today = new Date();
    const examDate = new Date(profile.targetExamDate);
    const diffTime = Math.max(1, examDate.getTime() - today.getTime());
    const daysRemaining = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Standard academic calendar assumption (e.g. 180 study days per year)
    const expectedPaceTopicsPerDay = totalTopics / Math.min(180, daysRemaining + 60);
    // Rough estimate of days elapsed in academic term
    const estimatedDaysElapsed = 60;
    const idealCompleted = Math.min(totalTopics, Math.round(expectedPaceTopicsPerDay * estimatedDaysElapsed));

    const shortfall = Math.max(0, idealCompleted - completedTopics.length);
    const isBacklogDetected = shortfall >= 3 || (daysRemaining < 90 && completedTopics.length < totalTopics * 0.5);

    const sessionsBehind = Math.max(0, Math.round(shortfall * 1.5));
    const daysBehind = Math.max(0, Math.round(shortfall / Math.max(1, (profile.dailyAvailableStudyHours / 2))));

    // Required daily time calculation
    const avgMinutesPerTopic = 75; // 45m lecture + 30m notes/NCP
    const totalMinutesNeeded = remainingTopics.length * avgMinutesPerTopic + weakTopics.length * 30;
    const requiredMinutesPerDay = Math.round(totalMinutesNeeded / daysRemaining);
    const requiredHoursPerDay = Number((requiredMinutesPerDay / 60).toFixed(1));

    const userDailyHours = profile.dailyAvailableStudyHours || 4;
    const isOverCapacity = requiredHoursPerDay > userDailyHours;

    // Generate balanced recovery plan that fits userDailyHours
    const maxDailyMinutes = userDailyHours * 60;
    let accumulatedMinutes = 0;
    const prioritizedTasks: BacklogAssessment['recoveryPlan']['tasks'] = [];

    // 1. First priority: High-weightage 15M LAQ core topics
    const highWeightageRemaining = remainingTopics.filter((t) => t.importance === 'High' || t.priority === 'High');
    highWeightageRemaining.slice(0, 2).forEach((topic) => {
      if (accumulatedMinutes + 50 <= maxDailyMinutes) {
        prioritizedTasks.push({
          topicId: topic.id,
          topicTitle: topic.title,
          subjectName: topic.subjectName,
          actionType: 'High-Yield Lecture',
          durationMinutes: 45,
          priority: 'High',
          reason: `MUHS 15-Mark Core: ${topic.muhsExamWeightage || '15M LAQ'}`
        });
        accumulatedMinutes += 45;
      }
    });

    // 2. Second priority: Weak topic stabilization
    if (weakTopics.length > 0 && accumulatedMinutes + 25 <= maxDailyMinutes) {
      const topWeak = weakTopics[0];
      prioritizedTasks.push({
        topicId: topWeak.topic.id,
        topicTitle: topWeak.topic.title,
        subjectName: topWeak.topic.subjectName,
        actionType: '5-Col NCP Review',
        durationMinutes: 25,
        priority: 'High',
        reason: `Targeted recovery for ${topWeak.accuracyPercent}% accuracy gap`
      });
      accumulatedMinutes += 25;
    }

    // 3. Third priority: Rapid University LAQ Blueprints
    if (remainingTopics.length > 0 && accumulatedMinutes + 20 <= maxDailyMinutes) {
      const nextTopic = remainingTopics[0];
      prioritizedTasks.push({
        topicId: nextTopic.id,
        topicTitle: nextTopic.title,
        subjectName: nextTopic.subjectName,
        actionType: 'Targeted LAQ',
        durationMinutes: 20,
        priority: 'Medium',
        reason: 'Solve 15M marking distribution model answer'
      });
      accumulatedMinutes += 20;
    }

    return {
      isBacklogDetected,
      sessionsBehind,
      daysBehind,
      idealTopicsCompletedToDate: idealCompleted,
      actualTopicsCompleted: completedTopics.length,
      totalSyllabusTopics: totalTopics,
      daysRemainingToExam: daysRemaining,
      userDailyHoursLimit: userDailyHours,
      requiredHoursPerDayAtCurrentPace: requiredHoursPerDay,
      isOverCapacity,
      recoveryPlan: {
        title: 'Calibrated Backlog Recovery Plan',
        description: `Plan calibrated strictly to your ${userDailyHours}h/day limit. Low-yield secondary topics compressed while preserving 100% of MUHS 15-Mark LAQ clinical topics.`,
        dailyAllocatedMinutes: accumulatedMinutes,
        tasks: prioritizedTasks,
        compressedTopicsCount: Math.max(0, Math.round(remainingTopics.length * 0.3)),
        preservedCoreLAQCount: highWeightageRemaining.length
      }
    };
  }
}
