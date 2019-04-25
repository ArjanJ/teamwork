import { navigate } from '@reach/router';
import { User } from 'firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'redux-react-hook';

import { firebase } from '../firebase';
import { setAuthToken } from '../modules/auth/actions';
import { useAuthUser } from './useAuthUser';

export const useAuthorization = (path: string): { user: User | void } => {
  const { initialising, user } = useAuthState(firebase.auth);
  const { authUser, setAuthUser } = useAuthUser();
  const dispatch = useDispatch();

  // If no user and not loading then redirect to some path.
  useEffect(() => {
    if (!initialising && !user) {
      navigate(path);
    }

    // Get ID Token from firebase state and store in store.
    if (user) {
      user.getIdToken().then(token => dispatch(setAuthToken(token)));
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
