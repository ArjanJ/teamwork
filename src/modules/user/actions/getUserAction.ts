import { User } from '../../../../functions/src/modules/users/types';
import { apiClient } from '../../../utils/apiClient';
import { async, AsyncAction } from '../../../utils/asyncAction';

export const GET_USER = 'GET_USER';

const getUserRequest = (uid: string) =>
  apiClient({ url: `users/${uid}`, method: 'GET' });

export type GetUserAction = AsyncAction<typeof GET_USER, User>;

export function getUser(uid: string) {
  return async(GET_USER, getUserRequest, uid);
}
