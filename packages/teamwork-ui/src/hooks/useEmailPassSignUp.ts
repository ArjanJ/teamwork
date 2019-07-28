import firebaseApp from 'firebase/app';
import { useState } from 'react';

import { auth } from '../firebase';
import { OnSuccess } from './useSocialSignIn';

interface UseEmailPassSignIn {
  error: string;
  isNewUser: boolean;
  login(email: string, password: string): void;
  signUp(email: string, password: string): void;
}
interface UseEmailPassSignInConfig {
  onSuccess({  }: OnSuccess): void;
}

export const useEmailPassSignUp = ({ onSuccess }: UseEmailPassSignInConfig) => {
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  function afterAuth(
    additionalUserInfo: firebaseApp.auth.AdditionalUserInfo,
    user: firebaseApp.User,
  ) {
    const isNewUser = additionalUserInfo ? additionalUserInfo.isNewUser : false;

    if (isNewUser) {
      setIsNewUser(true);
    }

    onSuccess({ isNewUser, user });
  }

  async function signUp(email: string, password: string) {
    try {
      const {
        additionalUserInfo,
        user,
      } = await auth.doCreateUserWithEmailAndPassword(email, password);

      if (additionalUserInfo && user) {
        afterAuth(additionalUserInfo, user);
      }
    } catch (err) {
      if (err.message) {
        return setError(err.message);
      }

      setError('Error using email and password signup.');
    }
  }

  async function login(email: string, password: string) {
    try {
      const {
        additionalUserInfo,
        user,
      } = await auth.doSignInWithEmailAndPassword(email, password);

      if (additionalUserInfo && user) {
        afterAuth(additionalUserInfo, user);
      }
    } catch (err) {
      if (err.message) {
        return setError(err.message);
      }

      setError('Error using email and password signup.');
    }
  }

  const api: UseEmailPassSignIn = {
    error,
    isNewUser,
    login,
    signUp,
  };

  return api;
};
