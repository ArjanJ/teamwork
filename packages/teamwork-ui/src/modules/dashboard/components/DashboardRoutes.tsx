import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import Loadable from 'react-loadable';

const Teams = Loadable({
  loader: () => import('../../teams/components/Teams'),
  loading: () => null,
});

const Team = Loadable({
  loader: () => import('../../teams/components/Team'),
  loading: () => null,
});

const NotFound = Loadable({
  loader: () => import('../../not-found/components/NotFound'),
  loading: () => null,
});

const Settings = Loadable({
  loader: () => import('../../settings/components/Settings'),
  loading: () => null,
});

const SettingsOrganization = Loadable({
  loader: () =>
    import(
      '../../settings/components/SettingsOrganization/SettingsOrganization'
    ),
  loading: () => null,
});

const SettingsProfile = Loadable({
  loader: () =>
    import('../../settings/components/SettingsProfile/SettingsProfile'),
  loading: () => null,
});

const SettingsUsers = Loadable({
  loader: () => import('../../settings/components/SettingsUsers/SettingsUsers'),
  loading: () => null,
});

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
