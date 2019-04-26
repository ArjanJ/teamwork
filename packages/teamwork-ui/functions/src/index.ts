import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { verifyIdToken } from './middleware/verifyIdToken';
import { db } from './config/firebase';

const app = express();

const usersCollection = 'users';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(verifyIdToken);

export const api = functions.https.onRequest(app);

app.post('/users', (req: Request, res: Response) => {
  const { decodedToken } = req;

  if (decodedToken) {
    db.collection(usersCollection)
      .doc(decodedToken.email)
      .set(req.body)
      .then(() => res.status(200).send(req.body))
      .catch(() => res.status(500).send({ error: true }));
  }
});

app.get('/users/:userId', (req: Request, res: Response) => {
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
