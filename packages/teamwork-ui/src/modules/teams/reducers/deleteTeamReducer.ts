import { AsyncActionStatus } from '../../../utils/asyncAction';
import { DeleteTeamAction } from '../actions/index';
import { TeamsState } from '../reducer';

export function deleteTeamReducer(state: TeamsState, action: DeleteTeamAction) {
  if (action.status === AsyncActionStatus.STARTED) {
    return {
      ...state,
      isDeleting: true,
    };
  }

  if (action.status === AsyncActionStatus.SUCCEEDED) {
    const { [action.payload.data.id]: deletedTeam, ...teams } = state.teams;

    return {
      ...state,
      isDeleting: false,
      teams,
    };
  }

  if (action.status === AsyncActionStatus.FAILED) {
    return {
      ...state,
      error: action.payload,
      isDeleting: false,
    };
  }

  return state;
}
