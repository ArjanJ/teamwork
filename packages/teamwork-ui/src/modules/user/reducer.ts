import { ApiError } from '../../../functions/src/types/types';
import { User } from '../../../functions/src/modules/users/types';
import { CREATE_USER, GET_USER, UPDATE_USER } from './actions/index';
import { UserActions } from './actions';
import {
  createUserReducer,
  getUserReducer,
  updateUserReducer,
} from './reducers/index';

export interface UserState {
  error: ApiError | null;
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
  action: UserActions,
): UserState {
  if (action.type === CREATE_USER) {
    return createUserReducer(state, action);
  }

  if (action.type === GET_USER) {
    return getUserReducer(state, action);
  }

  if (action.type === UPDATE_USER) {
    return updateUserReducer(state, action);
  }

  return state;
}
