import { Teams } from 'teamwork-types';

import { TeamsActions } from './actions';
import {
  CREATE_TEAM,
  DELETE_TEAM,
  GET_ALL_TEAMS,
  GET_TEAM,
  UPDATE_TEAM,
} from './actions/index';
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
  switch (action.type) {
    case CREATE_TEAM:
      return createTeamReducer(state, action);
    case DELETE_TEAM:
      return deleteTeamReducer(state, action);
    case GET_ALL_TEAMS:
      return getAllTeamsReducer(state, action);
    case GET_TEAM:
      return getTeamReducer(state, action);
    case UPDATE_TEAM:
      return updateTeamReducer(state, action);
    default:
      return state;
  }
}
