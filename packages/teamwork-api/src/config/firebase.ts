import firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';

import { config } from './firebase-config';

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;

if (!GOOGLE_CLOUD_PROJECT) {
  throw new Error(
    'GOOGLE_CLOUD_PROJECT env variable not defined, cannot configure Firebase.',
  );
}

const getServiceAccount = (project: string) => {
  switch (project) {
    case 'teamwork-dev-74882': {
      return require('../../keys/teamwork-dev-74882-firebase-adminsdk-zbdex-3cdaaf7b04.json');
    }
    case 'teamwork-prod': {
      return require('../../keys/teamwork-prod-firebase-adminsdk-abp4h-2e776c2741.json');
    }
    default:
      return null;
  }
};

const adminConfig = {
  credential: firebaseAdmin.credential.cert(
    getServiceAccount(GOOGLE_CLOUD_PROJECT),
  ),
  databaseURL: config[GOOGLE_CLOUD_PROJECT].databaseURL,
  projectId: config[GOOGLE_CLOUD_PROJECT].projectId,
  storageBucket: config[GOOGLE_CLOUD_PROJECT].storageBucket,
};

const clientConfig = config[GOOGLE_CLOUD_PROJECT];

firebaseAdmin.initializeApp(adminConfig);

if (!firebase.apps.length && adminConfig.projectId) {
  firebase.initializeApp(clientConfig);
}

export const admin = firebaseAdmin;
export const auth = firebase.auth();
export const db = firebaseAdmin.firestore();
