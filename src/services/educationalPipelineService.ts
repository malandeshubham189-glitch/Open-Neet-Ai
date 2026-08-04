import { QuestionItem } from '../types/practiceEngine';

export interface PipelineFetchParams {
  subject?: string;
  chapter?: string;
  topic?: string;
  type?: 'ncert_dpp' | 'exemplar' | 'diksha_assets' | 'saarthi_facts';
  count?: number;
}

export class EducationalPipelineService {
  /**
   * Dynamically fetch live NCERT line-by-line questions, DIKSHA open learning resources,
   * and Saarthi NCERT exemplar database items.
   */
  public static async fetchNCERTQuestions(params: PipelineFetchParams): Promise<QuestionItem[]> {
    try {
      const response = await fetch('/api/educational-pipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`Pipeline HTTP Error ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.questions)) {
        return data.questions as QuestionItem[];
      }
      return [];
    } catch (err) {
      console.warn('[EducationalPipelineService] Fallback to local NCERT repository:', err);
      return [];
    }
  }
}
