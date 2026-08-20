import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { UserProfile } from '../types';

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

try {
  const meta = import.meta as any;
  const modules = typeof meta.glob === 'function' ? meta.glob('/firebase-applet-config.json', { eager: true }) : {};
  const configModule = modules['/firebase-applet-config.json'] as { default: any } | undefined;

  if (configModule?.default) {
    const firebaseConfig = configModule.default;
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    if (firebaseConfig.firestoreDatabaseId) {
      dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    } else {
      dbInstance = getFirestore(app);
    }
    authInstance = getAuth(app);
  }
} catch (err) {
  console.warn("Firebase config not found or failed to initialize. Guest mode active by default.", err);
}

export const auth = authInstance;
export const db = dbInstance;

/**
 * Fetch student profile from Firestore users collection
 */
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  if (!dbInstance) return null;
  try {
    const docRef = doc(dbInstance, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn("Error fetching user profile from Firestore:", err);
  }
  return null;
}

/**
 * Save / update student profile in Firestore users collection
 */
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  if (!dbInstance || !profile.uid || profile.isGuest) return;
  try {
    const docRef = doc(dbInstance, 'users', profile.uid);
    await setDoc(docRef, profile, { merge: true });
  } catch (err) {
    console.warn("Error saving user profile to Firestore:", err);
  }
}

/**
 * Sign Up with Email and Password
 */
export async function signUpWithEmail(
  email: string,
  pass: string,
  displayName: string,
  dropperStatus: '1st Drop' | '2nd Drop' | 'Fresher' = '1st Drop',
  targetYear: number = 2027
): Promise<UserProfile> {
  if (!authInstance) {
    throw new Error("Firebase Auth is not initialized.");
  }

  const cred = await createUserWithEmailAndPassword(authInstance, email, pass);
  const fbUser = cred.user;

  if (displayName) {
    await fbUpdateProfile(fbUser, { displayName });
  }

  const newProfile: UserProfile = {
    uid: fbUser.uid,
    email: fbUser.email || email,
    displayName: displayName || 'NEET Aspirant',
    photoURL: fbUser.photoURL || undefined,
    isGuest: false,
    targetYear,
    dropperStatus,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalStudyMinutes: 0,
    createdAt: new Date().toISOString()
  };

  await saveUserProfile(newProfile);
  return newProfile;
}

/**
 * Sign In with Email and Password
 */
export async function logInWithEmail(email: string, pass: string): Promise<UserProfile> {
  if (!authInstance) {
    throw new Error("Firebase Auth is not initialized.");
  }

  const cred = await signInWithEmailAndPassword(authInstance, email, pass);
  const fbUser = cred.user;

  const existing = await fetchUserProfile(fbUser.uid);
  if (existing) {
    return existing;
  }

  const fallbackProfile: UserProfile = {
    uid: fbUser.uid,
    email: fbUser.email || email,
    displayName: fbUser.displayName || 'NEET Aspirant',
    photoURL: fbUser.photoURL || undefined,
    isGuest: false,
    targetYear: 2027,
    dropperStatus: '1st Drop',
    streakDays: 7,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalStudyMinutes: 180,
    createdAt: new Date().toISOString()
  };

  await saveUserProfile(fallbackProfile);
  return fallbackProfile;
}

/**
 * Sign In with Google Popup
 */
export async function signInWithGoogle(): Promise<UserProfile> {
  if (!authInstance) {
    throw new Error("Firebase Authentication is not configured yet.");
  }
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(authInstance, provider);
  const fbUser = cred.user;

  const existing = await fetchUserProfile(fbUser.uid);
  if (existing) {
    return existing;
  }

  const newProfile: UserProfile = {
    uid: fbUser.uid,
    email: fbUser.email || 'aspirant@neet.edu',
    displayName: fbUser.displayName || 'NEET Dropper',
    photoURL: fbUser.photoURL || undefined,
    isGuest: false,
    targetYear: 2027,
    dropperStatus: '1st Drop',
    streakDays: 14,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalStudyMinutes: 300,
    createdAt: new Date().toISOString()
  };

  await saveUserProfile(newProfile);
  return newProfile;
}

/**
 * Send Password Reset Email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  if (!authInstance) {
    throw new Error("Firebase Auth is not initialized.");
  }
  await sendPasswordResetEmail(authInstance, email);
}

/**
 * Log Out
 */
export async function logoutUser() {
  if (authInstance) {
    await fbSignOut(authInstance);
  }
}
