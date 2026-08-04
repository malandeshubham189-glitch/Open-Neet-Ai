import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { getTopicById, getNextTopic, getAllTopics } from '../data/curriculumData';
import { LectureService } from '../services/lectureService';
import { LectureResolverService } from '../services/lectureResolver';
import { NEETDropLearningFlow } from './NEETDropLearningFlow';
import {
  ChevronLeft,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Play,
  FileText,
  HelpCircle,
  Bookmark,
  Download,
  RotateCcw,
  Check,
  Maximize,
  Sliders,
  Tv,
  Save,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const TopicDetailView: React.FC = () => {
  const {
    selectedTopicId,
    setCurrentView,
    topicProgress,
    toggleTopicCompleted,
    updateTopicStepProgress,
    saveTopicNotes,
    addToRevisionQueue,
    openTopicDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState<'lectures' | 'notes' | 'dpp' | 'bookmarks' | 'downloads'>('lectures');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [userNote, setUserNote] = useState<string>('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, string>>({});

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const topic = getTopicById(selectedTopicId) || getTopicById('topic-phy-moi') || getAllTopics()[0];
  if (!topic) {
    return <div className="p-8 text-white">Topic not found. Please select a valid topic.</div>;
  }
  const nextTopic = getNextTopic(topic.id);
  const allTopics = getAllTopics();
  const currentTopicIndex = allTopics.findIndex((t) => t.id === topic.id);
  const prevTopic = currentTopicIndex > 0 ? allTopics[currentTopicIndex - 1] : null;

  const progress = topicProgress[topic.id];
  const isCompleted = progress?.completed;

  // Lecture Data
  const recommendedData = LectureService.getRecommendedLecture(topic.id, topic.lectures || []);
  const activeLecture = recommendedData.lecture;

  const handleSaveNotes = () => {
    saveTopicNotes(topic.id, userNote);
    updateTopicStepProgress(topic.id, 'notesRead');
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handlePiP = async () => {
    // Attempt picture-in-picture if supported
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    } catch (e) {
      console.log('PiP not available for iframe embed directly');
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* Top Header Back Bar & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <button
          onClick={() => setCurrentView('syllabus')}
          className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-100 px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-slate-50 transition-all self-start shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Subject</span>
        </button>

        <div className="flex items-center gap-2">
          {prevTopic && (
            <button
              onClick={() => openTopicDetail(prevTopic.id)}
              className="flex items-center gap-2 rounded-2xl bg-white border border-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Lecture</span>
            </button>
          )}

          <button
            onClick={() => toggleTopicCompleted(topic.id, topic.subjectId)}
            className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-[#2563EB] text-white hover:bg-blue-700'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
          </button>

          {nextTopic && (
            <button
              onClick={() => openTopicDetail(nextTopic.id)}
              className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
            >
              <span>Next Lecture</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chapter & Topic Title Banner */}
      <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
          <span>{topic.subjectName}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">{topic.chapterName}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">{topic.title}</h1>
        <p className="text-xs text-slate-500">{topic.description}</p>
      </div>

      {/* Tabs Bar: Lectures | Notes | DPP | Bookmarks | Downloads */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('lectures')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'lectures'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          <Tv className="h-4 w-4" />
          <span>Lectures</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'notes'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('dpp')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'dpp'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>DPP ({topic.mcqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'bookmarks'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          <Bookmark className="h-4 w-4" />
          <span>Bookmarks</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            activeTab === 'downloads'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          <Download className="h-4 w-4" />
          <span>Downloads</span>
        </button>
      </div>

      {/* ================= TAB 1: LECTURES & AI LEARNING FLOW ================= */}
      {activeTab === 'lectures' && (
        <div className="space-y-6">
          <NEETDropLearningFlow
            activeTopicId={topic.id}
            onNavigateTopic={(topicId) => openTopicDetail(topicId)}
          />

          {/* Lecture Timeline (Completed, Current, Locked) */}
          <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Curriculum Syllabus Timeline</h3>

            <div className="space-y-2">
              {allTopics.map((top, idx) => {
                const topCompleted = topicProgress[top.id]?.completed;
                const isCurrent = top.id === topic.id;
                const isLocked = !topCompleted && !isCurrent && idx > currentTopicIndex + 1;

                return (
                  <div
                    key={top.id}
                    onClick={() => {
                      if (!isLocked) openTopicDetail(top.id);
                    }}
                    className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                      isCurrent
                        ? 'border-[#2563EB] bg-blue-50/60 font-bold'
                        : topCompleted
                        ? 'border-emerald-200 bg-emerald-50/30 text-slate-700 cursor-pointer'
                        : isLocked
                        ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'border-slate-100 bg-white hover:border-slate-200 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                        topCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : isCurrent
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {topCompleted ? <CheckCircle2 className="h-4 w-4" /> : isLocked ? <Lock className="h-4 w-4" /> : idx + 1}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-900">{top.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{top.chapterName} • {top.estimatedStudyMinutes || 60}m</p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold ${
                      isCurrent ? 'text-[#2563EB]' : topCompleted ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      {isCurrent ? 'Current' : topCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: NOTES ================= */}
      {activeTab === 'notes' && (
        <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">AI High-Yield Notes & Formula Cards</h2>
            <button
              onClick={handleSaveNotes}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{notesSaved ? 'Saved!' : 'Save Scratchpad'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.notes?.map((note, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <h3 className="text-sm font-bold text-[#2563EB]">{note.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{note.content}</p>

                {note.formulas && (
                  <div className="mt-2 p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs font-mono text-[#2563EB]">
                    <strong>Formulas:</strong> {note.formulas.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Scratchpad */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900">Your Personal Study Scratchpad</label>
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Jot key derivations, formulas, or personal reminders..."
              className="w-full h-32 rounded-xl border border-slate-200 p-3 text-xs focus:border-[#2563EB] focus:outline-none bg-slate-50"
            />
          </div>
        </div>
      )}

      {/* ================= TAB 3: DPP (PRACTICE) ================= */}
      {activeTab === 'dpp' && (
        <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Daily Practice Problems (DPP)</h2>

          <div className="space-y-4">
            {topic.mcqs.map((mcq) => (
              <div key={mcq.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
                <p className="text-xs font-bold text-slate-900">{mcq.question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mcq.options.map((opt) => {
                    const isSelected = selectedMcqAnswers[mcq.id] === opt.id;
                    const isCorrect = opt.id === mcq.correctAnswerId;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedMcqAnswers((prev) => ({ ...prev, [mcq.id]: opt.id }))}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold'
                              : 'border-rose-300 bg-rose-50 text-rose-900'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-bold mr-2">{opt.id.toUpperCase()}.</span>
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: BOOKMARKS ================= */}
      {activeTab === 'bookmarks' && (
        <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Bookmarked Concepts & Questions</h2>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-xs text-slate-500">
            No bookmarks saved for this topic yet. Click the bookmark icon on any question or note to save it here.
          </div>
        </div>
      )}

      {/* ================= TAB 5: DOWNLOADS ================= */}
      {activeTab === 'downloads' && (
        <div className="rounded-[20px] bg-white p-6 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Offline Chapter Downloads</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div>
                <p className="text-xs font-bold text-slate-900">{topic.title} - Complete NCERT PDF Notes</p>
                <p className="text-[11px] text-slate-500">2.4 MB • Printable PDF</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
