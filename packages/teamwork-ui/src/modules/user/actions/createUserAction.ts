import { User } from '../../../../functions/src/modules/users/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient } from '../../../utils/apiClient';

export const CREATE_USER = 'CREATE_USER';

const createUserRequest = (user: User) =>
  apiClient({ url: 'users', body: user, method: 'POST' });

export type CreateUserAction = AsyncAction<typeof CREATE_USER, User>;

export function createUser(user: User) {
  return async(CREATE_USER, createUserRequest, user);
}
