import React from 'react';
import { Stethoscope, GraduationCap, Calculator, Sparkles } from 'lucide-react';

export type ActiveCourseMode = 'neet' | 'nursing' | 'iitm';

interface CourseSwitcherProps {
  activeCourse: ActiveCourseMode;
  onCourseChange: (course: ActiveCourseMode) => void;
  compact?: boolean;
}

export const CourseSwitcher: React.FC<CourseSwitcherProps> = ({
  activeCourse,
  onCourseChange,
  compact = false
}) => {
  return (
    <div className={`flex items-center rounded-2xl bg-slate-100 p-1 border border-slate-200/80 shadow-inner ${compact ? 'scale-90' : ''}`}>
      <button
        onClick={() => onCourseChange('neet')}
        className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
          activeCourse === 'neet'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <GraduationCap className="h-3.5 w-3.5 shrink-0" />
        <span>NEET 2027</span>
      </button>

      <button
        onClick={() => onCourseChange('nursing')}
        className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
          activeCourse === 'nursing'
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <Stethoscope className="h-3.5 w-3.5 shrink-0 text-emerald-100" />
        <div className="flex items-center gap-1.5">
          <span>B.Sc Nursing</span>
          <span className="rounded-full bg-emerald-400/30 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-100 border border-emerald-300/30">
            MUHS
          </span>
        </div>
      </button>

      <button
        onClick={() => onCourseChange('iitm')}
        className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
          activeCourse === 'iitm'
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <Calculator className="h-3.5 w-3.5 shrink-0 text-indigo-100" />
        <div className="flex items-center gap-1.5">
          <span>IIT Madras BS</span>
          <span className="rounded-full bg-indigo-400/30 px-1.5 py-0.2 text-[9px] font-extrabold text-indigo-100 border border-indigo-300/30">
            Degree
          </span>
        </div>
      </button>
    </div>
  );
};
