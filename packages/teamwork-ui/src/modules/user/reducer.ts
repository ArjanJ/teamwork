import { AnyAction } from 'redux';
import { createUserTypes, getUserTypes, IUser } from './types';

type User = IUser | null;

interface IUserState {
  isCreating: boolean;
  isFetching: boolean;
  user: User;
}

const initialState: IUserState = {
  isCreating: false,
  isFetching: false,
  user: null,
};

export default function(state = initialState, action: AnyAction) {
  switch (action.type) {
    case createUserTypes.CREATE_USER_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case createUserTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        isCreating: false,
        user: action.data,
      };
    case createUserTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isCreating: false,
      };
    case getUserTypes.GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case getUserTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.data,
      };
    case getUserTypes.GET_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
}
