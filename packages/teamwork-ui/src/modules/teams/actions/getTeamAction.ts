import { Team } from '../../../../functions/src/modules/teams/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient, ApiResponseSuccess } from '../../../utils/apiClient';

export const GET_TEAM = 'GET_TEAM';

const getTeamRequest = (id: string) =>
  apiClient({ url: `teams/${id}/`, method: 'GET' });

export type GetTeamAction = AsyncAction<
  typeof GET_TEAM,
  ApiResponseSuccess<Team>
>;

export function getTeam(id: string) {
  return async(GET_TEAM, getTeamRequest, id);
}
