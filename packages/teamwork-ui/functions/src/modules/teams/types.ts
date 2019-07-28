export interface TeamMember {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Team {
  displayName: string;
  id: string;
  members: TeamMember[];
  name: string;
}

export interface Teams {
  [id: string]: Team;
}
