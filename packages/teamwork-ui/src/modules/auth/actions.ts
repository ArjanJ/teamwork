import { IAuthUser, SET_AUTH_TOKEN, SET_AUTH_USER } from './types';

export function setAuthToken(token: string) {
  return {
    type: SET_AUTH_TOKEN,
    payload: token,
  };
}

export function setAuthUser(authUser: IAuthUser) {
  return {
    type: SET_AUTH_USER,
    payload: authUser,
  };
}
