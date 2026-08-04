import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import { getNCERTChapterPdfInfo } from '../lib/ncertPdfMapping';
import { InAppPdfViewer } from './InAppPdfViewer';
import { NCERTSentenceReader } from './NCERTSentenceReader';
import { HumanHeartDiagram } from './HumanHeartDiagram';
import { findPyqsForNcertLine, PyqMatchResult } from '../lib/ncertPyqMatcher';
import {
  getChapterHighlights,
  saveChapterHighlight,
  removeChapterHighlight,
  getLastReadPosition,
  NcertHighlight
} from '../lib/ncertStorage';
import { SubjectId } from '../types';
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Highlighter,
  Bookmark,
  BookmarkCheck,
  Check,
  Award,
  ExternalLink,
  Zap,
  RotateCcw,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  FileText,
  BarChart2,
  Clock,
  Sparkle,
  Maximize2
} from 'lucide-react';

export interface GeneratedMcq {
  question: string;
  options: string[];
  correct_answer_index: number;
  explanation: string;
}

export interface ChapterPracticeHistory {
  chapterId: string;
  chapterName: string;
  subjectId: string;
  classLevel: string;
  attemptsCount: number;
  lastScore: number;
  bestScore: number;
  totalQuestions: number;
  lastAttemptedAt: string;
  previousQuestions: string[];
}

// NCERT Portal textbook links mapping helper
function getNCERTTextbookUrl(subjectId: string, classLevel: string, chapterIndex: number = 1): string {
  const isClass11 = classLevel.includes('11');
  let code = 'kebo1';
  if (subjectId === 'physics') {
    code = isClass11 ? 'keph1' : 'leph1';
  } else if (subjectId === 'chemistry') {
    code = isClass11 ? 'kech1' : 'lech1';
  } else if (subjectId === 'biology') {
    code = isClass11 ? 'kebo1' : 'lebo1';
  }
  return `https://ncert.nic.in/textbook.php?${code}=${chapterIndex}-10`;
}

