import { Request, Response, Router } from 'express';

import { admin, db } from '../config/firebase';

export const teamsRouter = Router();
const teamsCollection = db.collection('teams');
const usersCollection = db.collection('users');

interface IUserTeam {
  displayName: string;
  id: string;
  name: string;
}

interface IMember {
  email: string;
  firstName: string;
  lastName: string;
}

async function doesCurrentUserBelongToATeamWithTheSameName(
  team: string,
  email: string,
) {
  const query = await teamsCollection.where('name', '==', team).get();
  const docs = query.docs.map(d => d.data());
  const docsWithUser = docs.filter(d =>
    d.members.find((m: IMember) => m.email === email),
  );

  return docsWithUser.length > 0;
}

/**
 * CREATE TEAM
 */
teamsRouter.post('/teams', async (req: Request, res: Response) => {
  const { body, decodedToken } = req;
  const { email, uid } = decodedToken;

  try {
    const teamExists = await doesCurrentUserBelongToATeamWithTheSameName(
      body.name,
      email,
    );

    if (teamExists) {
      return res.status(400).send({ error: 'Team exists' });
    }

    // Add an owner property to the Team doc.
    const teamDocWithOwner = {
      ...body,
      owner: {
        email: email,
        uid: uid,
      },
    };
    const teamDoc = await teamsCollection.add(teamDocWithOwner);
    const teamWithId = {
      ...teamDocWithOwner,
      id: teamDoc.id,
    };

    // Return the newly created team doc with the unique id.
    res.status(200).send({ data: teamWithId });

    const { members } = body;
    const userTeam = {
      displayName: teamDocWithOwner.displayName,
      id: teamDoc.id,
      name: teamDocWithOwner.name,
    };

    // TODO: Invite system

    /**
     * Add the name and id of the team to the user object. This is so
     * we know all of the teams a user belongs to and can query
     * teams based on that.
     */
    usersCollection
      .doc(uid)
      .update({
        teams: admin.firestore.FieldValue.arrayUnion(userTeam),
      })
      .catch(err => console.log(err));
  } catch (error) {
    res.status(500).send({ error });
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
 * GET ALL TEAMS
 */
teamsRouter.get('/teams', async (req: Request, res: Response) => {
  const { decodedToken } = req;

  if (decodedToken) {
    try {
      const userDoc = await usersCollection.doc(decodedToken.uid).get();

      if (!userDoc.exists) {
        res.status(200).send({ data: [] });
      } else {
        const userData = userDoc.data();

        if (userData) {
          // Teams the user is on.
          const { teams } = userData;

          // If there are no teams then we shouldn't pursue anything further.
          if (teams.length === 0) {
            return res.status(200).send({ data: teams });
          }

          const teamDocRefs = teams.map((team: IUserTeam) =>
            db.doc(`teams/${team.id}`),
          );
          const teamDocs = await db.getAll(...teamDocRefs);

          const teamsResponseObj: { [id: string]: any } = {};

          // Return a keyed object of teams. (Each key is the team id).
          const teamsResponse = teamDocs.reduce((acc, curr) => {
            acc[curr.id] = curr.data();
            return acc;
          }, teamsResponseObj);

          res.status(200).send({ data: teamsResponse });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
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
