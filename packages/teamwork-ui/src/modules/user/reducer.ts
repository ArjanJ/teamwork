import { AnyAction } from 'redux';
import { createUserTypes, getUserTypes, IUser, updateUserTypes } from './types';

type User = IUser | null;

interface IUserState {
  isCreating: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  user: User;
}

const initialState: IUserState = {
  isCreating: false,
  isFetching: false,
  isUpdating: false,
  user: null,
};

export default function(state = initialState, action: AnyAction) {
  switch (action.type) {
    case createUserTypes.REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case createUserTypes.SUCCESS:
      return {
        ...state,
        isCreating: false,
        user: action.data,
      };
    case createUserTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        isCreating: false,
      };
    case getUserTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case getUserTypes.SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.data,
      };
    case getUserTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case updateUserTypes.REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case updateUserTypes.SUCCESS:
      return {
        ...state,
        isUpdating: false,
        user: {
          ...state.user,
          ...action.data,
        },
      };
    case updateUserTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        isUpdating: false,
      };
    default:
      return state;
  }
}
