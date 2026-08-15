import React, { useState } from 'react';
import {
  NursingStudentProfile,
  StudentProfileService,
  DEFAULT_NURSING_PROFILE
} from '../../services/nursing/studentProfileService';
import { NursingYear, SyllabusVersion } from '../../types/nursing';
import {
  Building2,
  GraduationCap,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface NursingOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSaved: (profile: NursingStudentProfile) => void;
}

export const NursingOnboardingModal: React.FC<NursingOnboardingModalProps> = ({
  isOpen,
  onClose,
  onProfileSaved
}) => {
  const currentProfile = StudentProfileService.getProfile();

  const [studentName, setStudentName] = useState(currentProfile.studentName || 'Blessing Scholar');
  const [university, setUniversity] = useState(currentProfile.university || 'Maharashtra University of Health Sciences (MUHS)');
  const [college, setCollege] = useState(currentProfile.college || 'Blessing College of Nursing, Parbhani');
  const [activeYear, setActiveYear] = useState<NursingYear>(currentProfile.activeYear || '3rd_year');
  const [academicBatch, setAcademicBatch] = useState(currentProfile.academicBatch || '2023–2027 (MUHS Annual Pattern)');
  const [syllabusVersion, setSyllabusVersion] = useState<SyllabusVersion>(currentProfile.syllabusVersion || 'MUHS_ANNUAL_2022');
  const [targetExamDate, setTargetExamDate] = useState(currentProfile.targetExamDate || `${new Date().getFullYear() + 1}-05-15`);
  const [dailyHours, setDailyHours] = useState<number>(currentProfile.dailyAvailableStudyHours || 4);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = StudentProfileService.saveProfile({
      studentName,
      university,
      college,
      activeYear,
      academicBatch,
      syllabusVersion,
      targetExamDate,
      dailyAvailableStudyHours: dailyHours,
      isOnboarded: true
    });
    onProfileSaved(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Student Academic Profile
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized for B.Sc Nursing university curriculum & exam targets
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* Student Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-emerald-600" />
              <span>Student Name</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Supported Institution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>University</span>
              </label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800">
                {university}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>College</span>
              </label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800">
                {college}
              </div>
            </div>
          </div>

          {/* Academic Batch Selection (Explicit) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                <span>Academic Batch & Syllabus Regulation</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700">Official MUHS / INC</span>
            </label>
            <select
              value={academicBatch}
              onChange={(e) => {
                setAcademicBatch(e.target.value);
                if (e.target.value.includes('2024')) {
                  setSyllabusVersion('MUHS_REVISED_CBCS_2024');
                } else if (e.target.value.includes('2021')) {
                  setSyllabusVersion('INC_REVISED_SEMESTER_2021');
                } else {
                  setSyllabusVersion('MUHS_ANNUAL_2022');
                }
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none"
            >
              <option value="2023–2027 (MUHS Annual Pattern)">
                Batch 2023–2027 (MUHS Annual Pattern — Active Standard)
              </option>
              <option value="2022–2026 (MUHS Revised Notification 14/2022)">
                Batch 2022–2026 (MUHS Revised Annual Pattern)
              </option>
              <option value="2024–2028 (INC Semesterized / CBCS Pattern)">
                Batch 2024–2028 (INC Semesterized / CBCS Pattern)
              </option>
            </select>
          </div>

          {/* Nursing Year */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Select Active Nursing Year</label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { key: '2nd_year' as NursingYear, label: '2nd Year', sub: 'MSN-I, Pharm, Path' },
                { key: '3rd_year' as NursingYear, label: '3rd Year', sub: 'MSN-II, Child, Mental' },
                { key: '4th_year' as NursingYear, label: 'Final Year', sub: 'OBG, CHN-II, Mgmt' }
              ].map((yr) => (
                <button
                  key={yr.key}
                  type="button"
                  onClick={() => setActiveYear(yr.key)}
                  className={`rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                    activeYear === yr.key
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-extrabold text-xs">{yr.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{yr.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Available Hours */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>Daily Available Study Hours</span>
              </span>
              <span className="text-xs font-extrabold text-emerald-700">{dailyHours} Hours/Day</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 4, 6].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => setDailyHours(hrs)}
                  className={`rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                    dailyHours === hrs
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {hrs} {hrs === 1 ? 'Hour' : 'Hours'}
                </button>
              ))}
            </div>
          </div>

          {/* Target Exam Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              <span>Target University Exam Date</span>
            </label>
            <input
              type="date"
              value={targetExamDate}
              onChange={(e) => setTargetExamDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Academic Honesty / Clinical Attendance Notice */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-3.5 text-[11px] text-amber-900 leading-relaxed">
            <strong>MUHS Theory & Clinical Training Guideline:</strong> This platform is designed exclusively for academic university theory and exam preparation. Please fulfill all mandatory hospital clinical postings and skills lab sessions as required by Blessing College of Nursing & MUHS.
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
          >
            <span>Save & Enter Study Cockpit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
