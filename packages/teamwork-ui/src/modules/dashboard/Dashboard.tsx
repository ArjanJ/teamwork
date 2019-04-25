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

// const createUser = async () => {
//   const res = await fetch('/api/users', {
//     headers: {
//       'content-type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify({
//       email: 'test',
//     }),
//   });
//   const json = await res.json();
//   console.log({ json });
// };

const getUser = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
  });
  const json = await res.json();
  console.log({ json });
};

export const Dashboard: SFC<DashboardProps> = () => {
  // Go to login page if not logged in.
  useAuthorization('/login');
  const { createUser, user } = useUser();
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
        <button onClick={() => getUser('test@gmail.com')}>get user</button>
      </Box>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
