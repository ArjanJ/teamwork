import { Router } from 'express';

import { delete_ } from './delete';
import { get } from './get';
import { getAll } from './getAll';
import { post } from './post';
import { put } from './put';

export const teamsRouter = Router();

// Delete single team
teamsRouter.delete('/', delete_);

// Get single team
teamsRouter.get('/:id', get);

// Get all teams
teamsRouter.get('/', getAll);

// Create single team
teamsRouter.post('/', post);

// Update single team
teamsRouter.put('/:id', put);
