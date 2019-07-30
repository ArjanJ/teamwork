import { Team } from '../../../../functions/src/modules/teams/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient } from '../../../utils/apiClient';

export const DELETE_TEAM = 'DELETE_TEAM';

const deleteTeamRequest = (body: { id: Team['id'] }) =>
  apiClient({ url: `teams`, body, method: 'DELETE' });

export type DeleteTeamAction = AsyncAction<typeof DELETE_TEAM, Team>;

export function deleteTeam(userTeam: { id: Team['id'] }) {
  return async(DELETE_TEAM, deleteTeamRequest, userTeam);
}
