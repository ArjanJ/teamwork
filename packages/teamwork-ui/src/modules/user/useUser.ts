import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { User } from '../../../functions/src/modules/users/types';
import { createUser, getUser, updateUser } from './actions/index';
import { UserState } from './reducer';

interface UseUser extends UserState {
  createUser(user: User): void;
  getUser(uid: string): void;
  updateUser(uid: string, body: {}): void;
}

export const useUser = (): UseUser => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.user, []);
  const userState = useMappedState(mapState);

  return {
    ...userState,
    createUser: (user: User) => dispatch(createUser(user)),
    getUser: (uid: string) => dispatch(getUser(uid)),
    updateUser: (uid: string, body = {}) => dispatch(updateUser(uid, body)),
  };
};
