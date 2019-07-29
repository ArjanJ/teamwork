import { Router } from 'express';

import { get } from './get';
import { post } from './post';

export const teamsRouter = Router();

teamsRouter.get('/:id', get);
teamsRouter.post('/', post);
