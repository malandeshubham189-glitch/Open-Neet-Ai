import { NursingYear } from '../../types/nursing';
import { getAllNursingTopics } from '../../data/nursingCurriculumData';
import { NursingStudyPlannerService } from './nursingStudyPlanner';
import { StudentProfileService } from './studentProfileService';

export interface CompletionPrediction {
  estimatedCompletionDate: string;
  targetExamDate: string;
  daysRemainingToTarget: number;
  daysRequiredAtCurrentPace: number;
  daysDelta: number; // positive = ahead/on time, negative = behind
  confidence: 'High' | 'Medium' | 'Low';
  weeklyStudyHours: number;
  topicsPerWeekVelocity: number;
  statusHeadline: string;
  paceDescription: string;
}

export class AICompletionPredictor {
  public static predictYearCompletion(year: NursingYear = '3rd_year'): CompletionPrediction {
    const profile = StudentProfileService.getProfile();
    const allTopics = getAllNursingTopics(year);
    const allProgress = NursingStudyPlannerService.getAllProgress();

    const totalTopics = allTopics.length;
    const completedTopics = allTopics.filter((t) => allProgress[t.id]?.completed).length;
    const remainingTopics = totalTopics - completedTopics;

    const targetDate = new Date(profile.targetExamDate);
    const today = new Date();
    const diffTime = Math.max(1, targetDate.getTime() - today.getTime());
    const daysRemainingToTarget = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // User's configured daily study hours
    const dailyHours = profile.dailyAvailableStudyHours || 4;
    const weeklyHours = dailyHours * 6; // Assume 6 study days per week

    // Estimated minutes per topic (lecture + notes + MCQs + revision)
    const avgMinutesPerTopic = 75;
    const totalRemainingMinutes = remainingTopics * avgMinutesPerTopic;

    // Daily study capacity in minutes
    const dailyStudyMinutes = dailyHours * 60;
    const topicsPerDayCapacity = dailyStudyMinutes / avgMinutesPerTopic;
    const topicsPerWeekVelocity = Number((topicsPerDayCapacity * 6).toFixed(1));

    // Days required to complete remaining syllabus
    const daysRequiredAtCurrentPace = Math.max(1, Math.ceil(totalRemainingMinutes / dailyStudyMinutes));

    // Estimated completion date
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + daysRequiredAtCurrentPace);
    const estimatedCompletionDate = estDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const formattedTargetDate = targetDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const daysDelta = daysRemainingToTarget - daysRequiredAtCurrentPace;

    let confidence: 'High' | 'Medium' | 'Low' = 'Medium';
    if (completedTopics > totalTopics * 0.4) {
      confidence = 'High';
    } else if (completedTopics < 3) {
      confidence = 'Low';
    }

    let statusHeadline = 'On Schedule';
    let paceDescription = `At ${dailyHours}h/day, you will complete the full syllabus ~${Math.abs(daysDelta)} days before your target exam date.`;

    if (daysDelta < 0) {
      statusHeadline = `${Math.abs(daysDelta)} Days Behind Target`;
      paceDescription = `At current study pace (${dailyHours}h/day), syllabus completion is projected for ${estimatedCompletionDate}. Consider activating Backlog Recovery Mode.`;
    }

    return {
      estimatedCompletionDate,
      targetExamDate: formattedTargetDate,
      daysRemainingToTarget,
      daysRequiredAtCurrentPace,
      daysDelta,
      confidence,
      weeklyStudyHours: weeklyHours,
      topicsPerWeekVelocity,
      statusHeadline,
      paceDescription
    };
  }
}
