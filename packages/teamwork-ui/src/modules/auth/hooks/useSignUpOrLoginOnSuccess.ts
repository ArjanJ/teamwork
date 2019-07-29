import { navigate } from '@reach/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebase } from '../../../firebase';
import { useUser } from '../../user/useUser';
import { OnSuccess } from './useSignUpOrLogin';

/**
 * Handles what happens after someone signs up or logs in.
 * If they haven't done the onboarding yet then we make
 * them do that before they can see the dashboard. Otherwise
 * we redirect them straight to the dashboard.
 */
export const useSignUpOrLoginOnSuccess = () => {
  const [authUser] = useAuthState(firebase.auth);
  const { error, getUser, user } = useUser();

  const onSuccess = async ({ user }: OnSuccess) => {
    if (user && user.emailVerified === false) {
      // Send a verification email to the user.
      user.sendEmailVerification();
    }

    if (user && user.uid) {
      /**
       * Have to fetch the user to see if they filled out the
       * onboarding info (firstname, lastname, role).
       */
      getUser(user.uid);
    }
  };

  useEffect(() => {
    const userNotFound = error && error.status === 404;

    if (userNotFound) {
      // If the user wasn't found, we need to create it (onboard them).
      navigate('/onboarding');
    } else if (authUser && user) {
      /**
       * If we don't check for authUser then it will cause an infinite
       * loop between '/' and '/login' because user still exists in
       * redux store.
       */
      navigate('/');
    }
  }, [error, user]);

  return { onSuccess };
};
