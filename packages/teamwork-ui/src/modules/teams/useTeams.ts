import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { TeamMember, Team } from '../../../functions/src/modules/teams/types';
import { AsyncAction } from '../../utils/asyncAction';
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeam,
  updateTeam,
  updateTeamMembers,
} from './actions/index';
import { TeamsState } from './reducer';

interface UseTeam extends TeamsState {
  createTeam(team: Team): Promise<AsyncAction<string>>;
  deleteTeam(body: { id: Team['id'] }): Promise<AsyncAction<string>>;
  getAllTeams(): Promise<AsyncAction<string>>;
  getTeam(id: string): Promise<AsyncAction<string>>;
  updateTeam(id: string, body: Partial<Team>): Promise<AsyncAction<string>>;
  updateTeamMembers(
    id: string,
    body: TeamMember[],
  ): Promise<AsyncAction<string>>;
}

export const useTeams = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.teams, []);
  const teamsState = useMappedState(mapState);

  const api: UseTeam = {
    ...teamsState,
    createTeam: team => dispatch(createTeam(team)),
    deleteTeam: body => dispatch(deleteTeam(body)),
    getAllTeams: () => dispatch(getAllTeams()),
    getTeam: id => dispatch(getTeam(id)),
    updateTeam: (id, body) => dispatch(updateTeam(id, body)),
    updateTeamMembers: (id, body) => dispatch(updateTeamMembers(id, body)),
  };

  return api;
};
