import { User } from 'teamwork-types';

import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const CREATE_USER = 'CREATE_USER';

const createUserRequest = (user: User) =>
  apiClient({ url: 'users', body: user, method: 'POST' });

export type CreateUserAction = AsyncAction<typeof CREATE_USER, User>;

export function createUser(user: User) {
  return async(CREATE_USER, createUserRequest, user);
}
