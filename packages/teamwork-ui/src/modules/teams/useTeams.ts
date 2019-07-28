import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { TeamMember, Team } from '../../../functions/src/modules/teams/types';
import { UserTeam } from '../../../functions/src/modules/users/types';
import { ApiResponse } from '../../utils/apiClient';
import {
  createTeam,
  deleteTeam,
  getTeam,
  getAllTeams,
  updateTeam,
  updateTeamMembers,
} from './actions/index';
import { TeamState } from './reducer';

interface UseTeam extends TeamState {
  createTeam(team: Team): Promise<ApiResponse>;
  deleteTeam(userTeam: UserTeam): Promise<ApiResponse>;
  getTeam(id: string): Promise<ApiResponse>;
  getAllTeams(): Promise<ApiResponse>;
  updateTeam(id: string, body: Partial<Team>): Promise<ApiResponse>;
  updateTeamMembers(id: string, body: TeamMember[]): Promise<ApiResponse>;
}

export const useTeams = (): UseTeam => {
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
