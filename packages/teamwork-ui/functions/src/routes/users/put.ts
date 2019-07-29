import { NextFunction, Request, Response } from 'express';

import { getUser, UPDATE_USER, updateUser } from '../../modules/users/models';

export const put = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req;

  try {
    await updateUser(params.uid, body);
    const updatedDoc = await getUser(params.uid);

    res.status(200).send({ data: updatedDoc.data() });
  } catch (error) {
    next({ message: error.message, type: UPDATE_USER });
  }
};
