/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { SyllabusView } from './components/SyllabusView';
import { TopicDetailView } from './components/TopicDetailView';
import { StudyFocusRoom } from './components/StudyFocusRoom';
import { RevisionQueueView } from './components/RevisionQueueView';
import { QuestionBankView } from './components/QuestionBankView';
import { AITestCenterView } from './components/AITestCenterView';
import { AIMentorArchitectureView } from './components/AIMentorArchitectureView';
import { AIDailyPlannerView } from './components/AIDailyPlannerView';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import {
  Home,
  BookOpen,
  FileCheck,
  RotateCcw,
  User
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, distractionFreeMode } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onOpenAuthModal={() => setIsAuthModalOpen(true)} />;
      case 'dashboard':
        return <DashboardView />;
      case 'syllabus':
        return <SyllabusView />;
      case 'topic-detail':
        return <TopicDetailView />;
      case 'focus-room':
        return <StudyFocusRoom />;
      case 'revision':
        return <RevisionQueueView />;
      case 'question-bank':
        return <QuestionBankView />;
      case 'test-center':
        return <AITestCenterView />;
      case 'ai-mentor':
        return <AIMentorArchitectureView />;
      case 'ai-planner':
        return <AIDailyPlannerView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white antialiased">
      {/* Top Header */}
      {!distractionFreeMode && (
        <Navbar
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* Main Container */}
      <div className="flex flex-1">
        {!distractionFreeMode && currentView !== 'landing' && <Sidebar />}

        <main className="flex-1 w-full pb-24 md:pb-12 overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Home, Learn, Tests, Revision, Profile) */}
      {!distractionFreeMode && currentView !== 'landing' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 backdrop-blur-md md:hidden shadow-lg">
          <div className="grid grid-cols-5 h-16">
            {/* 1. Home */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'dashboard' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-[10px]">Home</span>
            </button>

            {/* 2. Learn */}
            <button
              onClick={() => setCurrentView('syllabus')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'syllabus' || currentView === 'topic-detail' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-[10px]">Learn</span>
            </button>

            {/* 3. Tests */}
            <button
              onClick={() => setCurrentView('test-center')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'test-center' || currentView === 'question-bank' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <FileCheck className="h-5 w-5" />
              <span className="text-[10px]">Tests</span>
            </button>

            {/* 4. Revision */}
            <button
              onClick={() => setCurrentView('revision')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'revision' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <RotateCcw className="h-5 w-5" />
              <span className="text-[10px]">Revision</span>
            </button>

            {/* 5. Profile */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center justify-center gap-1 text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-[10px]">Profile</span>
            </button>
          </div>
        </nav>
      )}

      {/* Footer */}
      {!distractionFreeMode && <Footer />}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Instant Search Engine Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}
