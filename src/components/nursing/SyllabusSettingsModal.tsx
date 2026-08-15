import React, { useState } from 'react';
import {
  SyllabusProfile,
  NursingYear,
  SyllabusVersion
} from '../../types/nursing';
import {
  SyllabusResolver,
  AVAILABLE_UNIVERSITIES,
  AVAILABLE_COLLEGES,
  AVAILABLE_BATCHES,
  SYLLABUS_VERSIONS,
  SYLLABUS_SOURCE_PRIORITY
} from '../../services/nursing/syllabusResolver';
import { X, Check, Building2, BookOpen, ExternalLink, ShieldCheck, GraduationCap, FileText } from 'lucide-react';

interface SyllabusSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: SyllabusProfile;
  onProfileUpdated: (profile: SyllabusProfile) => void;
}

export const SyllabusSettingsModal: React.FC<SyllabusSettingsModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onProfileUpdated
}) => {
  const [selectedYear, setSelectedYear] = useState<NursingYear>(currentProfile.activeYear);
  const [selectedUniversity, setSelectedUniversity] = useState(currentProfile.university);
  const [selectedCollege, setSelectedCollege] = useState(currentProfile.college);
  const [selectedBatch, setSelectedBatch] = useState<string>(
    currentProfile.academicBatch || AVAILABLE_BATCHES[0].label
  );
  const [selectedVersion, setSelectedVersion] = useState<SyllabusVersion>(currentProfile.syllabusVersion);

  if (!isOpen) return null;

  const handleBatchSelect = (batch: typeof AVAILABLE_BATCHES[0]) => {
    setSelectedBatch(batch.label);
    setSelectedVersion(batch.syllabusVersion);
  };

  const handleSave = () => {
    const isMUHS = selectedUniversity.includes('MUHS') || selectedUniversity.includes('Maharashtra');
    const updated = SyllabusResolver.saveProfile({
      activeYear: selectedYear,
      university: selectedUniversity,
      college: selectedCollege,
      academicBatch: selectedBatch,
      syllabusVersion: selectedVersion,
      syllabusAuthority: isMUHS
        ? 'Maharashtra University of Health Sciences (MUHS)'
        : 'Indian Nursing Council (INC)',
      isBatchExplicitlySelected: true
    });
    onProfileUpdated(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Syllabus & University Configuration</h3>
              <p className="text-xs text-slate-500">
                Aligns your video discovery & clinical topics to your exact MUHS / INC curriculum.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Active Academic Year */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Current Academic Year
            </label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: '2nd_year', title: '2nd Year', desc: 'MSN I, Pharm, Path, CHN I' },
                { id: '3rd_year', title: '3rd Year', desc: 'MSN II, Child Health, Psych' },
                { id: '4th_year', title: 'Final Year', desc: 'Midwifery, CHN II, Research' }
              ].map((yr) => (
                <button
                  key={yr.id}
                  onClick={() => setSelectedYear(yr.id as NursingYear)}
                  className={`flex flex-col items-start rounded-2xl p-4 border text-left transition-all cursor-pointer ${
                    selectedYear === yr.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{yr.title}</span>
                    {selectedYear === yr.id && <Check className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <span className="mt-1 text-[11px] text-slate-500">{yr.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Academic Batch & Syllabus Version */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Academic Batch / Examination Scheme
            </label>
            <div className="mt-2 space-y-2">
              {AVAILABLE_BATCHES.map((batch) => {
                const isSelected = selectedBatch === batch.label;
                return (
                  <button
                    key={batch.id}
                    onClick={() => handleBatchSelect(batch)}
                    className={`w-full flex items-start gap-3 rounded-2xl p-3.5 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300">
                      {isSelected && <div className="h-2 w-2 rounded-full bg-emerald-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-xs text-slate-900">{batch.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{batch.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Affiliated College */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Nursing Institution
            </label>
            <div className="mt-2 space-y-2">
              {AVAILABLE_COLLEGES.map((col) => (
                <div
                  key={col.id}
                  onClick={() => setSelectedCollege(col.name)}
                  className={`flex items-center justify-between rounded-2xl p-3.5 border transition-all cursor-pointer ${
                    selectedCollege === col.name
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className={`h-4 w-4 ${selectedCollege === col.name ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{col.name}</h4>
                      <p className="text-[11px] text-slate-500">{col.status}</p>
                    </div>
                  </div>
                  {selectedCollege === col.name && <Check className="h-4 w-4 text-emerald-600" />}
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Hierarchy Accordion */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Official Syllabus Source Hierarchy</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              {SYLLABUS_SOURCE_PRIORITY.map((s) => (
                <div key={s.priority} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">{s.priority}.</span>
                  <span><strong>{s.authority}</strong>: {s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="rounded-2xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
          >
            Save & Apply Curriculum
          </button>
        </div>
      </div>
    </div>
  );
};
