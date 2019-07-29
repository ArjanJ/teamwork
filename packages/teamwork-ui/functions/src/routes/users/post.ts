import { NextFunction, Request, Response } from 'express';

import { admin } from '../../config/firebase';
import {
  createCompany,
  getCompanyByName,
} from '../../modules/companies/models';
import { CREATE_USER, createUser } from '../../modules/users/models';
import { User } from '../../modules/users/types';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body, decodedToken } = req;

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
      firstName,
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
          status: 401,
          type: CREATE_USER,
        });
      } else {
        // If the company doesn't exist then create it.
        const companyDocRef = await createCompany({
          ...company,
          owner: {
            email: decodedToken.email,
            firstName,
            lastName,
          },
        });

        // Add companyDoc id to user.companies object.
        company.id = companyDocRef.id;
      }
    }

    // Create user in db.
    await createUser(decodedToken.uid, user);

    // Return newly created user to client.
    res.status(200).send(wrapJsonResponse(user));

    /**
     * Here we're adding a custom claim to the JWT
     * that firebase creates. By adding the companies
     * to the token we will know what companies this user
     * belongs to in each authenticated request.
     */
    if (!decodedToken.companies && companies[0].name !== '') {
      admin.auth().setCustomUserClaims(decodedToken.uid, {
        companies,
      });
    }
  } catch (error) {
    next({ message: error.message, type: CREATE_USER });
  }
};
