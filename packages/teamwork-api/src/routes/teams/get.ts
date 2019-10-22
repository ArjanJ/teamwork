import { NextFunction, Request, Response } from 'express';

import { GET_TEAM } from '../../modules/teams/constants';
import { getTeam } from '../../modules/teams/models';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const teamDoc = await getTeam(id);

    if (!teamDoc.exists) {
      return next({
        message: `Team with id: ${id} not found.`,
        status: 404,
        type: GET_TEAM,
      });
    }

    res.status(200).send(wrapJsonResponse(teamDoc.data()));
  } catch (error) {
    next({ message: error.message, status: error.status, type: GET_TEAM });
  }
};
