import { Link, LinkGetProps, LinkProps } from '@reach/router';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';

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
  color: ${Color.WHITE};
  display: block;
  font-weight: 700;
  margin-bottom: 24px;
  opacity: 0.75;
  position: relative;
  text-decoration: none;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1 !important;
  }

  &::before {
    background: ${Color.MANGO};
    content: '';
    height: 18px;
    left: -24px;
    opacity: ${({ to = '' }) =>
      window.location.pathname.includes(to) ? 1 : 0};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.35s ${Easing.OUT};
    width: 3px;
  }
`;
