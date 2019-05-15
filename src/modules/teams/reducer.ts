import { AnyAction } from 'redux';

import { createTeamTypes, getTeamTypes, updateTeamTypes } from './types';
import { ITeam } from './types';

interface ITeamState {
  isCreating: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  teams: ITeam[];
}

const initialState: ITeamState = {
  isCreating: false,
  isFetching: false,
  isUpdating: false,
  teams: [],
};

export default function(state = initialState, action: AnyAction) {
  switch (action.type) {
    case createTeamTypes.REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case createTeamTypes.SUCCESS:
      return {
        ...state,
        isCreating: false,
        teams: [...state.teams, action.data],
      };
    case createTeamTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        isCreating: false,
      };
    case getTeamTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
        teams: [...state.teams, action.data],
      };
    case getTeamTypes.SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case getTeamTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case updateTeamTypes.REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case updateTeamTypes.SUCCESS:
      return {
        ...state,
        isUpdating: false,
        teams: state.teams.map((team: ITeam) => {
          if (team.id === action.data.id) {
            return action.data;
          }
          return team;
        }),
      };
    case updateTeamTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        isUpdating: false,
      };
    default:
      return state;
  }
}
