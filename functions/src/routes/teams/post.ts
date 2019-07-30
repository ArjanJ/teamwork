import { NextFunction, Request, Response } from 'express';

import { admin } from '../../config/firebase';
import { getCompany } from '../../modules/companies/models';
import {
  CREATE_TEAM,
  createTeam,
  getTeamWhere,
} from '../../modules/teams/models';
import { Team } from '../../modules/teams/types';
import { updateUser } from '../../modules/users/models';
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
          message: `Team ${
            body.displayName
          } already exists within your organization.`,
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
  } catch (error) {
    next({ message: error.message, type: CREATE_TEAM });
  }
};
