import firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';
import {
  firebase as firebaseConfig,
  firebaseServiceAccount as serviceAccountConfig,
} from 'teamwork-config';
import { FirebaseConfig } from 'teamwork-config/lib/firebase';

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;

if (!GOOGLE_CLOUD_PROJECT) {
  throw new Error(
    'GOOGLE_CLOUD_PROJECT env variable not defined, cannot configure Firebase.',
  );
}

const getConfigkey = (projectId: string) =>
  Object.keys(firebaseConfig).find(
    key => firebaseConfig[key].projectId === projectId,
  );
const configKey = getConfigkey(GOOGLE_CLOUD_PROJECT);

if (!configKey) {
  throw new Error('Firebase client config missing.');
}

const getServiceAccount = (env: string) => serviceAccountConfig[env];
const getClientConfig = (env: string) => firebaseConfig[env];
const getAdminConfig = (cert: object, config: FirebaseConfig) => ({
  credential: firebaseAdmin.credential.cert(cert),
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
});

const clientConfig = getClientConfig(configKey);
const serviceAccount = getServiceAccount(configKey);
const adminConfig = getAdminConfig(serviceAccount, clientConfig);

firebaseAdmin.initializeApp(adminConfig);

if (!firebase.apps.length && clientConfig.projectId) {
  firebase.initializeApp(clientConfig);
}

export const admin = firebaseAdmin;
export const auth = firebase.auth();
export const db = firebaseAdmin.firestore();
