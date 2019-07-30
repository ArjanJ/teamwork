import { NextFunction, Request, Response } from 'express';

import { admin } from '../../config/firebase';
import { getTeam, DELETE_TEAM, deleteTeam } from '../../modules/teams/models';
import { updateUser } from '../../modules/users/models';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

// _ suffix because delete is a reserved word.
export const delete_ = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.body;
  const { uid } = req.decodedToken;

  try {
    // Get team to see if it exists, and to return it in the response.
    const teamDoc = await getTeam(id);
    const team = teamDoc.data();

    // Delete the team 💀
    await deleteTeam(id);
    res.status(200).send(wrapJsonResponse(team));

    // If clause is here because TS thinks it could be undefined 🤔
    if (team) {
      // Update the user object teams.
      updateUser(uid, {
        teams: admin.firestore.FieldValue.arrayRemove({
          displayName: team.displayName,
          id,
          name: team.name,
        }),
      });
    }
  } catch (error) {
    next({ message: error.message, status: error.status, type: DELETE_TEAM });
  }
};
