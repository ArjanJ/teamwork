import { Link, LinkGetProps, LinkProps } from '@reach/router';
import { rgba } from 'polished';
import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { TeamworkLogo } from '../../components/logos/logos';
import { SidebarUser } from './SidebarUser';

export const Sidebar = () => (
  <SidebarWrapper>
    <Box mb="36px">
      <TeamworkLogo />
    </Box>
    <SidebarUser />
    <nav>
      <NavLink to="/">Todos</NavLink>
      <NavLink to="/reminders">Coffees</NavLink>
      <NavLink to="/meetings">Settings</NavLink>
    </nav>
  </SidebarWrapper>
);

const NavLink = (props: LinkProps<any>) => (
  <StyledLink
    {...props}
    getProps={({ isCurrent }: LinkGetProps) => ({
      style: {
        fontWeight: isCurrent ? 600 : 400,
      },
    })}
  />
);

const SidebarWrapper = styled.aside`
  border-right: 1px solid ${rgba('white', 0.25)};
  padding: 36px;
  width: 280px;
`;

const StyledLink = styled(Link)<any>`
  color: white;
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
`;
