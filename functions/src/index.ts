import functions from 'firebase-functions';
import admin from 'firebase-admin';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

export const db = admin.firestore();

const app = express();
const main = express();

const usersCollection = 'users';

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

export const webApi = functions.https.onRequest(main);

app.post('/users', (req: Request, res: Response) => {
  db.collection(usersCollection)
    .doc(req.body.email)
    .set(req.body)
    .then(() => res.status(200).send({ success: true }))
    .catch(() => res.status(500).send({ error: true }));
});
