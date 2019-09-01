import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { useAuthorization } from '../../auth/hooks/useAuthorization';
import { useAuthUser } from '../../auth/hooks/useAuthUser';
import { Header } from '../../header/components/Header';
import { Notifications } from '../../notification/components/Notifications';
import { Sidebar } from '../../sidebar/components/Sidebar';
import { useSpaces } from '../../spaces/useSpaces';
import { useUser } from '../../user/useUser';
import { VerifyEmail } from '../../verify-email/components/VerifyEmail';
import { DashboardRoutes } from './DashboardRoutes';

export const Dashboard: FunctionComponent<RouteComponentProps> = () => {
  // Go to login page if not logged in.
  useAuthorization('/login');

  const { authUser } = useAuthUser();
  const { getUser, user } = useUser();
  const { activeSpace, setActiveSpace, setSpaces } = useSpaces();

  useEffect(() => {
    if (authUser && !user) {
      getUser(authUser.uid);
    }
  }, [authUser]);

  useEffect(() => {
    if (!activeSpace && user && user.companies) {
      setActiveSpace(user.companies[0].id);
      setSpaces(user.companies);
    }
  }, [user]);

  return (
    <DashboardWrapper>
      <Sidebar />
      <DashboardPageWrapper flex={1}>
        <VerifyEmail>
          <Header />
          <Box flex={1}>{activeSpace && <DashboardRoutes />}</Box>
        </VerifyEmail>
      </DashboardPageWrapper>
      <Notifications />
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Flex)`
  min-height: 100vh;
`;

const DashboardPageWrapper = styled(Box)`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export default Dashboard;
