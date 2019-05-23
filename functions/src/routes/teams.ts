import { Request, Response, Router } from 'express';

import { admin, db } from '../config/firebase';

export const teamsRouter = Router();
const teamsCollection = db.collection('teams');
const usersCollection = db.collection('users');

teamsRouter.post('/teams', async (req: Request, res: Response) => {
  const { body, decodedToken } = req;

  if (decodedToken && decodedToken.uid) {
    try {
      const teamDocWithOwner = {
        ...body,
        owner: {
          email: decodedToken.email,
          uid: decodedToken.uid,
        },
      };
      const teamDoc = await teamsCollection.add(teamDocWithOwner);
      const teamWithId = {
        ...teamDocWithOwner,
        id: teamDoc.id,
      };

      res.status(200).send({ data: teamWithId });

      /**
       * Add the name and id of the team to the user object. This is so
       * we know all of the teams a user belongs to and can query
       * based on that.
       */
      usersCollection.doc(decodedToken.uid).update({
        teams: admin.firestore.FieldValue.arrayUnion({
          id: teamDoc.id,
          name: teamDocWithOwner.name,
        }),
      });
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

teamsRouter.delete('/teams', async (req: Request, res: Response) => {
  const { body, decodedToken } = req;
  const { id, name } = body;

  if (!decodedToken || !name) {
    throw new Error('Expected decodedToken to exist.');
  }

  try {
    await teamsCollection.doc(id).delete();
    res.status(200).send({ data: {} });

    await usersCollection.doc(decodedToken.uid).update({
      teams: admin.firestore.FieldValue.arrayRemove({
        id,
        name,
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});
