import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';

import { PageHeading } from '../../../components/page-heading/PageHeading';
import { PageWrapper } from '../../../components/page-wrapper/PageWrapper';
import { SettingsNav } from './SettingsNav';

interface SettingsProps {
  children: React.ReactChild | React.ReactNode;
}

export const Settings: FunctionComponent<
  RouteComponentProps & SettingsProps
> = ({ children }) => (
  <PageWrapper>
    <PageHeading>Settings</PageHeading>
    <Flex height="100%">
      <SettingsNav />
      <Box flex={1}>{children}</Box>
    </Flex>
  </PageWrapper>
);

export default Settings;
