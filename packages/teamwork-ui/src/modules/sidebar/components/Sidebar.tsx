import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { TeamworkLogo } from '../../../components/logos/logos';
import { SidebarCompany } from './SidebarCompany';
import { SidebarNav } from './SidebarNav';
import { SidebarNewTeam } from './SidebarNewTeam';
import { SidebarTeams } from './SidebarTeams';

export const Sidebar = () => (
  <SidebarWrapper>
    <Box mb="24px">
      <TeamworkLogo />
    </Box>
    <SidebarCompany />
    <SidebarNav />
    <SidebarTeams />
    <SidebarNewTeam />
  </SidebarWrapper>
);

const SidebarWrapper = styled.aside`
  background: #080528;
  padding: 36px;
  position: relative;
  width: 280px;
`;
