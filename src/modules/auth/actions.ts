import { AuthUser, SET_AUTH_USER } from './types';

interface SetAuthUser {
  payload: AuthUser;
  type: typeof SET_AUTH_USER;
}

export function setAuthUser(authUser: AuthUser): SetAuthUser {
  return {
    payload: authUser,
    type: SET_AUTH_USER,
  };
}

export type AuthActions = SetAuthUser;
