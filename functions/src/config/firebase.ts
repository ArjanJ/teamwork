import firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';

const serviceAccount = require('../../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG || '');
adminConfig.credential = firebaseAdmin.credential.cert(serviceAccount);

firebaseAdmin.initializeApp(adminConfig);

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBAyJhpoLjME6L-XpuDlgXynv5NVC711LU',
    authDomain: 'teamwork-dev-74882.firebaseapp.com',
    databaseURL: 'https://teamwork-dev-74882.firebaseio.com',
    messagingSenderId: '671854349708',
    projectId: 'teamwork-dev-74882',
    storageBucket: 'teamwork-dev-74882.appspot.com',
  });
}

export const admin = firebaseAdmin;
export const auth = firebase.auth();
export const db = firebaseAdmin.firestore();
