import { IAuthUser, AuthActions, SET_AUTH_USER } from './types';

interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: null | IAuthUser;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
};

export default function(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
