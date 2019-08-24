export interface Company {
  id: string;
  name: string;
  owner: CompanyOwner;
}

interface CompanyOwner {
  firstName: string;
  email: string;
  lastName: string;
}

export interface Teams {
  [id: string]: Team;
}

export interface Team {
  company: Company;
  displayName: string;
  id: string;
  members: TeamMember[];
  name: string;
}

export interface TeamMember {
  email: string;
  firstName: string;
  lastName: string;
}

export interface User {
  companies: UserCompany[];
  email: string;
  firstName: string;
  id: string;
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

export interface ApiError {
  message: string;
  status: number;
  type: string;
}

export interface ApiSuccess<T> {
  data: T;
}
