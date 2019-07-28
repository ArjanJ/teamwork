import { RouteComponentProps } from '@reach/router';
import { Router } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';
import Loadable from 'react-loadable';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { useAuthorization } from '../auth/useAuthorization';
import { useAuthUser } from '../auth/useAuthUser';
import { useUser } from '../user/useUser';
import { VerifyEmail } from '../verify-email/VerifyEmail';
import { Sidebar } from '../sidebar/Sidebar';

const Teams = Loadable({
  loader: () => import('../teams/components/Teams'),
  loading: () => null,
});

const Team = Loadable({
  loader: () => import('../teams/components/Team'),
  loading: () => null,
});

const NotFound = Loadable({
  loader: () => import('../not-found/NotFound'),
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
      <VerifyEmail>
        <Box flex={1}>
          <Router>
            <Team path="/teams/:teamName" />
            <Teams path="/" />
            <NotFound path="*" />
          </Router>
        </Box>
      </VerifyEmail>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

export default Dashboard;
