import { Router } from 'express';

import { verifyIdToken } from '../middleware/verifyIdToken';
import { teamsRouter } from './teams';
import { usersRouter } from './users';

export const routes = Router();

routes.use('/api/teams', verifyIdToken, teamsRouter);
routes.use('/api/users', verifyIdToken, usersRouter);
