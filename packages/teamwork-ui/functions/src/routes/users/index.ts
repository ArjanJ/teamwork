import { Router } from 'express';

import { get } from './get';
import { post } from './post';

export const usersRouter = Router();

usersRouter.get('/:uid', get);
usersRouter.post('/', post);
