import { AnyAction } from 'redux';

import { IAuthUser, SET_AUTH_TOKEN, SET_AUTH_USER } from './types';

interface AuthState {
  token: null | string;
  user: null | IAuthUser;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

export default function(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
