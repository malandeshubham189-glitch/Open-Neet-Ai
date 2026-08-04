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
import { KapilBiologyChannelView } from './components/KapilBiologyChannelView';
import { TelegramNotesView } from './components/TelegramNotesView';
import { NotesView } from './components/NotesView';
import { MCQPracticeView } from './components/MCQPracticeView';
import { NCERTReaderView } from './components/NCERTReaderView';
import { PYQListView } from './components/PYQListView';
import { PracticeEngineView } from './components/practice/PracticeEngineView';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { FloatingAIMentor } from './components/FloatingAIMentor';
import {
  Home,
  BookOpen,
  FileCheck,
  RotateCcw,
  User,
  FileText,
  HelpCircle,
  Send
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
      case 'test':
      case 'practice-engine':
      case 'mcq':
      case 'pyq':
        return <PracticeEngineView />;
      case 'ai-mentor':
        return <AIMentorArchitectureView />;
      case 'ai-planner':
        return <AIDailyPlannerView />;
      case 'kapil-biology-channel':
        return <KapilBiologyChannelView />;
      case 'telegram-notes':
        return <TelegramNotesView />;
      case 'notes':
        return <NotesView />;
      case 'mcq':
        return <MCQPracticeView />;
      case 'ncert':
        return <NCERTReaderView />;
      case 'pyq':
        return <PYQListView />;
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

      {/* Mobile Bottom Navigation Bar (Home, Telegram Notes, Notes, MCQs, NCERT, Tests) */}
      {!distractionFreeMode && currentView !== 'landing' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 backdrop-blur-md md:hidden shadow-lg">
          <div className="grid grid-cols-6 h-16">
            {/* 1. Home */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'dashboard' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-[9px]">Home</span>
            </button>

            {/* 2. Telegram Notes */}
            <button
              onClick={() => setCurrentView('telegram-notes')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'telegram-notes' ? 'text-cyan-600 font-bold' : 'text-[#6B7280]'
              }`}
            >
              <Send className="h-5 w-5 text-cyan-500" />
              <span className="text-[9px]">Telegram</span>
            </button>

            {/* 3. Notes */}
            <button
              onClick={() => setCurrentView('notes')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'notes' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="text-[9px]">Notes</span>
            </button>

            {/* 4. MCQs */}
            <button
              onClick={() => setCurrentView('mcq')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'mcq' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="text-[9px]">MCQs</span>
            </button>

            {/* 5. NCERT */}
            <button
              onClick={() => setCurrentView('ncert')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'ncert' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-[9px]">NCERT</span>
            </button>

            {/* 6. Tests */}
            <button
              onClick={() => setCurrentView('test')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'test' || currentView === 'test-center' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }`}
            >
              <FileCheck className="h-5 w-5" />
              <span className="text-[9px]">Tests</span>
            </button>
          </div>
        </nav>
      )}

      {/* Floating AI Mentor Button */}
      {!distractionFreeMode && currentView !== 'landing' && <FloatingAIMentor />}

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
