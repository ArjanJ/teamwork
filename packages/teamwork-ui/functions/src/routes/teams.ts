import { Request, Response, Router } from 'express';

import { admin, db } from '../config/firebase';

export const teamsRouter = Router();
const teamsCollection = db.collection('teams');
const usersCollection = db.collection('users');

/**
 * CREATE TEAM
 */
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
          displayName: teamDocWithOwner.displayName,
          id: teamDoc.id,
          name: teamDocWithOwner.name,
        }),
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
});

/**
 * GET TEAM
 */
teamsRouter.get('/teams/:teamId', async (req: Request, res: Response) => {
  const { params } = req;
  const { teamId } = params;

  try {
    const doc = await teamsCollection.doc(teamId).get();

    if (!doc.exists) {
      res.status(200).send({ data: {} });
    } else {
      res.status(200).send({ data: { ...doc.data(), id: teamId } });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

/**
 * UPDATE TEAM
 */
teamsRouter.put('/teams/:teamId', async (req: Request, res: Response) => {
  const { body, params } = req;
  const { teamId } = params;

  try {
    const doc = teamsCollection.doc(teamId);
    await doc.update(body);
    res.status(200).send({ data: body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

/**
 * UPDATE TEAM MEMBERS
 */
teamsRouter.put(
  '/teams/:teamId/members',
  async (req: Request, res: Response) => {
    const { body, params } = req;
    const { teamId } = params;

    try {
      const doc = teamsCollection.doc(teamId);
      await doc.update({
        members: body,
      });
      res.status(200).send({ data: { members: body, id: teamId } });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
);

/**
 * DELETE TEAM
 */
teamsRouter.delete('/teams', async (req: Request, res: Response) => {
  const { body, decodedToken } = req;
  const { displayName, id, name } = body;

  if (!id || !decodedToken) {
    throw new Error('Expected team id in body.');
  }

  /**
   * First we get the Team doc to see if the user is the owner.
   * Only owners can delete the Team.
   */
  try {
    const doc = await teamsCollection.doc(id).get();

    if (!doc.exists) {
      return res.status(200).send({
        error: {
          message: 'No team exists.',
        },
      });
    } else {
      const teamDocData = doc.data();

      if (teamDocData && teamDocData.owner.uid !== decodedToken.uid) {
        return res.status(200).send({
          error: {
            message: 'Must be owner to delete team.',
          },
        });
      }
    }

    await teamsCollection.doc(id).delete();
    res.status(200).send({ data: {} });

    await usersCollection.doc(decodedToken.uid).update({
      teams: admin.firestore.FieldValue.arrayRemove({
        displayName,
        id,
        name,
      }),
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});
