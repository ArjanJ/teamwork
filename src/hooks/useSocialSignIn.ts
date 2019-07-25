import firebaseApp from 'firebase/app';
import { useState } from 'react';

import { auth, firebase } from '../firebase';

export interface IOnSocialSignInSuccess {
  isNewUser: boolean;
  user: firebaseApp.User | null;
}
interface IUseSocialSignIn {
  onSuccess({  }: IOnSocialSignInSuccess): any;
}

export const useSocialSignIn = ({ onSuccess }: IUseSocialSignIn) => {
  const [hasError, setError] = useState(false);
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

      console.log({ additionalUserInfo, user });

      onSuccess({ isNewUser, user });
    } catch (err) {
      setError(true);
    }
  }

  return { hasError, isNewUser, signIn };
};
