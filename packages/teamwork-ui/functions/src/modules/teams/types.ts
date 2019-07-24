export interface IMember {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ITeam {
  displayName: string;
  id: string;
  members: IMember[];
  name: string;
}
