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
import { NursingDashboard } from './components/nursing/NursingDashboard';
import { NursingTopicDetail } from './components/nursing/NursingTopicDetail';
import { IITMDashboard } from './components/iitm/IITMDashboard';
import { IITMLectureRoom } from './components/iitm/IITMLectureRoom';
import { IITMWeekRoom } from './components/iitm/IITMWeekRoom';
import { getNursingTopicById, getAllNursingTopics } from './data/nursingCurriculumData';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { FloatingAIMentor } from './components/FloatingAIMentor';
import { FloatingVoiceBar } from './components/FloatingVoiceBar';
import {
  Home,
  BookOpen,
  FileCheck,
  RotateCcw,
  User,
  FileText,
  HelpCircle,
  Send,
  Stethoscope,
  HeartPulse,
  Baby,
  Brain,
  MessageSquare,
  Calculator,
  BarChart3,
  Award
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    distractionFreeMode,
    activeCourse,
    canonicalActiveCourse,
    switchCourse,
    selectedNursingTopicId,
    openNursingTopicDetail,
    selectedIITMSubjectId,
    openIITMLecture,
    selectedIITMWeekId,
    selectedIITMLessonId,
    openIITMWeekLesson
  } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const selectedNursingTopic =
    getNursingTopicById(selectedNursingTopicId) ||
    getAllNursingTopics('3rd_year')[0] ||
    getAllNursingTopics('2nd_year')[0];

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onOpenAuthModal={() => setIsAuthModalOpen(true)} />;
      case 'iitm-dashboard':
        return (
          <IITMDashboard
            onOpenSubject={(subId) => openIITMLecture(subId)}
            onOpenWeekLesson={(weekId, lessonId, subjectId) => openIITMWeekLesson(weekId, lessonId, subjectId)}
          />
        );
      case 'iitm-lecture-room':
        return (
          <IITMLectureRoom
            subjectId={selectedIITMSubjectId}
            onBack={() => setCurrentView('iitm-dashboard')}
          />
        );
      case 'iitm-week-room':
        return (
          <IITMWeekRoom
            initialSubjectId={selectedIITMSubjectId}
            initialWeekId={selectedIITMWeekId}
            initialLessonId={selectedIITMLessonId}
            onBackToDashboard={() => setCurrentView('iitm-dashboard')}
          />
        );
      case 'nursing-dashboard':
        return (
          <NursingDashboard
            onSelectTopic={(topicId) => openNursingTopicDetail(topicId)}
          />
        );
      case 'nursing-topic-detail':
        return (
          <NursingTopicDetail
            topic={selectedNursingTopic}
            onBack={() => setCurrentView('nursing-dashboard')}
            onSelectTopic={(topicId) => openNursingTopicDetail(topicId)}
          />
        );
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
      case 'ncert':
        return <NCERTReaderView />;
      default:
        if (canonicalActiveCourse === 'iitm_bs') {
          return (
            <IITMDashboard
              onOpenSubject={(subId) => openIITMLecture(subId)}
              onOpenWeekLesson={(weekId, lessonId) => openIITMWeekLesson(weekId, lessonId)}
            />
          );
        }
        return canonicalActiveCourse === 'nursing' ? (
          <NursingDashboard
            onSelectTopic={(topicId) => openNursingTopicDetail(topicId)}
          />
        ) : (
          <DashboardView />
        );
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
        {!distractionFreeMode && currentView !== 'landing' && (
          <Sidebar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
        )}

        <main className="flex-1 w-full pb-24 md:pb-12 overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {!distractionFreeMode && currentView !== 'landing' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 backdrop-blur-md md:hidden shadow-lg">
          {canonicalActiveCourse === 'iitm_bs' ? (
            <div className="grid grid-cols-4 h-16">
              {/* 1. Hub */}
              <button
                onClick={() => setCurrentView('iitm-dashboard')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'iitm-dashboard'
                    ? 'text-indigo-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-[9px]">Hub</span>
              </button>

              {/* 2. Math 1 */}
              <button
                onClick={() => openIITMLecture('math_1')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  selectedIITMSubjectId === 'math_1' && currentView === 'iitm-lecture-room'
                    ? 'text-indigo-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Calculator className="h-5 w-5" />
                <span className="text-[9px]">Math 1</span>
              </button>

              {/* 3. Stats 1 */}
              <button
                onClick={() => openIITMLecture('stats_1')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  selectedIITMSubjectId === 'stats_1' && currentView === 'iitm-lecture-room'
                    ? 'text-indigo-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="text-[9px]">Stats 1</span>
              </button>

              {/* 4. Qualifier Exam */}
              <button
                onClick={() => setCurrentView('iitm-dashboard')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'iitm-dashboard'
                    ? 'text-indigo-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Award className="h-5 w-5" />
                <span className="text-[9px]">Qualifier</span>
              </button>
            </div>
          ) : canonicalActiveCourse === 'nursing' ? (
            <div className="grid grid-cols-5 h-16">
              {/* 1. Hub */}
              <button
                onClick={() => setCurrentView('nursing-dashboard')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'nursing-dashboard'
                    ? 'text-emerald-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-[9px]">Hub</span>
              </button>

              {/* 2. MSN */}
              <button
                onClick={() => openNursingTopicDetail('topic-msn2-stroke')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  selectedNursingTopicId === 'topic-msn2-stroke' &&
                  currentView === 'nursing-topic-detail'
                    ? 'text-emerald-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <HeartPulse className="h-5 w-5" />
                <span className="text-[9px]">MSN</span>
              </button>

              {/* 3. Pediatrics */}
              <button
                onClick={() => openNursingTopicDetail('topic-chn-tetralogy')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  selectedNursingTopicId === 'topic-chn-tetralogy' &&
                  currentView === 'nursing-topic-detail'
                    ? 'text-emerald-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Baby className="h-5 w-5" />
                <span className="text-[9px]">Peds</span>
              </button>

              {/* 4. Psych */}
              <button
                onClick={() => openNursingTopicDetail('topic-mhn-schizophrenia')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  selectedNursingTopicId === 'topic-mhn-schizophrenia' &&
                  currentView === 'nursing-topic-detail'
                    ? 'text-emerald-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Brain className="h-5 w-5" />
                <span className="text-[9px]">Psych</span>
              </button>

              {/* 5. OBG */}
              <button
                onClick={() => openNursingTopicDetail('topic-obg-aph')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  selectedNursingTopicId === 'topic-obg-aph' &&
                  currentView === 'nursing-topic-detail'
                    ? 'text-emerald-700 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Stethoscope className="h-5 w-5" />
                <span className="text-[9px]">OBG</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-6 h-16">
              {/* 1. Home */}
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'dashboard'
                    ? 'text-[#2563EB] font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-[9px]">Home</span>
              </button>

              {/* 2. Telegram Notes */}
              <button
                onClick={() => setCurrentView('telegram-notes')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'telegram-notes'
                    ? 'text-cyan-600 font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <Send className="h-5 w-5 text-cyan-500" />
                <span className="text-[9px]">Telegram</span>
              </button>

              {/* 3. Notes */}
              <button
                onClick={() => setCurrentView('notes')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'notes'
                    ? 'text-[#2563EB] font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="text-[9px]">Notes</span>
              </button>

              {/* 4. MCQs */}
              <button
                onClick={() => setCurrentView('mcq')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'mcq'
                    ? 'text-[#2563EB] font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                <span className="text-[9px]">MCQs</span>
              </button>

              {/* 5. NCERT */}
              <button
                onClick={() => setCurrentView('ncert')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'ncert'
                    ? 'text-[#2563EB] font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-[9px]">NCERT</span>
              </button>

              {/* 6. Tests */}
              <button
                onClick={() => setCurrentView('test')}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentView === 'test' || currentView === 'test-center'
                    ? 'text-[#2563EB] font-bold'
                    : 'text-[#6B7280]'
                }`}
              >
                <FileCheck className="h-5 w-5" />
                <span className="text-[9px]">Tests</span>
              </button>
            </div>
          )}
        </nav>
      )}

      {/* Floating AI Mentor Button */}
      {!distractionFreeMode && currentView !== 'landing' && <FloatingAIMentor />}

      {/* Global Human AI Voice Dock */}
      <FloatingVoiceBar />

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
