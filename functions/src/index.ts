import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

export const db = admin.firestore();

const app = express();
const main = express();

const usersCollection = 'users';

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

export const webApi = functions.https.onRequest(main);

// Add new contact
app.post('/users', (req, res) => {
  firebaseHelper.firestore.createNewDocument(db, usersCollection, req.body);
  res.send('Create a new user');
});
