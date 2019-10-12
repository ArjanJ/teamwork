import { Router } from '@reach/router';
import React, { lazy } from 'react';

const Login = lazy(() => import('../modules/login/components/Login'));

const SignUp = lazy(() => import('../modules/signup/components/SignUp'));

const Dashboard = lazy(() =>
  import('../modules/dashboard/components/Dashboard'),
);

const Onboarding = lazy(() =>
  import('../modules/onboarding/components/Onboarding'),
);

export const Routes = () => (
  <Router>
    <Login path="/login" />
    <SignUp path="/signup" />
    <Onboarding path="/onboarding" />
    <Dashboard path="/*" />
  </Router>
);
