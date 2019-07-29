import { Router } from 'express';

import { get } from './get';
import { getAll } from './getAll';
import { post } from './post';

export const teamsRouter = Router();

teamsRouter.get('/:id', get);
teamsRouter.get('/', getAll);
teamsRouter.post('/', post);
