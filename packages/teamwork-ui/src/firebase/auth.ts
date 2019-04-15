import { auth } from './firebase';

// Sign in
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Sign up
export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
) => auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithPopup = (provider: any) =>
  auth.signInWithPopup(provider);

// Reset password
export const doSendPasswordResetEmail = (email: string) =>
  auth.sendPasswordResetEmail(email);
