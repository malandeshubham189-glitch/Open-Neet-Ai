import React from 'react';
import { CourseId, CanonicalCourseId } from '../../types/course';
import { COURSES_LIST, toCanonicalCourseId, COURSES_CONFIG } from '../../config/courses';
import { Stethoscope, GraduationCap, Calculator, Sparkles, Award } from 'lucide-react';

interface CourseSwitcherProps {
  activeCourse: CourseId;
  onCourseChange: (course: CourseId) => void;
  variant?: 'navbar' | 'mobile-dock' | 'sidebar' | 'inline';
  compact?: boolean;
}

export const CourseSwitcher: React.FC<CourseSwitcherProps> = ({
  activeCourse,
  onCourseChange,
  variant = 'navbar',
  compact = false
}) => {
  const canonicalActive = toCanonicalCourseId(activeCourse);

  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'stethoscope':
        return <Stethoscope className={className} />;
      case 'hospital':
        return <Stethoscope className={className} />;
      case 'calculator':
      case 'graduation-cap':
      default:
        return <GraduationCap className={className} />;
    }
  };

  // Mobile Bottom Floating Dock Variant
  if (variant === 'mobile-dock') {
    return (
      <nav
        aria-label="Academic Track Navigation"
        className="flex items-center justify-around w-full bg-white/95 backdrop-blur-md px-1 py-1 rounded-2xl border border-slate-200/90 shadow-lg"
      >
        {COURSES_LIST.map((course) => {
          const isActive = canonicalActive === course.id;
          return (
            <button
              key={course.id}
              onClick={() => onCourseChange(course.id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Switch to ${course.label} track`}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl transition-all select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isActive
                  ? course.id === 'neet'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : course.id === 'nursing'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">{course.emoji}</span>
                <span className="text-[11px] sm:text-xs tracking-tight font-extrabold whitespace-nowrap">
                  {course.shortLabel}
                </span>
              </div>
              <span
                className={`text-[9px] font-semibold tracking-tighter leading-none mt-0.5 ${
                  isActive ? 'text-white/90' : 'text-slate-400'
                }`}
              >
                {course.badge}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Navbar / Header Pill Variant
  return (
    <nav
      aria-label="Academic Track Switcher"
      className={`inline-flex items-center rounded-2xl bg-slate-100/90 p-1 border border-slate-200/80 shadow-xs ${
        compact ? 'scale-95' : ''
      }`}
    >
      {COURSES_LIST.map((course) => {
        const isActive = canonicalActive === course.id;
        return (
          <button
            key={course.id}
            onClick={() => onCourseChange(course.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Switch track to ${course.label}`}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? course.id === 'neet'
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/20'
                  : course.id === 'nursing'
                  ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-700/20'
                  : 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-700/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="text-sm">{course.emoji}</span>
            <span className="tracking-tight">{course.shortLabel}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {course.badge}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
