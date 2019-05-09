import { Link, LinkGetProps, LinkProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';

export const SidebarNav = () => {
  return (
    <nav>
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
  );
};

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

const StyledLink = styled(Link)<any>`
  align-items: center;
  color: white;
  display: flex;
  margin-bottom: 20px;
  text-decoration: none;

  span {
    margin-left: 16px;
  }
`;

const TodoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path d="M16 3H8V5H16V3Z" fill="white" fillOpacity="0.5" />
      <path
        d="M1 7H5C5.26522 7 5.51957 6.89464 5.70711 6.70711C5.89464 6.51957 6 6.26522 6 6V2C6 1.73478 5.89464 1.48043 5.70711 1.29289C5.51957 1.10536 5.26522 1 5 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2L0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7ZM2 3H4V5H2V3Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path d="M16 11H8V13H16V11Z" fill="white" fillOpacity="0.5" />
      <path
        d="M6.21893 8.375L2.91693 12.5L1.70693 11.29C1.51903 11.1025 1.26433 10.9973 0.998873 10.9976C0.733415 10.9979 0.478942 11.1036 0.291434 11.2915C0.103926 11.4794 -0.0012573 11.7341 -0.000976 11.9996C-0.000694695 12.265 0.105028 12.5195 0.292934 12.707L2.29293 14.707C2.48043 14.8946 2.73474 14.9999 2.99993 15H3.05493C3.19537 14.9924 3.33262 14.9552 3.45772 14.8909C3.58282 14.8267 3.69296 14.7367 3.78093 14.627L7.78093 9.627C7.86301 9.52444 7.92408 9.40672 7.96066 9.28055C7.99724 9.15439 8.00861 9.02225 7.99413 8.89169C7.97964 8.76113 7.93958 8.63471 7.87623 8.51963C7.81289 8.40455 7.7275 8.30308 7.62493 8.221C7.52237 8.13893 7.40465 8.07785 7.27848 8.04128C7.15232 8.0047 7.02018 7.99332 6.88963 8.00781C6.75907 8.0223 6.63264 8.06236 6.51756 8.1257C6.40248 8.18905 6.30101 8.27444 6.21893 8.377V8.375Z"
        fill="white"
        fillOpacity="0.5"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CoffeeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 0H6V3H8V0Z" fill="white" fillOpacity="0.5" />
    <path d="M4 0H2V3H4V0Z" fill="white" fillOpacity="0.5" />
    <path d="M12 0H10V3H12V0Z" fill="white" fillOpacity="0.5" />
    <path
      d="M15 5H1C0.4 5 0 5.4 0 6V13C0 14.7 1.3 16 3 16H10C11.7 16 13 14.7 13 13V11C14.7 11 16 9.7 16 8V6C16 5.4 15.6 5 15 5ZM14 8C14 8.6 13.6 9 13 9V7H14V8Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9 4.5L14.4 3L13 1.6L11.5 3.1C10.8 2.6 9.9 2.2 9 2.1V0H7V2.1C6.1 2.3 5.2 2.6 4.5 3.1L3.1 1.6L1.6 3.1L3.1 4.6C2.6 5.2 2.2 6.1 2.1 7H0V9H2.1C2.3 9.9 2.6 10.8 3.1 11.5L1.6 13L3 14.4L4.5 12.9C5.2 13.4 6.1 13.8 7 13.9V16H9V13.9C9.9 13.7 10.8 13.4 11.5 12.9L13 14.4L14.4 13L12.9 11.5C13.4 10.8 13.8 9.9 13.9 9H16V7H13.9C13.8 6.1 13.4 5.2 12.9 4.5ZM8 11C6.3 11 5 9.7 5 8C5 6.3 6.3 5 8 5C9.7 5 11 6.3 11 8C11 9.7 9.7 11 8 11Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
);
