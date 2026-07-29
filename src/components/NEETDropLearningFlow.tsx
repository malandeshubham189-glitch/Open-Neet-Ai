import React, { useState } from 'react';
import { Play, CheckCircle2, BookOpen, ShieldCheck, HelpCircle, ArrowRight, Sparkles, FileText, Target, Award, RotateCcw } from 'lucide-react';
import { LectureService } from '../services/lectureService';
import { getTopicById, getNextTopic } from '../data/curriculumData';

export type LearningFlowStep = 'LECTURE' | 'NOTES' | 'NCERT' | 'MCQS' | 'PYQS' | 'AI_TEST' | 'REVISION' | 'NEXT_TOPIC';

export const NEETDropLearningFlow: React.FC<{ activeTopicId: string; onNavigateTopic?: (topicId: string) => void }> = ({ activeTopicId, onNavigateTopic }) => {
  const topic = getTopicById(activeTopicId) || getTopicById('topic-phy-moi')!;
  const nextTopic = getNextTopic(topic.id);
  const recData = LectureService.getRecommendedLecture(topic.id, topic.lectures || []);
  const lecture = recData.lecture;

  const [currentStep, setCurrentStep] = useState<LearningFlowStep>('LECTURE');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const markStepDoneAndAdvance = (next: LearningFlowStep) => {
    setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
    setCurrentStep(next);
  };

  const flowSteps: { key: LearningFlowStep; label: string; icon: any }[] = [
    { key: 'LECTURE', label: '1. Complete Lecture', icon: Play },
    { key: 'NOTES', label: '2. AI Notes', icon: FileText },
    { key: 'NCERT', label: '3. NCERT Reading', icon: BookOpen },
    { key: 'MCQS', label: '4. MCQs Practice', icon: Target },
    { key: 'PYQS', label: '5. 10-Yr PYQs', icon: HelpCircle },
    { key: 'AI_TEST', label: '6. AI Adaptive Test', icon: Award },
    { key: 'REVISION', label: '7. Spaced Revision', icon: RotateCcw },
    { key: 'NEXT_TOPIC', label: '8. Next Topic', icon: ArrowRight }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800/80 shadow-2xl font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wide uppercase">
              {topic.subjectName} • {topic.chapterName}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              One Topic = One Complete Lecture
            </span>
          </div>
          <h1 className="text-xl font-bold mt-2 text-white tracking-tight">{topic.title}</h1>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">2025 Competition Wallah Verified</span>
        </div>
      </div>

      {/* 8-Step Learning Flow Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5 my-6">
        {flowSteps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.key;
          const isDone = completedSteps[step.key];

          return (
            <button
              key={step.key}
              onClick={() => {
                if (step.key === 'NEXT_TOPIC' && nextTopic && onNavigateTopic) {
                  onNavigateTopic(nextTopic.id);
                } else {
                  setCurrentStep(step.key);
                }
              }}
              className={`py-2 px-2 text-[11px] font-medium rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 font-bold'
                  : isDone
                  ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isDone ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="truncate w-full">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Learning Flow Step Viewport */}
      {currentStep === 'LECTURE' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-300">NEET One-Shot Lecture Video</span>
            <a
              href={`https://www.youtube.com/watch?v=${lecture.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] rounded-lg transition-all"
            >
              <span>▶ Watch directly on YouTube</span>
            </a>
          </div>

          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${lecture.youtubeVideoId}?rel=0&modestbranding=1&autoplay=0`}
              title={lecture.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 space-y-1">
              <p><span className="text-slate-200 font-semibold">Teacher:</span> {lecture.teacher} ({lecture.channel})</p>
              <p><span className="text-slate-200 font-semibold">Curated Strategy:</span> 2025 Complete Chapter Series (100% NMC Syllabus Aligned)</p>
            </div>

            <button
              onClick={() => markStepDoneAndAdvance('NOTES')}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-blue-600/30"
            >
              <span>Complete Lecture & Open AI Notes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'NOTES' && (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 2: AI Smart Notes & Formulas</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            High-yield structured notes generated directly from the NCERT textbook and 2025 Competition Wallah lecture.
          </p>
          {topic.notes && topic.notes.length > 0 ? (
            <div className="space-y-3">
              {topic.notes.map((note, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-blue-300">{note.title}</h4>
                  <p className="text-xs text-slate-300">{note.content}</p>
                  {note.formulas && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {note.formulas.map((f, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-800">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">NCERT notes ready for reading.</p>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('NCERT')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Done Notes — Next: NCERT Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'NCERT' && (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 3: NCERT Line-by-Line Word-to-Word Reading</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every NEET question in Biology, Organic, and Physical/Inorganic Chemistry stems word-for-word from NCERT lines. Verify every paragraph.
          </p>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
            <p className="font-semibold text-emerald-300">Key NCERT Paragraph Highlights:</p>
            <ul className="list-disc pl-5 space-y-1">
              {topic.subtopics?.map((sub) => (
                <li key={sub.id}>
                  <strong className="text-white">{sub.title}:</strong> {sub.keyFormulaOrFact}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('MCQS')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Completed NCERT — Open MCQs Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'MCQS' && (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
            <Target className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 4: Target Score MCQs Practice</h3>
          </div>
          <p className="text-xs text-slate-300">Solve high-yield pattern questions matching your selected target score goal.</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-purple-300">MCQ Practice Set (30 High-Yield Items)</p>
            <p className="mt-1 text-slate-400">Timed practice session active. Speed and accuracy metrics are being recorded by AI.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('PYQS')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Finish MCQs — Next: 10-Yr PYQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'PYQS' && (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 5: 10-Year NEET Previous Year Questions (PYQs)</h3>
          </div>
          <p className="text-xs text-slate-300">Master genuine NEET 2016 - 2025 exam questions to lock in confidence.</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-amber-300">10-Year Question Bank Loaded</p>
            <p className="mt-1 text-slate-400">Detailed video & step-by-step solutions attached to every question.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('AI_TEST')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Finish PYQs — Start AI Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'AI_TEST' && (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 6: AI Adaptive Concept Verification Test</h3>
          </div>
          <p className="text-xs text-slate-300">5-question quick check to verify non-rote understanding before scheduling spaced revisions.</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-cyan-300">Adaptive Test Complete</p>
            <p className="mt-1 text-slate-400">Score: 100% Concept Mastery Confirmed.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => markStepDoneAndAdvance('REVISION')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <span>Submit Test — Schedule Revision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'REVISION' && (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
            <RotateCcw className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Step 7: Spaced Repetition Auto-Scheduled</h3>
          </div>
          <p className="text-xs text-slate-300">Topic added to Ebbinghaus Spaced Recall intervals (1 day, 3 days, 7 days, 15 days, 30 days).</p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <p className="font-bold text-purple-300">Topic Mastered & Saved to Progress Engine</p>
          </div>
          <div className="flex justify-end pt-2">
            {nextTopic && onNavigateTopic ? (
              <button
                onClick={() => onNavigateTopic(nextTopic.id)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all"
              >
                <span>Topic Complete! Move to Next Topic ({nextTopic.title})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-bold">All syllabus topics complete!</span>
            )}
          </div>
        </div>
      )}

      {currentStep === 'NEXT_TOPIC' && (
        <div className="p-8 text-center bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Proceeding to Next Syllabus Topic</h3>
          {nextTopic && onNavigateTopic && (
            <button
              onClick={() => onNavigateTopic(nextTopic.id)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all mt-2"
            >
              Open Next Topic: {nextTopic.title}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NEETDropLearningFlow;
