import { useState } from 'react';

import { auth, firebase } from '../firebase';

interface IUseSocialSignIn {
  onSuccess(isNewUser: boolean): any;
}

export const useSocialSignIn = ({ onSuccess }: IUseSocialSignIn) => {
  const [hasError, setError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState<null | object>(null);

  async function signIn() {
    try {
      const { additionalUserInfo, user } = await auth.doSignInWithPopup(
        firebase.GoogleProvider,
      );

      if (user) {
        setUser(user);
      }

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

  return { hasError, isNewUser, signIn, user };
};
