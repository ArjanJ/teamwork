import { Router } from 'express';

import { get } from './get';
import { post } from './post';
import { put } from './put';

export const usersRouter = Router();

usersRouter.get('/:uid', get);
usersRouter.post('/', post);
usersRouter.put('/:uid', put);
