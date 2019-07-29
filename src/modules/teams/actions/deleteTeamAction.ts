import { Team } from '../../../../functions/src/modules/teams/types';
import { UserTeam } from '../../../../functions/src/modules/users/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient } from '../../../utils/apiClient';

export const DELETE_TEAM = 'DELETE_TEAM';

const deleteTeamRequest = (body: UserTeam) =>
  apiClient({ url: `teams`, body, method: 'DELETE' });

export type DeleteTeamAction = AsyncAction<typeof DELETE_TEAM, Team>;

export function deleteTeam(userTeam: UserTeam) {
  return async(DELETE_TEAM, deleteTeamRequest, userTeam);
}
