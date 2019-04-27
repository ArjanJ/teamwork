import { Request, Response, Router } from 'express';

import { db } from '../config/firebase';

export const userRouter = Router();
const usersCollection = 'users';

userRouter.post('/users', (req: Request, res: Response) => {
  const { decodedToken } = req;

  if (decodedToken) {
    db.collection(usersCollection)
      .doc(decodedToken.email)
      .set(req.body)
      .then(() => res.status(200).send(req.body))
      .catch(() => res.status(500).send({ error: true }));
  }
});

userRouter.get('/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  db.collection(usersCollection)
    .doc(userId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.status(200).send({ data: null });
      } else {
        res.status(200).send(doc.data());
      }
    })
    .catch(err => res.status(500).send({ error: true }));
});
