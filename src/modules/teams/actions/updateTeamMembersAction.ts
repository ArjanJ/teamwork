import {
  Team,
  TeamMember,
} from '../../../../functions/src/modules/teams/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient } from '../../../utils/apiClient';

export const UPDATE_TEAM_MEMBERS = 'UPDATE_TEAM_MEMBERS';

const updateTeamMembersRequest = (id: string, body: TeamMember[]) =>
  apiClient({ url: `teams/${id}/members`, body, method: 'PUT' });

export type UpdateTeamMembersAction = AsyncAction<
  typeof UPDATE_TEAM_MEMBERS,
  Team
>;

export function updateTeamMembers(id: string, body: TeamMember[]) {
  return async(UPDATE_TEAM_MEMBERS, updateTeamMembersRequest, id, body);
}
