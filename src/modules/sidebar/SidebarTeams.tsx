import { Link } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { useUser } from '../../hooks/useUser';
import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';
import { IUser } from '../user/types';

export const SidebarTeams = () => {
  const { user } = useUser();

  return (
    <Box mb="30px">
      <SidebarTeamsTitle>Your teams</SidebarTeamsTitle>
      <SidebarTeamsEmpty user={user} />
      <SidebarTeamsListData user={user} />
    </Box>
  );
};

const SidebarTeamsEmpty: FunctionComponent<{ user: IUser }> = ({ user }) => {
  if (user && user.teams.length > 0) {
    return null;
  }

  return <SidebarTeamsEmptyText>No teams</SidebarTeamsEmptyText>;
};

const SidebarTeamsListData: FunctionComponent<{ user: IUser }> = ({ user }) => {
  if (!user || !user.teams) {
    return null;
  }

  return (
    <SidebarTeamsList>
      {user.teams.map(team => (
        <li key={team.id}>
          <SidebarTeamsListName to={`/${team.name}`}>
            {team.name}
          </SidebarTeamsListName>
        </li>
      ))}
    </SidebarTeamsList>
  );
};

const SidebarTeamsTitle = styled.h2`
  color: white;
  font-size: 12px;
  letter-spacing: 1px;
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
    window.location.pathname.includes(props.to || '') ? 700 : 500};
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
    left: -34px;
    opacity: ${props =>
      window.location.pathname.includes(props.to || '') ? 1 : 0};
    position: absolute;
    top: 6px;
    transition: opacity 0.35s ${Easing.OUT};
    width: 4px;
  }
`;
