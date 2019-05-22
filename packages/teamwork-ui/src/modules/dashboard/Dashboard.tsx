import { RouteComponentProps } from '@reach/router';
import { Router } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';
import Loadable from 'react-loadable';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { Sidebar } from '../sidebar/Sidebar';

const Teams = Loadable({
  loader: () => import('../teams/Teams'),
  loading: () => null,
});

const Team = Loadable({
  loader: () => import('../teams/Team'),
  loading: () => null,
});

export const Dashboard: FunctionComponent<RouteComponentProps> = () => {
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
      <Box flex={1}>
        <Router>
          <Teams path="/" />
          <Team path="/:teamName" />
        </Router>
      </Box>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
