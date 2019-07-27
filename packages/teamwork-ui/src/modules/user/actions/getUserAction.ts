import { User } from '../../../../functions/src/modules/users/types';
import { async, AsyncAction } from '../../../utils/asyncAction';
import { apiService, ApiResponseSuccess } from '../../../utils/apiClient';

export const GET_USER = 'GET_USER';

const getUserRequest = (uid: string) =>
  apiService({ url: `users/${uid}`, method: 'GET' });

export type GetUserAction = AsyncAction<
  typeof GET_USER,
  ApiResponseSuccess<User>
>;

export function getUser(uid: string) {
  return async(GET_USER, getUserRequest, uid);
}
