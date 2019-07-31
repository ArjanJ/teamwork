import { AsyncActionStatus } from '../../../utils/asyncAction';
import { DeleteTeamAction } from '../../teams/actions/index';
import { UserState } from '../reducer';

export function deleteTeamUserReducer(
  state: UserState,
  action: DeleteTeamAction,
) {
  if (action.status === AsyncActionStatus.SUCCEEDED) {
    const user = state.user;
    if (!user) { return state; }

    const { id } = action.payload;

    return {
      ...state,
      user: {
        ...user,
        teams: user.teams.filter(team => team.id !== id),
      },
    };
  }

  return state;
}
