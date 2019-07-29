import { AsyncActionStatus } from '../../../utils/asyncAction';
import { CreateUserAction } from '../actions/index';
import { UserState } from '../reducer';

export function createUserReducer(state: UserState, action: CreateUserAction) {
  if (action.status === AsyncActionStatus.STARTED) {
    return {
      ...state,
      isCreating: true,
    };
  }

  if (action.status === AsyncActionStatus.SUCCEEDED) {
    return {
      ...state,
      isCreating: false,
      user: action.payload,
    };
  }

  if (action.status === AsyncActionStatus.FAILED) {
    return {
      ...state,
      error: action.payload,
      isCreating: false,
    };
  }

  return state;
}
