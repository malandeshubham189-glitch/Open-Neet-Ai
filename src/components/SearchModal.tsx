import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA, getAllTopics, getAllChapters } from '../data/curriculumData';
import {
  Search,
  X,
  BookOpen,
  Video,
  FileText,
  Sparkles,
  ChevronRight,
  UserCheck,
  Tag,
  Lock,
  Layers
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { openTopicDetail, isTopicUnlocked } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'chapters' | 'topics' | 'formulas' | 'ncert' | 'lectures'>('all');

  const allTopics = useMemo(() => getAllTopics(), []);
  const allChapters = useMemo(() => getAllChapters(), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: Array<{
      type: 'chapter' | 'topic' | 'formula' | 'ncert' | 'lecture';
      id: string;
      topicId: string;
      title: string;
      subtitle: string;
      snippet: string;
      badge: string;
      subjectId: string;
    }> = [];

    // 1. Search Chapters
    allChapters.forEach((chapter) => {
      if (
        chapter.name.toLowerCase().includes(q) ||
        chapter.description.toLowerCase().includes(q) ||
        chapter.unitName.toLowerCase().includes(q)
      ) {
        const firstTopic = chapter.topics[0];
        if (firstTopic) {
          results.push({
            type: 'chapter',
            id: `chap-${chapter.id}`,
            topicId: firstTopic.id,
            title: `Chapter: ${chapter.name}`,
            subtitle: `${chapter.subjectId.toUpperCase()} • ${chapter.classLevel} • ${chapter.unitName}`,
            snippet: `${chapter.description} (${chapter.topics.length} Topics Available)`,
            badge: `PYQ Weightage: ${chapter.pyqWeightageScore}/10`,
            subjectId: chapter.subjectId
          });
        }
      }
    });

    // 2. Search Topics, Formulas, NCERT, Lectures
    allTopics.forEach((topic) => {
      // Topic Match
      if (
        topic.title.toLowerCase().includes(q) ||
        topic.chapterName.toLowerCase().includes(q) ||
        topic.unitName.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'topic',
          id: `top-${topic.id}`,
          topicId: topic.id,
          title: topic.title,
          subtitle: `${topic.subjectName} • ${topic.classLevel} • ${topic.chapterName}`,
          snippet: topic.description,
          badge: `Weightage: ${topic.neetWeightage}`,
          subjectId: topic.subjectId
        });
      }

      // Formulas & Notes Match
      topic.notes?.forEach((note) => {
        note.formulas?.forEach((form) => {
          if (form.toLowerCase().includes(q) || note.title.toLowerCase().includes(q)) {
            results.push({
              type: 'formula',
              id: `form-${topic.id}-${form}`,
              topicId: topic.id,
              title: form,
              subtitle: `Formula from: ${topic.title} (${topic.chapterName})`,
              snippet: `Section: ${note.title} - ${note.content.substring(0, 100)}...`,
              badge: 'High Yield Formula',
              subjectId: topic.subjectId
            });
          }
        });

        if (note.content.toLowerCase().includes(q)) {
          results.push({
            type: 'ncert',
            id: `ncert-${topic.id}-${note.title}`,
            topicId: topic.id,
            title: note.title,
            subtitle: `NCERT Note: ${topic.title}`,
            snippet: note.content,
            badge: 'NCERT Line',
            subjectId: topic.subjectId
          });
        }
      });

      // Lecture / Teacher Match
      topic.lectures?.forEach((lec) => {
        if (
          lec.title.toLowerCase().includes(q) ||
          lec.teacher.toLowerCase().includes(q) ||
          lec.channel.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'lecture',
            id: `lec-${lec.id}`,
            topicId: topic.id,
            title: `${lec.teacher}: ${lec.title}`,
            subtitle: `${lec.channel} • ${lec.language} • ${lec.recordedYear}`,
            snippet: `Duration: ${lec.durationMinutes} min | ${lec.updatedStatus} | Type: ${lec.type}`,
            badge: lec.updatedStatus,
            subjectId: topic.subjectId
          });
        }
      });
    });

    if (activeCategory === 'all') return results.slice(0, 25);
    if (activeCategory === 'chapters') return results.filter((r) => r.type === 'chapter').slice(0, 25);
    if (activeCategory === 'topics') return results.filter((r) => r.type === 'topic').slice(0, 25);
    if (activeCategory === 'formulas') return results.filter((r) => r.type === 'formula').slice(0, 25);
    if (activeCategory === 'ncert') return results.filter((r) => r.type === 'ncert').slice(0, 25);
    if (activeCategory === 'lectures') return results.filter((r) => r.type === 'lecture').slice(0, 25);

    return results.slice(0, 25);
  }, [query, activeCategory, allTopics, allChapters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-5 py-4 bg-slate-50/50">
          <Search className="h-5 w-5 text-[#2563EB]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any Chapter, Topic, Formula, or Teacher (e.g. GOC, Electrostatics, Ray Optics, DNA)..."
            autoFocus
            className="w-full bg-transparent text-sm font-medium text-[#111827] placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-200/60 text-slate-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-5 py-2.5 bg-white text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'chapters', label: 'Chapters' },
            { id: 'topics', label: 'Topics' },
            { id: 'formulas', label: 'Formulas' },
            { id: 'ncert', label: 'NCERT Lines' },
            { id: 'lectures', label: 'Lectures' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`rounded-xl px-3 py-1 font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'bg-slate-100 text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <Sparkles className="mx-auto h-8 w-8 text-[#2563EB]/60 animate-pulse" />
              <p className="font-bold text-[#111827]">Instant Chapter & Syllabus Search</p>
              <p>Type "Electrostatics", "GOC", "Aldehydes", "Rotational Motion", "DNA", or "Ray Optics" to start preparing immediately.</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              <p className="font-semibold text-[#111827]">No results found for "{query}"</p>
              <p className="mt-1">Try searching by chapter name, topic title, formula, or teacher name.</p>
            </div>
          ) : (
            searchResults.map((res) => {
              const unlockStatus = isTopicUnlocked(res.topicId);

              return (
                <button
                  key={res.id}
                  onClick={() => {
                    openTopicDetail(res.topicId);
                    onClose();
                  }}
                  className="w-full text-left rounded-2xl border border-[#E5E7EB] p-3.5 hover:border-blue-300 hover:bg-blue-50/40 transition-all group flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      {res.type === 'chapter' && <Layers className="h-4 w-4 text-[#2563EB]" />}
                      {res.type === 'topic' && <BookOpen className="h-4 w-4 text-[#2563EB]" />}
                      {res.type === 'formula' && <Sparkles className="h-4 w-4 text-[#7C3AED]" />}
                      {res.type === 'ncert' && <FileText className="h-4 w-4 text-emerald-600" />}
                      {res.type === 'lecture' && <Video className="h-4 w-4 text-rose-600" />}

                      <span className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                        {res.title}
                      </span>

                      {!unlockStatus.unlocked && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          <Lock className="h-3 w-3" /> Locked Prerequisite
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] font-medium text-[#6B7280]">{res.subtitle}</p>

                    <p className="text-xs text-[#111827] line-clamp-2 bg-slate-50 p-2 rounded-xl font-mono text-[11px] border border-slate-100">
                      {res.snippet}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      {res.badge}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E5E7EB] px-5 py-2.5 bg-slate-50 flex items-center justify-between text-[11px] text-[#6B7280]">
          <span>Press ESC to close</span>
          <span className="font-semibold text-[#2563EB]">NEET Master Chapter Index</span>
        </div>
      </div>
    </div>
  );
};
