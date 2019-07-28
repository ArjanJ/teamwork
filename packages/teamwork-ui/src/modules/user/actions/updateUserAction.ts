import { User } from '../../../../functions/src/modules/users/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiClient, ApiResponseSuccess } from '../../../utils/apiClient';

export const UPDATE_USER = 'UPDATE_USER';

const updateUserRequest = (uid: string, body: Partial<User>) =>
  apiClient({ url: `users/${uid}`, body, method: 'PUT' });

export type UpdateUserAction = AsyncAction<
  typeof UPDATE_USER,
  ApiResponseSuccess<User>
>;

export function updateUser(uid: string, body: Partial<User>) {
  return async(UPDATE_USER, updateUserRequest, uid, body);
}
