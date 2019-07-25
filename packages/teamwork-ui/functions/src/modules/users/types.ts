export interface User {
  company: UserCompany;
  firstName: string;
  lastName: string;
  role: string;
  teams: UserTeam[];
  uid: string;
}

export interface UserTeam {
  displayName: string;
  id: string;
  name: string;
}

export interface UserCompany {
  name: string;
}
