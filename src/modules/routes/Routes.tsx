import { Router } from '@reach/router';
import React from 'react';
import Loadable from 'react-loadable';

// const Login = Loadable({
//   loader: () => import('../Login/Login'),
//   loading: () => null,
// });

// const Signup = Loadable({
//   loader: () => import('../Signup/Signup'),
//   loading: () => null,
// });

const Dashboard = Loadable({
  loader: () => import('../dashboard/Dashboard'),
  loading: () => null,
});

export const Routes = () => (
  <Router>
    {/* <Login path="/login" /> */}
    {/* <Signup path="/signup" /> */}
    <Dashboard path="/*" />
  </Router>
);
