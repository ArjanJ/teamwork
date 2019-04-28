import { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';

import { firebase } from '../firebase';
import { setAuthToken } from '../modules/auth/actions';

export const useAuthToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth.onIdTokenChanged(user => {
      if (user) {
        user.getIdToken().then(token => dispatch(setAuthToken(token)));
      }
    });
  });
};
