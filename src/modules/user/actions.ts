import { AppState } from '../../store/store';
import { createUserTypes, getUserTypes, IUser, updateUserTypes } from './types';

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
      createUserTypes.REQUEST,
      createUserTypes.SUCCESS,
      createUserTypes.FAILURE,
    ],
  };
}

export function getUser(uid: string) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/users/${uid}`, {
        headers,
        method: 'GET',
      }),
    payload: uid,
    shouldCallAPI: (state: AppState) => !state.user.user,
    types: [getUserTypes.REQUEST, getUserTypes.SUCCESS, getUserTypes.FAILURE],
  };
}

export function updateUser(uid: string, body = {}) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/users/${uid}`, {
        body: JSON.stringify(body),
        headers,
        method: 'PUT',
      }),
    payload: { ...body, uid },
    types: [
      updateUserTypes.REQUEST,
      updateUserTypes.SUCCESS,
      updateUserTypes.FAILURE,
    ],
  };
}
