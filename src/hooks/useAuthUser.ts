import { useContext } from 'react';
import { useDispatch, StoreContext } from 'redux-react-hook';

import { IAuthUser, SET_AUTH_USER } from '../modules/auth/types';

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const store = useContext(StoreContext);
  const { auth } = store.getState();
  const { user } = auth;

  function setAuthUser(authUser: IAuthUser) {
    dispatch({
      type: SET_AUTH_USER,
      payload: authUser,
    });
  }

  return { authUser: user, setAuthUser };
};
