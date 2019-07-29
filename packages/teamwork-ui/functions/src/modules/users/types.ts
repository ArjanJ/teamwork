export interface User {
  companies: UserCompany[];
  firstName: string;
  id: string;
  lastName: string;
  role: string;
  teams: UserTeam[];
}

//firebaseAdmin.firestore.FieldValue
export interface UserTeam {
  displayName: string;
  id: string;
  name: string;
}

export interface UserCompany {
  id: string;
  name: string;
}
