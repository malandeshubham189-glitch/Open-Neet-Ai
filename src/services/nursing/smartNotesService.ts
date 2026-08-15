import { NursingTopic } from '../../types/nursing';

export interface FormattedSmartNotes {
  topicTitle: string;
  subjectName: string;
  unitTitle: string;
  overview?: string;
  clinicalPearls?: string[];
  quickRevisionPoints?: string[];
  sections: {
    title: string;
    icon: string;
    content: string | string[];
    isHighlighted?: boolean;
  }[];
  generatedDate: string;
  syllabusAuthority: string;
}

export class SmartNotesService {
  /**
   * Generates comprehensive, high-yield academic notes structured for MUHS/INC university examinations.
   */
  public static generateStructuredNotes(topic: NursingTopic): FormattedSmartNotes {
    const sections: FormattedSmartNotes['sections'] = [];
    const overview = topic.notes?.overview || topic.description || 'Clinical overview for this syllabus topic.';
    const clinicalPearls = topic.notes?.clinicalPearls || [
      'Prioritize ABC (Airway, Breathing, Circulation) and safety precautions.',
      'Document vital trends and report acute abnormalities immediately.',
      'Adhere strictly to 5 rights of medication administration.'
    ];
    const quickRevisionPoints = topic.notes?.quickRevision || [
      'Core NANDA diagnosis formulation',
      'First-line pharmacological interventions & critical antidotes',
      'Diagnostic gold standards & vital parameter thresholds'
    ];

    // 1. Core Concept & Academic Overview
    if (topic.notes?.overview) {
      sections.push({
        title: '1. Core Concept & Academic Overview',
        icon: 'BookOpen',
        content: topic.notes.overview,
        isHighlighted: true
      });
    }

    // 2. Standard Definitions & Textbook References
    if (topic.definitions && topic.definitions.length > 0) {
      const defStrings = topic.definitions.map(
        (d) => `**${d.term}**: ${d.definition} *(Source: ${d.referenceSource})*`
      );
      sections.push({
        title: '2. Standard University Definitions',
        icon: 'Bookmark',
        content: defStrings
      });
    }

    // 3. Classifications & Staging
    if (topic.notes?.classifications && topic.notes.classifications.length > 0) {
      sections.push({
        title: '3. Clinical Classification & Types',
        icon: 'Layers',
        content: topic.notes.classifications
      });
    }

    // 4. Etiology & High-Yield Risk Factors
    if (topic.notes?.etiologyAndRiskFactors && topic.notes.etiologyAndRiskFactors.length > 0) {
      sections.push({
        title: '4. Etiology & Predisposing Factors',
        icon: 'AlertCircle',
        content: topic.notes.etiologyAndRiskFactors
      });
    }

    // 5. Pathophysiology (Step-by-Step Mechanism)
    if (topic.notes?.pathophysiologySteps && topic.notes.pathophysiologySteps.length > 0) {
      sections.push({
        title: '5. Pathophysiology Flowchart & Mechanism',
        icon: 'GitBranch',
        content: topic.notes.pathophysiologySteps,
        isHighlighted: true
      });
    }

    // 6. Clinical Manifestations & Cardinal Signs
    if (topic.notes?.clinicalManifestations && topic.notes.clinicalManifestations.length > 0) {
      sections.push({
        title: '6. Clinical Features & Cardinal Signs',
        icon: 'Activity',
        content: topic.notes.clinicalManifestations
      });
    }

    // 7. Diagnostic Workup & Investigations
    if (topic.notes?.diagnosticEvaluation && topic.notes.diagnosticEvaluation.length > 0) {
      sections.push({
        title: '7. Diagnostic Evaluation & Lab Findings',
        icon: 'Search',
        content: topic.notes.diagnosticEvaluation
      });
    }

    // 8. Medical & Pharmacological Management
    if (topic.notes?.medicalManagement && topic.notes.medicalManagement.length > 0) {
      sections.push({
        title: '8. Medical & Pharmacological Management',
        icon: 'Pill',
        content: topic.notes.medicalManagement
      });
    }

    // 9. Surgical Interventions
    if (topic.notes?.surgicalManagement && topic.notes.surgicalManagement.length > 0) {
      sections.push({
        title: '9. Surgical Interventions & Post-Op Protocols',
        icon: 'Scissors',
        content: topic.notes.surgicalManagement
      });
    }

    // 10. Nursing Management & NANDA Priorities
    if (topic.notes?.nursingManagement && topic.notes.nursingManagement.length > 0) {
      sections.push({
        title: '10. Nursing Interventions & Patient Care',
        icon: 'HeartHandshake',
        content: topic.notes.nursingManagement,
        isHighlighted: true
      });
    }

    // 11. Potential Complications & Red Flags
    if (topic.notes?.complications && topic.notes.complications.length > 0) {
      sections.push({
        title: '11. Complications & Emergency Red Flags',
        icon: 'ShieldAlert',
        content: topic.notes.complications
      });
    }

    // 12. Clinical Pearls & University Exam Tips
    if (topic.notes?.clinicalPearls && topic.notes.clinicalPearls.length > 0) {
      sections.push({
        title: '12. High-Yield Exam Pearls & Safety Rules',
        icon: 'Sparkles',
        content: topic.notes.clinicalPearls,
        isHighlighted: true
      });
    }

    // 13. Quick 2-Minute Revision Summary
    if (topic.notes?.quickRevision && topic.notes.quickRevision.length > 0) {
      sections.push({
        title: '13. Quick 2-Minute Pre-Exam Recall',
        icon: 'CheckCircle2',
        content: topic.notes.quickRevision
      });
    }

    return {
      topicTitle: topic.title,
      subjectName: topic.subjectName,
      unitTitle: topic.unitTitle,
      overview,
      clinicalPearls,
      quickRevisionPoints,
      sections,
      generatedDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      syllabusAuthority: 'Maharashtra University of Health Sciences (MUHS) & INC Guidelines'
    };
  }
}
