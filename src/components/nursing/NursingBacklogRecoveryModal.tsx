import React from 'react';
import { BacklogAssessment } from '../../services/nursing/nursingBacklogEngine';
import {
  AlertTriangle,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';

interface NursingBacklogRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: BacklogAssessment;
  onApplyPlan: () => void;
}

export const NursingBacklogRecoveryModal: React.FC<NursingBacklogRecoveryModalProps> = ({
  isOpen,
  onClose,
  assessment,
  onApplyPlan
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Backlog Recovery Cockpit
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI Schedule Rebalancer for B.Sc Nursing University Targets
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

        {/* Backlog Alert Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5">
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Status</div>
            <div className="text-lg font-black text-amber-900 mt-0.5">
              {assessment.sessionsBehind} Sessions
            </div>
            <div className="text-[10px] text-amber-700 mt-0.5">Behind Target Pace</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Days to Exam</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">
              {assessment.daysRemainingToExam} Days
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5">MUHS Summer Finals</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Daily Cap</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">
              {assessment.userDailyHoursLimit} Hours/Day
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Strictly Enforced</div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-3.5">
            <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">Core 15M LAQs</div>
            <div className="text-lg font-black text-purple-900 mt-0.5">
              {assessment.recoveryPlan.preservedCoreLAQCount} Core Topics
            </div>
            <div className="text-[10px] text-purple-700 mt-0.5">100% Protected</div>
          </div>
        </div>

        {/* AI Philosophy Explanation */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>AI Rebalancing Guarantee: No Impossible 12-Hour Days</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            {assessment.recoveryPlan.description}
          </p>
        </div>

        {/* Calibrated Recovery Queue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
            <span>Reorganized Study Schedule (Today's Plan: {assessment.recoveryPlan.dailyAllocatedMinutes} Mins)</span>
            <span className="text-slate-500 text-[11px]">
              {assessment.recoveryPlan.tasks.length} High-Yield Tasks
            </span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {assessment.recoveryPlan.tasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 hover:border-emerald-300 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      {task.actionType}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{task.subjectName}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{task.topicTitle}</h4>
                  <p className="text-[11px] text-slate-500">{task.reason}</p>
                </div>

                <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 shrink-0">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span>{task.durationMinutes}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => {
              onApplyPlan();
              onClose();
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
          >
            <span>Activate Reorganized Plan</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
