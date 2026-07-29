import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, X, GraduationCap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginAsGuest } = useAuth();

  const [guestName, setGuestName] = useState('NEET 2027 Aspirant');
  const [dropperStatus, setDropperStatus] = useState<'1st Drop' | '2nd Drop' | 'Fresher'>('1st Drop');

  if (!isOpen) return null;

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsGuest(guestName, dropperStatus);
    onClose();
  };

  const handleGoogleSubmit = async () => {
    await loginWithGoogle();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl bg-slate-100 p-2 text-[#6B7280] hover:text-[#111827] transition-all border border-[#E5E7EB]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] font-bold border border-blue-100">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#111827]">Join NEETDrop AI</h2>
          <p className="text-xs text-[#6B7280]">Zero-distraction learning for NEET 2027 Droppers</p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleSubmit}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-slate-50 p-3.5 text-xs font-bold text-[#111827] hover:bg-slate-100 transition-all shadow-sm"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[#E5E7EB]" />
          <span className="absolute bg-white px-3 text-[11px] font-bold text-[#6B7280] uppercase">
            OR INSTANT GUEST ACCESS
          </span>
        </div>

        {/* 1-Click Guest Form */}
        <form onSubmit={handleGuestSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111827]">Your Name / Alias</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
              className="w-full rounded-xl border border-[#E5E7EB] bg-slate-50 p-3 text-xs text-[#111827] placeholder-[#6B7280] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111827]">Dropper Status</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['1st Drop', '2nd Drop', 'Fresher'] as const).map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setDropperStatus(status)}
                  className={`rounded-xl border p-2.5 font-bold transition-all ${
                    dropperStatus === status
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                      : 'border-[#E5E7EB] bg-slate-50 text-[#6B7280]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Enter as Guest Aspirant (Instant)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
