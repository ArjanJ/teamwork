import { navigate } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { auth } from '../../firebase';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { Sidebar } from '../sidebar/Sidebar';

interface IDashboardProps {
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

export const Dashboard: FunctionComponent<IDashboardProps> = () => {
  // Go to login page if not logged in.
  useAuthorization('/login');

  const { authUser } = useAuthUser();
  const { getUser } = useUser();

  useEffect(() => {
    if (authUser) {
      getUser(authUser.uid);
    }
  }, [authUser]);

  return (
    <DashboardWrapper>
      <Sidebar />
      <Box />
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
