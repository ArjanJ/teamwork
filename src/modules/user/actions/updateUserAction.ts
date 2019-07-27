import { User } from '../../../../functions/src/modules/users/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiService, ApiResponseSuccess } from '../../../utils/apiClient';

export const UPDATE_USER = 'UPDATE_USER';

const updateUserRequest = (uid: string, body = {}) =>
  apiService({ url: `users/${uid}`, body, method: 'PUT' });

export type UpdateUserAction = AsyncAction<
  typeof UPDATE_USER,
  ApiResponseSuccess<User>
>;

export function updateUser(uid: string, body = {}) {
  return async(UPDATE_USER, updateUserRequest, uid, body);
}
