import { AuthUser, SET_AUTH_USER } from './types';

interface SetAuthUser {
  type: typeof SET_AUTH_USER;
  payload: AuthUser;
}

export function setAuthUser(authUser: AuthUser): SetAuthUser {
  return {
    type: SET_AUTH_USER,
    payload: authUser,
  };
}

export type AuthActions = SetAuthUser;
