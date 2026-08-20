import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Lightbulb, Zap, Target, AlertTriangle, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { EducationalDiagram } from './EducationalDiagram';
import { parseEducationalMessage } from '../utils/diagramParser';

interface TeacherFormattedMessageProps {
  content: string;
}

export const TeacherFormattedMessage: React.FC<TeacherFormattedMessageProps> = ({ content }) => {
  if (!content) return null;

  // Split content into blocks based on double line breaks or card markers
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800">
      {/* Render all standard text and specialized card blocks */}
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Formula Card
        if (trimmed.includes('💡 **FORMULA CARD:**') || trimmed.startsWith('💡 **FORMULA')) {
          const body = trimmed.replace(/💡 \*\*FORMULA CARD:\*\*/i, '').trim();
          return (
            <div
              key={idx}
              className="my-3 rounded-2xl border-l-4 border-amber-500 bg-amber-50/90 p-4 shadow-xs text-amber-950 dark:bg-amber-950/20 dark:border-amber-400 dark:text-amber-100"
            >
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-xs sm:text-sm mb-1.5">
                <Lightbulb className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>FORMULA CARD</span>
              </div>
              <div className="prose prose-xs max-w-none text-amber-900 dark:text-amber-100 font-medium leading-relaxed">
                <ReactMarkdown>{body || trimmed}</ReactMarkdown>
              </div>
            </div>
          );
        }

        // Shortcut Card
        if (trimmed.includes('⚡ **SHORTCUT CARD:**') || trimmed.startsWith('⚡ **SHORTCUT')) {
          const body = trimmed.replace(/⚡ \*\*SHORTCUT CARD:\*\*/i, '').trim();
          return (
            <div
              key={idx}
              className="my-3 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/90 p-4 shadow-xs text-emerald-950 dark:bg-emerald-950/20 dark:border-emerald-400 dark:text-emerald-100"
            >
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm mb-1.5">
                <Zap className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>SHORTCUT CARD</span>
              </div>
              <div className="prose prose-xs max-w-none text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                <ReactMarkdown>{body || trimmed}</ReactMarkdown>
              </div>
            </div>
          );
        }

        // PYQ Trick Card
        if (trimmed.includes('🎯 **PYQ TRICK:**') || trimmed.startsWith('🎯 **PYQ')) {
          const body = trimmed.replace(/🎯 \*\*PYQ TRICK:\*\*/i, '').trim();
          return (
            <div
              key={idx}
              className="my-3 rounded-2xl border-l-4 border-purple-500 bg-purple-50/90 p-4 shadow-xs text-purple-950 dark:bg-purple-950/20 dark:border-purple-400 dark:text-purple-100"
            >
              <div className="flex items-center gap-2 font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm mb-1.5">
                <Target className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                <span>PYQ TRICK</span>
              </div>
              <div className="prose prose-xs max-w-none text-purple-900 dark:text-purple-100 font-medium leading-relaxed">
                <ReactMarkdown>{body || trimmed}</ReactMarkdown>
              </div>
            </div>
          );
        }

        // Common Mistake Card
        if (trimmed.includes('⚠️ **COMMON MISTAKE:**') || trimmed.startsWith('⚠️ **COMMON')) {
          const body = trimmed.replace(/⚠️ \*\*COMMON MISTAKE:\*\*/i, '').trim();
          return (
            <div
              key={idx}
              className="my-3 rounded-2xl border-l-4 border-rose-500 bg-rose-50/90 p-4 shadow-xs text-rose-950 dark:bg-rose-950/20 dark:border-rose-400 dark:text-rose-100"
            >
              <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm mb-1.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                <span>COMMON MISTAKE ALERT</span>
              </div>
              <div className="prose prose-xs max-w-none text-rose-900 dark:text-rose-100 font-medium leading-relaxed">
                <ReactMarkdown>{body || trimmed}</ReactMarkdown>
              </div>
            </div>
          );
        }

        // NCERT Figure Banner
        if (trimmed.includes('📖 Refer NCERT Figure')) {
          return (
            <div
              key={idx}
              className="my-3 flex items-center gap-3 rounded-xl border border-cyan-200 bg-cyan-50/90 p-3.5 text-cyan-900 shadow-xs dark:bg-cyan-950/30 dark:border-cyan-800 dark:text-cyan-200"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm">📖 Refer NCERT Figure</p>
                <p className="text-[11px] text-cyan-700 dark:text-cyan-300">
                  Observe the corresponding textbook diagram in your NCERT Class 11/12 Physics/Biology book.
                </p>
              </div>
            </div>
          );
        }

        // Mandatory ending highlight or standard block
        if (trimmed.includes('Samajh aaya? Agar chaho to isi topic ka PYQ bhi solve karte hain. 🎯')) {
          return (
            <div
              key={idx}
              className="mt-4 rounded-xl bg-blue-50/80 border border-blue-200 p-3 text-center text-xs font-semibold text-[#2563EB] shadow-xs"
            >
              <ReactMarkdown>{trimmed}</ReactMarkdown>
            </div>
          );
        }

        // Regular paragraph block
        return (
          <div key={idx} className="prose prose-slate prose-xs max-w-none leading-relaxed">
            <ReactMarkdown>{trimmed}</ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
};

