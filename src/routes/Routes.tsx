import { Router } from '@reach/router';
import React from 'react';
import Loadable from 'react-loadable';

const Login = Loadable({
  loader: () => import('../modules/login/components/Login'),
  loading: () => null,
});

const SignUp = Loadable({
  loader: () => import('../modules/signup/components/SignUp'),
  loading: () => null,
});

const Dashboard = Loadable({
  loader: () => import('../modules/dashboard/Dashboard'),
  loading: () => null,
});

const Onboarding = Loadable({
  loader: () => import('../modules/onboarding/Onboarding'),
  loading: () => null,
});

export const Routes = () => (
  <Router>
    <Login path="/login" />
    <SignUp path="/signup" />
    <Onboarding path="onboarding" />
    <Dashboard path="/*" />
  </Router>
);
