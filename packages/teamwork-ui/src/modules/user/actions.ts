import { AppState } from '../../store/store';
import { createUserTypes, getUserTypes, IUser } from './types';

export function createUser(user: IUser) {
  return {
    callAPI: (headers = {}) =>
      fetch('/api/users', {
        body: JSON.stringify(user),
        headers,
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

export function getUser(email: string) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/users/${email}`, {
        headers,
        method: 'GET',
      }),
    payload: email,
    shouldCallAPI: (state: AppState) => !state.user.user,
    types: [
      getUserTypes.GET_USER_REQUEST,
      getUserTypes.GET_USER_SUCCESS,
      getUserTypes.GET_USER_FAILURE,
    ],
  };
}