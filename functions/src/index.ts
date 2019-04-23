import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const serviceAccount = require('../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://teamwork-dev-74882.firebaseio.com',
});

export const db = admin.firestore();

const app = express();

const usersCollection = 'users';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const api = functions.https.onRequest(app);

app.post('/users', (req: Request, res: Response) => {
  db.collection(usersCollection)
    .doc(req.body.email)
    .set(req.body)
    .then(() => res.status(200).send({ success: true }))
    .catch(() => res.status(500).send({ error: true }));
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
