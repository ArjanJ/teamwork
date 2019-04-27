import { generateActionTypes } from '../../utils/generateActionTypes';

export const createUserTypes = generateActionTypes('CREATE_USER');
export const getUserTypes = generateActionTypes('GET_USER');

export interface IUser {
  firstName: string;
  lastName: string;
}
