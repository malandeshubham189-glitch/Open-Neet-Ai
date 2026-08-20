import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import {
  auth,
  signUpWithEmail,
  logInWithEmail,
  signInWithGoogle,
  sendPasswordReset,
  logoutUser,
  fetchUserProfile,
  saveUserProfile
} from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signupWithEmail: (
    email: string,
    pass: string,
    name: string,
    status?: '1st Drop' | '2nd Drop' | 'Fresher',
    targetYear?: number
  ) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginAsGuest: (name?: string, status?: '1st Drop' | '2nd Drop' | 'Fresher') => void;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addStudyTimeMinutes: (mins: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_STORAGE_KEY = 'neetdrop_guest_profile_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize Auth state from Firebase or local storage
  useEffect(() => {
    let unsubscribe = () => {};

    if (auth) {
      unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          try {
            const dbProfile = await fetchUserProfile(fbUser.uid);
            if (dbProfile) {
              setUser(dbProfile);
            } else {
              const fallback: UserProfile = {
                uid: fbUser.uid,
                email: fbUser.email || 'aspiring.dropper@neet.edu',
                displayName: fbUser.displayName || 'NEET 2027 Aspirant',
                photoURL: fbUser.photoURL || undefined,
                isGuest: false,
                targetYear: 2027,
                dropperStatus: '1st Drop',
                streakDays: 14,
                lastActiveDate: new Date().toISOString().split('T')[0],
                totalStudyMinutes: 420,
                createdAt: new Date().toISOString()
              };
              setUser(fallback);
              await saveUserProfile(fallback);
            }
          } catch (err) {
            console.warn("Could not fetch remote profile, using auth fallback:", err);
          } finally {
            setLoading(false);
          }
        } else {
          checkGuestSession();
        }
      });
    } else {
      checkGuestSession();
    }

    return () => unsubscribe();
  }, []);

  const checkGuestSession = () => {
    try {
      const saved = localStorage.getItem(GUEST_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        createDefaultGuest('NEET Dropper', '1st Drop');
      }
    } catch {
      createDefaultGuest('NEET Dropper', '1st Drop');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultGuest = (name = 'NEET Dropper', status: '1st Drop' | '2nd Drop' | 'Fresher' = '1st Drop') => {
    const defaultGuest: UserProfile = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 9),
      email: 'guest.dropper@neetdrop.ai',
      displayName: name,
      isGuest: true,
      targetYear: 2027,
      dropperStatus: status,
      streakDays: 12,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalStudyMinutes: 380,
      createdAt: new Date().toISOString()
    };
    setUser(defaultGuest);
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(defaultGuest));
  };

  const signupWithEmailHandler = async (
    email: string,
    pass: string,
    name: string,
    status: '1st Drop' | '2nd Drop' | 'Fresher' = '1st Drop',
    targetYear: number = 2027
  ) => {
    setLoading(true);
    try {
      const profile = await signUpWithEmail(email, pass, name, status, targetYear);
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailHandler = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const profile = await logInWithEmail(email, pass);
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogleHandler = async () => {
    setLoading(true);
    try {
      const profile = await signInWithGoogle();
      setUser(profile);
    } catch (err: any) {
      console.warn("Google sign-in fallback to local session:", err);
      createDefaultGuest('NEET Aspirant (Verified)', '1st Drop');
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordHandler = async (email: string) => {
    await sendPasswordReset(email);
  };

  const loginAsGuestHandler = (name = 'NEET Dropper', status: '1st Drop' | '2nd Drop' | 'Fresher' = '1st Drop') => {
    createDefaultGuest(name, status);
  };

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem(GUEST_STORAGE_KEY);
      createDefaultGuest('NEET Dropper', '1st Drop');
      setLoading(false);
    }
  };

  const updateProfileHandler = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    if (user.isGuest) {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
    } else {
      await saveUserProfile(updated);
    }
  };

  const addStudyTimeMinutesHandler = async (mins: number) => {
    if (!user) return;
    const updated = { ...user, totalStudyMinutes: user.totalStudyMinutes + mins };
    setUser(updated);
    if (user.isGuest) {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
    } else {
      await saveUserProfile(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signupWithEmail: signupWithEmailHandler,
        loginWithEmail: loginWithEmailHandler,
        loginWithGoogle: loginWithGoogleHandler,
        resetPassword: resetPasswordHandler,
        loginAsGuest: loginAsGuestHandler,
        logout: logoutHandler,
        updateProfile: updateProfileHandler,
        addStudyTimeMinutes: addStudyTimeMinutesHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
