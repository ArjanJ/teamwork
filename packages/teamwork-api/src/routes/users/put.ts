import { NextFunction, Request, Response } from 'express';

import { getUser, UPDATE_USER, updateUser } from '../../modules/users/models';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const put = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req;

  try {
    await updateUser(params.uid, body);
    const updatedDoc = await getUser(params.uid);
    const userDoc = updatedDoc.data();

    res.status(200).send(wrapJsonResponse(userDoc));
  } catch (error) {
    next({ message: error.message, type: UPDATE_USER });
  }
};
