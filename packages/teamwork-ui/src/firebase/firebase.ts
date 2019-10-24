import firebase from 'firebase/app';
import 'firebase/auth';
import { firebase as firebaseConfig } from 'teamwork-config';

if (!firebase.apps.length) {
  if (process.env.REACT_APP_ENV === 'dev') {
    firebase.initializeApp(firebaseConfig.dev);
  }

  if (process.env.REACT_APP_ENV === 'prod') {
    firebase.initializeApp(firebaseConfig.prod);
  }
}

export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
