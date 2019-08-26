import { Link, LinkGetProps, LinkProps } from '@reach/router';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

export const SettingsNav = () => (
  <StyledNav>
    <SettingsNavList>
      <li>
        <NavLink to="profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="organization">Organization</NavLink>
      </li>
      <li>
        <NavLink to="users">Users</NavLink>
      </li>
    </SettingsNavList>
  </StyledNav>
);

const getProps = ({ isCurrent }: LinkGetProps) => ({
  style: {
    opacity: isCurrent ? 1 : 0.75,
  },
});

const NavLink = (props: LinkProps<any>) => (
  <SettingsNavLink {...props} getProps={getProps} />
);

const StyledNav = styled.nav`
  border-right: 1px solid ${rgba('white', 0.3)};
  margin-right: 48px;
  width: 192px;
`;

const SettingsNavList = styled.ul`
  list-style-type: none;
`;

const SettingsNavLink = styled(Link)<any>`
  color: white;
  display: block;
  font-weight: 700;
  margin-bottom: 24px;
  opacity: 0.75;
  text-decoration: none;
`;
