export interface User {
  companies: UserCompany[];
  firstName: string;
  lastName: string;
  role: string;
  teams: UserTeam[];
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