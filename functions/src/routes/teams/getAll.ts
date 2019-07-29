import { NextFunction, Request, Response } from 'express';

import { GET_TEAM, getTeamWhere } from '../../modules/teams/models';
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
    const teams = teamsDocs.docs.map(teamDoc => teamDoc.data());
    res.status(200).send(wrapJsonResponse(teams));
  } catch (error) {
    next({ message: error.message, status: error.status, type: GET_TEAM });
  }
};
