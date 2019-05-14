import { generateActionTypes } from '../../utils/generateActionTypes';

export const createUserTypes = generateActionTypes('CREATE_USER');
export const getUserTypes = generateActionTypes('GET_USER');
export const updateUserTypes = generateActionTypes('UPDATE_USER');

interface ITeam {
  id: string;
  name: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  teams: ITeam[];
}
