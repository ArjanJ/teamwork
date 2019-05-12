import { Request, Response, Router } from 'express';

import { db } from '../config/firebase';

export const teamsRouter = Router();
const teamsCollection = db.collection('teams');

teamsRouter.post('/teams', async (req: Request, res: Response) => {
  const { body, decodedToken } = req;

  if (decodedToken) {
    try {
      await teamsCollection.doc().set(body);
      res.status(200).send({ data: body });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
});

teamsRouter.get('/teams/:teamId', async (req: Request, res: Response) => {
  const { params } = req;
  const { teamId } = params;

  try {
    const doc = await teamsCollection.doc(teamId).get();

    if (!doc.exists) {
      res.status(200).send({ data: {} });
    } else {
      res.status(200).send({ data: doc.data() });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

teamsRouter.put('/teams/:teamId', async (req: Request, res: Response) => {
  const { body, params } = req;
  const { teamId } = params;

  try {
    const doc = await teamsCollection.doc(teamId);
    await doc.update(body);
    res.status(200).send({ data: body });
  } catch (error) {
    res.status(500).send({ error });
  }
});
