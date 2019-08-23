interface Config {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  locationId: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

export const config: { [index: string]: Config } = {
  'teamwork-dev-74882': {
    apiKey: 'AIzaSyBAyJhpoLjME6L-XpuDlgXynv5NVC711LU',
    authDomain: 'teamwork-dev-74882.firebaseapp.com',
    databaseURL: 'https://teamwork-dev-74882.firebaseio.com',
    locationId: 'us-central',
    messagingSenderId: '671854349708',
    projectId: 'teamwork-dev-74882',
    storageBucket: 'teamwork-dev-74882.appspot.com',
  },
  'teamwork-prod': {
    apiKey: 'AIzaSyDKHqFVQMj84FbHExF8_cJOK2WwrqwpjoU',
    authDomain: 'teamapp.work',
    databaseURL: 'https://teamwork-prod.firebaseio.com',
    locationId: 'us-central',
    messagingSenderId: '1080249859907',
    projectId: 'teamwork-prod',
    storageBucket: 'teamwork-prod.appspot.com',
  },
};
