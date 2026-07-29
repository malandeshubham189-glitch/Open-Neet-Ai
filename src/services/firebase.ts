import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

try {
  // Dynamically attempt loading config if available
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

export async function signInWithGoogle() {
  if (!authInstance) {
    throw new Error("Firebase Authentication is not configured yet. Please use Anonymous Guest Mode or configure Firebase.");
  }
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(authInstance, provider);
}

export async function logoutUser() {
  if (authInstance) {
    await fbSignOut(authInstance);
  }
}
