import { IAuthUser, AuthActions, SET_AUTH_USER } from './types';

interface AuthState {
  user: null | IAuthUser;
}

const initialState: AuthState = {
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
