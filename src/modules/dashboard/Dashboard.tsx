import { navigate } from '@reach/router';
import React, { SFC } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { auth } from '../../firebase';
import { useAuthorization } from '../../hooks/useAuthorization';
import { Sidebar } from '../sidebar/Sidebar';

interface DashboardProps {
  path: string;
}

export const Dashboard: SFC<DashboardProps> = () => {
  // Go to login page if not logged in.
  useAuthorization('/login');

  const signOut = async () => {
    try {
      await auth.doSignOut();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardWrapper>
      <Sidebar />
      <Box>
        <button onClick={signOut}>Sign out</button>
      </Box>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
