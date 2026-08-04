import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { ChevronDown, ChevronRight, Play, FileText, CheckCircle2 } from 'lucide-react';

export const SyllabusView: React.FC = () => {
  const { openTopicDetail, topicProgress, selectedSubjectFilter, setSelectedSubjectFilter, setCurrentView } = useApp();
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('chap-phy-rotational');

  const currentSubjectId = selectedSubjectFilter === 'all' ? 'physics' : selectedSubjectFilter;

  const currentSubject =
    CURRICULUM_DATA.find((s) => s.id === currentSubjectId) || CURRICULUM_DATA[0];

  // Flatten all chapters for the subject
  const allSubjectChapters = currentSubject.units.flatMap((u) => u.chapters);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      {/* Subject Selector Header (Physics | Chemistry | Botany | Zoology) */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto">
        <button
          onClick={() => setSelectedSubjectFilter('physics')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            currentSubjectId === 'physics'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          Physics
        </button>
        <button
          onClick={() => setSelectedSubjectFilter('chemistry')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            currentSubjectId === 'chemistry'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          Chemistry
        </button>
        <button
          onClick={() => setSelectedSubjectFilter('biology')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition-all shrink-0 ${
            currentSubjectId === 'biology'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          Botany & Zoology
        </button>
        <button
          onClick={() => setCurrentView('kapil-biology-channel')}
          className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs font-bold transition-all shrink-0 shadow-sm flex items-center gap-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          <span>Kapil's Biology Classes Sync</span>
        </button>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {allSubjectChapters.map((chapter, index) => {
          const chapterNumber = index + 1;
          const isExpanded = expandedChapterId === chapter.id;

          const totalTopics = chapter.topics.length;
          const completedTopics = chapter.topics.filter((t) => topicProgress[t.id]?.completed).length;
          const progressPercent = Math.round((completedTopics / (totalTopics || 1)) * 100);

          const lectureCount = totalTopics * 3; // Approx 3 lectures per topic
          const dppCount = totalTopics * 2; // 2 DPP sets per topic

          return (
            <div
              key={chapter.id}
              className="rounded-[20px] bg-white border border-slate-100 shadow-sm overflow-hidden transition-all"
            >
              {/* Clean PW Chapter Card */}
              <button
                onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                className="flex w-full items-center justify-between p-5 text-left hover:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] text-xs font-extrabold shrink-0">
                    Ch {chapterNumber < 10 ? `0${chapterNumber}` : chapterNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{chapter.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>{lectureCount} Lectures</span>
                      <span>•</span>
                      <span>{dppCount} DPPs</span>
                      <span>•</span>
                      <span className="font-bold text-[#2563EB]">{progressPercent}% Progress</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-[#2563EB]" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Lecture List for Expanded Chapter */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">Lecture List</p>
                  {chapter.topics.map((topic, topicIdx) => {
                    const isCompleted = topicProgress[topic.id]?.completed;

                    return (
                      <div
                        key={topic.id}
                        onClick={() => openTopicDetail(topic.id)}
                        className="flex items-center justify-between rounded-[16px] bg-white border border-slate-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-[#2563EB]'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4 fill-[#2563EB]" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                              L{topicIdx + 1}: {topic.title}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{topic.estimatedStudyMinutes || 60} mins • High Yield</p>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                          Watch Video →
                        </span>
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
};
