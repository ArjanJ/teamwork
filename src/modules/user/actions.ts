import { AppState } from '../../store/store';
import { createUserTypes, IUser } from './types';

export function createUser(user: IUser) {
  return {
    callAPI: () =>
      fetch('/api/users', {
        headers: {},
        method: 'POST',
      }),
    payload: user,
    shouldCallAPI: (state: AppState) => !state.user.user,
    types: [
      createUserTypes.CREATE_USER_REQUEST,
      createUserTypes.CREATE_USER_SUCCESS,
      createUserTypes.CREATE_USER_FAILURE,
    ],
  };
}

export function getUser() {}
