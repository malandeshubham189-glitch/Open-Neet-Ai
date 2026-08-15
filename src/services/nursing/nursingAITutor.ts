import { NursingSubjectId, NursingYear } from '../../types/nursing';

export interface NursingAIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  clinicalHighlight?: string;
}

export interface NursingAITutorRequest {
  query: string;
  topicId?: string;
  topicTitle?: string;
  subjectId?: NursingSubjectId;
  subjectName?: string;
  year?: NursingYear;
  mode?: 'concept_explanation' | 'ncp_generation' | 'muhs_laq_answer' | 'drug_nursing_consideration' | 'exam_prediction';
  chatHistory?: { role: 'user' | 'model'; parts: string }[];
}

export class NursingAITutorService {
  public static async askNursingAI(request: NursingAITutorRequest): Promise<string> {
    try {
      const response = await fetch('/api/nursing/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      return data.text || 'I apologize, I could not generate a clinical explanation at this moment. Please try again.';
    } catch (error) {
      console.error('Nursing AI Tutor error:', error);
      return `### Clinical Nursing Academic Guidance
**Topic**: ${request.topicTitle || 'B.Sc Nursing Theory'}

Here is a structured academic summary to help with your MUHS/INC theory exam preparation:

1. **Definition & Overview**: Ensure you memorize the standard definition with author/organization reference (e.g., Brunner & Suddarth or WHO).
2. **Pathophysiology Sequence**: Structure your answer in flowchart steps: Etiological trigger → Cellular injury → Inflammatory response → Clinical manifestations.
3. **Nursing Diagnoses (NANDA)**: Always prioritize using the "Problem related to Etiology as evidenced by Symptoms (PES)" format.
4. **Nursing Interventions with Rationales**: Always provide an evidence-based scientific rationale for every nursing action.

*Academic Disclaimer: This educational AI tutor is strictly intended for B.Sc Nursing theory exam preparation.*`;
    }
  }
}
