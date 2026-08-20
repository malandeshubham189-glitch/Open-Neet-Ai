export type NotesBlockType =
  | 'paragraph'
  | 'heading'
  | 'subheading'
  | 'bulletList'
  | 'numberedList'
  | 'table'
  | 'callout'
  | 'definition'
  | 'example'
  | 'formula'
  | 'question'
  | 'answer'
  | 'warning'
  | 'tip'
  | 'summary';

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface HeadingBlock {
  type: 'heading';
  level?: 1 | 2 | 3 | 4;
  text: string;
}

export interface SubheadingBlock {
  type: 'subheading';
  text: string;
}

export interface BulletListBlock {
  type: 'bulletList';
  items: string[];
}

export interface NumberedListBlock {
  type: 'numberedList';
  items: string[];
}

export interface TableBlock {
  type: 'table';
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface CalloutBlock {
  type: 'callout';
  variant?: 'info' | 'concept' | 'note';
  title?: string;
  content: string;
}

export interface DefinitionBlock {
  type: 'definition';
  term: string;
  definition: string;
  context?: string;
  importance?: 'core' | 'exam_frequent' | 'supplementary';
}

export interface ExampleBlock {
  type: 'example';
  title: string;
  problem: string;
  solutionSteps: string[];
  finalAnswer?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface FormulaVariable {
  symbol: string;
  meaning: string;
  units?: string;
}

export interface FormulaBlock {
  type: 'formula';
  label: string;
  expression: string;
  explanation?: string;
  variables?: FormulaVariable[];
  examRelevance?: string;
}

export interface QuestionBlock {
  type: 'question';
  questionText: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  marksOrWeightage?: string;
  hint?: string;
}

export interface AnswerBlock {
  type: 'answer';
  answerText: string;
  steps?: string[];
  keyConceptUsed?: string;
}

export interface WarningBlock {
  type: 'warning';
  title?: string;
  message: string;
}

export interface TipBlock {
  type: 'tip';
  title?: string;
  tipText: string;
  examFocus?: boolean;
}

export interface SummaryBlock {
  type?: 'summary';
  title?: string;
  points: string[];
}

export type NotesBlock =
  | ParagraphBlock
  | HeadingBlock
  | SubheadingBlock
  | BulletListBlock
  | NumberedListBlock
  | TableBlock
  | CalloutBlock
  | DefinitionBlock
  | ExampleBlock
  | FormulaBlock
  | QuestionBlock
  | AnswerBlock
  | WarningBlock
  | TipBlock
  | SummaryBlock;

export interface NotesSection {
  id: string;
  heading: string;
  subheading?: string;
  icon?: string;
  blocks: NotesBlock[];
}

export interface StructuredNotes {
  title: string;
  subtitle?: string;
  subjectName?: string;
  courseTag?: string;
  weekNumber?: number;
  lessonOrder?: number;
  examFocusTag?: string;
  estimatedReadTimeMinutes?: number;
  sections: NotesSection[];
  summary?: SummaryBlock;
  keyTakeaways?: string[];
}
