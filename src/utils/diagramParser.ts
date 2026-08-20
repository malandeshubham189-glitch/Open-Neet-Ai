import { DiagramSpec, DiagramNode, DiagramConnection, DiagramFlowStep, DiagramLegendItem } from '../types/diagram';
import { findMatchingDiagram, VERIFIED_DIAGRAM_LIBRARY } from './diagramLibrary';

export interface ParsedMessageContent {
  isDiagramMessage: boolean;
  diagramSpec: DiagramSpec | null;
  cleanedText: string;
  whatYouSee?: string;
  stepByStepMechanism?: string[];
  examTip?: string;
}

/**
 * Validates and sanitizes a parsed JSON object into a conforming DiagramSpec
 */
export function validateDiagramSpec(obj: any): DiagramSpec | null {
  if (!obj || typeof obj !== 'object') return null;

  // Must have a title or diagramType
  const title = typeof obj.title === 'string' ? obj.title : 'Interactive Educational Diagram';
  const diagramType = obj.diagramType || 'anatomical';

  // Check nodes array
  if (!Array.isArray(obj.nodes) || obj.nodes.length === 0) {
    // If no nodes, but title matches a known diagram, fallback to verified library
    const matching = findMatchingDiagram(title + ' ' + (obj.subtitle || ''));
    if (matching) return matching;
    return null;
  }

  // Validate and sanitize nodes
  const sanitizedNodes: DiagramNode[] = obj.nodes.map((n: any, idx: number) => ({
    id: n.id || `node-${idx}`,
    label: String(n.label || `Part ${idx + 1}`),
    sublabel: n.sublabel ? String(n.sublabel) : undefined,
    category: n.category || 'neutral',
    x: typeof n.x === 'number' ? n.x : 100 + (idx % 4) * 160,
    y: typeof n.y === 'number' ? n.y : 100 + Math.floor(idx / 4) * 100,
    width: typeof n.width === 'number' ? n.width : 130,
    height: typeof n.height === 'number' ? n.height : 38,
    r: typeof n.r === 'number' ? n.r : 24,
    rx: typeof n.rx === 'number' ? n.rx : undefined,
    ry: typeof n.ry === 'number' ? n.ry : undefined,
    shape: n.shape || (n.r ? 'circle' : 'capsule'),
    color: n.color || '#2563eb',
    details: n.details && typeof n.details === 'object' ? {
      functionEn: n.details.functionEn ? String(n.details.functionEn) : undefined,
      functionHinglish: n.details.functionHinglish ? String(n.details.functionHinglish) : undefined,
      functionMarathi: n.details.functionMarathi ? String(n.details.functionMarathi) : undefined,
      ncertNote: n.details.ncertNote ? String(n.details.ncertNote) : undefined,
      clinicalSignificance: n.details.clinicalSignificance ? String(n.details.clinicalSignificance) : undefined
    } : undefined,
    leaderLine: n.leaderLine || undefined
  }));

  // Validate connections
  const sanitizedConnections: DiagramConnection[] = Array.isArray(obj.connections)
    ? obj.connections.map((c: any, idx: number) => ({
        id: c.id || `conn-${idx}`,
        from: c.from,
        to: c.to,
        pathD: c.pathD,
        points: Array.isArray(c.points) ? c.points : undefined,
        label: c.label ? String(c.label) : undefined,
        type: c.type || 'arrow',
        color: c.color,
        strokeWidth: typeof c.strokeWidth === 'number' ? c.strokeWidth : 3.5,
        strokeDasharray: c.strokeDasharray,
        animatedFlow: c.animatedFlow !== false,
        arrowEnd: c.arrowEnd !== false,
        stepNumber: typeof c.stepNumber === 'number' ? c.stepNumber : undefined
      }))
    : [];

  // Validate legend
  const sanitizedLegend: DiagramLegendItem[] = Array.isArray(obj.legend)
    ? obj.legend.map((l: any) => ({
        label: String(l.label || ''),
        color: String(l.color || '#2563eb'),
        description: l.description ? String(l.description) : undefined
      }))
    : [
        { label: 'Deoxygenated / Primary', color: '#2563eb' },
        { label: 'Oxygenated / Active', color: '#dc2626' }
      ];

  // Validate flowSteps
  const sanitizedFlowSteps: DiagramFlowStep[] = Array.isArray(obj.flowSteps)
    ? obj.flowSteps.map((s: any, idx: number) => ({
        step: typeof s.step === 'number' ? s.step : idx + 1,
        title: String(s.title || `Step ${idx + 1}`),
        description: String(s.description || ''),
        highlightNodeIds: Array.isArray(s.highlightNodeIds) ? s.highlightNodeIds : undefined
      }))
    : [];

  // If this is a human heart diagram, augment with anatomically verified coordinates and regions for optimal clarity
  const titleLower = title.toLowerCase();
  if (titleLower.includes('heart') || titleLower.includes('cardiac') || titleLower.includes('circulation')) {
    const verifiedHeart = VERIFIED_DIAGRAM_LIBRARY.heart;
    return {
      ...verifiedHeart,
      title: obj.title || verifiedHeart.title,
      subtitle: obj.subtitle || verifiedHeart.subtitle,
      explanation: obj.explanation || verifiedHeart.explanation
    };
  }

  // If nephron
  if (titleLower.includes('nephron') || titleLower.includes('kidney') || titleLower.includes('urine')) {
    const verifiedNephron = VERIFIED_DIAGRAM_LIBRARY.nephron;
    return {
      ...verifiedNephron,
      title: obj.title || verifiedNephron.title,
      explanation: obj.explanation || verifiedNephron.explanation
    };
  }

  // If cell
  if (titleLower.includes('cell') || titleLower.includes('organelle')) {
    const verifiedCell = VERIFIED_DIAGRAM_LIBRARY.cell;
    return {
      ...verifiedCell,
      title: obj.title || verifiedCell.title,
      explanation: obj.explanation || verifiedCell.explanation
    };
  }

  // If distribution
  if (titleLower.includes('distribution') || titleLower.includes('gaussian') || titleLower.includes('bell curve')) {
    const verifiedDist = VERIFIED_DIAGRAM_LIBRARY.distribution;
    return {
      ...verifiedDist,
      title: obj.title || verifiedDist.title,
      explanation: obj.explanation || verifiedDist.explanation
    };
  }

  // If ray optics
  if (titleLower.includes('lens') || titleLower.includes('ray') || titleLower.includes('optics')) {
    const verifiedOptics = VERIFIED_DIAGRAM_LIBRARY.ray_optics;
    return {
      ...verifiedOptics,
      title: obj.title || verifiedOptics.title,
      explanation: obj.explanation || verifiedOptics.explanation
    };
  }

  return {
    id: obj.id || `diagram-${Date.now()}`,
    diagramType,
    title,
    subtitle: obj.subtitle ? String(obj.subtitle) : undefined,
    view: obj.view ? String(obj.view) : undefined,
    isSimplified: obj.isSimplified !== false,
    ncertReference: obj.ncertReference ? String(obj.ncertReference) : 'NCERT Aligned Interactive Educational Diagram',
    viewBox: obj.viewBox || { minX: 0, minY: 0, width: 800, height: 520 },
    regions: Array.isArray(obj.regions) ? obj.regions : [],
    nodes: sanitizedNodes,
    connections: sanitizedConnections,
    labels: Array.isArray(obj.labels) ? obj.labels : [],
    legend: sanitizedLegend,
    flowSteps: sanitizedFlowSteps,
    examTips: Array.isArray(obj.examTips) ? obj.examTips : [],
    explanation: obj.explanation && typeof obj.explanation === 'object' ? {
      whatYouSee: String(obj.explanation.whatYouSee || ''),
      stepByStepMechanism: Array.isArray(obj.explanation.stepByStepMechanism) ? obj.explanation.stepByStepMechanism : [],
      examTip: String(obj.explanation.examTip || '')
    } : undefined
  };
}

