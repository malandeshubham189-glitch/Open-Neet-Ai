export type DiagramType =
  | 'anatomical'
  | 'process'
  | 'flowchart'
  | 'circuit'
  | 'physics_ray'
  | 'distribution'
  | 'biochemical'
  | 'generic';

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  hindiLabel?: string;
  marathiLabel?: string;
  shape?: 'rect' | 'circle' | 'ellipse' | 'path' | 'polygon' | 'capsule' | 'pill';
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
  rx?: number;
  ry?: number;
  pathD?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
  category?: 'deoxygenated' | 'oxygenated' | 'valve' | 'structure' | 'input' | 'output' | 'process' | 'highlight' | 'neutral';
  color?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: string;
  tooltip?: string;
  details?: {
    functionEn?: string;
    functionHinglish?: string;
    functionMarathi?: string;
    ncertNote?: string;
    clinicalSignificance?: string;
  };
  leaderLine?: {
    targetX: number;
    targetY: number;
    labelSide?: 'left' | 'right' | 'top' | 'bottom';
  };
}

export interface DiagramConnection {
  id: string;
  from?: string;
  to?: string;
  points?: Array<{ x: number; y: number }>;
  pathD?: string;
  label?: string;
  sublabel?: string;
  type?: 'arrow' | 'bidirectional' | 'dashed' | 'curved' | 'deoxygenated_blood' | 'oxygenated_blood' | 'flow' | 'signal' | 'ray' | 'wire';
  color?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  animatedFlow?: boolean;
  arrowStart?: boolean;
  arrowEnd?: boolean;
  stepNumber?: number;
}

export interface DiagramLeaderLabel {
  id: string;
  text: string;
  subtext?: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  side: 'left' | 'right' | 'top' | 'bottom';
  color?: string;
  badge?: string;
  nodeId?: string;
}

export interface DiagramLegendItem {
  label: string;
  color: string;
  description?: string;
  shape?: 'circle' | 'line' | 'rect' | 'dashed';
}

export interface DiagramAnnotation {
  id?: string;
  title: string;
  text: string;
  x?: number;
  y?: number;
  width?: number;
  category?: string;
  icon?: string;
}

export interface DiagramRegion {
  id: string;
  label?: string;
  pathD: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  order?: number;
}

export interface DiagramFlowStep {
  step: number;
  title: string;
  fromNodeId?: string;
  toNodeId?: string;
  description: string;
  bloodType?: 'oxygenated' | 'deoxygenated' | 'mixed' | 'signal';
  highlightNodeIds?: string[];
}

export interface DiagramSpec {
  id?: string;
  diagramType: DiagramType;
  title: string;
  subtitle?: string;
  view?: string;
  isSimplified?: boolean;
  ncertReference?: string;
  viewBox?: {
    minX?: number;
    minY?: number;
    width: number;
    height: number;
  };
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  labels?: DiagramLeaderLabel[];
  regions?: DiagramRegion[];
  legend: DiagramLegendItem[];
  annotations?: DiagramAnnotation[];
  flowSteps?: DiagramFlowStep[];
  examTips?: string[];
  explanation?: {
    whatYouSee: string;
    stepByStepMechanism: string[];
    examTip: string;
    ncertTrap?: string;
  };
}
