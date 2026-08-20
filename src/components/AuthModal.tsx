import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  X,
  GraduationCap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  KeyRound,
  Stethoscope,
  BookOpen
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup'
}) => {
  const { signupWithEmail, loginWithEmail, loginWithGoogle, resetPassword, loginAsGuest } = useAuth();

  const [mode, setMode] = useState<'signup' | 'login' | 'forgot'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dropperStatus, setDropperStatus] = useState<'1st Drop' | '2nd Drop' | 'Fresher'>('1st Drop');
  const [targetYear, setTargetYear] = useState<number>(2027);
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isOpen) return null;

  const resetFormState = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const switchMode = (newMode: 'signup' | 'login' | 'forgot') => {
    resetFormState();
    setMode(newMode);
  };

  const parseFirebaseError = (err: any): string => {
    const code = err?.code || err?.message || '';
    if (code.includes('auth/email-already-in-use')) {
      return 'This email address is already registered. Please sign in instead.';
    }
    if (code.includes('auth/invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (code.includes('auth/weak-password')) {
      return 'Password should be at least 6 characters long.';
    }
    if (code.includes('auth/user-not-found') || code.includes('auth/wrong-password') || code.includes('auth/invalid-credential')) {
      return 'Invalid email or password. Please verify your credentials.';
    }
    if (code.includes('auth/too-many-requests')) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    return err?.message || 'Authentication error. Please try again.';
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms of Service to proceed.');
      return;
    }

    setLoading(true);
    try {
      await signupWithEmail(email.trim(), password, fullName.trim(), dropperStatus, targetYear);
      onClose();
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
      onClose();
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSuccessMsg(`Password reset instructions have been sent to ${email.trim()}.`);
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSubmit = () => {
    loginAsGuest(fullName.trim() || 'NEET 2027 Aspirant', dropperStatus);
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl space-y-5 my-6 max-h-[92vh] overflow-y-auto font-sans cursor-default"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl bg-slate-100 p-2 text-slate-500 hover:text-slate-900 transition-all border border-slate-200 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold shadow-md shadow-blue-200">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'signup'
              ? 'Create Aspirant Account'
              : mode === 'login'
              ? 'Welcome Back, Aspirant'
              : 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            {mode === 'signup'
              ? 'Start your dedicated NEET 2027 syllabus mission with AI mentorship'
              : mode === 'login'
              ? 'Sign in to access your sync notes, question bank & streak'
              : 'Enter your registered email to receive a password reset link'}
          </p>
        </div>

        {/* Tab Toggle: Sign Up vs Sign In */}
        {mode !== 'forgot' && (
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1-Tap Google Sign-In */}
        {mode !== 'forgot' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 p-3 text-xs font-bold text-slate-800 transition-all shadow-2xs cursor-pointer active:scale-[0.99] disabled:opacity-60"
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
              <span>{mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Or with Email
              </span>
            </div>
          </div>
        )}

        {/* 1. SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Patil"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@gmail.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-8 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Dropper Category & Target Year */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-700">Aspirant Category</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['1st Drop', '2nd Drop', 'Fresher'] as const).map((status) => (
                  <button
                    type="button"
                    key={status}
                    onClick={() => setDropperStatus(status)}
                    className={`rounded-xl border p-2 text-center font-bold transition-all text-[11px] ${
                      dropperStatus === status
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Exam Goal */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Target Exam Year</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'NEET 2027 (MBBS)', val: 2027 },
                  { label: 'NEET 2026 (Mission AIIMS)', val: 2026 }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.val}
                    onClick={() => setTargetYear(item.val)}
                    className={`rounded-xl border p-2 text-center font-bold text-[11px] transition-all ${
                      targetYear === item.val
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>I agree to syllabus tracker guidelines & daily study goals.</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white shadow-md shadow-blue-200 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Create Account & Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. SIGN IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@gmail.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-8 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white shadow-md shadow-blue-200 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Sign In to Your Mission</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Registered Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@gmail.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-9.5 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white shadow-md shadow-blue-200 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>Send Password Reset Email</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => switchMode('login')}
              className="w-full py-2 text-center text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {/* Guest Access Alternative */}
        <div className="border-t border-slate-200 pt-3 text-center">
          <button
            type="button"
            onClick={handleGuestSubmit}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            Looking to try out features? <span className="font-bold underline">Continue as Guest Aspirant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
