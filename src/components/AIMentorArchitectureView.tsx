import React, { useState } from 'react';
import { formatAIMentorPrompt, MentorPromptRequest } from '../services/gemini';
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { TeacherFormattedMessage } from './TeacherFormattedMessage';
import {
  BrainCircuit,
  Bot,
  Copy,
  Check,
  Send,
  Code,
  ShieldCheck,
  Sparkles,
  Zap,
  BookOpen,
  Atom,
  Dna,
  FlaskConical,
  RotateCcw,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export const AIMentorArchitectureView: React.FC = () => {
  const { addToRevisionQueue } = useApp();
  const [selectedType, setSelectedType] = useState<MentorPromptRequest['promptType']>('physics_solver');
  const [userQuery, setUserQuery] = useState('How to solve moment of inertia of disc about tangent parallel to plane?');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [modelName, setModelName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedToQueue, setSavedToQueue] = useState(false);

  const formattedPrompt = formatAIMentorPrompt({
    promptType: selectedType,
    subject: selectedType === 'physics_solver' ? 'Physics' : selectedType === 'biology_ncert' ? 'Biology' : 'Chemistry',
    topicTitle: 'NEET High-Yield Query',
    userQuery
  });

  const handleSolveDoubt = async () => {
    if (!userQuery.trim()) return;
    setLoading(true);
    setAiAnswer(null);
    try {
      const res = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: selectedType,
          subject: selectedType === 'physics_solver' ? 'Physics' : selectedType === 'biology_ncert' ? 'Biology' : 'Chemistry',
          topicTitle: 'NEET Query',
          userQuery
        })
      });
      const data = await res.json();
      if (data.answer) {
        setAiAnswer(data.answer);
        setModelName(data.modelUsed || 'gemini-2.5-flash');
      }
    } catch (err) {
      setAiAnswer('### ⚠️ Connection Error\nCould not connect to AI Brain backend. Please check server status.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToRevision = () => {
    if (!aiAnswer) return;
    const subjectId = selectedType === 'physics_solver' ? 'physics' : selectedType === 'biology_ncert' ? 'biology' : 'chemistry';
    addToRevisionQueue(
      'topic-ai-query',
      `AI Brain: ${userQuery.substring(0, 30)}...`,
      'AI Doubts & High Yield Notes',
      subjectId
    );
    setSavedToQueue(true);
    setTimeout(() => setSavedToQueue(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#7C3AED] border border-purple-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>NEET AI BRAIN & MENTOR HUB</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">
            AI Mind & NCERT Tutor for NEET UG
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Ask numerical doubts, decode complex NCERT lines, generate mechanism steps, and get step-by-step solutions instantly.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl font-bold shrink-0">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Server-Side Gemini 2.5 API Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Form & Presets (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-5">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-[#2563EB]" />
                <span>Select AI Brain Specialized Mode</span>
              </h2>
              <p className="text-xs text-[#6B7280]">
                Choose the subject persona for customized explanations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setSelectedType('physics_solver');
                  setUserQuery('How to solve moment of inertia of disc about tangent parallel to plane?');
                }}
                className={`rounded-xl border p-3 font-bold text-left transition-all flex flex-col justify-between gap-2 ${
                  selectedType === 'physics_solver'
                    ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-sm'
                    : 'border-[#E5E7EB] bg-slate-50 text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Atom className="h-4 w-4 shrink-0" />
                  <span>Physics Numerical</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500">Formulas & Step Derivations</span>
              </button>

              <button
                onClick={() => {
                  setSelectedType('biology_ncert');
                  setUserQuery('Explain eukaryotic transcription RNA Polymerase I vs II vs III with NCERT lines.');
                }}
                className={`rounded-xl border p-3 font-bold text-left transition-all flex flex-col justify-between gap-2 ${
                  selectedType === 'biology_ncert'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                    : 'border-[#E5E7EB] bg-slate-50 text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Dna className="h-4 w-4 shrink-0" />
                  <span>Bio NCERT Decoder</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500">NCERT Line Traps & Mnemonics</span>
              </button>

              <button
                onClick={() => {
                  setSelectedType('chemistry_mechanism');
                  setUserQuery('Explain inductive effect stability order for 3° vs 2° vs 1° carbocations.');
                }}
                className={`rounded-xl border p-3 font-bold text-left transition-all flex flex-col justify-between gap-2 ${
                  selectedType === 'chemistry_mechanism'
                    ? 'border-purple-500 bg-purple-50 text-[#7C3AED] shadow-sm'
                    : 'border-[#E5E7EB] bg-slate-50 text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <FlaskConical className="h-4 w-4 shrink-0" />
                  <span>Chemistry Mechanism</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500">Organic & Physical Chemistry</span>
              </button>

              <button
                onClick={() => {
                  setSelectedType('study_plan');
                  setUserQuery('Create 4-hour daily dropper study schedule for Physics + Bio NCERT.');
                }}
                className={`rounded-xl border p-3 font-bold text-left transition-all flex flex-col justify-between gap-2 ${
                  selectedType === 'study_plan'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-sm'
                    : 'border-[#E5E7EB] bg-slate-50 text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 shrink-0" />
                  <span>Study Strategy</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500">Dropper Target Planner</span>
              </button>
            </div>

            {/* Quick Preset Chips */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>High-Yield Practice Questions</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Calculate de Broglie wavelength when electron momentum doubles',
                  'Compare SN1 vs SN2 reaction mechanism and stereochemistry',
                  'Explain Calvin Cycle (C3) CO2 fixation steps with NCERT page terms',
                  'What is perpendicular axis theorem formula for planar lamina?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserQuery(q)}
                    className="text-[10px] bg-slate-100 hover:bg-blue-100 hover:text-[#2563EB] text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-all text-left"
                  >
                    {q.length > 45 ? q.substring(0, 45) + '...' : q}
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#111827]">Enter Your Question / Problem Statement</label>
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask any Physics numerical, Chemistry reaction, or Biology NCERT line..."
                className="h-28 w-full rounded-xl border border-[#E5E7EB] bg-slate-50 p-3 text-xs text-[#111827] focus:border-[#2563EB] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              onClick={handleSolveDoubt}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? 'AI Brain is thinking...' : 'Ask AI Brain & Solve Doubt'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: AI Brain Response Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4 min-h-[420px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-[#2563EB]" />
                  <span className="text-sm font-extrabold text-[#111827]">
                    NEET AI Brain Response
                  </span>
                  {modelName && (
                    <span className="text-[10px] font-bold bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">
                      {modelName}
                    </span>
                  )}
                </div>

                {aiAnswer && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveToRevision}
                      className="inline-flex items-center gap-1.5 text-xs text-[#7C3AED] hover:bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 font-bold transition-all"
                    >
                      {savedToQueue ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <PlusCircle className="h-3.5 w-3.5" />}
                      <span>{savedToQueue ? 'Saved to Queue!' : 'Save to Revision'}</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiAnswer);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 font-bold px-2 py-1 rounded-lg border border-slate-200"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent"></div>
                  <p className="text-xs font-bold text-[#2563EB]">Analyzing NCERT text lines and physics formulas...</p>
                </div>
              ) : aiAnswer ? (
                <div className="text-xs sm:text-sm text-[#111827] leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <TeacherFormattedMessage content={aiAnswer} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563EB]">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827]">Your AI Doubt Resolver is Ready</h3>
                  <p className="text-xs text-[#6B7280] max-w-sm">
                    Select a subject mode on the left or enter any Physics, Chemistry, or Biology doubt to receive instant AI solutions.
                  </p>
                </div>
              )}
            </div>

            {/* Prompt Architecture Disclosure */}
            <div className="pt-4 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                <Code className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Format: NCERT Aligned • 100% Secure Server-side API</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
