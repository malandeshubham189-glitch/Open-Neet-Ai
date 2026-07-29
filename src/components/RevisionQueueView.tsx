import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId } from '../types';
import { RotateCcw, CheckCircle2, Clock } from 'lucide-react';

export const RevisionQueueView: React.FC = () => {
  const { revisionQueue, completeRevisionItem, openTopicDetail } = useApp();
  const [filterSubject, setFilterSubject] = useState<SubjectId | 'all'>('all');

  const filteredQueue =
    filterSubject === 'all'
      ? revisionQueue
      : revisionQueue.filter((r) => r.subjectId === filterSubject);

  const dueItems = filteredQueue.filter((r) => r.status === 'due');
  const completedItems = filteredQueue.filter((r) => r.status === 'completed');

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#7C3AED] border border-purple-200">
            <RotateCcw className="h-3.5 w-3.5" />
            <span>SPACED REPETITION ENGINE</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111827]">Active Recall Revision Queue</h1>
          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Timed review intervals (Day 1, 3, 7, 21, 45) for 100% memory retention before Dec 30.
          </p>
        </div>

        {/* Subject Filters */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-[#E5E7EB] shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setFilterSubject('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              filterSubject === 'all'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterSubject('physics')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              filterSubject === 'physics'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setFilterSubject('chemistry')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              filterSubject === 'chemistry'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Chemistry
          </button>
          <button
            onClick={() => setFilterSubject('biology')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              filterSubject === 'biology'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Biology
          </button>
        </div>
      </div>

      {/* Due Today Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <Clock className="h-4 w-4 text-rose-600" />
            <span>Due for Review Today ({dueItems.length})</span>
          </h2>
        </div>

        {dueItems.length === 0 ? (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center text-xs text-[#6B7280] space-y-2 shadow-sm">
            <p className="text-sm font-bold text-emerald-600">🎉 All Scheduled Revisions Complete!</p>
            <p>You have reviewed all due active recall items for today.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dueItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#7C3AED]">
                    <span className="rounded-md bg-purple-50 px-2 py-0.5 border border-purple-200 uppercase">
                      Stage {item.stage} Active Recall
                    </span>
                    <span className="text-[#6B7280]">{item.subjectId.toUpperCase()}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#111827] mt-2">{item.topicTitle}</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">{item.chapterName}</p>
                </div>

                <div className="flex items-center gap-3 border-t border-[#E5E7EB] pt-3">
                  <button
                    onClick={() => openTopicDetail(item.topicId)}
                    className="flex-1 rounded-xl border border-[#E5E7EB] bg-slate-50 py-2 text-xs font-bold text-[#111827] hover:bg-slate-100 transition-all text-center"
                  >
                    Review Notes
                  </button>

                  <button
                    onClick={() => completeRevisionItem(item.id)}
                    className="flex-1 rounded-xl bg-[#2563EB] py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Complete Review</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Memory Log */}
      <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
        <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Recently Mastered Items ({completedItems.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {completedItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm opacity-80"
            >
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Mastered</span>
              <h4 className="text-xs font-bold text-[#111827] mt-1">{item.topicTitle}</h4>
              <p className="text-[11px] text-[#6B7280]">{item.chapterName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
