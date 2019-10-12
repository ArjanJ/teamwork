import { Router } from '@reach/router';
import React, { FunctionComponent, lazy } from 'react';

const Teams = lazy(() => import('../../teams/components/Teams'));

const Team = lazy(() => import('../../teams/components/Team'));

const NotFound = lazy(() => import('../../not-found/components/NotFound'));

const Settings = lazy(() => import('../../settings/components/Settings'));

const SettingsOrganization = lazy(() =>
  import('../../settings/components/SettingsOrganization/SettingsOrganization'),
);

const SettingsProfile = lazy(() =>
  import('../../settings/components/SettingsProfile/SettingsProfile'),
);

const SettingsUsers = lazy(() =>
  import('../../settings/components/SettingsUsers/SettingsUsers'),
);

// 84px is height of the Header.
export const DashboardRoutes: FunctionComponent = () => (
  <Router style={{ height: 'calc(100% - 84px)' }}>
    <Teams path="/" />
    <Team path="teams/:teamName" />
    <Settings path="settings">
      <SettingsProfile path="/" />
      <SettingsOrganization path="organization" />
      <SettingsProfile path="profile" />
      <SettingsUsers path="users" />
    </Settings>
    <NotFound path="*" />
  </Router>
);
