import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics, getAllChapters } from '../data/curriculumData';
import { Search, X, BookOpen, Layers, Video, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { openTopicDetail } = useApp();
  const [query, setQuery] = useState('');

  const allTopics = useMemo(() => getAllTopics(), []);
  const allChapters = useMemo(() => getAllChapters(), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: Array<{
      type: 'chapter' | 'topic' | 'teacher';
      id: string;
      topicId: string;
      title: string;
      subtitle: string;
    }> = [];

    // 1. Search Chapters
    allChapters.forEach((chapter) => {
      if (chapter.name.toLowerCase().includes(q)) {
        const firstTopic = chapter.topics[0];
        if (firstTopic) {
          results.push({
            type: 'chapter',
            id: `chap-${chapter.id}`,
            topicId: firstTopic.id,
            title: `Chapter: ${chapter.name}`,
            subtitle: `${chapter.subjectId.toUpperCase()} • ${chapter.topics.length} Topics`
          });
        }
      }
    });

    // 2. Search Topics & Teachers
    allTopics.forEach((topic) => {
      if (topic.title.toLowerCase().includes(q)) {
        results.push({
          type: 'topic',
          id: `top-${topic.id}`,
          topicId: topic.id,
          title: topic.title,
          subtitle: `${topic.subjectName} • ${topic.chapterName}`
        });
      }

      topic.lectures?.forEach((lec) => {
        if (lec.teacher.toLowerCase().includes(q) || lec.channel.toLowerCase().includes(q)) {
          results.push({
            type: 'teacher',
            id: `teacher-${lec.id}`,
            topicId: topic.id,
            title: `Teacher: ${lec.teacher}`,
            subtitle: `${lec.channel} • Lecture: ${topic.title}`
          });
        }
      });
    });

    return results.slice(0, 15);
  }, [query, allTopics, allChapters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 p-4 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[20px] bg-white shadow-2xl overflow-hidden border border-slate-100 font-sans">
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 p-4 bg-white">
          <Search className="h-5 w-5 text-[#2563EB]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Chapter, Topic, or Teacher..."
            autoFocus
            className="w-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type to search any Chapter, Topic, or Teacher instantly.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matches found for "{query}"
            </div>
          ) : (
            searchResults.map((res) => (
              <button
                key={res.id}
                onClick={() => {
                  openTopicDetail(res.topicId);
                  onClose();
                }}
                className="w-full text-left rounded-xl p-3 hover:bg-slate-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                    {res.type === 'chapter' ? (
                      <Layers className="h-4 w-4" />
                    ) : res.type === 'teacher' ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <BookOpen className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      {res.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{res.subtitle}</p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
