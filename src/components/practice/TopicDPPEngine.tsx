import React, { useState } from 'react';
import { SubjectId } from '../../types';
import { QuestionDifficulty, QuestionType, ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import { getAllTopics } from '../../data/curriculumData';
import {
  FileText,
  Sparkles,
  Zap,
  Target,
  Sliders,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface TopicDPPEngineProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const TopicDPPEngine: React.FC<TopicDPPEngineProps> = ({ onStartSession }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('physics');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | 'All'>('All');
  const [questionType, setQuestionType] = useState<QuestionType | 'All'>('All');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const curriculum = getAllTopics();
  const filteredTopics = curriculum.filter((t) => t.subjectId === selectedSubject);

  // Extract unique chapters
  const chaptersList = Array.from(
    new Set(filteredTopics.map((t) => t.title.split(':')[0] || t.title))
  );

  const handleLaunchDPP = async () => {
    setIsLoading(true);
    try {
      // Create test session from practiceEngineService
      const session = PracticeEngineService.createTestSession({
        title: `DPP: ${selectedTopic !== 'All' ? selectedTopic : selectedSubject.toUpperCase()} (${questionCount} Qs)`,
        testType: 'topic_dpp',
        subjectId: selectedSubject,
        chapterName: selectedChapter !== 'All' ? selectedChapter : undefined,
        topicTitle: selectedTopic !== 'All' ? selectedTopic : undefined,
        questionCount,
        difficulty,
        displayMode: 'instant_explanation'
      });

      onStartSession(session);
    } catch (err) {
      console.error('Failed to launch DPP session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-800/50 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
          <Zap className="h-3.5 w-3.5" />
          <span>MODULE 1 • DAILY PRACTICE PAPERS</span>
        </div>
        <h2 className="text-2xl font-extrabold">Topic DPP Generator</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Target specific topics with high-yield NCERT line-by-line questions, assertion-reason pairs,
          reaction mechanisms, and physics numericals.
        </p>
      </div>

      {/* Control Panel */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        {/* Step 1: Subject Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            1. Select Subject
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'physics', label: 'Physics', color: 'from-blue-600 to-cyan-600' },
              { id: 'chemistry', label: 'Chemistry', color: 'from-amber-600 to-orange-600' },
              { id: 'biology', label: 'Biology', color: 'from-emerald-600 to-teal-600' }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubject(sub.id as SubjectId);
                  setSelectedChapter('All');
                  setSelectedTopic('All');
                }}
                className={`py-3.5 rounded-xl border text-sm font-bold transition-all ${
                  selectedSubject === sub.id
                    ? `bg-gradient-to-r ${sub.color} text-white border-white/20 shadow-lg`
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chapter
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Chapters</option>
              {chaptersList.map((chap, i) => (
                <option key={i} value={chap}>
                  {chap}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Difficulties (Mixed)</option>
              <option value="Easy">Easy (Formula / Direct Fact)</option>
              <option value="Medium">Medium (Standard NEET)</option>
              <option value="Hard">Hard (Multi-Concept / Tricky)</option>
            </select>
          </div>
        </div>

        {/* Step 3: Question Count Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Number of Questions per DPP
          </label>
          <div className="flex items-center gap-3">
            {[20, 30, 50].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setQuestionCount(cnt)}
                className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition ${
                  questionCount === cnt
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {cnt} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={handleLaunchDPP}
          disabled={isLoading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/25 transition"
        >
          {isLoading ? (
            <span>Generating DPP...</span>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              <span>Start Daily Practice Paper ({questionCount} Qs)</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
