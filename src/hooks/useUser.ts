import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { createUser, getUser, updateUser } from '../modules/user/actions';
import { IUser } from '../modules/user/types';

export const useUser = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.user, []);
  const userState = useMappedState(mapState);

  const create = (user: IUser) => dispatch(createUser(user));
  const get = (uid: string) => dispatch(getUser(uid));
  const update = (uid: string, body = {}) => dispatch(updateUser(uid, body));

  return {
    createUser: create,
    getUser: get,
    isCreating: userState.isCreating,
    isFetching: userState.isFetching,
    isUpdating: userState.isUpdating,
    updateUser: update,
    user: userState.user,
  };
};
