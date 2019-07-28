import firebaseApp from 'firebase/app';
import { useState } from 'react';

import { auth, firebase } from '../firebase';

export interface OnSuccess {
  isNewUser: boolean;
  user: firebaseApp.User | null;
}
interface UseSocialSignIn {
  error: string;
  isNewUser: boolean;
  signIn(): void;
}

interface UseSocialSignInConfig {
  onSuccess({  }: OnSuccess): void;
}

export const useSocialSignIn = ({ onSuccess }: UseSocialSignInConfig) => {
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  async function signIn() {
    try {
      const { additionalUserInfo, user } = await auth.doSignInWithPopup(
        firebase.GoogleProvider,
      );

      const isNewUser = additionalUserInfo
        ? additionalUserInfo.isNewUser
        : false;

      if (isNewUser) {
        setIsNewUser(true);
      }

      onSuccess({ isNewUser, user });
    } catch (err) {
      if (err.message) {
        return setError(err.message);
      }

      setError('Something went wrong.');
    }
  }

  const api: UseSocialSignIn = {
    error,
    isNewUser,
    signIn,
  };

  return api;
};
