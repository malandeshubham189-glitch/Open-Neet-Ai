import {
  StructuredNotes,
  NotesSection,
  NotesBlock,
  TableBlock,
  FormulaBlock,
  DefinitionBlock,
  ExampleBlock,
  WarningBlock,
  TipBlock,
  SummaryBlock
} from '../types/notes';

/**
 * Sanitizes LaTeX and raw math symbols into clean, readable Unicode format.
 * Strips all raw '$', '$$', and converts common LaTeX macros.
 */
export function cleanMathText(rawText: string): string {
  if (!rawText) return '';

  return rawText
    // Remove double/single math dollar signs
    .replace(/\$\$(.*?)\$\$/g, '$1')
    .replace(/\$(.*?)\$/g, '$1')
    // Common LaTeX Fractions
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1 / $2)')
    // Common LaTeX Roots & Powers
    .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)')
    .replace(/\\sqrt\[([^{}]+)\]\{([^{}]+)\}/g, '$1√($2)')
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/\^n\b/g, 'ⁿ')
    .replace(/\^t\b/g, 'ᵀ')
    .replace(/_([0-9a-zA-Z])/g, '$1')
    // Common Greek & Mathematical symbols
    .replace(/\\sum_\{([^{}]+)\}\^\{([^{}]+)\}/g, '∑ ($1 to $2)')
    .replace(/\\sum/g, '∑')
    .replace(/\\prod/g, '∏')
    .replace(/\\int/g, '∫')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\epsilon/g, 'ε')
    .replace(/\\theta/g, 'θ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\pi/g, 'π')
    .replace(/\\sigma\^2/g, 'σ²')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\bar\{([^{}]+)\}/g, '$1̄')
    .replace(/\\hat\{([^{}]+)\}/g, '$1̂')
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\mathbb\{N\}/g, 'ℕ')
    .replace(/\\mathbb\{Z\}/g, 'ℤ')
    .replace(/\\mathbb\{Q\}/g, 'ℚ')
    .replace(/\\mathbb\{C\}/g, 'ℂ')
    .replace(/\\infty/g, '∞')
    .replace(/\\in/g, '∈')
    .replace(/\\notin/g, '∉')
    .replace(/\\subset/g, '⊂')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\cup/g, '∪')
    .replace(/\\cap/g, '∩')
    .replace(/\\emptyset/g, '∅')
    .replace(/\\le|\\leq/g, '≤')
    .replace(/\\ge|\\geq/g, '≥')
    .replace(/\\ne|\\neq/g, '≠')
    .replace(/\\approx/g, '≈')
    .replace(/\\equiv/g, '≡')
    .replace(/\\pm/g, '±')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\cdot/g, '·')
    .replace(/\\rightarrow|\\to/g, '→')
    .replace(/\\leftarrow/g, '←')
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\Leftrightarrow/g, '⇔')
    .replace(/\\forall/g, '∀')
    .replace(/\\exists/g, '∃')
    .replace(/\\quad|\\qquad/g, '   ')
    .replace(/\\text\{([^{}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^{}]+)\}/g, '$1')
    .replace(/\\mathit\{([^{}]+)\}/g, '$1')
    .replace(/\\mathrm\{([^{}]+)\}/g, '$1')
    // Clean residual backslashes
    .replace(/\\([a-zA-Z]+)/g, '$1')
    .trim();
}

/**
 * Strips raw markdown tokens (###, **, *, `, etc.) for plain display if needed.
 */
export function stripRawMarkdownSymbols(text: string): string {
  if (!text) return '';
  return cleanMathText(text)
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '');
}

/**
 * Parse any raw input (JSON object, JSON string, or Markdown text) into strongly typed StructuredNotes.
 */
