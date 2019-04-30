import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { setAuthUser } from '../modules/auth/actions';
import { IAuthUser } from '../modules/auth/types';

export const useAuthUser = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.auth, []);
  const { user } = useMappedState(mapState);

  const set = (authUser: IAuthUser) => dispatch(setAuthUser(authUser));

  return { authUser: user, setAuthUser: set };
};
