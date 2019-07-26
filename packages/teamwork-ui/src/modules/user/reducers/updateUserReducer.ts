import { AsyncActionStatus } from '../../../utils/asyncAction';
import { UpdateUserAction } from '../actions/index';
import { UserState } from '../reducer';

export function updateUserReducer(state: UserState, action: UpdateUserAction) {
  if (action.status === AsyncActionStatus.STARTED) {
    return {
      ...state,
      isUpdating: true,
    };
  }

  if (action.status === AsyncActionStatus.SUCCEEDED) {
    return {
      ...state,
      isUpdating: false,
      user: {
        ...state.user,
        ...action.payload.data,
      },
    };
  }

  if (action.status === AsyncActionStatus.FAILED) {
    return {
      ...state,
      error: action.payload,
      isUpdating: false,
    };
  }

  return state;
}
