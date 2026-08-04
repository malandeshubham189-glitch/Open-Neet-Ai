import { ContextManager } from './contextManager';
import { AIStudyEngine } from '../aiStudyEngine';

export class StudyCoach {
  static getAdvice(query: string) {
    const ctx = ContextManager.getFullContext();
    const advice = AIStudyEngine.getAIDecisionAdvice(query);

    return {
      query,
      answer: advice.answer,
      actionType: advice.actionType,
      recommendedTopicOrChapter: advice.recommendedTopicOrChapter,
      recommendedVideoId: advice.recommendedVideoId || ctx.lecture.videoId,
      currentProgress: ctx.student.overallCompletionPercentage,
      targetScore: ctx.student.targetNEETScore,
    };
  }
}
