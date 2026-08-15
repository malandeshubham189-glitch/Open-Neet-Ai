import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CourseSwitcher } from './nursing/CourseSwitcher';
import {
  Sparkles,
  Flame,
  Clock,
  User,
  LogOut,
  Maximize2,
  Minimize2,
  Search,
  BookOpen,
  GraduationCap,
  Stethoscope,
  Calculator
} from 'lucide-react';

interface NavbarProps {
  onOpenAuthModal: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal, onOpenSearch }) => {
  const { user, logout } = useAuth();
  const {
    currentView,
    setCurrentView,
    distractionFreeMode,
    setDistractionFreeMode,
    activeCourse,
    setActiveCourse
  } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Target December 30 Syllabus Deadline Calculator
  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`${currentYear}-12-30`);
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md transition-colors font-sans">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo + Course Switcher */}
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              activeCourse === 'iitm'
                ? setCurrentView('iitm-dashboard')
                : activeCourse === 'nursing'
                ? setCurrentView('nursing-dashboard')
                : setCurrentView('dashboard')
            }
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105 ${
                activeCourse === 'iitm'
                  ? 'bg-indigo-600'
                  : activeCourse === 'nursing'
                  ? 'bg-emerald-600'
                  : 'bg-[#2563EB]'
              }`}
            >
              {activeCourse === 'iitm' ? (
                <Calculator className="h-5 w-5" />
              ) : activeCourse === 'nursing' ? (
                <Stethoscope className="h-5 w-5" />
              ) : (
                <GraduationCap className="h-5 w-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-[#111827]">
                  {activeCourse === 'iitm'
                    ? 'IIT Madras BS'
                    : activeCourse === 'nursing'
                    ? 'NursingHub'
                    : 'NEETDrop'}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
                    activeCourse === 'iitm'
                      ? 'bg-indigo-100 text-indigo-900'
                      : activeCourse === 'nursing'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#2563EB]/10 text-[#2563EB]'
                  }`}
                >
                  {activeCourse === 'iitm' ? 'BS Degree' : activeCourse === 'nursing' ? 'MUHS' : 'AI'}
                </span>
              </div>
              <p className="text-[10px] font-medium text-[#6B7280]">
                {activeCourse === 'iitm'
                  ? 'Qualifier & Quiz 1 Marathon'
                  : activeCourse === 'nursing'
                  ? 'B.Sc Nursing Theory Mastery'
                  : 'NEET 2027 Syllabus Mission'}
              </p>
            </div>
          </button>

          {/* Prominent Course Switcher Pill */}
          <div className="hidden sm:block">
            <CourseSwitcher
              activeCourse={activeCourse}
              onCourseChange={(course) => setActiveCourse(course)}
            />
          </div>
        </div>

        {/* Center: Search & Quick Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          {activeCourse === 'iitm' ? (
            <button
              onClick={() => setCurrentView('iitm-dashboard')}
              className="flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 text-xs font-semibold text-indigo-950 hover:bg-indigo-100 transition-all cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5 text-indigo-700" />
              <span>Foundation Subjects (Math 1 & Stats 1)</span>
            </button>
          ) : activeCourse === 'nursing' ? (
            <button
              onClick={() => setCurrentView('nursing-dashboard')}
              className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-all cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-700" />
              <span>MUHS Curriculum Units</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('syllabus')}
              className="flex items-center gap-2 rounded-xl bg-slate-100/80 border border-[#E5E7EB] px-3.5 py-1.5 text-xs font-semibold text-[#111827] hover:bg-slate-200/80 transition-all cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>Curriculum & Syllabus</span>
            </button>
          )}

          <button
            onClick={() => (onOpenSearch ? onOpenSearch() : setCurrentView('question-bank'))}
            className="flex items-center gap-2 rounded-xl bg-slate-100/80 border border-[#E5E7EB] px-3.5 py-1.5 text-xs font-semibold text-[#111827] hover:bg-slate-200/80 transition-all cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>Search Topics</span>
          </button>
        </div>

        {/* Right: Countdown, Streak & Auth */}
        <div className="flex items-center gap-3">
          {/* Dec 30 Countdown */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
            <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>{daysLeft} Days to Dec 30 Syllabus Deadline</span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{user?.streakDays || 14}d Streak</span>
          </div>

          {/* Distraction-Free Toggle */}
          <button
            onClick={() => setDistractionFreeMode(!distractionFreeMode)}
            title={distractionFreeMode ? 'Exit Distraction-Free Mode' : 'Enable Distraction-Free Zen Mode'}
            className={`hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              distractionFreeMode
                ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-sm'
                : 'border-[#E5E7EB] bg-slate-100 text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {distractionFreeMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-slate-50 p-1.5 pl-2.5 transition-colors hover:bg-slate-100 focus:outline-none"
              >
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs font-bold text-[#111827] max-w-[110px] truncate">{user.displayName}</span>
                  <span className="text-[10px] font-semibold text-[#2563EB]">{user.dropperStatus}</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white font-bold text-xs">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="border-b border-[#E5E7EB] p-3">
                    <p className="text-xs font-bold text-[#111827]">{user.displayName}</p>
                    <p className="text-[11px] text-[#6B7280] truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#2563EB] bg-blue-50 px-2 py-1 rounded-lg font-semibold">
                      <span>Target Year:</span>
                      <span>{user.targetYear}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setCurrentView('dashboard');
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-slate-100"
                    >
                      <User className="h-4 w-4 text-[#2563EB]" />
                      <span>My Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setCurrentView('focus-room');
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-slate-100"
                    >
                      <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                      <span>Zen Focus Room</span>
                    </button>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In / Setup</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
