import { AsyncActionStatus } from '../../../utils/asyncAction';
import { GetTeamAction } from '../actions/index';
import { TeamsState } from '../reducer';

export function getTeamReducer(state: TeamsState, action: GetTeamAction) {
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
      teams: {
        ...state.teams,
        [action.payload.id]: action.payload,
      },
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
