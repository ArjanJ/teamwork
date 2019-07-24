export interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  teams: IUserTeam[];
}

export interface IUserTeam {
  displayName: string;
  id: string;
  name: string;
}
