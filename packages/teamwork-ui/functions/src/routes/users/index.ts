import { Router } from 'express';

import { post } from './post';

export const usersRouter = Router();

usersRouter.post('/', post);
