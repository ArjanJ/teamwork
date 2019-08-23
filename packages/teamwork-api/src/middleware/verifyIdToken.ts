import { NextFunction, Request, Response } from 'express';

import { admin } from '../config/firebase';
import { extractBearerToken } from '../utils/extractBearerToken';

const UNAUTHORIZED = 'UNAUTHORIZED';

// idToken comes from the client app, passed in as Authorization header.
export const verifyIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractBearerToken(req.headers);

    if (!token) {
      throw new Error('You must be authorized to access this data.');
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.decodedToken = decodedToken;

    next();
  } catch (error) {
    next({ message: error.message, status: 401, type: UNAUTHORIZED });
  }
};
