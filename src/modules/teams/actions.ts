import {
  CreateTeamAction,
  DeleteTeamAction,
  GetAllTeamsAction,
  GetTeamAction,
  UpdateTeamAction,
  UpdateTeamMembersAction,
} from './actions/index';

export type TeamsActions =
  | CreateTeamAction
  | DeleteTeamAction
  | GetAllTeamsAction
  | GetTeamAction
  | UpdateTeamAction
  | UpdateTeamMembersAction;
