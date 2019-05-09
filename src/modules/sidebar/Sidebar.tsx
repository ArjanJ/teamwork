import { rgba } from 'polished';
import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { TeamworkLogo } from '../../components/logos/logos';
import { SidebarNav } from './SidebarNav';
import { SidebarUser } from './SidebarUser';

export const Sidebar = () => (
  <SidebarWrapper>
    <Box mb="36px">
      <TeamworkLogo />
    </Box>
    <SidebarUser />
    <SidebarNav />
  </SidebarWrapper>
);

const SidebarWrapper = styled.aside`
  border-right: 1px solid ${rgba('white', 0.25)};
  padding: 36px;
  width: 280px;
`;
