import { AsyncActionStatus } from '../../../utils/asyncAction';
import { CreateTeamAction } from '../../teams/actions/index';
import { UserState } from '../reducer';

export function createTeamUserReducer(
  state: UserState,
  action: CreateTeamAction,
) {
  if (action.status === AsyncActionStatus.SUCCEEDED) {
    const user = state.user;
    if (!user) { return state; }

    const { displayName, id, name } = action.payload;

    return {
      ...state,
      user: {
        ...user,
        teams: [...user.teams, { displayName, id, name }],
      },
    };
  }

  return state;
}
