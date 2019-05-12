import { Request, Response, Router } from 'express';

import { db } from '../config/firebase';

export const teamsRouter = Router();
const teamsCollection = db.collection('teams');

teamsRouter.post('/teams', async (req: Request, res: Response) => {
  const { decodedToken } = req;
});
