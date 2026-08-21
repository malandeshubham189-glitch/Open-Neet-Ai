import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Heart, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="border-t border-[#E5E7EB] bg-white text-[#6B7280] text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 border-b border-[#E5E7EB] pb-8">
          {/* Brand */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] font-bold border border-blue-100">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-[#111827]">NEETDrop AI</span>
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-[#2563EB] border border-blue-100">
                2027 EDITION
              </span>
            </div>
            <p className="text-[#6B7280] leading-relaxed text-[11px]">
              Distraction-free AI study engine built for NEET 2027 Droppers. Combining official embedded YouTube lectures, NCERT word-to-word notes, and spaced active recall.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Curriculum</p>
              <ul className="space-y-1.5 text-[11px] font-medium">
                <li>
                  <button onClick={() => setCurrentView('syllabus')} className="hover:text-[#2563EB]">
                    Physics
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('syllabus')} className="hover:text-[#7C3AED]">
                    Chemistry
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('syllabus')} className="hover:text-emerald-600">
                    Biology
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Suite Tools</p>
              <ul className="space-y-1.5 text-[11px] font-medium">
                <li>
                  <button onClick={() => setCurrentView('revision')} className="hover:text-[#2563EB]">
                    Revision Queue
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('question-bank')} className="hover:text-[#2563EB]">
                    10-Yr PYQs
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('focus-room')} className="hover:text-[#2563EB]">
                    Zen Focus Room
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">AI Architecture</p>
              <ul className="space-y-1.5 text-[11px] font-medium">
                <li>
                  <button onClick={() => setCurrentView('ai-mentor')} className="hover:text-[#7C3AED]">
                    Gemini AI Framework
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('test-center')} className="hover:text-[#2563EB]">
                    Mock Test Runner
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Youtube & Disclaimer Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6B7280]">
          <div className="flex items-center gap-2">
            <Youtube className="h-4 w-4 text-rose-500 shrink-0" />
            <span>
              Served via official YouTube Embedded Player API. No video content is downloaded, stored, or re-hosted.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[#111827] font-bold">
            <span>Founded by <span className="text-[#2563EB]">Shubham Malande</span></span>
            <span className="text-gray-300">•</span>
            <span>Crafted for NEET 2027 Aspirants</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline-block ml-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};
