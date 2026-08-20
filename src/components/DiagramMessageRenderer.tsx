import React from 'react';
import { DiagramSpec } from '../types/diagram';
import { DiagramRenderer } from './DiagramRenderer';
import { TeacherFormattedMessage } from './TeacherFormattedMessage';
import { parseEducationalMessage } from '../utils/diagramParser';
import { BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface DiagramMessageRendererProps {
  content: string;
  diagramSpec?: DiagramSpec;
  className?: string;
}

export const DiagramMessageRenderer: React.FC<DiagramMessageRendererProps> = ({
  content,
  diagramSpec: explicitSpec,
  className = ''
}) => {
  if (!content && !explicitSpec) return null;

  // Robust parsing: extract DiagramSpec and strip all raw JSON / ASCII code
  const { diagramSpec: parsedSpec, cleanedText, whatYouSee, stepByStepMechanism, examTip } =
    parseEducationalMessage(content || '');

  const activeDiagram = explicitSpec || parsedSpec;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. If Diagram is detected, render the Interactive SVG Educational Diagram first */}
      {activeDiagram && (
        <div className="my-2">
          <DiagramRenderer spec={activeDiagram} />
        </div>
      )}

      {/* 2. Structured Diagram Explanation Box (if present and not already duplicated in text) */}
      {activeDiagram && whatYouSee && !cleanedText.includes("What you're seeing") && (
        <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-b from-blue-50/80 to-indigo-50/40 p-4 space-y-3 shadow-2xs">
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-blue-950 flex items-center gap-1.5 mb-1">
              <BookOpen className="h-4 w-4 text-blue-600" />
              What you&apos;re seeing:
            </h4>
            <p className="text-xs text-blue-900 font-medium leading-relaxed">
              {whatYouSee}
            </p>
          </div>

          {stepByStepMechanism && stepByStepMechanism.length > 0 && (
            <div className="border-t border-blue-200/60 pt-2.5 space-y-1.5">
              <h5 className="font-bold text-xs text-blue-950 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                Step-by-Step Flow:
              </h5>
              <div className="space-y-1">
                {stepByStepMechanism.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-[11px] text-blue-900 font-medium">
                    <span className="font-bold text-blue-700">{sIdx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {examTip && (
            <div className="border-t border-blue-200/60 pt-2 flex items-start gap-2 text-xs font-semibold text-amber-900">
              <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-950 font-bold">Exam Tip & NCERT Note:</strong>
                <span>{examTip}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Render the cleaned teaching commentary and pedagogical cards */}
      {cleanedText && (
        <TeacherFormattedMessage content={cleanedText} />
      )}
    </div>
  );
};
