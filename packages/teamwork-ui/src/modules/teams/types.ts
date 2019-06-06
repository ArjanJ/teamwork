import { generateActionTypes } from '../../utils/generateActionTypes';

export const createTeamTypes = generateActionTypes('CREATE_TEAM');
export const deleteTeamTypes = generateActionTypes('DELETE_TEAM');
export const getTeamTypes = generateActionTypes('GET_TEAM');
export const getTeamsTypes = generateActionTypes('GET_TEAMS');
export const updateTeamTypes = generateActionTypes('UPDATE_TEAM');
export const updateTeamMembersTypes = generateActionTypes(
  'UPDATE_TEAM_MEMBERS',
);

export interface IMember {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ITeam {
  displayName: string;
  id: string;
  members: IMember[];
  name: string;
}
