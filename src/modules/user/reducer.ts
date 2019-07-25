import { AnyAction } from 'redux';

import { ApiError } from '../../../functions/src/types/ApiError';
import { User } from '../../../functions/src/modules/users/types';
import { createTeamTypes } from '../teams/types';
import { createUserTypes, getUserTypes, updateUserTypes } from './types';

interface IUserState {
  error: ApiError | null;
  isCreating: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  user: User | null;
}

const initialState: IUserState = {
  error: null,
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
    case createTeamTypes.SUCCESS:
      const teams = state.user ? state.user.teams : [];

      return {
        ...state,
        user: {
          ...state.user,
          teams: [
            ...teams,
            {
              displayName: action.data.displayName,
              id: action.data.id,
              name: action.data.name,
            },
          ],
        },
      };
    default:
      return state;
  }
}
