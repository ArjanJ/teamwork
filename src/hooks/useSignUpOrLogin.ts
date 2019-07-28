import firebaseApp from 'firebase/app';
import { useState } from 'react';

import { auth, firebase } from '../firebase';

export enum AuthMethod {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
}

const AuthMethods = {
  LOGIN: auth.doSignInWithEmailAndPassword,
  SIGN_UP: auth.doCreateUserWithEmailAndPassword,
};

interface UseSignUpOrLoginConfig {
  method: AuthMethod;
  onSuccess({  }: OnSuccess): void;
}

export interface OnSuccess {
  isNewUser: boolean;
  user: firebaseApp.User | null;
}

interface UseSignUpOrLogin {
  doEmailAndPassword(email: string, password: string): void;
  doSocial(): void;
  error: string;
  isNewUser: boolean;
}

export const useSignUpOrLogin = ({
  method,
  onSuccess,
}: UseSignUpOrLoginConfig) => {
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const serviceError = 'Error using email and password signup.';

  /**
   * afterAuth
   * This function runs after the user successfully logs in
   * or signs up. A success callback is executed and passed
   * the user information.
   */
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

  async function doEmailAndPassword(email: string, password: string) {
    const request = AuthMethods[method];

    try {
      const { additionalUserInfo, user } = await request(email, password);

      if (additionalUserInfo && user) {
        afterAuth(additionalUserInfo, user);
      }
    } catch (err) {
      if (err.message) {
        return setError(err.message);
      }

      setError(serviceError);
    }
  }

  async function doSocial() {
    try {
      const { additionalUserInfo, user } = await auth.doSignInWithPopup(
        firebase.GoogleProvider,
      );

      if (additionalUserInfo && user) {
        afterAuth(additionalUserInfo, user);
      }
    } catch (err) {
      if (err.message) {
        return setError(err.message);
      }

      setError(serviceError);
    }
  }

  const api: UseSignUpOrLogin = {
    doEmailAndPassword,
    doSocial,
    error,
    isNewUser,
  };

  return api;
};
