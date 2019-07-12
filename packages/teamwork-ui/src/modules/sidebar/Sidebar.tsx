import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { TeamworkLogo } from '../../components/logos/logos';
import { SidebarNav } from './SidebarNav';
import { SidebarNewTeam } from './SidebarNewTeam';
import { SidebarTeams } from './SidebarTeams';
import { SidebarUser } from './SidebarUser';

export const Sidebar = () => (
  <SidebarWrapper>
    <Box mb="24px">
      <TeamworkLogo />
    </Box>
    <SidebarUser />
    <SidebarNav />
    <SidebarTeams />
    <SidebarNewTeam />
  </SidebarWrapper>
);

const SidebarWrapper = styled.aside`
  background: #04002f;
  padding: 36px;
  position: relative;
  width: 280px;
`;
