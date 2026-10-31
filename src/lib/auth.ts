import { useEffect, useState } from 'react';
import { onAuthStateChanged, reauthenticateWithPopup, signInWithPopup, signOut, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, facebookProvider, googleProvider } from '../firebase';
import { UserProfile, UserRole } from '../types';
import { clearContactCache } from './db';

export interface AuthState {
  /** Firebase Auth user (null = signed out). */
  firebaseUser: User | null;
  /** Firestore profile (null = signed in but onboarding not finished). */
  profile: UserProfile | null;
  /** True if a document admins/{uid} exists. Create it manually in the Firebase console. */
  isAdmin: boolean;
  /** Role used by the UI. */
  role: UserRole;
  /** False until auth + profile + admin status are known. */
  ready: boolean;
  /** Signed in but no profile yet and not an admin → onboarding must be completed. */
  needsOnboarding: boolean;
}

export function useAuthState(): AuthState {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  // Each state remembers which uid it belongs to, so a stale value from a previous
  // account (or from "signed out") is never mistaken for the current one.
  const [profileState, setProfileState] = useState<{ uid: string | null; profile: UserProfile | null }>({
    uid: null,
    profile: null,
  });
  const [adminState, setAdminState] = useState<{ uid: string | null; isAdmin: boolean }>({ uid: null, isAdmin: false });

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        clearContactCache();
        setFirebaseUser(u);
        setAuthReady(true);
      }),
    []
  );

  const currentUid = firebaseUser?.uid ?? null;

  useEffect(() => {
    if (!currentUid) return;

    const unsub = onSnapshot(
      doc(db, 'users', currentUid),
      (snap) => setProfileState({ uid: currentUid, profile: snap.exists() ? (snap.data() as UserProfile) : null }),
      (err) => {
        console.error('[users]', err);
        setProfileState({ uid: currentUid, profile: null });
      }
    );

    let cancelled = false;
    getDoc(doc(db, 'admins', currentUid))
      .then((snap) => !cancelled && setAdminState({ uid: currentUid, isAdmin: snap.exists() }))
      .catch(() => !cancelled && setAdminState({ uid: currentUid, isAdmin: false }));

    return () => {
      cancelled = true;
      unsub();
    };
  }, [currentUid]);

  const profileReady = !currentUid || profileState.uid === currentUid;
  const adminReady = !currentUid || adminState.uid === currentUid;
  const profile = currentUid && profileState.uid === currentUid ? profileState.profile : null;
  const isAdmin = !!currentUid && adminState.uid === currentUid && adminState.isAdmin;

  const ready = authReady && profileReady && adminReady;
  // Admin rights come ONLY from admins/{uid} (same check as firestore.rules). A legacy users/{uid}.role == 'admin'
  // from an older version is ignored, otherwise the admin panel would open without the data it needs.
  const profileRole = profile?.role === 'imam' || profile?.role === 'mosque' ? profile.role : 'visitor';
  const role: UserRole = !firebaseUser || !ready ? 'visitor' : isAdmin ? 'admin' : profileRole;

  return {
    firebaseUser,
    profile,
    isAdmin,
    role,
    ready,
    needsOnboarding: ready && !!firebaseUser && !isAdmin && !profile,
  };
}

export async function signInWith(provider: 'google' | 'facebook') {
  return signInWithPopup(auth, provider === 'google' ? googleProvider : facebookProvider);
}

export async function signOutUser() {
  clearContactCache();
  await signOut(auth);
}

/** Confirms the user's identity again (Firebase requires a recent sign-in before deleting an account). */
export async function reauthenticate() {
  const user = auth.currentUser;
  if (!user) throw new Error('not signed in');
  const isFacebook = user.providerData.some((p) => p.providerId.includes('facebook'));
  await reauthenticateWithPopup(user, isFacebook ? facebookProvider : googleProvider);
}
