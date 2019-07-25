import { NextFunction, Request, Response } from 'express';

import { admin } from '../../config/firebase';
import { createUser } from '../../modules/users';
import { User } from '../../modules/users/types';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body, decodedToken } = req;

  const {
    company = { name: '' },
    firstName = '',
    lastName = '',
    role = '',
    teams = [],
  } = body;

  try {
    const user: User = {
      company,
      firstName,
      lastName,
      role,
      teams,
      uid: decodedToken.uid,
    };

    await createUser(user);
    res.status(200).send({ user });

    if (!decodedToken.company) {
      admin.auth().setCustomUserClaims(decodedToken.uid, {
        company,
      });
    }
  } catch (error) {
    next({ message: error.message, type: 'CREATE_USER_ERROR' });
  }
};
