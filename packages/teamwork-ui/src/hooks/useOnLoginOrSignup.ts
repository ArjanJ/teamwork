import { navigate } from '@reach/router';
import { useEffect } from 'react';

import { IOnSocialSignInSuccess } from './useSocialSignIn';
import { useUser } from './useUser';
import { isEmptyUser } from '../utils/isEmptyUser';

export const useOnLoginOrSignup = () => {
  const { createUser, getUser, user } = useUser();

  const onSuccess = async ({ isNewUser, user }: IOnSocialSignInSuccess) => {
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
