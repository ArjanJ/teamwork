import { Link, LinkGetProps, LinkProps } from '@reach/router';
import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { CoffeeIcon } from '../../../components/icons/CoffeeIcon';
import { HomeIcon } from '../../../components/icons/HomeIcon';
import { SettingsIcon } from '../../../components/icons/SettingsIcon';
import { TodoIcon } from '../../../components/icons/TodoIcon';
import { Easing } from '../../../styles/Easing';

export const SidebarNav = () => {
  return (
    <Box mb="30px">
      <nav>
        <NavLink to="/">
          <HomeIcon />
          <span>Home</span>
        </NavLink>
        <NavLink to="/todos">
          <TodoIcon />
          <span>Todos</span>
        </NavLink>
        <NavLink to="/coffees">
          <CoffeeIcon />
          <span>Coffees</span>
        </NavLink>
        <NavLink to="/settings">
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
      </nav>
    </Box>
  );
};

const getProps = ({ isCurrent }: LinkGetProps) => ({
  style: {
    opacity: isCurrent ? 1 : 0.7,
  },
});

const NavLink = (props: LinkProps<any>) => (
  <StyledLink {...props} getProps={getProps} />
);

const StyledLink = styled(Link)<any>`
  align-items: center;
  color: white;
  display: flex;
  font-weight: 700;
  padding-bottom: 16px;
  text-decoration: none;
  transition: opacity 0.35s ${Easing.OUT};

  svg {
    opacity: 0.7;
  }

  &:hover {
    opacity: 1 !important; /* Because we need to override the inline style */

    svg {
      opacity: 1 !important; /* Because we need to override the inline style */
    }
  }

  span {
    margin-left: 16px;
  }
`;
