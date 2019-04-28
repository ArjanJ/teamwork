import { navigate } from '@reach/router';
import { User } from 'firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebase } from '../firebase';
import { useAuthUser } from './useAuthUser';

export const useAuthorization = (path: string): { user: User | void } => {
  const { initialising, user } = useAuthState(firebase.auth);
  const { authUser, setAuthUser } = useAuthUser();

  if (!path) {
    throw new Error('Expected a path to redirect to if not authorized.');
  }

  // If no user and not loading then redirect to some path.
  useEffect(() => {
    if (!initialising && !user) {
      navigate(path);
    }

    if (
      !authUser &&
      !!user &&
      !!user.email &&
      !!user.displayName &&
      !!user.uid
    ) {
      setAuthUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    }
  });

  return { user };
};
