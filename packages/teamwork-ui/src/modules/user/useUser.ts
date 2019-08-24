import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { User, UserTeam } from 'teamwork-types';

import { AsyncAction } from '../../utils/asyncAction';
import { createUser, getUser, updateUser } from './actions/index';
import { UserState } from './reducer';

interface UseUser extends UserState {
  createUser(user: User): Promise<AsyncAction<string>>;
  getUser(uid: string): Promise<AsyncAction<string>>;
  selectTeamFromName(name: string): UserTeam;
  updateUser(uid: string, body: Partial<User>): Promise<AsyncAction<string>>;
}

export const useUser = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.user, []);
  const userState = useMappedState(mapState);

  const selectTeamFromName = (name: string) =>
    userState.user.teams.find((team: UserTeam) => team.name === name);

  const api: UseUser = {
    ...userState,
    createUser: user => dispatch(createUser(user)),
    getUser: uid => dispatch(getUser(uid)),
    selectTeamFromName,
    updateUser: (uid, body) => dispatch(updateUser(uid, body)),
  };

  return api;
};