export function parseNotesToStructured(
  rawInput: string | unknown,
  fallbackMetadata?: {
    title?: string;
    subtitle?: string;
    subjectName?: string;
    weekNumber?: number;
    lessonOrder?: number;
  }
): StructuredNotes {
  // 1. If already a valid structured notes object
  if (
    rawInput &&
    typeof rawInput === 'object' &&
    'sections' in (rawInput as Record<string, unknown>) &&
    Array.isArray((rawInput as Record<string, unknown>).sections)
  ) {
    return rawInput as StructuredNotes;
  }

  // 2. If it's a string, attempt JSON parse first
  if (typeof rawInput === 'string') {
    const trimmed = rawInput.trim();
    // Check if JSON wrapped in code block
    let jsonCandidate = trimmed;
    if (jsonCandidate.startsWith('```json')) {
      jsonCandidate = jsonCandidate.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    } else if (jsonCandidate.startsWith('```')) {
      jsonCandidate = jsonCandidate.replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
    }

    if (jsonCandidate.startsWith('{') && jsonCandidate.endsWith('}')) {
      try {
        const parsed = JSON.parse(jsonCandidate);
        if (parsed.sections && Array.isArray(parsed.sections)) {
          return parsed as StructuredNotes;
        }
      } catch {
        // Fall back to Markdown parser
      }
    }

    return parseMarkdownToStructuredNotes(rawInput, fallbackMetadata);
  }

  // 3. Fallback default empty structured note
  return {
    title: fallbackMetadata?.title || 'Study Notes & Formula Guide',
    subtitle: fallbackMetadata?.subtitle || 'IIT Madras BS Degree Foundation Level',
    subjectName: fallbackMetadata?.subjectName || 'Foundation Course',
    weekNumber: fallbackMetadata?.weekNumber || 1,
    sections: [
      {
        id: 'sec-intro',
        heading: 'Overview & Key Concepts',
        blocks: [
          {
            type: 'paragraph',
            text: 'Detailed conceptual study notes and formula breakdown.'
          }
        ]
      }
    ]
  };
}

/**
 * Robust line-by-line Markdown parser that constructs typed sections and blocks.
 */
