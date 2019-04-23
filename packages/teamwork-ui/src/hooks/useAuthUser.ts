import { useContext } from 'react';
import { useDispatch, StoreContext } from 'redux-react-hook';

import { setAuthUser } from '../modules/auth/actions';
import { IAuthUser } from '../modules/auth/types';

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const store = useContext(StoreContext);
  const { auth } = store.getState();
  const { user } = auth;

  const set = (authUser: IAuthUser) => dispatch(setAuthUser(authUser));

  return { authUser: user, setAuthUser: set };
};
