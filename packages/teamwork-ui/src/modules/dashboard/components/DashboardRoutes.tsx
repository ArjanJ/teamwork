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

export const DashboardRoutes: FunctionComponent = () => (
  <Router>
    <Team path="/teams/:teamName" />
    <Teams path="/" />
    <Settings path="/settings" />
    <NotFound path="*" />
  </Router>
);
