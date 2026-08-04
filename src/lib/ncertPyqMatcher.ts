import { AUTHENTIC_NEET_PYQS, PYQItem } from '../data/pyqData';
import { getAllTopics } from '../data/curriculumData';

export interface PyqMatchResult {
  pyq: PYQItem;
  matchType: 'exact_line' | 'high_yield_concept' | 'topic_matched';
  confidenceText: string;
}

export interface HighYieldNcertLine {
  id: string;
  chapterName: string;
  subjectId: string;
  lineText: string;
  sectionTitle: string;
  pageApprox: number;
  matchingPyqIds: string[];
}

export const HIGH_YIELD_NCERT_LINES: HighYieldNcertLine[] = [
  {
    id: 'hyl-1',
    chapterName: 'Cell: The Unit of Life',
    subjectId: 'biology',
    lineText: 'Lysosomes, vacuoles, and microbodies are single membrane-bound organellar structures.',
    sectionTitle: '8.5 Endomembrane System',
    pageApprox: 133,
    matchingPyqIds: ['pyq-bio-2025-1']
  },
  {
    id: 'hyl-2',
    chapterName: 'Molecular Basis of Inheritance',
    subjectId: 'biology',
    lineText: 'The unwinding of the DNA double helix during replication is catalyzed by DNA Helicase.',
    sectionTitle: '6.4 Replication',
    pageApprox: 106,
    matchingPyqIds: ['pyq-bio-2024-1']
  },
  {
    id: 'hyl-3',
    chapterName: 'Photosynthesis in Higher Plants',
    subjectId: 'biology',
    lineText: 'In C4 plants, the primary CO2 acceptor is 3-carbon phosphoenolpyruvate (PEP) present in mesophyll cells, yielding oxaloacetic acid (OAA).',
    sectionTitle: '13.7 The C4 Pathway',
    pageApprox: 218,
    matchingPyqIds: ['pyq-bio-2023-1']
  },
  {
    id: 'hyl-4',
    chapterName: 'Human Reproduction',
    subjectId: 'biology',
    lineText: 'A rapid surge in Luteinizing Hormone (LH) induces rupture of Graafian follicle and thereby the release of ovum (ovulation).',
    sectionTitle: '3.4 Menstrual Cycle',
    pageApprox: 51,
    matchingPyqIds: ['pyq-bio-2021-1']
  },
  {
    id: 'hyl-5',
    chapterName: 'Units, Dimensions & Error Analysis',
    subjectId: 'physics',
    lineText: 'The velocity of electromagnetic waves in vacuum is given by c = 1 / √(μ₀ ε₀) with dimensions [M⁰ L¹ T⁻¹].',
    sectionTitle: '8.3 Electromagnetic Waves',
    pageApprox: 270,
    matchingPyqIds: ['pyq-phy-2025-1']
  },
  {
    id: 'hyl-6',
    chapterName: 'Current Electricity',
    subjectId: 'physics',
    lineText: 'When a wire of length L is stretched to n times its length, its area becomes A/n and its new resistance becomes n² R.',
    sectionTitle: '3.7 Resistivity of Various Materials',
    pageApprox: 101,
    matchingPyqIds: ['pyq-phy-2023-1']
  },
  {
    id: 'hyl-7',
    chapterName: 'Chemical Bonding & Molecular Structure',
    subjectId: 'chemistry',
    lineText: 'N₂ molecule has 14 electrons with zero unpaired electrons (diamagnetic) and a bond order of 3.',
    sectionTitle: '4.7 Molecular Orbital Theory',
    pageApprox: 125,
    matchingPyqIds: ['pyq-chem-2025-1']
  },
  {
    id: 'hyl-8',
    chapterName: 'Coordination Compounds',
    subjectId: 'chemistry',
    lineText: '[Fe(CN)₆]³⁻ is an inner orbital octahedral complex with d²sp³ hybridization and 1 unpaired electron (paramagnetic).',
    sectionTitle: '9.5 Bonding in Coordination Compounds',
    pageApprox: 248,
    matchingPyqIds: ['pyq-chem-2024-1']
  }
];

export function findPyqsForNcertLine(
  chapterName: string,
  selectedText: string,
  subjectId?: string
): PyqMatchResult[] {
  const results: PyqMatchResult[] = [];
  const textLower = selectedText.toLowerCase().trim();
  const chapterLower = chapterName.toLowerCase().trim();

  // Combine AUTHENTIC_NEET_PYQS with curriculum topic PYQs
  const allPyqs: PYQItem[] = [...AUTHENTIC_NEET_PYQS];
  const curriculumTopics = getAllTopics();
  curriculumTopics.forEach((t) => {
    if (t.pyqs) {
      t.pyqs.forEach((p) => {
        if (!allPyqs.some((existing) => existing.id === p.id)) {
          allPyqs.push({
            id: p.id,
            topicId: t.id,
            topicTitle: t.title,
            chapterName: t.title,
            subjectId: t.subjectId,
            question: p.question,
            options: p.options,
            correctAnswerId: p.correctAnswerId,
            explanation: p.explanation,
            year: p.year
          });
        }
      });
    }
  });

  // Check high-yield exact/near-exact line matches
  for (const hyl of HIGH_YIELD_NCERT_LINES) {
    const hylTextLower = hyl.lineText.toLowerCase();
    const isChapterMatch = hyl.chapterName.toLowerCase().includes(chapterLower) || chapterLower.includes(hyl.chapterName.toLowerCase());
    const isTextMatch = textLower.length > 5 && (hylTextLower.includes(textLower) || textLower.includes(hylTextLower.slice(0, 20)));

    if (isChapterMatch || isTextMatch) {
      for (const pyqId of hyl.matchingPyqIds) {
        const found = allPyqs.find((p) => p.id === pyqId);
        if (found && !results.some((r) => r.pyq.id === found.id)) {
          results.push({
            pyq: found,
            matchType: 'exact_line',
            confidenceText: 'Verified NEET PYQ Direct Line Link'
          });
        }
      }
    }
  }

  // Next, match by chapter name + keyword overlap
  const keywords = textLower
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['this', 'that', 'with', 'from', 'have', 'were', 'which', 'their'].includes(w));

  for (const pyq of allPyqs) {
    if (results.some((r) => r.pyq.id === pyq.id)) continue;

    const pyqChapLower = pyq.chapterName.toLowerCase();
    const pyqTopicLower = pyq.topicTitle.toLowerCase();
    const isChapterRelated = pyqChapLower.includes(chapterLower) || chapterLower.includes(pyqChapLower) || pyqTopicLower.includes(chapterLower);

    if (subjectId && pyq.subjectId !== subjectId && !isChapterRelated) continue;

    const pyqFullText = `${pyq.question} ${pyq.explanation}`.toLowerCase();
    let keywordHits = 0;
    keywords.forEach((kw) => {
      if (pyqFullText.includes(kw)) {
        keywordHits++;
      }
    });

    if (isChapterRelated && (keywordHits >= 1 || keywords.length === 0)) {
      results.push({
        pyq,
        matchType: keywordHits >= 2 ? 'high_yield_concept' : 'topic_matched',
        confidenceText: keywordHits >= 2 ? 'AI-Matched High Yield Concept' : 'AI-Matched Chapter Topic'
      });
    } else if (keywordHits >= 3) {
      results.push({
        pyq,
        matchType: 'high_yield_concept',
        confidenceText: 'AI-Matched Conceptual Similarity'
      });
    }
  }

  return results.slice(0, 5);
}
