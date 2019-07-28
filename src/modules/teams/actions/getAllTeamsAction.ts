import { Team } from '../../../../functions/src/modules/teams/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient, ApiResponseSuccess } from '../../../utils/apiClient';

export const GET_ALL_TEAMS = 'GET_ALL_TEAMS';

const getAllTeamsRequest = () => apiClient({ url: 'teams', method: 'GET' });

export type GetAllTeamsAction = AsyncAction<
  typeof GET_ALL_TEAMS,
  ApiResponseSuccess<{ [id: string]: Team }>
>;

export function getAllTeams() {
  return async(GET_ALL_TEAMS, getAllTeamsRequest);
}
