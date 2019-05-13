import { createTeamTypes, getTeamTypes, ITeam, updateTeamTypes } from './types';

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
      fetch(`/api/team/${teamId}`, {
        headers,
        method: 'GET',
      }),
    payload: teamId,
    types: [getTeamTypes.REQUEST, getTeamTypes.SUCCESS, getTeamTypes.FAILURE],
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
