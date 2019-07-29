import { AsyncActionStatus } from '../../../utils/asyncAction';
import { GetUserAction } from '../actions/index';
import { UserState } from '../reducer';

export function getUserReducer(state: UserState, action: GetUserAction) {
  if (action.status === AsyncActionStatus.STARTED) {
    return {
      ...state,
      isFetching: true,
    };
  }

  if (action.status === AsyncActionStatus.SUCCEEDED) {
    return {
      ...state,
      isFetching: false,
      user: action.payload,
    };
  }

  if (action.status === AsyncActionStatus.FAILED) {
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  }

  return state;
}
