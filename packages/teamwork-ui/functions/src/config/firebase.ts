import firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';

import * as config from './firebase-config';

const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG || '');
const adminConfig = FIREBASE_CONFIG;

firebaseAdmin.initializeApp(adminConfig);

const projectConfig: { [index: string]: any } = {
  'teamwork-dev-74882': {
    config: config.dev,
    serviceAccount: require('../../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json'),
  },
  'teamwork-prod': {
    config: config.prod,
    serviceAccount: require('../../keys/teamwork-prod-firebase-adminsdk-abp4h-2e776c2741.json'),
  },
};

if (!firebase.apps.length && adminConfig.projectId) {
  firebase.initializeApp(projectConfig[adminConfig.projectId].config);
}

adminConfig.credential = firebaseAdmin.credential.cert(
  projectConfig[adminConfig.projectId].serviceAccount,
);

export const admin = firebaseAdmin;
export const auth = firebase.auth();
export const db = firebaseAdmin.firestore();
