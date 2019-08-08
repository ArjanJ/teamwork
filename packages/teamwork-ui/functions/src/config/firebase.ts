import firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';

const serviceAccount = require('../../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG || '');
adminConfig.credential = firebaseAdmin.credential.cert(serviceAccount);

firebaseAdmin.initializeApp(adminConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(functions.config());
}

export const admin = firebaseAdmin;
export const auth = firebase.auth();
export const db = firebaseAdmin.firestore();
