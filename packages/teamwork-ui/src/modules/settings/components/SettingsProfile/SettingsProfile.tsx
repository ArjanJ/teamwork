import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';

import { PageSubheading } from '../../../../components/page-subheading/PageSubheading';
import { SettingsProfileForm } from './SettingsProfileForm';

export const SettingsProfile: FunctionComponent<RouteComponentProps> = () => (
  <>
    <PageSubheading>Profile</PageSubheading>
    <Flex>
      <Box flex={2}>
        <SettingsProfileForm />
      </Box>
      <Box flex={1} ml="36px">
        Image upload thing
      </Box>
    </Flex>
  </>
);

export default SettingsProfile;
