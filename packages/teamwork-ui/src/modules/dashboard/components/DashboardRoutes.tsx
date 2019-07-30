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

export const DashboardRoutes: FunctionComponent = () => (
  <Router>
    <Team path="/teams/:teamName" />
    <Teams path="/" />
    <NotFound path="*" />
  </Router>
);
