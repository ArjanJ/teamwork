import { navigate } from '@reach/router';
import React, { SFC } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { auth } from '../../firebase';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
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

  const { authUser } = useAuthUser();

  const { createUser, getUser, updateUser } = useUser();
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
        <button onClick={() => getUser(authUser.uid)}>get user</button>
        <button
          onClick={() => updateUser(authUser.uid, { firstName: 'elongated' })}
        >
          update user
        </button>
      </Box>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
