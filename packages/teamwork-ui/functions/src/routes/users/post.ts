import { NextFunction, Request, Response } from 'express';

import { CREATE_USER } from '../../../../src/modules/user/actions/index';
import { admin } from '../../config/firebase';
import { createUser } from '../../modules/users/models';
import { User } from '../../modules/users/types';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body, decodedToken } = req;

  const {
    companies = [{ id: '', name: '' }],
    firstName = '',
    lastName = '',
    role = '',
    teams = [],
  } = body;

  try {
    const user: User = {
      companies,
      firstName,
      lastName,
      role,
      teams,
    };

    await createUser(decodedToken.uid, user);
    res.status(200).send({ user });

    if (!decodedToken.companies && companies[0].name !== '') {
      // TODO: Make API call to create company.
      admin.auth().setCustomUserClaims(decodedToken.uid, {
        companies,
      });
    }
  } catch (error) {
    next({ message: error.message, type: CREATE_USER });
  }
};
