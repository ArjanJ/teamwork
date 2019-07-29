import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { TeamMember, Team } from '../../../functions/src/modules/teams/types';
import { UserTeam } from '../../../functions/src/modules/users/types';
import { AsyncAction } from '../../utils/asyncAction';
import {
  createTeam,
  deleteTeam,
  getTeam,
  getAllTeams,
  updateTeam,
  updateTeamMembers,
} from './actions/index';
import { TeamsState } from './reducer';

interface UseTeam extends TeamsState {
  createTeam(team: Team): Promise<AsyncAction<string>>;
  deleteTeam(userTeam: UserTeam): Promise<AsyncAction<string>>;
  getTeam(id: string): Promise<AsyncAction<string>>;
  getAllTeams(): Promise<AsyncAction<string>>;
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
    deleteTeam: team => dispatch(deleteTeam(team)),
    getTeam: id => dispatch(getTeam(id)),
    getAllTeams: () => dispatch(getAllTeams()),
    updateTeam: (id, body) => dispatch(updateTeam(id, body)),
    updateTeamMembers: (id, body) => dispatch(updateTeamMembers(id, body)),
  };

  return api;
};
