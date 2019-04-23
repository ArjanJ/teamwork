export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

export interface IUser {
  firstName: string;
  lastName: string;
}

export interface ICreateUserRequest {
  type: typeof CREATE_USER_REQUEST;
}

export interface ICreateUserSuccess {
  type: typeof CREATE_USER_SUCCESS;
  payload: IUser;
}

export interface ICreateUserFailure {
  type: typeof CREATE_USER_FAILURE;
}

export type UserActions =
  | ICreateUserFailure
  | ICreateUserRequest
  | ICreateUserSuccess;
