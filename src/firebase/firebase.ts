import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBAyJhpoLjME6L-XpuDlgXynv5NVC711LU',
  authDomain: 'teamwork-dev-74882.firebaseapp.com',
  databaseURL: 'https://teamwork-dev-74882.firebaseio.com',
  projectId: 'teamwork-dev-74882',
  storageBucket: 'teamwork-dev-74882.appspot.com',
  messagingSenderId: '671854349708',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
