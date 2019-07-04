import { useState } from 'react';

import { auth } from '../firebase';
import { IOnSocialSignInSuccess } from './useSocialSignIn';

interface IUseEmailPassSignIn {
  onSuccess({  }: IOnSocialSignInSuccess): any;
}

export const useEmailPassSignUp = ({ onSuccess }: IUseEmailPassSignIn) => {
  const [hasError, setError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  async function signUp(email: string, password: string) {
    try {
      const {
        additionalUserInfo,
        user,
      } = await auth.doCreateUserWithEmailAndPassword(email, password);

      const isNewUser = additionalUserInfo
        ? additionalUserInfo.isNewUser
        : false;

      if (isNewUser) {
        setIsNewUser(true);
      }

      onSuccess({ isNewUser, user });
    } catch (err) {
      setError(true);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const {
        additionalUserInfo,
        user,
      } = await auth.doSignInWithEmailAndPassword(email, password);

      const isNewUser = additionalUserInfo
        ? additionalUserInfo.isNewUser
        : false;

      if (isNewUser) {
        setIsNewUser(true);
      }

      onSuccess({ isNewUser, user });
    } catch (err) {
      setError(true);
    }
  }

  return { hasError, isNewUser, login: signIn, signUp };
};
