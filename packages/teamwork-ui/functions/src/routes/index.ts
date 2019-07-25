import { Router } from 'express';

import { verifyIdToken } from '../middleware/verifyIdToken';
import { usersRouter } from './users/';

export const routes = Router();
routes.use('/users', verifyIdToken, usersRouter);
