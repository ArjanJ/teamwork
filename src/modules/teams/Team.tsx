import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { useTeams } from '../../hooks/useTeams';
import { useUser } from '../../hooks/useUser';
import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';
import { IUserTeam } from '../user/types';
import { IMember } from './types';

interface ITeamProps {
  teamName?: string;
}

export const Team: FunctionComponent<RouteComponentProps & ITeamProps> = ({
  teamName,
}) => {
  const [userTeam, setUserTeam] = useState<IUserTeam | null>(null);
  const { deleteTeam, getTeam, teams } = useTeams();
  const { user } = useUser();

  useEffect(() => {
    if (user && user.teams) {
      const userTeamResult = user.teams.find(
        (team: IUserTeam) => team.name === teamName,
      );

      setUserTeam(userTeamResult);
      getTeam(userTeamResult.id);
    }
  }, [user]);

  if (!userTeam || !teamName) {
    return null;
  }

  const { displayName, id } = userTeam;

  return (
    <Wrapper>
      <Box as="header" mb="36px">
        <TeamName>{displayName}</TeamName>
      </Box>
      <Box>
        <Subheading>Your team</Subheading>
        {teams[id] &&
          teams[id].members.map((member: IMember) => (
            <div key={member.email}>{member.email}</div>
          ))}
      </Box>
      {/* <button onClick={() => deleteTeam(userTeam)}>Delete team</button> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px 36px;
`;

const TeamName = styled.h1`
  color: ${Color.ORANGE};
  font-size: 24px;
`;

const Subheading = styled.h2`
  color: white;
  font-size: 16px;
`;

export default Team;