/**
 * Extracts embedded or standalone JSON diagram specs, strips JSON code from text,
 * and eliminates all ASCII art / raw braces.
 */
export function parseEducationalMessage(rawContent: string): ParsedMessageContent {
  if (!rawContent) {
    return { isDiagramMessage: false, diagramSpec: null, cleanedText: '' };
  }

  let text = rawContent;
  let diagramSpec: DiagramSpec | null = null;

  // 1. Check for fenced code blocks: ```json ... ``` or ```diagram ... ``` or ```educational-diagram ... ```
  const codeBlockRegex = /```(?:json|educational-diagram|diagram|json:diagram|svg-diagram)?\s*(\{[\s\S]*?\})\s*```/gi;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = codeBlockRegex.exec(rawContent)) !== null) {
    try {
      const candidate = JSON.parse(blockMatch[1].trim());
      const validated = validateDiagramSpec(candidate);
      if (validated) {
        diagramSpec = validated;
        // Strip the entire fenced codeblock from the displayed text
        text = text.replace(blockMatch[0], '').trim();
        break;
      }
    } catch {
      // Not valid JSON in this block; continue searching
    }
  }

  // 2. Check for bare un-fenced JSON object starting with { and containing diagram markers
  if (!diagramSpec) {
    const rawJsonRegex = /\{[\s\r\n]*"(?:title|diagramType|nodes|id|type)"[\s\S]*\}/;
    const rawMatch = text.match(rawJsonRegex);
    if (rawMatch) {
      try {
        const candidate = JSON.parse(rawMatch[0].trim());
        const validated = validateDiagramSpec(candidate);
        if (validated) {
          diagramSpec = validated;
          text = text.replace(rawMatch[0], '').trim();
        }
      } catch {
        // Try finding the exact outer bounds of JSON substring
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          const jsonSubstring = text.substring(firstBrace, lastBrace + 1);
          try {
            const candidate = JSON.parse(jsonSubstring);
            const validated = validateDiagramSpec(candidate);
            if (validated) {
              diagramSpec = validated;
              text = text.replace(jsonSubstring, '').trim();
            }
          } catch {
            // If parse fails, check if the text mentions a known diagram
            const matching = findMatchingDiagram(text);
            if (matching) {
              diagramSpec = matching;
              text = text.replace(jsonSubstring, '').trim();
            }
          }
        }
      }
    }
  }

  // 3. Keyword / Prompt matching fallback: if user or AI mentions diagram keywords
  if (!diagramSpec) {
    const lower = text.toLowerCase();
    const isVisualRequest =
      lower.includes('diagram') ||
      lower.includes('draw') ||
      lower.includes('heart') ||
      lower.includes('nephron') ||
      lower.includes('blood circulation') ||
      lower.includes('blood flow') ||
      lower.includes('visualize') ||
      lower.includes('ray optics') ||
      lower.includes('normal distribution') ||
      lower.includes('cell structure') ||
      lower.includes('chitra') ||
      lower.includes('aakruti');

    if (isVisualRequest) {
      diagramSpec = findMatchingDiagram(text);
    }
  }

  // 4. CRITICAL ANTI-LEAK SANITIZATION:
  // Strip ANY remaining JSON code blocks (e.g. ```json ... ```) or stray JSON braces
  text = text.replace(/```(?:json|diagram)?\s*\{[\s\S]*?\}\s*```/gi, '').trim();
  text = text.replace(/```[\s\S]*?```/gi, (match) => {
    // If the code block looks like JSON with braces, remove it completely
    if (match.includes('{') && match.includes('}')) return '';
    return match;
  });

  // Strip raw dangling JSON objects containing "title", "nodes", "connections", or "type"
  text = text.replace(/\{[\s\r\n]*"(?:title|nodes|connections|diagramType|flowSteps|type)"[\s\S]*?\}/gi, '').trim();

  // Strip JSON object artifacts like "nodes": [...] or "type": "human_heart_flow"
  text = text.replace(/"type"\s*:\s*"[^"]+",?/g, '');
  text = text.replace(/"diagramType"\s*:\s*"[^"]+",?/g, '');
  text = text.replace(/"nodes"\s*:\s*\[[\s\S]*?\],?/g, '');
  text = text.replace(/"connections"\s*:\s*\[[\s\S]*?\],?/g, '');

  // Strip ASCII box art / character representations e.g. [RA]--[LA], |----|, +---+
  const asciiPatterns = [
    /\[[A-Za-z0-9\s]+\]\s*[-|+=]+\s*\[[A-Za-z0-9\s]+\]/g,
    /\|[-+\s]+\|/g,
    /[-+]{3,}\n\|[^\n]+\|\n[-+]{3,}/g,
    /┌[─┬]+┐[\s\S]*?└[─┴]+┘/g
  ];
  for (const pattern of asciiPatterns) {
    text = text.replace(pattern, '').trim();
  }

  // Clean multiple blank lines
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  // If text became completely empty (AI returned only JSON), provide a clean educational greeting
  if (!text && diagramSpec) {
    text = `Here is the complete interactive NCERT visual diagram for **${diagramSpec.title}**. You can inspect each structure, toggle the blood flow animation, or step through the flow below:`;
  }

  return {
    isDiagramMessage: !!diagramSpec,
    diagramSpec,
    cleanedText: text,
    whatYouSee: diagramSpec?.explanation?.whatYouSee,
    stepByStepMechanism: diagramSpec?.explanation?.stepByStepMechanism,
    examTip: diagramSpec?.explanation?.examTip
  };
}
