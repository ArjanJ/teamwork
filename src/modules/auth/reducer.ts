import { AuthActions } from './actions';
import { AuthUser, SET_AUTH_USER } from './types';

interface AuthState {
  user: null | AuthUser;
}

const initialState = {
  user: null,
};

export default function(state: AuthState = initialState, action: AuthActions) {
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
