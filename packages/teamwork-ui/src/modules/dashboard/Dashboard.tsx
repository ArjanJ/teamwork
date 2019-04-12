import React, { SFC } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { Sidebar } from '../sidebar/Sidebar';

interface DashboardProps {
  path: string;
}

export const Dashboard: SFC<DashboardProps> = () => (
  <DashboardWrapper>
    <Sidebar />
    <Box>main area</Box>
  </DashboardWrapper>
);

const DashboardWrapper = styled(Flex)`
  background-color: #022c43;
  min-height: 100vh;
`;

export default Dashboard;
