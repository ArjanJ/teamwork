import { NextFunction, Request, Response } from 'express';

import {
  createCompany,
  getCompanyByName,
} from '../../modules/companies/models';
import { CREATE_USER, createUser } from '../../modules/users/models';
import { User } from '../../modules/users/types';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body, decodedToken } = req;
  const { email, uid } = decodedToken;

  const {
    companies = [],
    firstName = '',
    lastName = '',
    role = '',
    teams = [],
  } = body;

  try {
    const user: User = {
      companies,
      email,
      firstName,
      id: uid,
      lastName,
      role,
      teams,
    };

    if (companies.length > 0) {
      const company = companies[0];

      // Check if company exists.
      const companiesQuery = await getCompanyByName(company.name);

      if (companiesQuery.docs.length > 0) {
        // If company exists return 401 error to user.
        return next({
          message: `${
            company.name
          } already exists. You must be added by an administrator.`,
          status: 400,
          type: CREATE_USER,
        });
      } else {
        // If the company doesn't exist then create it.
        const companyDoc = await createCompany({
          ...company,
          owner: {
            email,
            firstName,
            lastName,
          },
        });

        company.id = companyDoc.id;
      }
    }

    // Create user in db.
    await createUser(uid, user);

    // Return newly created user to client.
    res.status(200).send(wrapJsonResponse(user));
  } catch (error) {
    next({ message: error.message, type: CREATE_USER });
  }
};
