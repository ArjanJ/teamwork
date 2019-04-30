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
      createUserTypes.CREATE_USER_REQUEST,
      createUserTypes.CREATE_USER_SUCCESS,
      createUserTypes.CREATE_USER_FAILURE,
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
    types: [
      getUserTypes.GET_USER_REQUEST,
      getUserTypes.GET_USER_SUCCESS,
      getUserTypes.GET_USER_FAILURE,
    ],
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
      updateUserTypes.UPDATE_USER_REQUEST,
      updateUserTypes.UPDATE_USER_SUCCESS,
      updateUserTypes.UPDATE_USER_FAILURE,
    ],
  };
}
