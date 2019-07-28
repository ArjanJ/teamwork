import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { setAuthUser } from './actions';
import { AuthUser } from './types';

interface UseAuthUser {
  authUser: AuthUser;
  setAuthUser(authUser: AuthUser): void;
}

export const useAuthUser = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.auth, []);
  const { user } = useMappedState(mapState);

  const api: UseAuthUser = {
    authUser: user,
    setAuthUser: authUser => dispatch(setAuthUser(authUser)),
  };

  return api;
};
