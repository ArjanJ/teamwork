import { Teams } from '../../../../functions/src/modules/teams/types';
import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const GET_ALL_TEAMS = 'GET_ALL_TEAMS';

const getAllTeamsRequest = () => apiClient({ url: 'teams', method: 'GET' });

export type GetAllTeamsAction = AsyncAction<typeof GET_ALL_TEAMS, Teams>;

export function getAllTeams() {
  return async(GET_ALL_TEAMS, getAllTeamsRequest);
}
