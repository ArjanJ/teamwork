import { IAuthUser, SET_AUTH_USER } from './types';

export function setAuthUser(authUser: IAuthUser) {
  return {
    type: SET_AUTH_USER,
    payload: authUser,
  };
}
