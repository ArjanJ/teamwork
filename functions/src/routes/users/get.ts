import { NextFunction, Request, Response } from 'express';

import { GET_USER } from '../../../../src/modules/user/actions/index';
import { getUser } from '../../modules/users/models';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  console.log('get func');
  const { params } = req;

  try {
    const doc = await getUser(params.uid);

    if (!doc.exists) {
      return next({
        message: `User with uid: ${params.uid} not found.`,
        status: 404,
        type: GET_USER,
      });
    }

    res.status(200).send({ data: doc.data() });
  } catch (error) {
    next({ message: error.message, type: GET_USER });
  }
};
