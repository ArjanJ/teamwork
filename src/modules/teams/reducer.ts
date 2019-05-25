import { AnyAction } from 'redux';

import { createTeamTypes, getTeamTypes, updateTeamTypes } from './types';
import { ITeam } from './types';

interface ITeamState {
  isCreating: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  teams: {
    [id: string]: ITeam;
  };
}

const initialState: ITeamState = {
  isCreating: false,
  isFetching: false,
  isUpdating: false,
  teams: {},
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
        teams: {
          ...state.teams,
          [action.data.id]: action.data,
        },
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
      };
    case getTeamTypes.SUCCESS:
      return {
        ...state,
        isFetching: false,
        teams: {
          ...state.teams,
          [action.data.id]: action.data,
        },
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
        teams: {
          ...state.teams,
          [action.data.id]: action.data,
        },
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
