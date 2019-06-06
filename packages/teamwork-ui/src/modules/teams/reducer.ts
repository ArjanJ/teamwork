import { AnyAction } from 'redux';

import {
  createTeamTypes,
  getTeamTypes,
  getTeamsTypes,
  updateTeamTypes,
  updateTeamMembersTypes,
} from './types';
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

// TODO: Handle delete team
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
    case getTeamsTypes.REQUEST:
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
    case getTeamsTypes.SUCCESS:
      return {
        ...state,
        isFetching: false,
        teams: action.data,
      };
    case getTeamTypes.FAILURE:
    case getTeamsTypes.FAILURE:
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
    case updateTeamMembersTypes.REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case updateTeamMembersTypes.SUCCESS:
      return {
        ...state,
        isUpdating: false,
        teams: {
          ...state.teams,
          [action.data.id]: {
            ...state.teams[action.data.id],
            members: action.data.members,
          },
        },
      };
    case updateTeamMembersTypes.FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      };
    default:
      return state;
  }
}
