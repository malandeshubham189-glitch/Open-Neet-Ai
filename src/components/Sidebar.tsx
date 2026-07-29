import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  RotateCcw,
  Target,
  HelpCircle,
  FileCheck,
  Bot,
  Globe,
  ChevronRight,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';

interface SidebarItem {
  id: AppView;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, revisionQueue, distractionFreeMode } = useApp();

  const dueRevisionCount = revisionQueue.filter((r) => r.status === 'due').length;

  const navItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dropper Dashboard', icon: LayoutDashboard, color: 'text-[#2563EB]' },
    { id: 'ai-planner', label: 'AI Daily Planner', badge: 'Target Dec 30', icon: Sparkles, color: 'text-amber-600' },
    { id: 'syllabus', label: 'Curriculum & Lectures', icon: BookOpen, color: 'text-[#2563EB]' },
    {
      id: 'revision',
      label: 'Spaced Revision Queue',
      badge: dueRevisionCount > 0 ? `${dueRevisionCount} Due` : undefined,
      icon: RotateCcw,
      color: 'text-[#7C3AED]'
    },
    { id: 'focus-room', label: 'Zen Study Room', badge: 'Focus', icon: Target, color: 'text-[#2563EB]' },
    { id: 'question-bank', label: '10-Yr PYQ & MCQ Bank', icon: HelpCircle, color: 'text-[#7C3AED]' },
    { id: 'test-center', label: 'AI Test Center', icon: FileCheck, color: 'text-[#2563EB]' },
    { id: 'ai-mentor', label: 'AI Mentor Framework', badge: 'AI', icon: Bot, color: 'text-[#7C3AED]' },
    { id: 'landing', label: 'Platform Mission', icon: Globe, color: 'text-[#6B7280]' }
  ];

  if (distractionFreeMode) {
    return null;
  }

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-[#E5E7EB] bg-white p-4">
      <div className="flex h-full flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="px-3">
            <p className="text-[10px] font-bold tracking-wider text-[#6B7280] uppercase">NEET 2027 Dropper Suite</p>
          </div>

          {/* Nav List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 border border-blue-200 text-[#2563EB] shadow-sm'
                      : 'text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#2563EB]' : item.color} transition-transform group-hover:scale-110`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          item.badge.includes('Due')
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-blue-100 text-[#2563EB] border border-blue-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isActive ? 'text-[#2563EB] translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Dropper Card */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
            <Flame className="h-4 w-4 fill-[#2563EB]" />
            <span>Target Dec 30 Mission</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#6B7280]">
            Complete all Physics, Chemistry, and Biology NCERT chapters before December 30.
          </p>
          <button
            onClick={() => setCurrentView('focus-room')}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Start Zen Focus Timer</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
