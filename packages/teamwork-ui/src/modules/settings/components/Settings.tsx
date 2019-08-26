import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';

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
    <div>
      <SettingsNav />
      <div>{children}</div>
    </div>
  </PageWrapper>
);

export default Settings;
