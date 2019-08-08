import firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';

const serviceAccount = require('../../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG || '');
adminConfig.credential = firebaseAdmin.credential.cert(serviceAccount);

firebaseAdmin.initializeApp(adminConfig);

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: getFirebaseApiKey(adminConfig.projectId),
    authDomain: `${adminConfig.projectId}.firebaseapp.com`,
    databaseURL: adminConfig.databaseURL,
    projectId: adminConfig.projectId,
    storageBucket: adminConfig.storageBucket,
  });
}

export const admin = firebaseAdmin;
export const auth = firebase.auth();
export const db = firebaseAdmin.firestore();

// Because apiKey doesn't exist on process.env.FIREBASE_CONFIG :(
function getFirebaseApiKey(projectId: string) {
  switch (projectId) {
    case 'teamwork-dev-74882':
      return 'AIzaSyBAyJhpoLjME6L-XpuDlgXynv5NVC711LU';
    default:
      return '';
  }
}
