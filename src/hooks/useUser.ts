import { useContext } from 'react';
import { useDispatch, StoreContext } from 'redux-react-hook';

import { createUser, getUser, updateUser } from '../modules/user/actions';
import { IUser } from '../modules/user/types';

export const useUser = () => {
  const dispatch = useDispatch();
  const store = useContext(StoreContext);
  const { user } = store.getState();

  const create = (user: IUser) => dispatch(createUser(user));
  const get = (uid: string) => dispatch(getUser(uid));
  const update = (uid: string, body = {}) => dispatch(updateUser(uid, body));

  return { createUser: create, getUser: get, updateUser: update, user: user };
};
