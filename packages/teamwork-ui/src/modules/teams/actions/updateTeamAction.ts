import { Team } from 'teamwork-types';

import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const UPDATE_TEAM = 'UPDATE_TEAM';

const updateTeamRequest = (id: string, body: Partial<Team>) =>
  apiClient({ url: `teams/${id}`, body, method: 'PUT' });

export type UpdateTeamAction = AsyncAction<typeof UPDATE_TEAM, Team>;

export function updateTeam(id: string, body: Partial<Team>) {
  return async(UPDATE_TEAM, updateTeamRequest, id, body);
}
