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
        [action.payload.data.id]: action.payload.data,
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
