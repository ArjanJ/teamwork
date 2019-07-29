import { AsyncActionStatus } from '../../../utils/asyncAction';
import { UpdateTeamAction } from '../actions/index';
import { TeamsState } from '../reducer';

export function updateTeamReducer(state: TeamsState, action: UpdateTeamAction) {
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
      isUpdating: false,
    };
  }

  return state;
}
