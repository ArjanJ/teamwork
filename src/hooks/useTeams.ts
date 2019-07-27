import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { TeamMember, Team } from '../../functions/src/modules/teams/types';
import { UserTeam } from '../../functions/src/modules/users/types';
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
  updateTeamMembers,
} from '../modules/teams/actions';

export const useTeams = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.teams, []);
  const teamsState = useMappedState(mapState);

  // Binding action creators to dispatch.
  const create = (team: Team) => dispatch(createTeam(team));
  const remove = (team: UserTeam) => dispatch(deleteTeam(team));
  const get = (teamId: string) => dispatch(getTeam(teamId));
  const getAll = () => dispatch(getTeams());
  const update = (teamId: string, body = {}) =>
    dispatch(updateTeam(teamId, body));
  const updateMembers = (teamId: string, body: TeamMember[]) =>
    dispatch(updateTeamMembers(teamId, body));

  return {
    createTeam: create,
    deleteTeam: remove,
    getTeam: get,
    getTeams: getAll,
    isCreating: teamsState.isCreating,
    isFetching: teamsState.isFetching,
    isUpdating: teamsState.isUpdating,
    updateTeam: update,
    updateTeamMembers: updateMembers,
    teams: teamsState.teams,
  };
};
