import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useTeams } from '../../hooks/useTeams';
import { useUser } from '../../hooks/useUser';
import { IUserTeam } from '../user/types';

interface ITeamProps {
  teamName?: string;
}

export const Team: FunctionComponent<RouteComponentProps & ITeamProps> = ({
  teamName,
}) => {
  const { deleteTeam } = useTeams();
  const { user } = useUser();

  const getUserTeam = () => {
    if (user && user.teams) {
      return user.teams.find((team: IUserTeam) => team.name === teamName);
    }
    return null;
  };

  const userTeam = getUserTeam();

  if (!userTeam || !teamName) {
    return null;
  }

  const { displayName, id, name } = userTeam;

  return (
    <Wrapper>
      <h1>{displayName}</h1>
      <button onClick={() => deleteTeam(userTeam)}>Delete team</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 48px 36px;
`;

export default Team;
