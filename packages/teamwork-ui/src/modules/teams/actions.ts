import { Team, TeamMember } from '../../../functions/src/modules/teams/types';
import { UserTeam } from '../../../functions/src/modules/users/types';
import {
  createTeamTypes,
  deleteTeamTypes,
  getTeamTypes,
  getTeamsTypes,
  updateTeamTypes,
  updateTeamMembersTypes,
} from './types';

export function createTeam(team: Team) {
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

export function deleteTeam(body: UserTeam) {
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

export function updateTeamMembers(teamId: string, body: TeamMember[]) {
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
