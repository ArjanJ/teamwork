import { Team } from '../../../../functions/src/modules/teams/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient, ApiResponseSuccess } from '../../../utils/apiClient';

export const UPDATE_TEAM = 'UPDATE_TEAM';

const updateTeamRequest = (id: string, body: Partial<Team>) =>
  apiClient({ url: `teams/${id}`, body, method: 'PUT' });

export type UpdateTeamAction = AsyncAction<
  typeof UPDATE_TEAM,
  ApiResponseSuccess<Team>
>;

export function updateTeam(id: string, body: Partial<Team>) {
  return async(UPDATE_TEAM, updateTeamRequest, id, body);
}
