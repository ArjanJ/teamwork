import {
  createTeamTypes,
  deleteTeamTypes,
  getTeamTypes,
  getTeamsTypes,
  IMember,
  ITeam,
  updateTeamTypes,
  updateTeamMembersTypes,
} from './types';

import { IUserTeam } from '../user/types';

export function createTeam(team: ITeam) {
  return {
    callAPI: (headers = {}) =>
      fetch('/api/teams', {
        body: JSON.stringify(team),
        headers,
        method: 'POST',
      }),
    payload: team,
    types: [
      createTeamTypes.REQUEST,
      createTeamTypes.SUCCESS,
      createTeamTypes.FAILURE,
    ],
  };
}

export function getTeam(teamId: string) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/teams/${teamId}`, {
        headers,
        method: 'GET',
      }),
    payload: teamId,
    types: [getTeamTypes.REQUEST, getTeamTypes.SUCCESS, getTeamTypes.FAILURE],
  };
}

export function getTeams() {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/teams`, {
        headers,
        method: 'GET',
      }),
    types: [
      getTeamsTypes.REQUEST,
      getTeamsTypes.SUCCESS,
      getTeamsTypes.FAILURE,
    ],
  };
}

export function updateTeam(teamId: string, body = {}) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/teams/${teamId}`, {
        body: JSON.stringify(body),
        headers,
        method: 'PUT',
      }),
    payload: { ...body, teamId },
    types: [
      updateTeamTypes.REQUEST,
      updateTeamTypes.SUCCESS,
      updateTeamTypes.FAILURE,
    ],
  };
}

export function deleteTeam(body: IUserTeam) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/teams`, {
        body: JSON.stringify(body),
        headers,
        method: 'DELETE',
      }),
    payload: body,
    types: [
      deleteTeamTypes.REQUEST,
      deleteTeamTypes.SUCCESS,
      deleteTeamTypes.FAILURE,
    ],
  };
}

export function updateTeamMembers(teamId: string, body: IMember[]) {
  return {
    callAPI: (headers = {}) =>
      fetch(`/api/teams/${teamId}/members`, {
        body: JSON.stringify(body),
        headers,
        method: 'PUT',
      }),
    payload: body,
    types: [
      updateTeamMembersTypes.REQUEST,
      updateTeamMembersTypes.SUCCESS,
      updateTeamMembersTypes.FAILURE,
    ],
  };
}
