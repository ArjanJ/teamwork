import { NextFunction, Request, Response } from 'express';

import { UPDATE_TEAM } from '../../modules/teams/constants';
import { getTeam, updateTeam } from '../../modules/teams/models';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const put = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req;
  const { id } = params;

  try {
    await updateTeam(id, body);
    const updatedTeamDoc = await getTeam(id);
    const team = updatedTeamDoc.data();

    res.status(200).send(wrapJsonResponse(team));
  } catch (error) {
    next({ message: error.message, status: error.status, type: UPDATE_TEAM });
  }
};
