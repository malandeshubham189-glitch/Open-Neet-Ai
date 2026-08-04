import React, { useState } from 'react';
import { GamificationState } from '../../types/practiceEngine';
import { PracticeEngineService } from '../../services/practiceEngineService';
import { Trophy, Flame, Zap } from 'lucide-react';

export const LeaderboardGamification: React.FC = () => {
  const [state] = useState<GamificationState>(PracticeEngineService.getGamificationState());
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'overall'>('daily');

  const leaderList = [
    { rank: 1, name: 'Aarav Sharma (AIR 12 Target)', xp: 4850, streak: 28 },
    { rank: 2, name: 'Ananya Deshmukh (Pune)', xp: 4420, streak: 21 },
    { rank: 3, name: 'Rohan Verma (Kota Batch)', xp: 4100, streak: 19 },
    { rank: 4, name: 'Priya Patel (Fresher)', xp: 3890, streak: 14 },
    { rank: 12, name: 'You (NEETDrop AI Aspirant)', xp: state.xpPoints, streak: state.currentStreakDays, isSelf: true }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-yellow-950 to-slate-900 border border-amber-800/60 p-6 text-white space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
          <Trophy className="h-3.5 w-3.5" />
          <span>MODULE 10 • LEADERBOARD & GAMIFICATION</span>
        </div>
        <h2 className="text-2xl font-extrabold">National NEET Leaderboard & Badges</h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Earn XP for every correct MCQ, maintain your daily study streak, unlock badges, and rank among top NEET aspirants across India.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-800/50 p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-amber-400">Total Practice XP</div>
            <div className="text-2xl font-black text-white">{state.xpPoints} XP</div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-orange-900/40 to-slate-900 border border-orange-800/50 p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Flame className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-orange-400">Current Study Streak</div>
            <div className="text-2xl font-black text-white">{state.currentStreakDays} Days</div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-800/50 p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-purple-400">National Daily Rank</div>
            <div className="text-2xl font-black text-white">#{state.dailyRank}</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex border-b border-slate-800 space-x-6 text-sm font-bold">
          {['daily', 'weekly', 'overall'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 transition border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab} Leaderboard
            </button>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          {leaderList.map((user) => (
            <div
              key={user.rank}
              className={`p-4 rounded-xl border flex items-center justify-between transition ${
                user.isSelf
                  ? 'bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/50'
                  : 'bg-slate-800/60 border-slate-700/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-xs ${
                    user.rank === 1
                      ? 'bg-amber-500 text-slate-950'
                      : user.rank === 2
                      ? 'bg-slate-300 text-slate-950'
                      : user.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  #{user.rank}
                </span>
                <span className="text-sm font-bold text-white">{user.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-orange-400 flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5" />
                  {user.streak}d
                </span>
                <span className="text-amber-400">{user.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
