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

    if (!authUser && !!user && !!user.email && !!user.uid) {
      setAuthUser({
        displayName: user.displayName || null,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || null,
        uid: user.uid,
      });
    }
  });

  return { user };
};
