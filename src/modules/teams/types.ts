import { generateActionTypes } from '../../utils/generateActionTypes';

export const createTeamTypes = generateActionTypes('CREATE_TEAM');
export const deleteTeamTypes = generateActionTypes('DELETE_TEAM');
export const getTeamTypes = generateActionTypes('GET_TEAM');
export const updateTeamTypes = generateActionTypes('UPDATE_TEAM');

interface IMember {
  firstName: string;
  lastName: string;
  role?: string;
}

export interface ITeam {
  id: string;
  members: IMember[];
  name: string;
}
