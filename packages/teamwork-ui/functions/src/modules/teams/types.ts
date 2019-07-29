import { Company } from '../companies/types';

export interface Teams {
  [id: string]: Team;
}

export interface Team {
  company: Company;
  displayName: string;
  members: TeamMember[];
  name: string;
}

export interface TeamMember {
  email: string;
  firstName: string;
  lastName: string;
}
