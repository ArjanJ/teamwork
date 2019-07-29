import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { User } from '../../../functions/src/modules/users/types';
import { AsyncAction } from '../../utils/asyncAction';
import { createUser, getUser, updateUser } from './actions/index';
import { UserState } from './reducer';

interface UseUser extends UserState {
  createUser(user: User): Promise<AsyncAction<string>>;
  getUser(uid: string): Promise<AsyncAction<string>>;
  updateUser(uid: string, body: Partial<User>): Promise<AsyncAction<string>>;
}

export const useUser = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.user, []);
  const userState = useMappedState(mapState);

  const api: UseUser = {
    ...userState,
    createUser: user => dispatch(createUser(user)),
    getUser: uid => dispatch(getUser(uid)),
    updateUser: (uid, body) => dispatch(updateUser(uid, body)),
  };

  return api;
};
