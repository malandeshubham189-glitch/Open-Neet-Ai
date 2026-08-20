import React, { useState, useMemo } from 'react';
import {
  StructuredNotes,
  NotesSection,
  NotesBlock,
  FormulaBlock,
  DefinitionBlock,
  ExampleBlock,
  TableBlock,
  WarningBlock,
  TipBlock,
  CalloutBlock,
  SummaryBlock,
  QuestionBlock,
  AnswerBlock
} from '../../types/notes';
import { parseNotesToStructured, cleanMathText } from '../../utils/notesParser';
import {
  BookOpen,
  Copy,
  Check,
  Download,
  Search,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Printer,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Hash,
  Calculator,
  Compass,
  FileText
} from 'lucide-react';

interface StructuredNotesRendererProps {
  notes: string | StructuredNotes;
  metadata?: {
    title?: string;
    subtitle?: string;
    subjectName?: string;
    weekNumber?: number;
    lessonOrder?: number;
    courseTag?: string;
  };
  courseTitle?: string;
  subjectTitle?: string;
  weekNumber?: number;
  lessonTitle?: string;
  onProceedToPractice?: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const StructuredNotesRenderer: React.FC<StructuredNotesRendererProps> = ({
  notes,
  metadata,
  courseTitle,
  subjectTitle,
  weekNumber,
  lessonTitle,
  onProceedToPractice,
  onRegenerate,
  isRegenerating = false
}) => {
  const effectiveMetadata = useMemo(() => {
    return {
      title: lessonTitle || metadata?.title,
      subjectName: subjectTitle || metadata?.subjectName,
      weekNumber: weekNumber || metadata?.weekNumber,
      courseTag: courseTitle || metadata?.courseTag,
      ...metadata
    };
  }, [metadata, courseTitle, subjectTitle, weekNumber, lessonTitle]);

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Parse structured data safely
  const structuredData: StructuredNotes = useMemo(() => {
    return parseNotesToStructured(notes, effectiveMetadata);
  }, [notes, effectiveMetadata]);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyFormula = (expr: string, id: string) => {
    navigator.clipboard.writeText(cleanMathText(expr));
    setCopiedFormulaIndex(id);
    setTimeout(() => setCopiedFormulaIndex(null), 2000);
  };

  const handleCopyAll = () => {
    let fullText = `${structuredData.title}\n${structuredData.subtitle || ''}\n\n`;
    structuredData.sections.forEach((sec, idx) => {
      fullText += `Section ${idx + 1}: ${sec.heading}\n`;
      sec.blocks.forEach((b) => {
        if (b.type === 'paragraph') fullText += `${b.text}\n\n`;
        if (b.type === 'formula') fullText += `Formula: ${b.label} -> ${b.expression}\n\n`;
        if (b.type === 'definition') fullText += `Definition: ${b.term} - ${b.definition}\n\n`;
        if (b.type === 'bulletList') fullText += b.items.map((i) => `• ${i}`).join('\n') + '\n\n';
        if (b.type === 'numberedList') fullText += b.items.map((item, i) => `${i + 1}. ${item}`).join('\n') + '\n\n';
      });
    });

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    let md = `# ${structuredData.title}\n\n`;
    if (structuredData.subtitle) md += `**${structuredData.subtitle}**\n\n`;
    md += `*Course: ${metadata?.courseTag || 'IIT Madras BS Degree Foundation Level'}*\n\n---\n\n`;

    structuredData.sections.forEach((sec, idx) => {
      md += `## ${idx + 1}. ${sec.heading}\n\n`;
      sec.blocks.forEach((b) => {
        if (b.type === 'paragraph') md += `${b.text}\n\n`;
        if (b.type === 'formula') md += `> **${b.label}**\n> \`${b.expression}\`\n\n`;
        if (b.type === 'definition') md += `**Definition (${b.term})**: ${b.definition}\n\n`;
        if (b.type === 'bulletList') md += b.items.map((i) => `- ${i}`).join('\n') + '\n\n';
        if (b.type === 'numberedList') md += b.items.map((item, i) => `1. ${item}`).join('\n') + '\n\n';
        if (b.type === 'warning') md += `⚠️ **Warning**: ${b.message}\n\n`;
        if (b.type === 'tip') md += `💡 **Exam Tip**: ${b.tipText}\n\n`;
      });
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${structuredData.title.replace(/\s+/g, '_')}_Notes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return structuredData.sections;
    const q = searchQuery.toLowerCase();
    return structuredData.sections.filter((sec) => {
      if (sec.heading.toLowerCase().includes(q)) return true;
      return sec.blocks.some((b) => {
        if (b.type === 'paragraph' && b.text.toLowerCase().includes(q)) return true;
        if (b.type === 'formula' && (b.label.toLowerCase().includes(q) || b.expression.toLowerCase().includes(q))) return true;
        if (b.type === 'definition' && (b.term.toLowerCase().includes(q) || b.definition.toLowerCase().includes(q))) return true;
        if (b.type === 'bulletList' && b.items.some((i) => i.toLowerCase().includes(q))) return true;
        if (b.type === 'numberedList' && b.items.some((i) => i.toLowerCase().includes(q))) return true;
        return false;
      });
    });
  }, [structuredData.sections, searchQuery]);

  return (
    <div className={`space-y-6 ${isFocusMode ? 'bg-slate-900 text-slate-100 p-6 rounded-3xl' : ''}`}>
      {/* 1. TOP HEADER & METADATA BANNER */}
      <div className={`rounded-3xl border ${isFocusMode ? 'border-slate-800 bg-slate-800/80' : 'border-slate-200 bg-gradient-to-br from-white via-indigo-50/20 to-slate-50'} p-6 sm:p-8 shadow-sm space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-950">
                <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                <span>{metadata?.subjectName || structuredData.subjectName || 'IIT Madras BS Degree'}</span>
              </span>

              {metadata?.weekNumber && (
                <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-950">
                  Week {metadata.weekNumber}
                </span>
              )}

              <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-950">
                {structuredData.examFocusTag || 'Qualifier Exam & Quiz 1 Focus'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {structuredData.title}
            </h1>

            {structuredData.subtitle && (
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                {structuredData.subtitle}
              </p>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isRegenerating ? 'Refreshing...' : 'Regenerate'}</span>
              </button>
            )}

            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition cursor-pointer"
              title="Copy all notes"
            >
              {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedAll ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition cursor-pointer"
              title="Download Markdown file"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export .MD</span>
            </button>

            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center border border-slate-200 rounded-xl bg-white p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg ${fontSize === 'sm' ? 'bg-slate-100 text-indigo-900' : 'text-slate-500'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg ${fontSize === 'base' ? 'bg-slate-100 text-indigo-900' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg ${fontSize === 'lg' ? 'bg-slate-100 text-indigo-900' : 'text-slate-500'}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* 2. SEARCH & JUMP BAR */}
        <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, formulas, theorems..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Outline Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              Jump:
            </span>
            {structuredData.sections.map((sec, idx) => (
              <a
                key={sec.id || idx}
                href={`#${sec.id || `sec-${idx}`}`}
                className="shrink-0 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 px-2 py-1 text-[11px] font-semibold text-slate-600 transition"
              >
                {idx + 1}. {sec.heading.slice(0, 20)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SECTIONS LIST */}
      <div className={`space-y-6 text-${fontSize}`}>
        {filteredSections.map((section, secIdx) => {
          const isCollapsed = !!collapsedSections[section.id];
          return (
            <div
              key={section.id || secIdx}
              id={section.id || `sec-${secIdx}`}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
            >
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between p-5 sm:p-6 bg-slate-50/70 hover:bg-slate-50 cursor-pointer border-b border-slate-100 select-none transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-xs">
                    {secIdx + 1}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">
                      {section.heading}
                    </h2>
                    {section.subheading && (
                      <p className="text-xs text-slate-500 font-medium">{section.subheading}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                    {section.blocks.length} blocks
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Section Blocks */}
              {!isCollapsed && (
                <div className="p-6 sm:p-8 space-y-6">
                  {section.blocks.map((block, bIdx) => (
                    <BlockItem
                      key={bIdx}
                      block={block}
                      blockId={`${section.id}-b-${bIdx}`}
                      copiedFormulaIndex={copiedFormulaIndex}
                      onCopyFormula={handleCopyFormula}
                      revealedAnswers={revealedAnswers}
                      onToggleAnswer={toggleAnswer}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
            <HelpCircle className="h-8 w-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No matching concepts found</p>
            <p className="text-xs text-slate-500">Try searching for different terms like "function", "variance", or "matrix".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset search
            </button>
          </div>
        )}
      </div>

      {/* 4. SUMMARY & KEY TAKEAWAYS FOOTER */}
      {structuredData.summary && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-900">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-black">
              {structuredData.summary.title || 'Summary & High-Yield Takeaways'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {structuredData.summary.points.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-2xl bg-white p-3.5 border border-emerald-100 text-xs text-slate-800 font-medium shadow-xs"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{cleanMathText(point)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PROCEED TO PRACTICE ACTION */}
      {onProceedToPractice && (
        <div className="pt-2">
          <button
            onClick={onProceedToPractice}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 p-4 text-xs font-black text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            <span>MARK NOTES REVIEWED • PROCEED TO PRACTICE QUESTIONS</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Single Block Item Renderer
 */
interface BlockItemProps {
  block: NotesBlock;
  blockId: string;
  copiedFormulaIndex: string | null;
  onCopyFormula: (expr: string, id: string) => void;
  revealedAnswers: Record<string, boolean>;
  onToggleAnswer: (key: string) => void;
}

const BlockItem: React.FC<BlockItemProps> = ({
  block,
  blockId,
  copiedFormulaIndex,
  onCopyFormula,
  revealedAnswers,
  onToggleAnswer
}) => {
  switch (block.type) {
    case 'heading': {
      return (
        <div className="pt-3 pb-1 border-b border-slate-100">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Hash className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>{cleanMathText(block.text)}</span>
          </h3>
        </div>
      );
    }

    case 'subheading': {
      return (
        <h4 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          <span>{cleanMathText(block.text)}</span>
        </h4>
      );
    }

    case 'paragraph': {
      return (
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          <InlineRichText text={block.text} />
        </p>
      );
    }

    case 'formula': {
      const isCopied = copiedFormulaIndex === blockId;
      return (
        <div className="rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-[10px] font-black text-white">
                ƒ
              </span>
              <span className="text-xs font-black text-indigo-950 uppercase tracking-wide">
                {block.label}
              </span>
            </div>

            <button
              onClick={() => onCopyFormula(block.expression, blockId)}
              className="flex items-center gap-1 rounded-lg border border-indigo-200 bg-white px-2 py-1 text-[11px] font-bold text-indigo-900 hover:bg-indigo-50 transition cursor-pointer"
              title="Copy formula"
            >
              {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Mathematical Equation Display Box */}
          <div className="rounded-xl bg-slate-900 px-4 py-3.5 text-center sm:text-left overflow-x-auto shadow-inner">
            <code className="text-xs sm:text-sm md:text-base font-mono font-bold text-amber-300 tracking-wide select-all">
              {cleanMathText(block.expression)}
            </code>
          </div>

          {block.explanation && (
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              <span className="font-bold text-slate-800">Concept: </span>
              <InlineRichText text={block.explanation} />
            </p>
          )}

          {block.variables && block.variables.length > 0 && (
            <div className="pt-2 border-t border-indigo-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-indigo-950">Where:</span>
              {block.variables.map((v, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md bg-white border border-indigo-100 px-2 py-0.5 text-[11px] text-slate-700"
                >
                  <strong className="font-mono text-indigo-600">{v.symbol}</strong> = {v.meaning}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    case 'definition': {
      return (
        <div className="rounded-2xl border-l-4 border-l-indigo-600 border-y border-r border-slate-200 bg-indigo-50/30 p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-black text-indigo-950 uppercase tracking-wider">
              Definition: {block.term}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            <InlineRichText text={block.definition} />
          </p>
          {block.context && (
            <p className="text-[11px] text-slate-500 font-normal italic">
              Context: {block.context}
            </p>
          )}
        </div>
      );
    }

    case 'example': {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-indigo-600" />
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {block.title || 'Worked Example'}
              </h5>
            </div>
            {block.difficulty && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                {block.difficulty}
              </span>
            )}
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed border border-slate-200/70">
            <InlineRichText text={block.problem} />
          </div>

          {block.solutionSteps && block.solutionSteps.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Step-by-Step Solution:
              </span>
              <div className="space-y-2">
                {block.solutionSteps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-black text-indigo-950">
                      {sIdx + 1}
                    </span>
                    <div className="flex-1 pt-0.5">
                      <InlineRichText text={step} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {block.finalAnswer && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Final Result: {cleanMathText(block.finalAnswer)}</span>
            </div>
          )}
        </div>
      );
    }

    case 'table': {
      return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50">
              <tr>
                {block.headers.map((h, hIdx) => (
                  <th
                    key={hIdx}
                    className="px-4 py-3 text-left font-black text-slate-900 uppercase tracking-wider text-[11px]"
                  >
                    {cleanMathText(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-slate-700 font-medium leading-relaxed">
                      <InlineRichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'bulletList': {
      return (
        <ul className="space-y-2">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
              <div className="flex-1">
                <InlineRichText text={item} />
              </div>
            </li>
          ))}
        </ul>
      );
    }

    case 'numberedList': {
      return (
        <ol className="space-y-2">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-700">
                {idx + 1}
              </span>
              <div className="flex-1 pt-0.5">
                <InlineRichText text={item} />
              </div>
            </li>
          ))}
        </ol>
      );
    }

    case 'warning': {
      return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 space-y-1.5 text-amber-950">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{block.title || 'Exam Trap / Common Mistake'}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed pl-6">
            <InlineRichText text={block.message} />
          </p>
        </div>
      );
    }

    case 'tip': {
      return (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 space-y-1.5 text-emerald-950">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-emerald-900">
            <Lightbulb className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{block.title || 'Qualifier Exam Strategy Tip'}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed pl-6">
            <InlineRichText text={block.tipText} />
          </p>
        </div>
      );
    }

    case 'callout': {
      return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-1.5 text-slate-800">
          {block.title && (
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900">
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>{block.title}</span>
            </div>
          )}
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            <InlineRichText text={block.content} />
          </p>
        </div>
      );
    }

    case 'question': {
      const isRevealed = !!revealedAnswers[blockId];
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-900">
              Checkpoint Question
            </span>
            {block.difficulty && (
              <span className="text-[10px] font-semibold text-slate-400">{block.difficulty}</span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
            <InlineRichText text={block.questionText} />
          </p>
          {block.hint && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onToggleAnswer(blockId)}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
              >
                {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span>{isRevealed ? 'Hide Solution' : 'Reveal Solution / Hint'}</span>
              </button>
            </div>
          )}
          {isRevealed && block.hint && (
            <div className="rounded-xl bg-indigo-50/80 p-3 text-xs text-indigo-950 font-medium border border-indigo-100">
              <InlineRichText text={block.hint} />
            </div>
          )}
        </div>
      );
    }

    default:
      return null;
  }
};

/**
 * Inline rich text formatter that turns markdown tokens into clean React nodes without raw symbols.
 */
interface InlineRichTextProps {
  text: string;
}

export const InlineRichText: React.FC<InlineRichTextProps> = ({ text }) => {
  if (!text) return null;

  // Clean math formatting first
  const sanitized = cleanMathText(text);

  // Split string into bold (**...**) and inline code (`...`) tokens
  const parts = sanitized.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const inner = part.slice(2, -2);
          return (
            <strong key={idx} className="font-bold text-slate-900">
              {inner}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          const code = part.slice(1, -1);
          return (
            <code
              key={idx}
              className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-mono font-bold text-indigo-950 border border-slate-200"
            >
              {code}
            </code>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
};
