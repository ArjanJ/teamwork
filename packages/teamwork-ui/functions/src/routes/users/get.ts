import { NextFunction, Request, Response } from 'express';

import { GET_USER, getUser } from '../../modules/users/models';
import { wrapJsonResponse } from '../../utils/wrapJsonResponse';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;

  try {
    const userDoc = await getUser(params.uid);

    if (!userDoc.exists) {
      return next({
        message: `User with uid: ${params.uid} not found.`,
        status: 404,
        type: GET_USER,
      });
    }

    res.status(200).send(wrapJsonResponse(userDoc.data()));
  } catch (error) {
    next({ message: error.message, type: GET_USER });
  }
};
