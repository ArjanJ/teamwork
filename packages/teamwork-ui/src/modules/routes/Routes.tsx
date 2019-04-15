import { Router } from '@reach/router';
import React from 'react';
import Loadable from 'react-loadable';

const Signup = Loadable({
  loader: () => import('../signup/Signup'),
  loading: () => null,
});

const Dashboard = Loadable({
  loader: () => import('../dashboard/Dashboard'),
  loading: () => null,
});

export const Routes = () => (
  <Router>
    <Signup path="/signup" />
    <Dashboard path="/*" />
  </Router>
);
