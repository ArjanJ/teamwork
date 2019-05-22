import { Link } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { useUser } from '../../hooks/useUser';
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
  margin-bottom: 12px;
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
  padding: 4px 0;
  text-decoration: none;
`;
