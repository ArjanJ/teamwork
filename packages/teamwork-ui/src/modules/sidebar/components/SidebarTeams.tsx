import { Link } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { User } from '../../../../functions/src/modules/users/types';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { useUser } from '../../user/useUser';

interface SidebarTeamsChildProps {
  user: User;
}

export const SidebarTeams = () => {
  const { user } = useUser();

  return (
    <Box mb="30px">
      <SidebarTeamsTitle>Your teams</SidebarTeamsTitle>
      {user && <SidebarTeamsEmpty user={user} />}
      {user && <SidebarTeamsListData user={user} />}
    </Box>
  );
};

const SidebarTeamsEmpty: FunctionComponent<SidebarTeamsChildProps> = ({
  user,
}) =>
  user.teams.length === 0 ? (
    <SidebarTeamsEmptyText>No teams</SidebarTeamsEmptyText>
  ) : null;

const SidebarTeamsListData: FunctionComponent<SidebarTeamsChildProps> = ({
  user,
}) =>
  user.teams ? (
    <SidebarTeamsList>
      {user.teams.map(team => (
        <li key={team.id}>
          <SidebarTeamsListName to={`/teams/${team.name}`}>
            {team.displayName}
          </SidebarTeamsListName>
        </li>
      ))}
    </SidebarTeamsList>
  ) : null;

const SidebarTeamsTitle = styled.h2`
  color: white;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 4px;
  opacity: 0.75;
  text-transform: uppercase;
`;

const SidebarTeamsEmptyText = styled.span`
  color: white;
`;

const SidebarTeamsList = styled.ul`
  list-style-type: none;
`;

const SidebarTeamsListName = styled(Link)`
  color: white;
  display: block;
  font-weight: ${props =>
    window.location.pathname.includes(props.to || '') ? 700 : 400};
  opacity: ${props =>
    window.location.pathname.includes(props.to || '') ? 1 : 0.75};
  padding: 4px 0;
  position: relative;
  text-decoration: none;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }

  &::before {
    background: ${Color.MANGO};
    content: '';
    height: 20px;
    left: -36px;
    opacity: ${props =>
      window.location.pathname.includes(props.to || '') ? 1 : 0};
    position: absolute;
    top: 6px;
    transition: opacity 0.35s ${Easing.OUT};
    width: 4px;
  }
`;
