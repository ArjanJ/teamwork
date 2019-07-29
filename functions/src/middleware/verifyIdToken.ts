import { NextFunction, Request, Response } from 'express';

import { admin } from '../config/firebase';
import { extractBearerToken } from '../utils/extractBearerToken';

const UNAUTHORIZED_ERROR = (message = 'Login required') => ({
  error: {
    code: 401,
    message,
    type: 'UNAUTHORIZED',
  },
});

// idToken comes from the client app, passed in as Authorization header.
export const verifyIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = extractBearerToken(req.headers);

  if (!token) {
    res
      .status(401)
      .send(UNAUTHORIZED_ERROR())
      .end();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    res
      .status(401)
      .send(UNAUTHORIZED_ERROR(error.message))
      .end();
  }
};
