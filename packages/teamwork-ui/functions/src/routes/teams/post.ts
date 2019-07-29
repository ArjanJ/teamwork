import { NextFunction, Request, Response } from 'express';

export const post = (req: Request, res: Response, next: NextFunction) => {
  // const { body, decodedToken } = req;
  // const { uid } = decodedToken;
  console.log('X-Company:', req.get('X-Company'));

  res.status(200).send({ success: true });
};
