import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Tv,
  FileText,
  RotateCcw,
  Target,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Zap,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuthModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuthModal }) => {
  const { setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does NEETDrop AI eliminate YouTube distractions?',
      a: 'We use official YouTube Embedded Player API parameters (`rel=0`, `modestbranding=1`) in an isolated sandbox. You see zero recommended videos, zero comment sections, and zero shorts. Only pure education.'
    },
    {
      q: 'Is NEETDrop AI completely free for NEET 2027 Droppers?',
      a: 'Yes! All core features including embedded video lectures, NCERT high-yield notes, 10-year PYQ step-by-step solutions, and spaced revision queue are 100% free.'
    },
    {
      q: 'Does it cover Physics, Chemistry, and Biology completely?',
      a: 'Yes. The curriculum includes Class 11 & Class 12 NEET UG syllabus structured into Units, Chapters, and Granular Topics with curated high-yield video lectures.'
    },
    {
      q: 'How does the Spaced Revision Queue work?',
      a: 'When you study a topic or solve MCQs, NEETDrop AI schedules active recall reviews based on proven memory retention curves (Day 1, Day 3, Day 7, Day 21) so you never forget weak formulas or NCERT facts.'
    }
  ];

  const features = [
    {
      icon: Tv,
      title: 'Official YouTube Embed Sandbox',
      desc: 'Watch top faculty video lectures directly inside a distraction-free player. Zero sidebar recommendations or shorts.',
      color: 'text-[#2563EB]'
    },
    {
      icon: FileText,
      title: 'NCERT High-Yield Notes',
      desc: 'Concise, line-by-line NCERT summaries with memory mnemonics, key formulas, and high-yield NEET weightage highlights.',
      color: 'text-[#7C3AED]'
    },
    {
      icon: Target,
      title: '10-Year Past PYQ Engine',
      desc: 'Master authentic NEET Previous Year Questions with step-by-step derivations and NEET frequency badges.',
      color: 'text-[#2563EB]'
    },
    {
      icon: RotateCcw,
      title: 'Spaced Repetition Queue',
      desc: 'Automated active recall reviews to lock in weak formulas, organic mechanisms, and plant physiology terms.',
      color: 'text-[#7C3AED]'
    },
    {
      icon: BrainCircuit,
      title: 'AI Mentor Assistant',
      desc: 'Prepared server-side Gemini AI integration architecture for Physics numericals, NCERT line decoding, and custom study plans.',
      color: 'text-[#2563EB]'
    },
    {
      icon: Zap,
      title: 'Zen Study Focus Room',
      desc: 'Built-in Pomodoro focus timer, ambient study audio, and instant scratchpad note taking for uninterrupted deep work.',
      color: 'text-[#7C3AED]'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#2563EB]">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <span>EXCLUSIVELY DESIGNED FOR NEET 2027 DROPPERS</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-[#111827] leading-[1.15]">
            The World’s Best <br />
            <span className="text-[#2563EB]">
              Distraction-Free AI Learning Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Never open YouTube directly again. Master NEET 2027 Physics, Chemistry, and Biology through official embedded lectures, NCERT high-yield notes, 10-year PYQs, and spaced active recall.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Launch Dropper Dashboard (Free)</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenAuthModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-7 py-4 text-sm font-bold text-[#111827] hover:bg-slate-50 transition-all shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <span>1-Click Guest / Google Auth</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-[#6B7280] font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Official YouTube Player Embed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
              <span>Zero Video Host Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>100% NCERT Word-to-Word</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">ENGINEERED FOR EXCELLENCE</h2>
          <p className="text-3xl font-extrabold text-[#111827] sm:text-4xl">Everything a Dropper Needs to Score 700+</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[#2563EB]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-[#E5E7EB]">
                  <Icon className={`h-6 w-6 ${feat.color}`} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#111827]">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-500" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl font-bold text-[#111827] leading-snug">
              "As a dropper, YouTube recommendations were my biggest trap. NEETDrop AI gave me exact faculty lectures in a zero-distraction layout alongside NCERT line-by-line notes. My mock score jumped from 510 to 685!"
            </blockquote>

            <div className="flex items-center gap-4 pt-2">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-[#2563EB] text-base">
                AR
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">Ananya Rao</p>
                <p className="text-xs text-[#2563EB] font-bold">NEET Dropper • Target 2027 (Score Goal 710)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-2xl font-extrabold text-[#111827] sm:text-3xl">Curious about NEETDrop AI?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-[#111827] pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#2563EB] shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && <p className="mt-3 text-xs leading-relaxed text-[#6B7280] border-t border-[#E5E7EB] pt-3">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-10 sm:p-16 shadow-sm">
          <h2 className="text-3xl font-extrabold text-[#111827] sm:text-4xl">Ready to Crack NEET 2027 Distraction-Free?</h2>
          <p className="mt-3 text-sm text-[#6B7280] max-w-xl mx-auto">
            Join thousands of droppers adopting active recall, NCERT word-to-word mastery, and structured focus.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
            >
              <span>Enter Dropper Dashboard Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
