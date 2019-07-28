import { User } from '../../../functions/src/modules/users/types';

export const isEmptyUser = (user: User) => {
  if (!user) {
    return true;
  }

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
