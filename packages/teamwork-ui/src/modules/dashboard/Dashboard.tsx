import { navigate } from '@reach/router';
import React, { SFC } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { auth } from '../../firebase';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useUser } from '../../hooks/useUser';
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

export const Dashboard: SFC<DashboardProps> = () => {
  // Go to login page if not logged in.
  useAuthorization('/login');
  const { createUser, getUser, user } = useUser();
  const fakeUser = {
    firstName: 'elon',
    lastName: 'musk',
  };

  return (
    <DashboardWrapper>
      <Sidebar />
      <Box>
        <button onClick={signOut}>Sign out</button>
        <button onClick={() => createUser(fakeUser)}>create user</button>
        <button onClick={() => getUser('arjan.jassal.27@gmail.com')}>
          get user
        </button>
      </Box>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
