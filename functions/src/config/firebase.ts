import * as firebaseAdmin from 'firebase-admin';

const serviceAccount = require('../../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://teamwork-dev-74882.firebaseio.com',
});

export const admin = firebaseAdmin;
export const db = firebaseAdmin.firestore();
