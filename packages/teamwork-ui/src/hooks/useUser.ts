import { useContext } from 'react';
import { useDispatch, StoreContext } from 'redux-react-hook';

import { createUser, getUser } from '../modules/user/actions';
import { IUser } from '../modules/user/types';

export const useUser = () => {
  const dispatch = useDispatch();
  const store = useContext(StoreContext);
  const { user } = store.getState();

  const create = (user: IUser) => dispatch(createUser(user));
  const get = (email: string) => dispatch(getUser(email));

  return { createUser: create, getUser: get, user: user };
};
