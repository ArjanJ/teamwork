import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import { Box, Flex } from 'rebass';
import styled, { css } from 'styled-components';

import { SettingsIcon } from '../../../components/icons/SettingsIcon';
import { Toggle } from '../../../components/toggle/Toggle';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { useUser } from '../../user/useUser';
import { useTeams } from '../useTeams';
import {
  TeamMembers,
  TeamMembersMenu,
  TeamMembersMenuItem,
} from './TeamMembers';

interface TeamProps {
  teamName?: string;
}

export const Team = React.memo<RouteComponentProps & TeamProps>(
  function TeamComponent({ teamName = '' }) {
    const { deleteTeam, getTeam, teams } = useTeams();
    const { selectTeamFromName } = useUser();

    // UserTeam exists on state.user.teams
    const userTeam = selectTeamFromName(teamName);

    useEffect(() => {
      // If state.teams[id] hasn't been loaded yet, load it.
      if (userTeam && !teams[userTeam.id]) {
        getTeam(userTeam.id);
      }
    }, [userTeam]);

    if (!teamName) {
      return null;
    }

    const onDeleteClick = async () => {
      if (userTeam) {
        await deleteTeam({ id: userTeam.id });
        navigate('/');
      }
    };

    return (
      <Wrapper>
        <Header
          alignItems="center"
          as="header"
          justifyContent="space-between"
          mb="24px"
        >
          {userTeam && <TeamName>{userTeam.displayName}</TeamName>}
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
                    <TeamMembersMenuItem onClick={onDeleteClick} type="button">
                      Delete team
                    </TeamMembersMenuItem>
                  </TeamMembersMenu>
                </React.Fragment>
              )}
            </Toggle>
          </Box>
        </Header>
        {userTeam && teams[userTeam.id] && (
          <TeamMembers team={teams[userTeam.id]} />
        )}
      </Wrapper>
    );
  },
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
  color: ${Color.MINT};
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
