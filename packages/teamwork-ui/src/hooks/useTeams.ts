import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import {
  createTeam,
  deleteTeam,
  getTeam,
  updateTeam,
  updateTeamMembers,
} from '../modules/teams/actions';
import { IMember, ITeam } from '../modules/teams/types';
import { IUserTeam } from '../modules/user/types';

export const useTeams = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.teams, []);
  const teamsState = useMappedState(mapState);

  const create = (team: ITeam) => dispatch(createTeam(team));
  const remove = (team: IUserTeam) => dispatch(deleteTeam(team));
  const get = (teamId: string) => dispatch(getTeam(teamId));
  const update = (teamId: string, body = {}) =>
    dispatch(updateTeam(teamId, body));
  const updateMembers = (teamId: string, body: IMember[]) =>
    dispatch(updateTeamMembers(teamId, body));

  return {
    createTeam: create,
    deleteTeam: remove,
    getTeam: get,
    isCreating: teamsState.isCreating,
    isFetching: teamsState.isFetching,
    isUpdating: teamsState.isUpdating,
    updateTeam: update,
    updateTeamMembers: updateMembers,
    teams: teamsState.teams,
  };
};
