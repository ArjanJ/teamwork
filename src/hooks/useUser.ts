import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { User } from '../../functions/src/modules/users/types';
import { createUser, getUser, updateUser } from '../modules/user/actions/index';

export const useUser = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.user, []);
  const userState = useMappedState(mapState);

  const create = (user: User) => dispatch(createUser(user));
  const get = (uid: string) => dispatch(getUser(uid));
  const update = (uid: string, body = {}) => dispatch(updateUser(uid, body));

  const user: User = userState.user;

  return {
    createUser: create,
    error: userState.error,
    getUser: get,
    isCreating: userState.isCreating,
    isFetching: userState.isFetching,
    isUpdating: userState.isUpdating,
    updateUser: update,
    user,
  };
};
