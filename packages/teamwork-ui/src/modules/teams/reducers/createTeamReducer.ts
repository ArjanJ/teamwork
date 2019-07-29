import { AsyncActionStatus } from '../../../utils/asyncAction';
import { CreateTeamAction } from '../actions/index';
import { TeamsState } from '../reducer';

export function createTeamReducer(state: TeamsState, action: CreateTeamAction) {
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
      isCreating: false,
    };
  }

  return state;
}
