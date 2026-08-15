import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Atom,
  FlaskConical,
  Dna,
  Bug,
  FileCheck,
  Bookmark,
  Download,
  Settings,
  Home,
  Youtube,
  Send,
  FileText,
  HelpCircle,
  BookOpen,
  Award,
  Stethoscope,
  Baby,
  Brain,
  HeartPulse,
  Users,
  FlaskRound as FlaskRoundIcon,
  Sparkles,
  ShieldCheck,
  Building2,
  Calculator,
  BarChart3,
  GraduationCap
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSelectedSubjectFilter,
    distractionFreeMode,
    activeCourse,
    setActiveCourse,
    openNursingTopicDetail,
    openIITMLecture
  } = useApp();

  if (distractionFreeMode) {
    return null;
  }

  // Items for NEET 2027
  const neetItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home,
      action: () => setCurrentView('dashboard')
    },
    {
      id: 'physics',
      label: 'Physics',
      icon: Atom,
      action: () => {
        setSelectedSubjectFilter('physics');
        setCurrentView('syllabus');
      }
    },
    {
      id: 'chemistry',
      label: 'Chemistry',
      icon: FlaskConical,
      action: () => {
        setSelectedSubjectFilter('chemistry');
        setCurrentView('syllabus');
      }
    },
    {
      id: 'botany',
      label: 'Botany',
      icon: Dna,
      action: () => {
        setSelectedSubjectFilter('biology');
        setCurrentView('syllabus');
      }
    },
    {
      id: 'zoology',
      label: 'Zoology',
      icon: Bug,
      action: () => {
        setSelectedSubjectFilter('biology');
        setCurrentView('syllabus');
      }
    },
    {
      id: 'telegram-notes',
      label: 'My Telegram Notes',
      icon: Send,
      badge: 'SYNC',
      action: () => setCurrentView('telegram-notes')
    },
    {
      id: 'kapil-biology-channel',
      label: "Kapil's Biology Sync",
      icon: Youtube,
      badge: 'NEW',
      action: () => setCurrentView('kapil-biology-channel')
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      action: () => setCurrentView('notes')
    },
    {
      id: 'mcq',
      label: 'MCQs',
      icon: HelpCircle,
      action: () => setCurrentView('mcq')
    },
    {
      id: 'ncert',
      label: 'NCERT Reader',
      icon: BookOpen,
      action: () => setCurrentView('ncert')
    },
    {
      id: 'pyq',
      label: '20+ Yr PYQs',
      icon: Award,
      action: () => setCurrentView('pyq')
    },
    {
      id: 'test',
      label: 'Tests',
      icon: FileCheck,
      action: () => setCurrentView('test')
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
      action: () => setCurrentView('revision')
    },
    {
      id: 'downloads',
      label: 'Downloads',
      icon: Download,
      action: () => setCurrentView('question-bank')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => setCurrentView('ai-planner')
    }
  ];

  // Items for B.Sc Nursing
  const nursingItems = [
    {
      id: 'nursing-dashboard',
      label: 'Nursing Hub',
      icon: Home,
      action: () => setCurrentView('nursing-dashboard')
    },
    {
      id: 'nursing-msn',
      label: 'Medical Surgical (MSN)',
      icon: HeartPulse,
      badge: 'HIGH WT',
      action: () => {
        openNursingTopicDetail('topic-msn2-stroke');
      }
    },
    {
      id: 'nursing-child-health',
      label: 'Child Health (Pediatrics)',
      icon: Baby,
      action: () => {
        openNursingTopicDetail('topic-chn-tetralogy');
      }
    },
    {
      id: 'nursing-mental-health',
      label: 'Mental Health (Psych)',
      icon: Brain,
      action: () => {
        openNursingTopicDetail('topic-mhn-schizophrenia');
      }
    },
    {
      id: 'nursing-midwifery',
      label: 'Midwifery & OBG',
      icon: Stethoscope,
      badge: '4th YR',
      action: () => {
        openNursingTopicDetail('topic-obg-aph');
      }
    },
    {
      id: 'nursing-comm-health',
      label: 'Community Health (CHN)',
      icon: Users,
      action: () => {
        openNursingTopicDetail('topic-chn-tb');
      }
    },
    {
      id: 'nursing-research',
      label: 'Nursing Research & Stats',
      icon: FlaskRoundIcon,
      action: () => {
        openNursingTopicDetail('topic-nrs-sampling');
      }
    },
    {
      id: 'nursing-muhs-blueprint',
      label: 'MUHS 15-Mark Questions',
      icon: Award,
      badge: 'EXAM',
      action: () => setCurrentView('nursing-dashboard')
    }
  ];

  // Items for IIT Madras BS Degree
  const iitmItems = [
    {
      id: 'iitm-dashboard',
      label: 'IIT Madras BS Hub',
      icon: Home,
      action: () => setCurrentView('iitm-dashboard')
    },
    {
      id: 'iitm-math-1',
      label: 'Mathematics 1 (OneShot)',
      icon: Calculator,
      badge: '4 CR',
      action: () => openIITMLecture('math_1')
    },
    {
      id: 'iitm-stats-1',
      label: 'Statistics 1 (OneShot)',
      icon: BarChart3,
      badge: '4 CR',
      action: () => openIITMLecture('stats_1')
    },
    {
      id: 'iitm-qualifier-portal',
      label: 'Qualifier & Quiz 1 Exam',
      icon: Award,
      badge: 'MAY 26',
      action: () => setCurrentView('iitm-dashboard')
    }
  ];

  const activeItems =
    activeCourse === 'iitm'
      ? iitmItems
      : activeCourse === 'nursing'
      ? nursingItems
      : neetItems;

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-slate-100 bg-white p-4 font-sans">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-1">
          {/* Active Course Indicator Header */}
          <div className="mb-3 px-3 py-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  activeCourse === 'iitm'
                    ? 'bg-indigo-600'
                    : activeCourse === 'nursing'
                    ? 'bg-emerald-500'
                    : 'bg-blue-600'
                }`}
              />
              <span className="text-[11px] font-bold text-slate-700">
                {activeCourse === 'iitm'
                  ? 'IIT Madras BS Degree'
                  : activeCourse === 'nursing'
                  ? 'B.Sc Nursing (MUHS)'
                  : 'NEET 2027 Prep'}
              </span>
            </div>
            <button
              onClick={() => {
                if (activeCourse === 'nursing') setActiveCourse('iitm');
                else if (activeCourse === 'iitm') setActiveCourse('neet');
                else setActiveCourse('nursing');
              }}
              className="text-[10px] font-bold text-indigo-700 hover:underline cursor-pointer"
            >
              Switch
            </button>
          </div>

          {activeItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'test' && currentView === 'test-center') ||
              (activeCourse === 'nursing' &&
                item.id === 'nursing-dashboard' &&
                currentView === 'nursing-dashboard') ||
              (activeCourse === 'iitm' &&
                item.id === 'iitm-dashboard' &&
                currentView === 'iitm-dashboard');

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? activeCourse === 'iitm'
                      ? 'bg-indigo-50 text-indigo-900 border border-indigo-200/80 shadow-2xs'
                      : activeCourse === 'nursing'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                      : 'bg-blue-50 text-blue-700 border border-blue-200/80'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate pr-1">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive
                        ? activeCourse === 'iitm'
                          ? 'text-indigo-600'
                          : activeCourse === 'nursing'
                          ? 'text-emerald-700'
                          : 'text-blue-600'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.2 text-[9px] font-black uppercase ${
                      activeCourse === 'iitm'
                        ? 'bg-indigo-100 text-indigo-900'
                        : activeCourse === 'nursing'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Course specific footers */}
        {activeCourse === 'iitm' && (
          <div className="mt-4 rounded-2xl bg-indigo-50/60 p-3 border border-indigo-100 text-[10px] text-indigo-950 space-y-1">
            <div className="flex items-center gap-1 font-bold text-indigo-900">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>IITM BS Verified Lectures</span>
            </div>
            <p className="text-indigo-950/80">
              Math 1 & Stats 1 OneShots with Qualifier & Quiz 1 practice.
            </p>
          </div>
        )}

        {activeCourse === 'nursing' && (
          <div className="mt-4 rounded-2xl bg-emerald-50/60 p-3 border border-emerald-100 text-[10px] text-emerald-900 space-y-1">
            <div className="flex items-center gap-1 font-bold text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>MUHS Syllabus Verified</span>
            </div>
            <p className="text-emerald-950/80">
              Aligned with 2nd, 3rd & Final Year INC guidelines.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
