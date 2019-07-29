import { navigate } from '@reach/router';
import { User } from 'firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebase } from '../../../firebase';
import { useAuthUser } from './useAuthUser';

interface UseAuthorization {
  user: User | void;
}

export const useAuthorization = (path: string) => {
  const [user, loading] = useAuthState(firebase.auth);
  const { authUser, setAuthUser } = useAuthUser();

  if (!path) {
    throw new Error('Expected a path to redirect to if not authorized.');
  }

  useEffect(() => {
    // If no user and not loading then redirect to some path.
    if (!loading && !user) {
      navigate(path);
    }

    // If auth user hasn't been set, set it with the values from firebase.auth.
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

  const api: UseAuthorization = {
    user,
  };

  return api;
};
