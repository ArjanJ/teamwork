import { navigate } from '@reach/router';
import { useEffect } from 'react';

import { useUser } from '../modules/user/useUser';
import { isEmptyUser } from '../modules/user/utils';
import { OnSuccess } from './useSignUpOrLogin';

/**
 * Handles what happens after someone signs up or logs in.
 * If they haven't done the onboarding yet then we make
 * them do that before they can see the dashboard. Otherwise
 * we redirect them straight to the dashboard.
 */
export const useSignUpOrLoginOnSuccess = () => {
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
    if ((user && isEmptyUser(user)) || (error && error.status === 404)) {
      navigate('/onboarding');
    } else if (user) {
      navigate('/');
    }
  }, [error, user]);

  return { onSuccess };
};
