import {
  CreateTeamAction,
  DeleteTeamAction,
  GetAllTeamsAction,
  GetTeamAction,
  UpdateTeamAction,
} from './actions/index';

export type TeamsActions =
  | CreateTeamAction
  | DeleteTeamAction
  | GetAllTeamsAction
  | GetTeamAction
  | UpdateTeamAction;
