import { useState } from 'react';

import { auth } from '../firebase';
import { IOnSocialSignInSuccess } from './useSocialSignIn';

interface IUseEmailPassSignIn {
  onSuccess({  }: IOnSocialSignInSuccess): any;
}

export const useEmailPassSignUp = ({ onSuccess }: IUseEmailPassSignIn) => {
  const [error, setError] = useState('');
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
      if (err.message) {
        return setError(err.message);
      }

      setError('Something went wrong.');
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
      if (err.message) {
        return setError(err.message);
      }

      setError('Something went wrong.');
    }
  }

  return { error, isNewUser, login: signIn, signUp };
};
