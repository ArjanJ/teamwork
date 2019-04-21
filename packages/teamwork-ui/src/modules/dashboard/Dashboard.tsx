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

const signOut = async () => {
  try {
    await auth.doSignOut();
    navigate('/login');
  } catch (err) {
    console.log(err);
  }
};

const createUser = async () => {
  const res = await fetch(
    'http://localhost:5000/teamwork-dev-74882/us-central1/webApi/api/v1/users',
    {
      method: 'POST',
      body: JSON.stringify({
        test: 'test',
      }),
    },
  );
  const json = await res.json();
  console.log({ json });
};

export const Dashboard: SFC<DashboardProps> = () => {
  // Go to login page if not logged in.
  useAuthorization('/login');

  return (
    <DashboardWrapper>
      <Sidebar />
      <Box>
        <button onClick={signOut}>Sign out</button>
        <button onClick={createUser}>create user</button>
      </Box>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
