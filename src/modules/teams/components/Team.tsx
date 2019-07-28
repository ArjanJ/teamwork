import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';
import styled, { css } from 'styled-components';

import { UserTeam } from '../../../../functions/src/modules/users/types';
import { Toggle } from '../../../components/toggle/Toggle';
import { useUser } from '../../user/useUser';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import {
  TeamMembers,
  TeamMembersMenu,
  TeamMembersMenuItem,
} from './TeamMembers';
import { useTeams } from '../useTeams';

interface ITeamProps {
  teamName?: string;
}

export const Team: FunctionComponent<RouteComponentProps & ITeamProps> = ({
  teamName,
}) => {
  const [userTeam, setUserTeam] = useState<UserTeam>({
    displayName: '',
    id: '',
    name: '',
  });

  const { deleteTeam, getTeam, teams } = useTeams();
  const { user } = useUser();

  const { displayName, id } = userTeam;

  // Fetch current team (the one in the URL)
  useEffect(() => {
    if (user && user.teams) {
      const userTeamResult = user.teams.find(
        (team: UserTeam) => team.name === teamName,
      );

      if (userTeamResult) {
        setUserTeam(userTeamResult);
        getTeam(userTeamResult.id);
      }
    }
  }, [user, teamName]);

  if (!teams[id] || !teamName) {
    return null;
  }

  const handleDeleteTeam = async () => {
    await deleteTeam(userTeam);
    navigate('/');
  };

  return (
    <Wrapper>
      <Header
        alignItems="center"
        as="header"
        justifyContent="space-between"
        mb="24px"
      >
        <TeamName>{displayName}</TeamName>
        <Box>
          <Toggle>
            {({ isOpen, toggle }) => (
              <React.Fragment>
                <SettingsButton onClick={toggle} type="button">
                  <SettingsIcon />
                </SettingsButton>
                <TeamMembersMenu
                  isOpen={isOpen}
                  styles={css`
                    right: 0;
                    top: 36px;
                  `}
                >
                  <TeamMembersMenuItem type="button">
                    Rename team
                  </TeamMembersMenuItem>
                  <TeamMembersMenuItem onClick={handleDeleteTeam} type="button">
                    Delete team
                  </TeamMembersMenuItem>
                </TeamMembersMenu>
              </React.Fragment>
            )}
          </Toggle>
        </Box>
      </Header>
      <TeamMembers team={teams[id]} />
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

const Header = styled(Flex)`
  position: relative;
`;

const TeamName = styled.h1`
  color: ${Color.ORANGE};
  font-size: 30px;
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
