import { User } from 'teamwork-types';

import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const UPDATE_USER = 'UPDATE_USER';

const updateUserRequest = (uid: string, body: Partial<User>) =>
  apiClient({ url: `users/${uid}`, body, method: 'PUT' });

export type UpdateUserAction = AsyncAction<typeof UPDATE_USER, User>;

export function updateUser(uid: string, body: Partial<User>) {
  return async(UPDATE_USER, updateUserRequest, uid, body);
}
