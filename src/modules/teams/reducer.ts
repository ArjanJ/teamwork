import { Teams } from '../../../functions/src/modules/teams/types';
import {
  CREATE_TEAM,
  DELETE_TEAM,
  GET_ALL_TEAMS,
  GET_TEAM,
  UPDATE_TEAM,
} from './actions/index';
import { TeamsActions } from './actions';
import {
  createTeamReducer,
  deleteTeamReducer,
  getAllTeamsReducer,
  getTeamReducer,
  updateTeamReducer,
} from './reducers/index';

export interface TeamsState {
  isCreating: boolean;
  isDeleting: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  teams: Teams;
}

const initialState = {
  isCreating: false,
  isDeleting: false,
  isFetching: false,
  isUpdating: false,
  teams: {},
};

export default function(
  state: TeamsState = initialState,
  action: TeamsActions,
): TeamsState {
  if (action.type === CREATE_TEAM) {
    return createTeamReducer(state, action);
  }

  if (action.type === DELETE_TEAM) {
    return deleteTeamReducer(state, action);
  }

  if (action.type === GET_ALL_TEAMS) {
    return getAllTeamsReducer(state, action);
  }

  if (action.type === GET_TEAM) {
    return getTeamReducer(state, action);
  }

  if (action.type === UPDATE_TEAM) {
    return updateTeamReducer(state, action);
  }

  return state;
}
