import { navigate } from '@reach/router';
import { useEffect } from 'react';

import { IOnSocialSignInSuccess } from './useSocialSignIn';
import { useUser } from './useUser';
import { isEmptyUser } from '../utils/isEmptyUser';

/**
 * Handles what happens after someone signs up or logs in.
 * If they haven't done the onboarding yet then we make
 * them do that before they can see the dashboard. Otherwise
 * we redirect them straight to the dashboard.
 */
export const useOnLoginOrSignup = () => {
  const { createUser, getUser, user } = useUser();

  const onSuccess = async ({ isNewUser, user }: IOnSocialSignInSuccess) => {
    if (user && user.emailVerified === false) {
      // Send a verification email to the user.
      user.sendEmailVerification();
    }

    if (isNewUser) {
      await createUser({
        firstName: '',
        lastName: '',
        role: '',
        teams: [],
      });

      return navigate('/onboarding');
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
    if (user && isEmptyUser(user)) {
      navigate('/onboarding');
    } else if (user) {
      navigate('/');
    }
  }, [user]);

  return { onSuccess };
};
