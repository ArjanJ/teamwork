import { Team } from 'teamwork-types';

import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const CREATE_TEAM = 'CREATE_TEAM';

const createTeamRequest = (team: Team) =>
  apiClient({ url: 'teams', body: team, method: 'POST' });

export type CreateTeamAction = AsyncAction<typeof CREATE_TEAM, Team>;

export function createTeam(team: Team) {
  return async(CREATE_TEAM, createTeamRequest, team);
}
