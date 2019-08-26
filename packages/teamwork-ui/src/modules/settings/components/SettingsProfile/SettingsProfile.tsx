import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';

import { PageSubheading } from '../../../../components/page-subheading/PageSubheading';
import { SettingsProfileForm } from './SettingsProfileForm';

export const SettingsProfile: FunctionComponent<RouteComponentProps> = () => (
  <>
    <PageSubheading>Profile</PageSubheading>
    <SettingsProfileForm />
  </>
);

export default SettingsProfile;
