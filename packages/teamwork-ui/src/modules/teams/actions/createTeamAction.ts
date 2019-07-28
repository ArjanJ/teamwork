import { Team } from '../../../../functions/src/modules/teams/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient, ApiResponseSuccess } from '../../../utils/apiClient';

export const CREATE_TEAM = 'CREATE_TEAM';

const createTeamRequest = (team: Team) =>
  apiClient({ url: 'teams', body: team, method: 'POST' });

export type CreateTeamAction = AsyncAction<
  typeof CREATE_TEAM,
  ApiResponseSuccess<Team>
>;

export function createTeam(team: Team) {
  return async(CREATE_TEAM, createTeamRequest, team);
}
