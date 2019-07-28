import { Router } from '@reach/router';
import React from 'react';
import Loadable from 'react-loadable';

const Login = Loadable({
  loader: () => import('../login/Login'),
  loading: () => null,
});

const SignUp = Loadable({
  loader: () => import('../signup/components/SignUp'),
  loading: () => null,
});

const Dashboard = Loadable({
  loader: () => import('../dashboard/Dashboard'),
  loading: () => null,
});

const Onboarding = Loadable({
  loader: () => import('../onboarding/Onboarding'),
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
