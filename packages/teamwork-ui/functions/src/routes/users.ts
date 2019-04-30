import { Request, Response, Router } from 'express';

import { db } from '../config/firebase';

export const userRouter = Router();
const usersCollection = db.collection('users');

userRouter.post('/users', async (req: Request, res: Response) => {
  const { decodedToken } = req;

  if (decodedToken) {
    try {
      await usersCollection.doc(decodedToken.uid).set(req.body);
      res.status(200).send({ data: req.body });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
});

userRouter.get('/users/:userId', async (req: Request, res: Response) => {
  const { decodedToken, params } = req;
  const { userId } = params;

  if (decodedToken && decodedToken.uid !== userId) {
    return res.sendStatus(401);
  }

  try {
    const doc = await usersCollection.doc(userId).get();

    if (!doc.exists) {
      res.status(200).send({ data: null });
    } else {
      res.status(200).send({ data: doc.data() });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

userRouter.put('/users/:userId', async (req: Request, res: Response) => {
  const { body, decodedToken, params } = req;
  const { userId } = params;

  if (decodedToken && decodedToken.uid !== userId) {
    return res.sendStatus(401);
  }

  try {
    const doc = await usersCollection.doc(userId);
    await doc.update(body);
    res.status(200).send({ data: body });
  } catch (error) {
    res.status(500).send({ error });
  }
});
