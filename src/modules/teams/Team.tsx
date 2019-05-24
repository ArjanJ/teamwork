import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
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
  const [userTeam, setUserTeam] = useState<IUserTeam | null>(null);
  const { deleteTeam } = useTeams();
  const { user } = useUser();

  useEffect(() => {
    if (user && user.teams) {
      const userTeamResult = user.teams.find(
        (team: IUserTeam) => team.name === teamName,
      );
      setUserTeam(userTeamResult);
    }
  }, [user]);

  if (!userTeam || !teamName) {
    return null;
  }

  const { displayName } = userTeam;

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
