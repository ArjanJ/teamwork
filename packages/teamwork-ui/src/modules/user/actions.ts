import {
  CreateUserAction,
  GetUserAction,
  UpdateUserAction,
} from './actions/index';

export type UserActions = CreateUserAction | GetUserAction | UpdateUserAction;
