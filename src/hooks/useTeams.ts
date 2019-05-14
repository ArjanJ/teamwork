import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { createTeam, getTeam, updateTeam } from '../modules/teams/actions';
import { ITeam } from '../modules/teams/types';

export const useTeams = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.teams, []);
  const teamsState = useMappedState(mapState);

  const create = (team: ITeam) => dispatch(createTeam(team));
  const get = (teamId: string) => dispatch(getTeam(teamId));
  const update = (teamId: string, body = {}) =>
    dispatch(updateTeam(teamId, body));

  return {
    createUser: create,
    getUser: get,
    isCreating: teamsState.isCreating,
    isFetching: teamsState.isFetching,
    isUpdating: teamsState.isUpdating,
    updateUser: update,
    user: teamsState.user,
  };
};
