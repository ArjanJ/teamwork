import { APIError, User } from 'teamwork-types';
import {
  CREATE_TEAM,
  CreateTeamAction,
  DELETE_TEAM,
  DeleteTeamAction,
} from '../teams/actions/index';
import { UserActions } from './actions';
import { CREATE_USER, GET_USER, UPDATE_USER } from './actions/index';
import {
  createTeamUserReducer,
  createUserReducer,
  deleteTeamUserReducer,
  getUserReducer,
  updateUserReducer,
} from './reducers/index';

export interface UserState {
  error: APIError | null;
  isCreating: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  user: User | null;
}

const initialState = {
  error: null,
  isCreating: false,
  isFetching: false,
  isUpdating: false,
  user: null,
};

export default function(
  state: UserState = initialState,
  action: UserActions | CreateTeamAction | DeleteTeamAction,
): UserState {
  switch (action.type) {
    case CREATE_USER:
      return createUserReducer(state, action);
    case GET_USER:
      return getUserReducer(state, action);
    case UPDATE_USER:
      return updateUserReducer(state, action);
    case CREATE_TEAM:
      return createTeamUserReducer(state, action);
    case DELETE_TEAM:
      return deleteTeamUserReducer(state, action);
    default:
      return state;
  }
}
