import { User } from '../../../../functions/src/modules/users/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiService, ApiResponseSuccess } from '../../../utils/apiService';

export const CREATE_USER = 'CREATE_USER';

const createUserRequest = (user: User) =>
  apiService({ url: 'users', body: user, method: 'POST' });

export type CreateUserAction = AsyncAction<
  typeof CREATE_USER,
  ApiResponseSuccess<User>
>;

export function createUser(user: User) {
  return async(CREATE_USER, createUserRequest, user);
}
