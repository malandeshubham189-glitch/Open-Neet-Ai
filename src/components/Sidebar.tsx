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
  Award
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, setSelectedSubjectFilter, distractionFreeMode } = useApp();

  if (distractionFreeMode) {
    return null;
  }

  const items = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home,
      action: () => {
        setCurrentView('dashboard');
      }
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
      action: () => {
        setCurrentView('telegram-notes');
      }
    },
    {
      id: 'kapil-biology-channel',
      label: "Kapil's Biology Sync",
      icon: Youtube,
      badge: 'NEW',
      action: () => {
        setCurrentView('kapil-biology-channel');
      }
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      action: () => {
        setCurrentView('notes');
      }
    },
    {
      id: 'mcq',
      label: 'MCQs',
      icon: HelpCircle,
      action: () => {
        setCurrentView('mcq');
      }
    },
    {
      id: 'ncert',
      label: 'NCERT Reader',
      icon: BookOpen,
      action: () => {
        setCurrentView('ncert');
      }
    },
    {
      id: 'pyq',
      label: '20+ Yr PYQs',
      icon: Award,
      action: () => {
        setCurrentView('pyq');
      }
    },
    {
      id: 'test',
      label: 'Tests',
      icon: FileCheck,
      action: () => {
        setCurrentView('test');
      }
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
      action: () => {
        setCurrentView('revision');
      }
    },
    {
      id: 'downloads',
      label: 'Downloads',
      icon: Download,
      action: () => {
        setCurrentView('question-bank');
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => {
        setCurrentView('ai-planner');
      }
    }
  ];

  return (
    <aside className="w-60 shrink-0 hidden md:block border-r border-slate-100 bg-white p-4 font-sans">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'test' && currentView === 'test-center');

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-emerald-500 text-slate-950 px-2 py-0.5 text-[9px] font-black uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
