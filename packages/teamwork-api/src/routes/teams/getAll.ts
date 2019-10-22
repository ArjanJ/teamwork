import { NextFunction, Request, Response } from 'express';
import { Team, Teams } from 'teamwork-types';

import { GET_TEAM } from '../../modules/teams/constants';
import { getTeamWhere } from '../../modules/teams/models';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const companyId = req.get('X-Company');

  try {
    if (!companyId) {
      throw new Error('X-Company header is required.');
    }

    // Get all teams within company.
    const teamsDocs = await getTeamWhere('company.id', companyId);

    const teamsResponse: Teams = {};

    // Return docs list into Teams structure.
    const teams: Teams = teamsDocs.docs.reduce((acc, curr) => {
      const team: Team = curr.data() as Team;
      acc[team.id] = team;
      return acc;
    }, teamsResponse);

    // Return Teams to client.
    res.status(200).send(wrapJsonResponse(teams));
  } catch (error) {
    next({ message: error.message, status: error.status, type: GET_TEAM });
  }
};
