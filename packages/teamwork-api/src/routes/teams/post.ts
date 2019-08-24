import { NextFunction, Request, Response } from 'express';
import { generateMultiple } from 'generate-password';

import { admin } from '../../config/firebase';
import { getCompany } from '../../modules/companies/models';
import {
  CREATE_TEAM,
  createTeam,
  getTeamWhere,
} from '../../modules/teams/models';
import { Team } from '../../modules/teams/types';
import {
  createFirebaseUser,
  createUser,
  getUserWhere,
  updateUser,
} from '../../modules/users/models';
import { UserTeam } from '../../modules/users/types';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body, decodedToken } = req;
  const companyId = req.get('X-Company');

  if (!companyId) {
    return next({ message: 'X-Company header is required.' });
  }

  try {
    // Get all teams within company.
    const teamsDocs = await getTeamWhere('company.id', companyId);

    if (teamsDocs.docs.length > 0) {
      // Check if team exists already within this company.
      const teamsWithSameName = teamsDocs.docs
        .map(t => t.data())
        .filter(t => t.name === body.name);

      if (teamsWithSameName.length > 0) {
        return next({
          message: `Team ${body.displayName} already exists within your organization.`,
          status: 400,
          type: CREATE_TEAM,
        });
      }
    }

    // Fetch full details of company because we need to store it on the Team doc.
    const companyDoc = await getCompany(companyId);
    const company = companyDoc.data();

    if (!company) {
      return next({
        message: 'Company does not exist.',
        status: 400,
        type: CREATE_TEAM,
      });
    }

    const team: Team = {
      company: {
        id: company.id,
        name: company.name,
        owner: company.owner,
      },
      displayName: body.displayName,
      id: '',
      members: body.members,
      name: body.name,
    };

    // Create the team doc.
    const teamDoc = await createTeam(team);
    // Add the new id to the in memory team obj.
    team.id = teamDoc.id;
    // Send newly created team back to client.
    res.status(200).send(wrapJsonResponse(team));

    // userTeam is a short version of the full team that is stored on the user.
    const userTeam: UserTeam = {
      displayName: team.displayName,
      id: team.id,
      name: team.name,
    };

    // Update user doc with new team.
    await updateUser(decodedToken.uid, {
      teams: admin.firestore.FieldValue.arrayUnion(userTeam),
    });

    const companyDetails = {
      id: company.id,
      name: company.name,
    };

    // Fetch all users in company.
    const usersInCompanyDocs = await getUserWhere('companies', companyDetails);

    // Reduce list of users to just their emails.
    const usersEmailsInCompany = usersInCompanyDocs.docs
      .map(userInCompany => userInCompany.data())
      .reduce((acc, curr) => {
        acc.push(curr.email);
        return acc;
      }, []);

    // Filter list of team members to just the ones that don't exist.
    const usersThatNeedInviting = team.members.filter(
      teamMember => !usersEmailsInCompany.includes(teamMember.email),
    );

    /**
     * If there are team members that don't exist (have an account) yet then we
     * create account for them in Firebase with a randomly generated password
     * and send them an email inviting them to join Teamwork.
     */
    if (usersThatNeedInviting.length > 0) {
      // Generate unique passwords for these users.
      const passwords = generateMultiple(usersThatNeedInviting.length, {
        length: 10,
        numbers: true,
      });

      // Map the passwords on to the user objects.
      const usersWithPasswords = usersThatNeedInviting.map((teamMember, i) => ({
        ...teamMember,
        password: passwords[i],
      }));

      // Create a list of promises that create a new user in Firebase authentication.
      const createFirebaseUsers = usersWithPasswords.map(teamMember =>
        createFirebaseUser({
          displayName: `${teamMember.firstName} ${teamMember.lastName}`,
          email: teamMember.email,
          password: teamMember.password,
        }),
      );

      // Wait until all of the new Firebase users are created.
      const newFirebaseUsers = await Promise.all(createFirebaseUsers);

      // Create a list of promise that create a new user in Firestore/users collection.
      const createTeamworkUsers = newFirebaseUsers.map((firebaseUser, i) =>
        createUser(firebaseUser.uid, {
          companies: [companyDetails],
          email: firebaseUser.email || usersWithPasswords[i].email,
          firstName: usersWithPasswords[i].firstName,
          id: firebaseUser.uid,
          lastName: usersWithPasswords[i].lastName,
          role: '',
          teams: [userTeam],
        }),
      );

      // Create users.
      await Promise.all(createTeamworkUsers);
    }
  } catch (error) {
    next({ message: error.message, type: CREATE_TEAM });
  }
};
