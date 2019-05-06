import { useState } from 'react';

import { auth, firebase } from '../firebase';

interface IUseSocialSignIn {
  onSuccess(isNewUser: boolean): any;
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

      onSuccess(isNewUser);
    } catch (err) {
      setError(true);
    }
  }

  return { hasError, isNewUser, signIn };
};
