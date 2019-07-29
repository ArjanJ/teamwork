import { AsyncActionStatus } from '../../../utils/asyncAction';
import { GetAllTeamsAction } from '../actions/index';
import { TeamsState } from '../reducer';

export function getAllTeamsReducer(
  state: TeamsState,
  action: GetAllTeamsAction,
) {
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
      teams: action.payload,
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
