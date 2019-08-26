import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';

export const SettingsNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="profile">Profile</Link>
        </li>
        <li>
          <Link to="organization">Organization</Link>
        </li>
        <li>
          <Link to="users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};
