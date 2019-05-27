import { RouteComponentProps } from '@reach/router';
import { rgba } from 'polished';
import posed from 'react-pose';
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
  const [animateMembers, setAnimateMembers] = useState(false);
  const [userTeam, setUserTeam] = useState<IUserTeam>({
    displayName: '',
    id: '',
    name: '',
  });
  const { deleteTeam, getTeam, teams } = useTeams();
  const { user } = useUser();

  const { displayName, id } = userTeam;

  useEffect(() => {
    if (user && user.teams) {
      const userTeamResult = user.teams.find(
        (team: IUserTeam) => team.name === teamName,
      );

      setUserTeam(userTeamResult);
      getTeam(userTeamResult.id);
    }
  }, [user]);

  useEffect(() => {
    if (animateMembers === false && teams[id]) {
      setAnimateMembers(true);
    }
  }, [animateMembers, teams[id]]);

  if (!userTeam || !teamName) {
    return null;
  }

  return (
    <Wrapper>
      <Flex
        alignItems="center"
        as="header"
        justifyContent="space-between"
        mb="24px"
      >
        <TeamName>{displayName}</TeamName>
        <Box>
          <SettingsButton type="button">
            <SettingsIcon />
          </SettingsButton>
        </Box>
      </Flex>
      <Box>
        <Subheading>Your team</Subheading>
        <StyledTeamMembersList pose={animateMembers ? 'visible' : 'hidden'}>
          {teams[id] &&
            teams[id].members.map((member: IMember) => (
              <StyledTeamMembersListItem key={member.email}>
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
              </StyledTeamMembersListItem>
            ))}
        </StyledTeamMembersList>
      </Box>
      <button onClick={() => deleteTeam(userTeam)}>Delete team</button>
    </Wrapper>
  );
};

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        fill="#FFFFFF"
        d="M13.3,5.2l1.1-2.1l-1.4-1.4l-2.1,1.1c-0.3-0.2-0.7-0.3-1.1-0.4L9,0H7L6.2,2.3C5.9,2.4,5.5,2.5,5.2,2.7 L3.1,1.6L1.6,3.1l1.1,2.1C2.5,5.5,2.4,5.9,2.3,6.2L0,7v2l2.3,0.8c0.1,0.4,0.3,0.7,0.4,1.1l-1.1,2.1l1.4,1.4l2.1-1.1 c0.3,0.2,0.7,0.3,1.1,0.4L7,16h2l0.8-2.3c0.4-0.1,0.7-0.3,1.1-0.4l2.1,1.1l1.4-1.4l-1.1-2.1c0.2-0.3,0.3-0.7,0.4-1.1L16,9V7 l-2.3-0.8C13.6,5.9,13.5,5.5,13.3,5.2z M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S9.7,11,8,11z"
      />
    </g>
  </svg>
);

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
  margin-bottom: 12px;
`;

const TeamMembersList = posed.ul({
  visible: {
    delayChildren: 1000,
    staggerChildren: 50,
  },
});

const TeamMembersItem = posed.li({
  visible: { y: 0, opacity: 1 },
  hidden: { y: 20, opacity: 0 },
});

const StyledTeamMembersList = styled(TeamMembersList)`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const StyledTeamMembersListItem = styled(TeamMembersItem)`
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

const SettingsButton = styled.button`
  background: none;
  opacity: 0.75;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }
`;

export default Team;
