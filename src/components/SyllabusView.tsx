import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { ClassLevel } from '../types';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Tv,
  HelpCircle,
  Clock,
  ArrowRight,
  Lock,
  Sparkles,
  Award,
  Video,
  Layers,
  Flame,
  Search,
  X
} from 'lucide-react';

export const SyllabusView: React.FC = () => {
  const { openTopicDetail, topicProgress, selectedSubjectFilter, setSelectedSubjectFilter, isTopicUnlocked, getChapterAnalytics } = useApp();
  const [selectedClassTab, setSelectedClassTab] = useState<ClassLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'unit-phy-1': true,
    'unit-phy-electro': true,
    'unit-chem-organic': true,
    'unit-bio-genetics': true
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const cleanQuery = searchQuery.toLowerCase().trim();

  const filteredSubjects =
    selectedSubjectFilter === 'all'
      ? CURRICULUM_DATA
      : CURRICULUM_DATA.filter((s) => s.id === selectedSubjectFilter);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB] border border-blue-100">
            <BookOpen className="h-3.5 w-3.5" />
            <span>NEET 2027 MASTER SYLLABUS DATABASE</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">Curriculum & Lecture Matrix</h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Search or select any chapter in Physics, Chemistry, and Biology to begin preparation directly.
          </p>
        </div>

        {/* Filter Controls: Class & Subject */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Class Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-[#E5E7EB]">
            {(['all', 'Class 11', 'Class 12'] as const).map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClassTab(cls)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedClassTab === cls
                    ? 'bg-white text-[#111827] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {cls === 'all' ? 'All Classes' : cls}
              </button>
            ))}
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-[#E5E7EB]">
            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedSubjectFilter === 'all'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('physics')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedSubjectFilter === 'physics'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('chemistry')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedSubjectFilter === 'chemistry'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Chemistry
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('biology')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedSubjectFilter === 'biology'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Biology
            </button>
          </div>
        </div>
      </div>

      {/* Instant Chapter & Topic Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2563EB]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search any chapter or topic (e.g. Electrostatics, GOC, Aldehydes, Rotational Motion, DNA, Optics)..."
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white py-3.5 pl-12 pr-10 text-sm font-semibold text-[#111827] placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-[#111827]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Subjects Accordion */}
      <div className="space-y-8">
        {filteredSubjects.map((subject) => {
          const visibleUnits = subject.units.filter((u) => {
            if (selectedClassTab !== 'all' && u.classLevel !== selectedClassTab) return false;

            if (cleanQuery) {
              const unitMatches = u.name.toLowerCase().includes(cleanQuery);
              const chapterMatches = u.chapters.some(
                (chap) =>
                  chap.name.toLowerCase().includes(cleanQuery) ||
                  chap.description.toLowerCase().includes(cleanQuery) ||
                  chap.topics.some(
                    (top) =>
                      top.title.toLowerCase().includes(cleanQuery) ||
                      top.description.toLowerCase().includes(cleanQuery)
                  )
              );
              return unitMatches || chapterMatches;
            }
            return true;
          });

          if (visibleUnits.length === 0) return null;

          return (
            <div key={subject.id} className="space-y-4">
              {/* Subject Banner */}
              <div className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white text-xs shadow-sm"
                    style={{ backgroundColor: subject.id === 'physics' ? '#2563EB' : subject.id === 'chemistry' ? '#7C3AED' : '#059669' }}
                  >
                    {subject.code}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">{subject.name}</h2>
                    <p className="text-xs text-[#6B7280]">
                      {subject.totalUnits} Units • {subject.totalChapters} Chapters • {subject.neetWeightagePercent}% NEET Weightage
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 border border-[#E5E7EB] px-3 py-1 text-xs font-bold text-[#111827]">
                  {subject.badge}
                </span>
              </div>

              {/* Units */}
              <div className="space-y-4 pl-0 sm:pl-4">
                {visibleUnits.map((unit) => {
                  const isExpanded = cleanQuery ? true : (expandedUnits[unit.id] ?? true);

                  const filteredChapters = unit.chapters.filter((chap) => {
                    if (!cleanQuery) return true;
                    const chapNameMatch = chap.name.toLowerCase().includes(cleanQuery);
                    const chapDescMatch = chap.description.toLowerCase().includes(cleanQuery);
                    const unitNameMatch = unit.name.toLowerCase().includes(cleanQuery);
                    const topicMatch = chap.topics.some(
                      (top) =>
                        top.title.toLowerCase().includes(cleanQuery) ||
                        top.description.toLowerCase().includes(cleanQuery)
                    );
                    return chapNameMatch || chapDescMatch || unitNameMatch || topicMatch;
                  });

                  if (filteredChapters.length === 0) return null;

                  return (
                    <div
                      key={unit.id}
                      className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden transition-all"
                    >
                      {/* Unit Header Bar */}
                      <button
                        onClick={() => toggleUnit(unit.id)}
                        className="flex w-full items-center justify-between bg-slate-50 p-5 text-left hover:bg-slate-100 transition-all border-b border-[#E5E7EB]"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                              {subject.name} • {unit.classLevel} Unit
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-[#111827] mt-0.5">{unit.name}</h3>
                          <p className="text-xs text-[#6B7280] mt-1">{unit.description}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#6B7280] font-medium hidden sm:inline">
                            {filteredChapters.length} Chapters
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-[#2563EB]" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Unit Chapters Body */}
                      {isExpanded && (
                        <div className="p-5 space-y-6">
                          {filteredChapters.map((chapter) => {
                            const analytics = getChapterAnalytics(chapter.id);

                            return (
                              <div key={chapter.id} className="space-y-4">
                                {/* Chapter Metadata Card */}
                                <div className="rounded-2xl border border-[#E5E7EB] bg-slate-50/60 p-4 space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-[#111827]">{chapter.name}</h4>
                                        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                                          {chapter.classLevel}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-[#6B7280] mt-0.5">{chapter.description}</p>
                                    </div>

                                    {/* AI Confidence Badge */}
                                    <div className="flex items-center gap-2 shrink-0">
                                      <div className="rounded-xl border border-blue-200 bg-white px-3 py-1 text-center shadow-xs">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">AI Confidence Score</p>
                                        <p className={`text-sm font-black ${
                                          analytics.aiConfidenceScore >= 80 ? 'text-emerald-600' : analytics.aiConfidenceScore >= 50 ? 'text-[#2563EB]' : 'text-amber-600'
                                        }`}>
                                          {analytics.aiConfidenceScore}%
                                        </p>
                                      </div>

                                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-center shadow-xs">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Remaining Hours</p>
                                        <p className="text-sm font-black text-[#111827]">
                                          {analytics.estimatedHoursLeft} hrs
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Metrics Bar */}
                                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
                                    <span className="font-semibold text-[#111827]">
                                      Progress: {analytics.completedTopicsCount}/{analytics.totalTopicsCount} Topics ({analytics.progressPercent}%)
                                    </span>
                                    <span>•</span>
                                    <span className="font-semibold text-[#7C3AED]">
                                      PYQ Weightage Score: {analytics.pyqWeightageScore}/10
                                    </span>
                                    <span>•</span>
                                    <span className="font-semibold text-emerald-700">
                                      MCQs Solved: {analytics.mcqCompletionPercent}%
                                    </span>
                                  </div>
                                </div>

                                {/* Topics Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {chapter.topics.map((topic) => {
                                    const progress = topicProgress[topic.id];
                                    const isCompleted = progress?.completed;
                                    const unlockInfo = isTopicUnlocked(topic.id);

                                    return (
                                      <div
                                        key={topic.id}
                                        onClick={() => openTopicDetail(topic.id)}
                                        className={`group flex flex-col justify-between rounded-2xl border p-4 transition-all cursor-pointer ${
                                          !unlockInfo.unlocked
                                            ? 'border-amber-200 bg-amber-50/20 opacity-90'
                                            : isCompleted
                                            ? 'border-emerald-300 bg-emerald-50/50'
                                            : 'border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:shadow-md'
                                        }`}
                                      >
                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                              <Tv className="h-3.5 w-3.5 text-[#2563EB]" />
                                              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                                Topic ({topic.difficulty})
                                              </span>
                                            </div>

                                            {!unlockInfo.unlocked ? (
                                              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                                                <Lock className="h-3 w-3" />
                                                Locked
                                              </span>
                                            ) : isCompleted ? (
                                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                                Mastered
                                              </span>
                                            ) : (
                                              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                                                {topic.lectures?.length || 1} Mapped Lectures
                                              </span>
                                            )}
                                          </div>

                                          <h5 className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors leading-snug">
                                            {topic.title}
                                          </h5>

                                          <p className="text-[11px] text-[#6B7280] line-clamp-2">
                                            {topic.description}
                                          </p>

                                          {/* Subtopics Preview */}
                                          {topic.subtopics && topic.subtopics.length > 0 && (
                                            <div className="pt-2">
                                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subtopics ({topic.subtopics.length}):</p>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                {topic.subtopics.slice(0, 3).map((sub) => (
                                                  <span key={sub.id} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-[#6B7280] truncate max-w-[150px]">
                                                    {sub.title}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-2.5 text-[11px] text-[#6B7280]">
                                          <div className="flex items-center gap-3 font-medium">
                                            <span className="flex items-center gap-1">
                                              <Clock className="h-3 w-3 text-[#2563EB]" />
                                              {topic.estimatedStudyMinutes || 60}m
                                            </span>
                                            <span className="flex items-center gap-1">
                                              <HelpCircle className="h-3 w-3 text-[#7C3AED]" />
                                              {topic.pyqs.length} PYQs
                                            </span>
                                          </div>

                                          <span className="flex items-center gap-1 font-bold text-[#2563EB] group-hover:translate-x-0.5 transition-transform">
                                            {!unlockInfo.unlocked ? 'View Prerequisite' : 'Start Flow'}
                                            <ArrowRight className="h-3 w-3" />
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
