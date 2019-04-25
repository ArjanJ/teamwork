// import { IAPIError } from '../../types/APIError';
import { generateActionTypes } from '../../utils/generateActionTypes';

export const createUserTypes = generateActionTypes('CREATE_USER');

export interface IUser {
  firstName: string;
  lastName: string;
}

// export interface ICreateUserRequest {
//   type: typeof createUserTypes.CREATE_USER_REQUEST;
//   payload: IUser;
// }

// export interface ICreateUserSuccess {
//   type: typeof createUserTypes.CREATE_USER_SUCCESS;
//   payload: IUser;
// }

// export interface ICreateUserFailure {
//   type: typeof createUserTypes.CREATE_USER_FAILURE;
//   payload: IAPIError;
// }

// export type UserActions =
//   | ICreateUserFailure
//   | ICreateUserRequest
//   | ICreateUserSuccess;
