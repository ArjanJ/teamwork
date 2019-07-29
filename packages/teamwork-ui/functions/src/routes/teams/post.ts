import { NextFunction, Request, Response } from 'express';

export const post = (req: Request, res: Response, next: NextFunction) => {
  const { body, decodedToken } = req;
  const { company, uid } = decodedToken;
};
