import { useState } from 'react';

import { auth } from '../firebase';

interface IUseEmailPassSignIn {
  onSuccess(isNewUser: boolean): any;
}

export const useEmailPassSignUp = ({ onSuccess }: IUseEmailPassSignIn) => {
  const [hasError, setError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  async function signUp(email: string, password: string) {
    try {
      const {
        additionalUserInfo,
      } = await auth.doCreateUserWithEmailAndPassword(email, password);

      const isNewUser = additionalUserInfo
        ? additionalUserInfo.isNewUser
        : false;

      if (isNewUser) {
        setIsNewUser(true);
      }

      onSuccess(isNewUser);
    } catch (err) {
      setError(true);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { additionalUserInfo } = await auth.doSignInWithEmailAndPassword(
        email,
        password,
      );

      const isNewUser = additionalUserInfo
        ? additionalUserInfo.isNewUser
        : false;

      if (isNewUser) {
        setIsNewUser(true);
      }

      onSuccess(isNewUser);
    } catch (err) {
      setError(true);
    }
  }

  return { hasError, isNewUser, login: signIn, signUp };
};
