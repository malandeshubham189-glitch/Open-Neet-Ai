import React, { useState } from 'react';
import {
  NursingYear,
  NursingSubjectId,
  NursingTopic,
  NursingUniversityQuestion,
  NursingMCQ
} from '../../types/nursing';
import {
  getAllNursingTopics,
  NURSING_CURRICULUM_DATA
} from '../../data/nursingCurriculumData';
import { UniversityQuestionEngine } from '../../services/nursing/universityQuestionEngine';
import {
  BookOpen,
  CheckCheck,
  Sparkles,
  HelpCircle,
  Award,
  Layers,
  Search,
  Filter,
  Check,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

interface NursingQuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: NursingYear;
  onLaunchMockTest: () => void;
  onSelectTopic?: (topicId: string) => void;
}

export const NursingQuestionBankModal: React.FC<NursingQuestionBankModalProps> = ({
  isOpen,
  onClose,
  year,
  onLaunchMockTest,
  onSelectTopic
}) => {
  const [activeTab, setActiveTab] = useState<'mcqs' | 'university' | 'ai_practice' | 'mock_tests'>('university');
  const [selectedSubject, setSelectedSubject] = useState<NursingSubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  if (!isOpen) return null;

  const yearSubjects = NURSING_CURRICULUM_DATA[year].subjects;
  const allYearTopics = getAllNursingTopics(year);

  const filteredTopics = allYearTopics.filter((t) => {
    const matchesSubject = selectedSubject === 'all' || t.subjectId === selectedSubject;
    const matchesSearch = searchQuery
      ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.unitTitle.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSubject && matchesSearch;
  });

  // Collect All University Questions (Verified vs AI Practice)
  const allUniversityQuestions: { topic: NursingTopic; question: NursingUniversityQuestion }[] = [];
  filteredTopics.forEach((topic) => {
    const qSet = UniversityQuestionEngine.getUniversityQuestionsForTopic(topic);
    qSet.verifiedPYQs.forEach((q) => {
      allUniversityQuestions.push({ topic, question: q });
    });
  });

  const allAIPracticeQuestions: { topic: NursingTopic; question: NursingUniversityQuestion }[] = [];
  filteredTopics.forEach((topic) => {
    const qSet = UniversityQuestionEngine.getUniversityQuestionsForTopic(topic);
    qSet.aiPracticeQuestions.forEach((q) => {
      allAIPracticeQuestions.push({ topic, question: q });
    });
  });

  // Collect All MCQs
  const allMCQs: { topic: NursingTopic; mcq: NursingMCQ }[] = [];
  filteredTopics.forEach((topic) => {
    (topic.mcqs || []).forEach((mcq) => {
      allMCQs.push({ topic, mcq });
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                B.Sc Nursing Official Question Bank
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                MUHS University PYQs (15M/5M), Section-A Clinical MCQs & AI Practice
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex rounded-2xl bg-slate-100 p-1">
            {[
              { id: 'university' as const, label: 'Verified University PYQs', count: allUniversityQuestions.length, badge: 'MUHS Past Papers' },
              { id: 'mcqs' as const, label: 'Clinical MCQs', count: allMCQs.length, badge: 'Section A & NORCET' },
              { id: 'ai_practice' as const, label: 'AI Practice Questions', count: allAIPracticeQuestions.length, badge: 'Syllabus Based' },
              { id: 'mock_tests' as const, label: 'Mock Test Launcher', count: 4, badge: 'Timed Exams' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                  activeTab === tab.id ? 'bg-purple-100 text-purple-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as any)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All Subjects</option>
              {yearSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= TAB 1: VERIFIED UNIVERSITY PYQS ================= */}
        {activeTab === 'university' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2 font-bold">
                <CheckCheck className="h-4 w-4 text-emerald-600" />
                <span>Verified Maharashtra University of Health Sciences (MUHS) Past Examinations</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800">
                15-Mark Long Answer Questions (LAQ) & 5-Mark Short Answer Questions (SAQ)
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {allUniversityQuestions.map(({ topic, question }, idx) => {
                const isExpanded = expandedQuestionId === question.id || expandedQuestionId === `${topic.id}-${idx}`;
                const blueprint = UniversityQuestionEngine.generateLAQBlueprint(question);

                return (
                  <div
                    key={question.id || `${topic.id}-${idx}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 transition-all hover:border-slate-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <CheckCheck className="h-3 w-3" />
                            <span>VERIFIED PYQ ({question.examSession || 'MUHS Final Paper'})</span>
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {topic.subjectName} • Unit {topic.unitNumber}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-relaxed pt-1">
                          {question.question}
                        </h4>
                      </div>

                      <span className="text-xs font-black text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 shrink-0">
                        {question.marks || 15} Marks
                      </span>
                    </div>

                    {/* Expand / Collapse Blueprint */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500">
                        Topic: <strong>{topic.title}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        {onSelectTopic && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectTopic(topic.id);
                              onClose();
                            }}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                          >
                            Open Topic
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setExpandedQuestionId(isExpanded ? null : question.id || `${topic.id}-${idx}`)}
                          className="flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Model Blueprint' : 'View Model Marking Blueprint'}</span>
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-3 mt-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>Marking Scheme & Sectional Distribution:</span>
                          <span className="text-emerald-700">Recommended Time: {blueprint.recommendedTimeMinutes} mins</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {blueprint.markingRubric.map((rubric, rIdx) => (
                            <div key={rIdx} className="rounded-xl bg-white p-2.5 border border-slate-200 flex items-start justify-between gap-2">
                              <div>
                                <div className="font-bold text-slate-900">{rubric.section}</div>
                                <div className="text-[11px] text-slate-500">{rubric.expectation}</div>
                              </div>
                              <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded shrink-0">
                                {rubric.marksAllocated}M
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200">
                          <strong>Essential Keywords:</strong> {question.keyPointsToInclude?.join(', ') || 'NANDA diagnosis, pathophysiology, medical management, rationales'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CLINICAL MCQS ================= */}
        {activeTab === 'mcqs' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700 font-semibold flex items-center justify-between">
              <span>Section-A Clinical Vignettes & NORCET Nursing Officer Practice Questions</span>
              <span className="text-slate-500">1 Mark each</span>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {allMCQs.map(({ topic, mcq }, idx) => (
                <div key={mcq.id || idx} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500">
                        {topic.subjectName} • {topic.title}
                      </span>
                      {mcq.tag && (
                        <span className="text-[9px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                          {mcq.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {idx + 1}. {mcq.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {mcq.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`rounded-xl border p-2.5 ${
                          opt.id === mcq.correctAnswerId
                            ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 font-bold'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        <strong>{opt.id}.</strong> {opt.text}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-700 space-y-0.5 border border-slate-100">
                    <div>
                      <strong>Correct Answer:</strong>{' '}
                      <span className="text-emerald-700 font-bold">{mcq.correctAnswerId}</span>
                    </div>
                    <p>{mcq.explanation}</p>
                    {mcq.clinicalRationale && (
                      <p className="text-emerald-800 font-medium pt-1">
                        <strong>Scientific Rationale:</strong> {mcq.clinicalRationale}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: AI PRACTICE QUESTIONS ================= */}
        {activeTab === 'ai_practice' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-3.5 flex items-center justify-between text-xs text-indigo-900">
              <div className="flex items-center gap-2 font-bold">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>AI-Generated Practice Blueprints (Strictly mapped to INC/MUHS Syllabus Topics)</span>
              </div>
              <span className="text-[11px] font-semibold text-indigo-800">
                Practice Questions (Not labeled as verified PYQ)
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {allAIPracticeQuestions.map(({ topic, question }, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-indigo-500" />
                          <span>AI PRACTICE BLUEPRINT</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">{topic.subjectName}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{question.question}</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
                      {question.marks || 15} Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>Model Outline:</strong> {question.modelAnswerOutline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: MOCK TESTS ================= */}
        {activeTab === 'mock_tests' && (
          <div className="space-y-6 text-center p-8 bg-slate-50 rounded-3xl border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
              <Award className="h-8 w-8" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-lg font-black text-slate-900">
                Ready for a Real-Time Examination Simulation?
              </h3>
              <p className="text-xs text-slate-600">
                Launch a full B.Sc Nursing mock test with live timer, question palette, and instant diagnostic evaluation of weak areas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onLaunchMockTest();
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <Award className="h-4 w-4" />
              <span>Launch Full B.Sc Nursing Mock Test</span>
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Close Question Bank
          </button>
        </div>
      </div>
    </div>
  );
};
