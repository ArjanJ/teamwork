import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
  if (process.env.REACT_APP_STAGE === 'dev') {
    firebase.initializeApp({
      apiKey: 'AIzaSyBAyJhpoLjME6L-XpuDlgXynv5NVC711LU',
      authDomain: 'teamwork-dev-74882.firebaseapp.com',
      databaseURL: 'https://teamwork-dev-74882.firebaseio.com',
      locationId: 'us-central',
      messagingSenderId: '671854349708',
      projectId: 'teamwork-dev-74882',
      storageBucket: 'teamwork-dev-74882.appspot.com',
    });
  }

  if (process.env.REACT_APP_STAGE === 'prod') {
    firebase.initializeApp({
      apiKey: 'AIzaSyDKHqFVQMj84FbHExF8_cJOK2WwrqwpjoU',
      authDomain: 'teamapp.work',
      databaseURL: 'https://teamwork-prod.firebaseio.com',
      locationId: 'us-central',
      messagingSenderId: '1080249859907',
      projectId: 'teamwork-prod',
      storageBucket: 'teamwork-prod.appspot.com',
    });
  }
}

export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
