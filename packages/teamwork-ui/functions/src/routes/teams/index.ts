import { Router } from 'express';

import { post } from './post';

export const teamsRouter = Router();

teamsRouter.post('/', post);