export const NCERTReaderView: React.FC = () => {
  const { topicProgress, updateTopicStepProgress, toggleBookmark, isBookmarked, setCurrentView } = useApp();

  // Active Tab: 'library' (Chapter Library & AI MCQs) | 'reader' (Word-to-Word Highlights) | 'diagrams' (NCERT Labeled Diagrams)
  const [activeTab, setActiveTab] = useState<'library' | 'reader' | 'diagrams'>('library');

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedClass, setSelectedClass] = useState<'all' | 'Class 11' | 'Class 12'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reader selected topic
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Active AI MCQ Quiz state
  const [activeQuizChapter, setActiveQuizChapter] = useState<{
    id: string;
    chapterName: string;
    subjectId: SubjectId;
    subjectName: string;
    classLevel: string;
    description: string;
  } | null>(null);

  const [isLoadingMcqs, setIsLoadingMcqs] = useState(false);
  const [mcqError, setMcqError] = useState<string | null>(null);
  const [mcqs, setMcqs] = useState<GeneratedMcq[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // LocalStorage Practice History
  const [practiceHistory, setPracticeHistory] = useState<Record<string, ChapterPracticeHistory>>({});

  // PDF Preview Modal
  const [pdfModalChapter, setPdfModalChapter] = useState<{
    id: string;
    name: string;
    pdfUrl: string;
    fallbackUrl: string;
    classLevel: string;
    subject: string;
  } | null>(null);

  // Load practice history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('neet_ncert_practice_history');
      if (saved) {
        setPracticeHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load practice history from localStorage:', e);
    }
  }, []);

  // Save history helper
  const saveChapterHistory = (chapterId: string, historyItem: ChapterPracticeHistory) => {
    try {
      const updated = {
        ...practiceHistory,
        [chapterId]: historyItem
      };
      setPracticeHistory(updated);
      localStorage.setItem('neet_ncert_practice_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save practice history:', e);
    }
  };

  const allTopics = getAllTopics();

  // Deduplicate by chapterName to form a clean NCERT Chapter Library
  const uniqueChaptersMap = new Map<string, typeof allTopics[0]>();
  allTopics.forEach((t) => {
    if (!uniqueChaptersMap.has(t.chapterName)) {
      uniqueChaptersMap.set(t.chapterName, t);
    }
  });

  const allChaptersList = Array.from(uniqueChaptersMap.values());

  const filteredChapters = allChaptersList.filter((c) => {
    const matchesSubject = selectedSubject === 'all' || c.subjectId === selectedSubject;
    const matchesClass = selectedClass === 'all' || c.classLevel === selectedClass;
    const matchesSearch =
      c.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.unitName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesClass && matchesSearch;
  });

  const activeTopic = selectedTopicId
    ? allTopics.find((t) => t.id === selectedTopicId) || allTopics[0]
    : allTopics[0];

  const isNcertRead = activeTopic ? topicProgress[activeTopic.id]?.ncertRead : false;

  const handleToggleNcertRead = (topicId: string) => {
    updateTopicStepProgress(topicId, 'ncertRead');
  };

  // Start AI MCQ Quiz Generation
  const handleStartMcqPractice = async (chapter: typeof allChaptersList[0], isRegenerate = false) => {
    setActiveQuizChapter({
      id: chapter.id,
      chapterName: chapter.chapterName,
      subjectId: chapter.subjectId,
      subjectName: chapter.subjectName || chapter.subjectId.toUpperCase(),
      classLevel: chapter.classLevel,
      description: chapter.description
    });

    setIsLoadingMcqs(true);
    setMcqError(null);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setShowExplanation({});
    setIsQuizCompleted(false);

    const prevHistory = practiceHistory[chapter.id];
    const prevQuestions = prevHistory?.previousQuestions || [];

    try {
      const response = await fetch('/api/ai/generate-ncert-mcqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classLevel: chapter.classLevel,
          subject: chapter.subjectName || chapter.subjectId,
          chapterName: chapter.chapterName,
          count: 20,
          previousQuestions: isRegenerate ? prevQuestions : []
        })
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setMcqs(data.questions);
      } else {
        throw new Error(data.error || 'Failed to generate MCQs from AI server');
      }
    } catch (err: any) {
      console.error('Error generating MCQs:', err);
      setMcqError(err?.message || 'Network error while contacting NEET AI MCQ Engine. Please try again.');
    } finally {
      setIsLoadingMcqs(false);
    }
  };

  // Handle Answer Selection
  const handleSelectAnswer = (qIdx: number, optionIdx: number) => {
    if (userAnswers[qIdx] !== undefined) return; // Prevent changing answer once submitted
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [qIdx]: true }));
  };

  // Handle Finishing Quiz
  const handleFinishQuiz = () => {
    setIsQuizCompleted(true);

    if (!activeQuizChapter) return;

    // Calculate score
    let correct = 0;
    const newQuestionTexts: string[] = [];

    mcqs.forEach((q, idx) => {
      newQuestionTexts.push(q.question);
      if (userAnswers[idx] === q.correct_answer_index) {
        correct++;
      }
    });

    const prevHist = practiceHistory[activeQuizChapter.id];
    const attemptsCount = (prevHist?.attemptsCount || 0) + 1;
    const bestScore = Math.max(prevHist?.bestScore || 0, correct);
    const existingPrevQs = prevHist?.previousQuestions || [];

    // Save updated history
    saveChapterHistory(activeQuizChapter.id, {
      chapterId: activeQuizChapter.id,
      chapterName: activeQuizChapter.chapterName,
      subjectId: activeQuizChapter.subjectId,
      classLevel: activeQuizChapter.classLevel,
      attemptsCount,
      lastScore: correct,
      bestScore,
      totalQuestions: mcqs.length || 20,
      lastAttemptedAt: new Date().toISOString(),
      previousQuestions: [...existingPrevQs, ...newQuestionTexts].slice(-50)
    });

    // Also update global topic progress in AppContext
    updateTopicStepProgress(activeQuizChapter.id, 'mcq');
  };

  // Open NCERT PDF Link
  const handleOpenNcertPdf = (chapter: typeof allChaptersList[0]) => {
    const pdfInfo = getNCERTChapterPdfInfo(chapter.subjectId, chapter.classLevel, chapter.chapterName);
    setPdfModalChapter({
      id: chapter.id,
      name: chapter.chapterName,
      pdfUrl: pdfInfo.pdfUrl,
      fallbackUrl: pdfInfo.fallbackUrl,
      classLevel: chapter.classLevel,
      subject: chapter.subjectName || chapter.subjectId.toUpperCase()
    });
  };

  // Calculate Quiz Score Metrics
  const totalQuestions = mcqs.length || 20;
  const attemptedCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([qIdx, optIdx]) => mcqs[Number(qIdx)]?.correct_answer_index === optIdx
  ).length;
  const accuracyPercent = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* Top Banner */}
      <div className="rounded-[24px] bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="h-56 w-56 text-emerald-300" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-extrabold text-emerald-300 border border-emerald-400/30">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>OFFICIAL NCERT PRACTICE & TEXTBOOK ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            NCERT Chapter Library & AI Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Read official NCERT textbooks directly from <span className="text-emerald-300 font-bold">ncert.nic.in</span> and solve AI-generated 20 NEET-level multiple choice sets for every Class 11 & Class 12 chapter.
          </p>

          {/* Navigation Tabs */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('library');
                setActiveQuizChapter(null);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'library'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>NCERT Chapter Library & MCQs</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('reader');
                setActiveQuizChapter(null);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'reader'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Highlighter className="h-4 w-4" />
              <span>Word-to-Word NCERT Line Reader</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('diagrams');
                setActiveQuizChapter(null);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'diagrams'
                  ? 'bg-rose-500 text-white shadow-md scale-105 ring-2 ring-rose-300'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>NCERT Labeled Diagrams (Human Heart)</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* MODE 1: ACTIVE AI MCQ QUIZ INTERFACE */}
      {/* -------------------------------------------------------------------------- */}
      {activeQuizChapter ? (
        <div className="space-y-6">
          {/* Active Quiz Header Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveQuizChapter(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shrink-0"
                title="Back to Chapter Library"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {activeQuizChapter.classLevel} • {activeQuizChapter.subjectName}
                  </span>
                  <span className="text-xs font-bold text-slate-500">20 Questions AI NEET Engine</span>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                  {activeQuizChapter.chapterName}
                </h2>
              </div>
            </div>

            {!isLoadingMcqs && !mcqError && !isQuizCompleted && (
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Score Progress</p>
                  <p className="text-sm font-black text-emerald-600">
                    {correctCount} / {attemptedCount} Correct ({accuracyPercent}%)
                  </p>
                </div>
                <button
                  onClick={handleFinishQuiz}
                  className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-xs font-extrabold hover:bg-emerald-700 shadow-sm transition-all"
                >
                  Submit & View Results
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoadingMcqs && (
            <div className="rounded-[20px] border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
              <div className="relative mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Loader2 className="h-8 w-8 animate-spin" />
                <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-amber-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">Generating Your NEET Practice Set...</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Calling Gemini NEET AI Engine to craft 20 word-to-word NCERT questions strictly based on <span className="font-bold text-slate-800">{activeQuizChapter.chapterName}</span>...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {mcqError && !isLoadingMcqs && (
            <div className="rounded-[20px] border border-rose-200 bg-rose-50/70 p-8 text-center space-y-4 animate-in fade-in">
              <AlertTriangle className="mx-auto h-12 w-12 text-rose-500" />
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-rose-900">Failed to generate MCQs from AI</h3>
                <p className="text-xs text-rose-700 max-w-md mx-auto">{mcqError}</p>
              </div>
              <button
                onClick={() => handleStartMcqPractice(activeQuizChapter as any)}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 text-white px-5 py-2.5 text-xs font-extrabold hover:bg-rose-700 transition-all shadow-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Failed to generate — Retry</span>
              </button>
            </div>
          )}

          {/* Quiz In-Progress Screen */}
          {!isLoadingMcqs && !mcqError && !isQuizCompleted && mcqs.length > 0 && (
            <div className="space-y-6">
              {/* Question Stepper / Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Question {currentQuestionIdx + 1} of {totalQuestions}</span>
                  <span>{Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100)}% Completed</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Dots Navigator */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {mcqs.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = idx === currentQuestionIdx;
                  const isCorrect = isAnswered && userAnswers[idx] === mcqs[idx].correct_answer_index;

                  let dotStyle = 'bg-slate-100 text-slate-500 border-slate-200';
                  if (isCurrent) {
                    dotStyle = 'bg-slate-900 text-white font-black ring-2 ring-emerald-500';
                  } else if (isAnswered) {
                    dotStyle = isCorrect
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-rose-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs transition-all ${dotStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Current Question Card */}
              {mcqs[currentQuestionIdx] && (
                <div className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <span className="flex h-7 px-3 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
                      Question {currentQuestionIdx + 1}
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      NEET UG STANDARD • NCERT WORD-TO-WORD
                    </span>
                  </div>

                  {/* Question Statement */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                    {mcqs[currentQuestionIdx].question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3">
                    {mcqs[currentQuestionIdx].options.map((optionText, optIdx) => {
                      const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                      const isRevealed = showExplanation[currentQuestionIdx];
                      const isCorrect = optIdx === mcqs[currentQuestionIdx].correct_answer_index;

                      let buttonStyle =
                        'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium';

                      if (isRevealed) {
                        if (isCorrect) {
                          buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black';
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(currentQuestionIdx, optIdx)}
                          disabled={isRevealed}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all ${buttonStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-slate-200 font-extrabold text-slate-800 shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{optionText}</span>
                          </div>

                          {isRevealed && isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                          )}
                          {isRevealed && isSelected && !isCorrect && (
                            <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* NCERT Explanation Box */}
                  {showExplanation[currentQuestionIdx] && (
                    <div className="rounded-2xl p-5 bg-slate-900 text-white space-y-2 animate-in fade-in border border-slate-800">
                      <div className="flex items-center gap-2 font-black text-amber-400 text-xs uppercase tracking-wider">
                        <Zap className="h-4 w-4" />
                        <span>NCERT Line Reference & Explanation:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {mcqs[currentQuestionIdx].explanation}
                      </p>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

                    {currentQuestionIdx < totalQuestions - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishQuiz}
                        className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
                      >
                        <Award className="h-4 w-4 text-emerald-400" />
                        <span>View Final Results</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quiz Results Summary Screen */}
          {isQuizCompleted && (
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 mb-2">
                <Award className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
                  PRACTICE SESSION COMPLETED
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {correctCount} / {totalQuestions} Correct ({accuracyPercent}%)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                  {accuracyPercent >= 80
                    ? '🎉 Outstanding performance! You cleared the NEET GMC Cutoff standard for this NCERT chapter.'
                    : accuracyPercent >= 60
                    ? '👍 Good progress! Re-read highlighted NCERT lines to push your score above 90%.'
                    : '📖 Keep revising! Solve NCERT lines and re-take this practice set.'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Total Questions</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">{totalQuestions}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                  <p className="text-[10px] font-extrabold text-emerald-600 uppercase">Correct</p>
                  <p className="text-xl font-extrabold text-emerald-700 mt-1">{correctCount}</p>
                </div>
                <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4">
                  <p className="text-[10px] font-extrabold text-rose-600 uppercase">Incorrect</p>
                  <p className="text-xl font-extrabold text-rose-700 mt-1">{attemptedCount - correctCount}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => handleStartMcqPractice(activeQuizChapter as any, true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 text-xs font-black hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Generate New 20 Questions</span>
                </button>

                <button
                  onClick={() => setActiveQuizChapter(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-slate-700 px-6 py-3 text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  <span>Back to Chapter Library</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'library' ? (
        /* -------------------------------------------------------------------------- */
        /* MODE 2: NCERT CHAPTER LIBRARY GRID */
        /* -------------------------------------------------------------------------- */
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {/* Subject Filters */}
              <button
                onClick={() => setSelectedSubject('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedSubject === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedSubject('physics')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedSubject === 'physics'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Physics
              </button>
              <button
                onClick={() => setSelectedSubject('chemistry')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedSubject === 'chemistry'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Chemistry
              </button>
              <button
                onClick={() => setSelectedSubject('biology')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedSubject === 'biology'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Biology
              </button>

              <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

              {/* Class Filters */}
              <button
                onClick={() => setSelectedClass('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedClass === 'all'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Class 11 & 12
              </button>
              <button
                onClick={() => setSelectedClass('Class 11')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedClass === 'Class 11'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Class 11 NCERT
              </button>
              <button
                onClick={() => setSelectedClass('Class 12')}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all shrink-0 ${
                  selectedClass === 'Class 12'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Class 12 NCERT
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NCERT chapters..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChapters.length === 0 ? (
              <div className="col-span-full rounded-[20px] border border-slate-200 bg-white p-12 text-center text-slate-500">
                <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-2" />
                <p className="text-sm font-bold">No NCERT chapters match your filter</p>
              </div>
            ) : (
              filteredChapters.map((chapter) => {
                const hist = practiceHistory[chapter.id];

                return (
                  <div
                    key={chapter.id}
                    className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {chapter.classLevel} • {chapter.subjectId.toUpperCase()}
                        </span>

                        {hist && hist.attemptsCount > 0 && (
                          <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            <span>Best: {hist.bestScore}/{hist.totalQuestions}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug">
                        {chapter.chapterName}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenNcertPdf(chapter)}
                          className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-slate-600" />
                          <span>Read NCERT</span>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </button>

                        <button
                          onClick={() => handleStartMcqPractice(chapter)}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Practice MCQs</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : activeTab === 'diagrams' ? (
        /* -------------------------------------------------------------------------- */
        /* MODE 4: NCERT LABELED ANATOMY DIAGRAMS */
        /* -------------------------------------------------------------------------- */
        <div className="space-y-6">
          <HumanHeartDiagram />
        </div>
      ) : (
        /* -------------------------------------------------------------------------- */
        /* MODE 3: WORD-TO-WORD NCERT LINE READER */
        /* -------------------------------------------------------------------------- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Chapters Sidebar */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {allTopics.map((topic) => {
              const isSelected = activeTopic?.id === topic.id;
              const isDone = topicProgress[topic.id]?.ncertRead;

              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {topic.classLevel} • {topic.subjectId}
                    </span>

                    {isDone && (
                      <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>NCERT Read</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-1">
                    {topic.chapterName}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                    {topic.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: NCERT Line Excerpt */}
          <div className="lg:col-span-7">
            {activeTopic ? (
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
                      {activeTopic.classLevel} NCERT TEXTBOOK EXCERPT
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                      {activeTopic.chapterName}
                    </h2>
                    <p className="text-xs text-slate-500">{activeTopic.title}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        const pdfInfo = getNCERTChapterPdfInfo(activeTopic.subjectId, activeTopic.classLevel, activeTopic.chapterName);
                        setPdfModalChapter({
                          id: activeTopic.id,
                          name: activeTopic.chapterName,
                          pdfUrl: pdfInfo.pdfUrl,
                          fallbackUrl: pdfInfo.fallbackUrl,
                          classLevel: activeTopic.classLevel,
                          subject: activeTopic.subjectId.toUpperCase()
                        });
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-black bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <BookOpen className="h-4 w-4 text-emerald-400" />
                      <span>Open In-App PDF Reader</span>
                    </button>

                    <button
                      onClick={() => handleToggleNcertRead(activeTopic.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                        isNcertRead
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      <span>{isNcertRead ? 'NCERT Read Completed' : 'Mark NCERT Read'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800">
                      <Highlighter className="h-4 w-4 text-amber-500" />
                      <span>NCERT Word-to-Word High-Yield Lines</span>
                    </div>

                    {activeTopic && getLastReadPosition(activeTopic.id) && (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        📖 Last read: Page {getLastReadPosition(activeTopic.id)?.page}
                      </span>
                    )}
                  </div>

                  <NCERTSentenceReader
                    text={activeTopic.description}
                    chapterTitle={activeTopic.chapterName}
                    topicTitle={activeTopic.title}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
                    <p className="text-[11px] text-amber-900 font-sans font-semibold">
                      💡 <strong>NEET Tip:</strong> Direct questions are asked word-to-word from this paragraph in NEET biology and chemistry!
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('diagrams')}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-extrabold hover:bg-rose-700 transition-all inline-flex items-center gap-1 shadow-xs"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                        <span>View Human Heart Sectional Diagram</span>
                      </button>

                      <button
                        onClick={() => {
                          const matches = findPyqsForNcertLine(activeTopic.chapterName, activeTopic.description, activeTopic.subjectId);
                          if (matches.length > 0) {
                            alert(`Found ${matches.length} NEET PYQ(s) matching this line! Opening 10-Yr PYQ Archive...`);
                            setCurrentView('pyq');
                          } else {
                            setCurrentView('pyq');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-[11px] font-extrabold hover:bg-amber-700 transition-all inline-flex items-center gap-1 shadow-xs"
                      >
                        <Zap className="h-3.5 w-3.5 text-yellow-300" />
                        <span>Check Matching NEET PYQs</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* NCERT IN-APP PDF VIEWER MODAL */}
      {/* -------------------------------------------------------------------------- */}
      {pdfModalChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-2 sm:p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-6xl">
            <InAppPdfViewer
              pdfUrl={pdfModalChapter.pdfUrl}
              fallbackUrl={pdfModalChapter.fallbackUrl}
              chapterId={pdfModalChapter.id}
              chapterName={pdfModalChapter.name}
              subjectName={pdfModalChapter.subject}
              classLevel={pdfModalChapter.classLevel}
              onClose={() => setPdfModalChapter(null)}
              onNavigateToPyqs={() => {
                setPdfModalChapter(null);
                setCurrentView('pyq');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
