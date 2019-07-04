import { IUser } from '../modules/user/types';

export const isEmptyUser = (user: IUser) => {
  if (Object.keys(user).length === 0) {
    return true;
  }

  return (
    user.firstName === '' &&
    user.lastName === '' &&
    user.role === '' &&
    user.teams.length === 0
  );
};
