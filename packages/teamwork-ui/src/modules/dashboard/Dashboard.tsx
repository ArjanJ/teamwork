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
  min-height: 100vh;
`;

export default Dashboard;
