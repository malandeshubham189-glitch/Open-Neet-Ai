import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics } from '../data/curriculumData';
import { SubjectId } from '../types';
import {
  FileText,
  Search,
  BookOpen,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Save,
  Download,
  Sparkles,
  Zap,
  Lightbulb
} from 'lucide-react';

export const NotesView: React.FC = () => {
  const {
    topicProgress,
    saveTopicNotes,
    updateTopicStepProgress,
    toggleBookmark,
    isBookmarked,
    openTopicDetail
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [scratchpadText, setScratchpadText] = useState('');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const allTopics = getAllTopics();

  const filteredTopics = allTopics.filter((t) => {
    const matchesSubject = selectedSubject === 'all' || t.subjectId === selectedSubject;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.chapterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const activeTopic = selectedTopicId
    ? allTopics.find((t) => t.id === selectedTopicId) || filteredTopics[0] || allTopics[0]
    : filteredTopics[0] || allTopics[0];

  const handleSaveScratchpad = (topicId: string) => {
    if (!scratchpadText.trim()) return;
    saveTopicNotes(topicId, scratchpadText);
    updateTopicStepProgress(topicId, 'notesRead');
    setSavedStatus('Notes saved to your personal vault! 💾');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* Header */}
      <div className="rounded-[20px] bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <FileText className="h-48 w-48 text-blue-300" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>NEET 2027 HIGH-YIELD NOTES REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">NCERT & AI Formula Notes</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Concise chapter notes, NCERT word-to-word highlights, essential formula sheets, and personal scratchpads for quick revision.
          </p>
        </div>
      </div>

      {/* Subject Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        {/* Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'all'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setSelectedSubject('physics')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'physics'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setSelectedSubject('chemistry')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'chemistry'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Chemistry
          </button>
          <button
            onClick={() => setSelectedSubject('biology')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'biology'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Biology
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes or chapters..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Topic Notes */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          {filteredTopics.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-slate-500">
              <FileText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
              <p className="text-sm font-bold">No notes matching filter</p>
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const isSelected = activeTopic?.id === topic.id;
              const isRead = topicProgress[topic.id]?.notesRead;

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setScratchpadText(topicProgress[topic.id]?.notesSaved || '');
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-sm'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-100/60 px-2 py-0.5 rounded-full">
                      {topic.subjectId.toUpperCase()} • {topic.chapterName}
                    </span>
                    {isRead && (
                      <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Read</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                    {topic.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                    {topic.notes?.[0]?.content || topic.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                    <span>{topic.notes?.length || 1} Formula Sheets</span>
                    <span className="text-[#2563EB]">View Notes →</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Detail Note Reader */}
        <div className="lg:col-span-7 space-y-4">
          {activeTopic ? (
            <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm space-y-6">
              {/* Note Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                    {activeTopic.subjectId} • {activeTopic.chapterName}
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {activeTopic.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      toggleBookmark(activeTopic.id, 'note', activeTopic.title, `note-${activeTopic.id}`)
                    }
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      isBookmarked(`note-${activeTopic.id}`)
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                    title="Bookmark Note"
                  >
                    {isBookmarked(`note-${activeTopic.id}`) ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    onClick={() => openTopicDetail(activeTopic.id)}
                    className="px-3 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-all"
                  >
                    Open Topic Master
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>NCERT High-Yield Core Summary</span>
                </div>

                {activeTopic.notes && activeTopic.notes.length > 0 ? (
                  activeTopic.notes.map((noteItem, index) => (
                    <div key={index} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
                      <h4 className="font-bold text-xs text-slate-900">{noteItem.title}</h4>
                      <p className="text-xs text-slate-700 leading-relaxed">{noteItem.content}</p>

                      {noteItem.formulas && noteItem.formulas.length > 0 && (
                        <div className="mt-2 rounded-xl bg-blue-50/80 p-3 border border-blue-100 space-y-1.5">
                          <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                            Key Formulae & NCERT Rules
                          </p>
                          <ul className="list-disc list-inside text-xs text-slate-800 space-y-1">
                            {noteItem.formulas.map((f, fIdx) => (
                              <li key={fIdx} className="font-mono text-[11px] font-semibold text-blue-900">
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                    <p className="text-xs text-slate-700 leading-relaxed">{activeTopic.description}</p>
                    <div className="rounded-xl bg-blue-50/80 p-3 border border-blue-100 space-y-1">
                      <p className="text-[11px] font-bold text-[#2563EB]">Core Learning Objectives</p>
                      <ul className="list-disc list-inside text-xs text-slate-800 space-y-1">
                        {activeTopic.learningOutcomes?.map((loc, lIdx) => (
                          <li key={lIdx}>{loc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Subtopics breakdown */}
                {activeTopic.subtopics && activeTopic.subtopics.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                      <Lightbulb className="h-4 w-4 text-emerald-500" />
                      <span>Subtopic Concept Breakdown</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeTopic.subtopics.map((st) => (
                        <div key={st.id} className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
                          <p className="font-bold text-xs text-slate-900">{st.title}</p>
                          <p className="text-[10px] text-emerald-600 font-mono font-semibold">
                            {st.keyFormulaOrFact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Scratchpad / User Notes */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                    <Save className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>Personal Scratchpad Note</span>
                  </label>
                  {savedStatus && (
                    <span className="text-[11px] font-bold text-emerald-600 animate-fade-in">
                      {savedStatus}
                    </span>
                  )}
                </div>
                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Type your personal mnemonic tricks, formulas, or doubts here..."
                  className="w-full h-24 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleSaveScratchpad(activeTopic.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Scratchpad</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] border border-slate-100 bg-white p-12 text-center text-slate-500">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-2" />
              <p className="text-sm font-bold">Select a topic from the list to view notes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
