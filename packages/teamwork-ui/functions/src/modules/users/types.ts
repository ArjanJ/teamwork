import * as firebaseAdmin from 'firebase-admin';

export interface User {
  companies: UserCompany[];
  firstName: string;
  id: string;
  lastName: string;
  role: string;
  teams: firebaseAdmin.firestore.FieldValue | UserTeam[];
}

export interface UserTeam {
  displayName: string;
  id: string;
  name: string;
}

export interface UserCompany {
  id: string;
  name: string;
}
