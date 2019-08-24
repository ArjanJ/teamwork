import { Team } from 'teamwork-types';

import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const GET_TEAM = 'GET_TEAM';

const getTeamRequest = (id: string) =>
  apiClient({ url: `teams/${id}/`, method: 'GET' });

export type GetTeamAction = AsyncAction<typeof GET_TEAM, Team>;

export function getTeam(id: string) {
  return async(GET_TEAM, getTeamRequest, id);
}
