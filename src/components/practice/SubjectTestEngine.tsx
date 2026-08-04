import React, { useState } from 'react';
import { SubjectId } from '../../types';
import { ActiveTestSession } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import {
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Award
} from 'lucide-react';

interface SubjectTestEngineProps {
  onStartSession: (session: ActiveTestSession) => void;
}

export const SubjectTestEngine: React.FC<SubjectTestEngineProps> = ({ onStartSession }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'full_bio'>('physics');

  const handleLaunchSubjectTest = () => {
    const isBio = selectedSubject === 'full_bio';
    const subId = isBio ? 'biology' : (selectedSubject as SubjectId);
    const count = isBio ? 90 : 45;

    const session = PracticeEngineService.createTestSession({
      title: `Full Subject Test: ${isBio ? 'Full Biology (Botany + Zoology)' : subId.toUpperCase()} (${count} Qs)`,
      testType: 'subject_test',
      subjectId: subId,
      questionCount: count,
      displayMode: 'cbt'
    });

    onStartSession(session);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-900/60 via-orange-900/40 to-slate-900 border border-amber-800/50 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
          <Layers className="h-3.5 w-3.5" />
          <span>MODULE 4 • FULL SUBJECT TEST ENGINE</span>
        </div>
        <h2 className="text-2xl font-extrabold">Complete Subject Mock Tests</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Test full subject mastery across Class 11 and Class 12 syllabus with standard NTA NEET paper distribution.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'physics', label: 'Physics (45 Qs)', marks: '180 Marks' },
            { id: 'chemistry', label: 'Chemistry (45 Qs)', marks: '180 Marks' },
            { id: 'biology', label: 'Botany / Zoology', marks: '180 Marks' },
            { id: 'full_bio', label: 'Full Bio (90 Qs)', marks: '360 Marks' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSubject(item.id as any)}
              className={`p-4 rounded-xl border text-left transition ${
                selectedSubject === item.id
                  ? 'bg-amber-600 border-amber-500 text-white font-bold shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div className="text-sm font-bold">{item.label}</div>
              <div className="text-xs opacity-80 mt-1">{item.marks}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleLaunchSubjectTest}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-600/25 transition"
        >
          <Award className="h-5 w-5" />
          <span>Launch Full Subject Mock Test</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
