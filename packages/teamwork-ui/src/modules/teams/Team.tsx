import { RouteComponentProps } from '@reach/router';
import { rgba } from 'polished';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';
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
      <Box as="header" mb="24px">
        <TeamName>{displayName}</TeamName>
      </Box>
      <Box>
        <Subheading>Your team</Subheading>
        <TeamMembersList>
          {teams[id] &&
            teams[id].members.map((member: IMember) => (
              <TeamMembersListItem key={member.email}>
                <Flex>
                  <TeamMembersInitials>
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </TeamMembersInitials>
                  <Box ml="12px">
                    <TeamMembersName>
                      {member.firstName} {member.lastName}
                    </TeamMembersName>
                    <TeamMembersEmail>{member.email}</TeamMembersEmail>
                  </Box>
                </Flex>
              </TeamMembersListItem>
            ))}
        </TeamMembersList>
      </Box>
      <button onClick={() => deleteTeam(userTeam)}>Delete team</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 24px 36px;
`;

const TeamName = styled.h1`
  color: ${Color.ORANGE};
  font-size: 30px;
`;

const Subheading = styled.h2`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
`;

const TeamMembersList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const TeamMembersListItem = styled.li`
  background: ${rgba('black', 0.15)};
  border-radius: 4px;
  margin-right: 16px;
  padding: 16px;
  width: calc(33.333% - 16px);

  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const TeamMembersName = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0;
`;

const TeamMembersEmail = styled.p`
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.75;
  text-transform: uppercase;
`;

const TeamMembersInitials = styled(Flex)`
  align-items: center;
  background: ${Color.ORANGE};
  border-radius: 50%;
  color: ${Color.BLUE_RAGE};
  font-size: 14px;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  width: 36px;
`;

export default Team;