function parseMarkdownToStructuredNotes(
  markdown: string,
  fallbackMetadata?: {
    title?: string;
    subtitle?: string;
    subjectName?: string;
    weekNumber?: number;
    lessonOrder?: number;
  }
): StructuredNotes {
  const lines = markdown.split('\n');
  let title = fallbackMetadata?.title || 'Study Notes & Formula Sheet';
  let subtitle = fallbackMetadata?.subtitle || 'IIT Madras BS Degree — Qualifier Exam & Quiz 1 Focus';
  const sections: NotesSection[] = [];

  let currentSection: NotesSection | null = null;
  let currentList: { type: 'bulletList' | 'numberedList'; items: string[] } | null = null;
  let tableBuffer: string[] = [];
  let summaryPoints: string[] = [];

  const flushList = () => {
    if (currentList && currentSection && currentList.items.length > 0) {
      currentSection.blocks.push({
        type: currentList.type,
        items: [...currentList.items]
      });
      currentList = null;
    }
  };

  const flushTable = () => {
    if (tableBuffer.length >= 2 && currentSection) {
      const parsedTable = parseMarkdownTable(tableBuffer);
      if (parsedTable) {
        currentSection.blocks.push(parsedTable);
      }
      tableBuffer = [];
    }
  };

  const ensureSection = (headingName = 'General Concepts'): NotesSection => {
    if (!currentSection) {
      currentSection = {
        id: `sec-${sections.length + 1}`,
        heading: headingName,
        blocks: []
      };
      sections.push(currentSection);
    }
    return currentSection;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table Row detection (contains |)
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      tableBuffer.push(line);
      continue;
    } else if (tableBuffer.length > 0) {
      flushTable();
    }

    // H1 / H2 / H3 Header detection
    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ') || line.startsWith('#### ')) {
      flushList();
      flushTable();

      const headerText = cleanMathText(line.replace(/^#+\s*/, '').trim());

      // If document title has not been set and this is the first H1/H2/H3
      if (sections.length === 0 && !currentSection && (line.startsWith('# ') || line.startsWith('## '))) {
        title = headerText.replace(/^📘\s*/, '').replace(/^🔑\s*/, '').replace(/^💡\s*/, '');
        continue;
      }

      // Detect sub-title markers (e.g., Course: or Focus:)
      if (line.toLowerCase().includes('course:') || line.toLowerCase().includes('focus:')) {
        subtitle = cleanMathText(line.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim());
        continue;
      }

      // Start a new section
      currentSection = {
        id: `sec-${sections.length + 1}`,
        heading: headerText,
        blocks: []
      };
      sections.push(currentSection);
      continue;
    }

    // Subheading (H5 or bold standalone title ending in colon)
    if (line.startsWith('##### ') || (line.startsWith('**') && line.endsWith('**') && line.length < 60)) {
      flushList();
      flushTable();
      const sec = ensureSection();
      const subHeadingText = stripRawMarkdownSymbols(line);
      sec.blocks.push({
        type: 'subheading',
        text: subHeadingText
      });
      continue;
    }

    // Definition Block detection
    if (
      line.toLowerCase().startsWith('definition:') ||
      line.toLowerCase().startsWith('**definition') ||
      line.toLowerCase().startsWith('def:')
    ) {
      flushList();
      flushTable();
      const sec = ensureSection();
      const cleanLine = line.replace(/^\*\*Definition.*?\*\*:\s*/i, '').replace(/^Definition:\s*/i, '').trim();
      const parts = cleanLine.split(/—|-|:/);
      const term = parts.length > 1 ? parts[0].trim() : 'Core Definition';
      const defText = parts.length > 1 ? parts.slice(1).join(' - ').trim() : cleanLine;

      sec.blocks.push({
        type: 'definition',
        term: cleanMathText(term),
        definition: cleanMathText(defText)
      });
      continue;
    }

    // Formula Block detection
    if (
      line.toLowerCase().startsWith('formula:') ||
      line.toLowerCase().startsWith('**formula') ||
      line.toLowerCase().startsWith('theorem:') ||
      line.includes('`') && (line.toLowerCase().includes('=') || line.toLowerCase().includes('formula'))
    ) {
      flushList();
      flushTable();
      const sec = ensureSection();

      let label = 'Core Formula';
      let expression = line;
      let note = '';

      if (line.includes('**') && line.includes(':')) {
        const labelMatch = line.match(/\*\*([^*]+)\*\*/);
        if (labelMatch) label = labelMatch[1].replace(/:$/, '').trim();
      }

      const codeMatch = line.match(/`([^`]+)`/);
      if (codeMatch) {
        expression = codeMatch[1];
      } else {
        expression = line.replace(/^\*\*.*?\*\*:\s*/, '').replace(/^Formula:\s*/i, '');
      }

      // Check next line for notes
      if (i + 1 < lines.length && lines[i + 1].trim().toLowerCase().startsWith('*note*:')) {
        note = lines[i + 1].trim().replace(/^\*note\*:\s*/i, '');
        i++;
      }

      sec.blocks.push({
        type: 'formula',
        label: cleanMathText(label),
        expression: cleanMathText(expression),
        explanation: note ? cleanMathText(note) : undefined
      });
      continue;
    }

    // Warning / Caution detection
    if (
      line.toLowerCase().startsWith('warning:') ||
      line.toLowerCase().startsWith('caution:') ||
      line.toLowerCase().startsWith('common mistake:') ||
      line.startsWith('⚠️')
    ) {
      flushList();
      flushTable();
      const sec = ensureSection();
      sec.blocks.push({
        type: 'warning',
        title: 'Common Qualifier Exam Trap',
        message: cleanMathText(line.replace(/^(⚠️|Warning:|Caution:|Common Mistake:)\s*/i, '').trim())
      });
      continue;
    }

    // Tip / Qualifier Trick detection
    if (
      line.toLowerCase().startsWith('tip:') ||
      line.toLowerCase().startsWith('exam tip:') ||
      line.toLowerCase().startsWith('qualifier tip:') ||
      line.toLowerCase().startsWith('shortcut:') ||
      line.startsWith('💡') ||
      line.startsWith('🎯')
    ) {
      flushList();
      flushTable();
      const sec = ensureSection();
      sec.blocks.push({
        type: 'tip',
        title: 'Qualifier High-Yield Strategy',
        tipText: cleanMathText(line.replace(/^(💡|🎯|Tip:|Exam Tip:|Qualifier Tip:|Shortcut:)\s*/i, '').trim()),
        examFocus: true
      });
      continue;
    }

    // Example Problem detection
    if (
      line.toLowerCase().startsWith('example') ||
      line.toLowerCase().startsWith('worked example') ||
      line.toLowerCase().startsWith('problem:')
    ) {
      flushList();
      flushTable();
      const sec = ensureSection();
      const exTitle = cleanMathText(line.replace(/^#+\s*/, '').replace(/:$/, '').trim());

      // Collect subsequent lines as problem and solution steps
      const steps: string[] = [];
      let problem = '';
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith('#') && !lines[j].trim().startsWith('Example')) {
        const stepLine = lines[j].trim();
        if (stepLine) {
          if (!problem) {
            problem = cleanMathText(stepLine.replace(/^(Problem|Q):\s*/i, ''));
          } else {
            steps.push(cleanMathText(stepLine.replace(/^\d+\.\s*/, '').replace(/^Step\s*\d+:\s*/i, '')));
          }
        }
        j++;
      }
      i = j - 1;

      sec.blocks.push({
        type: 'example',
        title: exTitle || 'Worked Example',
        problem: problem || 'Find the mathematical solution step-by-step.',
        solutionSteps: steps.length > 0 ? steps : ['Apply the formula derived above to compute the final result.']
      });
      continue;
    }

    // Bullet List detection (- or *)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushTable();
      const itemText = cleanMathText(line.replace(/^[-*]\s+/, '').trim());
      if (!currentList || currentList.type !== 'bulletList') {
        flushList();
        currentList = { type: 'bulletList', items: [] };
      }
      currentList.items.push(itemText);
      continue;
    }

    // Numbered List detection (1. 2. etc.)
    if (/^\d+\.\s+/.test(line)) {
      flushTable();
      const itemText = cleanMathText(line.replace(/^\d+\.\s+/, '').trim());
      if (!currentList || currentList.type !== 'numberedList') {
        flushList();
        currentList = { type: 'numberedList', items: [] };
      }
      currentList.items.push(itemText);
      continue;
    }

    // Standard Paragraph
    flushList();
    flushTable();
    const sec = ensureSection();
    sec.blocks.push({
      type: 'paragraph',
      text: cleanMathText(line)
    });
  }

  flushList();
  flushTable();

  // If no sections were extracted, create a fallback single section
  if (sections.length === 0) {
    sections.push({
      id: 'sec-main',
      heading: 'Course Concepts & Key Formulas',
      blocks: [
        {
          type: 'paragraph',
          text: cleanMathText(markdown)
        }
      ]
    });
  }

  return {
    title,
    subtitle,
    subjectName: fallbackMetadata?.subjectName || 'IIT Madras BS Degree',
    weekNumber: fallbackMetadata?.weekNumber || 1,
    lessonOrder: fallbackMetadata?.lessonOrder || 1,
    examFocusTag: 'Qualifier Exam & Quiz 1 Prep',
    sections
  };
}

/**
 * Parses Markdown table lines into TableBlock object.
 */
function parseMarkdownTable(lines: string[]): TableBlock | null {
  if (lines.length < 2) return null;

  const headerLine = lines[0];
  const headers = headerLine
    .split('|')
    .map((h) => cleanMathText(h.trim()))
    .filter((h) => h.length > 0);

  const rows: string[][] = [];
  for (let i = 1; i < lines.length; i++) {
    const rowLine = lines[i].trim();
    // Skip separator lines like |---|---|
    if (/^\|?(\s*:?-+:?\s*\|)+\s*$/.test(rowLine)) {
      continue;
    }

    const cols = rowLine
      .split('|')
      .map((c) => cleanMathText(c.trim()))
      .filter((_, idx, arr) => (idx > 0 && idx < arr.length - 1) || arr.length <= 2);

    if (cols.length > 0) {
      rows.push(cols);
    }
  }

  return {
    type: 'table',
    headers: headers.length > 0 ? headers : ['Concept', 'Description'],
    rows: rows.length > 0 ? rows : [['Key Rule', 'Apply standard theorem']]
  };
}
