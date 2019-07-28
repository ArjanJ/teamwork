import { AsyncActionStatus } from '../../../utils/asyncAction';
import { UpdateTeamMembersAction } from '../actions/index';
import { TeamsState } from '../reducer';

export function updateTeamMembersReducer(
  state: TeamsState,
  action: UpdateTeamMembersAction,
) {
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
        [action.payload.data.id]: action.payload.data,
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
