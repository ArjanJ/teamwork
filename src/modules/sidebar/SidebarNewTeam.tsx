import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

export const SidebarNewTeam = () => {
  return (
    <SidebarNewTeamWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        strokeWidth="1"
      >
        <g strokeWidth="1" transform="translate(0.5, 0.5)">
          <line
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="square"
            strokeMiterlimit="10"
            x1="12"
            y1="7"
            x2="12"
            y2="17"
            strokeLinejoin="miter"
          />{' '}
          <line
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="square"
            strokeMiterlimit="10"
            x1="17"
            y1="12"
            x2="7"
            y2="12"
            strokeLinejoin="miter"
          />{' '}
          <circle
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="square"
            strokeMiterlimit="10"
            cx="12"
            cy="12"
            r="11"
            strokeLinejoin="miter"
          />
        </g>
      </svg>
      <span>New team</span>
    </SidebarNewTeamWrapper>
  );
};

const SidebarNewTeamWrapper = styled.button`
  align-items: center;
  background: none;
  border-top: 1px solid ${rgba('white', 0.25)};
  bottom: 0;
  color: white;
  display: flex;
  font-weight: 500;
  height: 64px;
  left: 0;
  padding-left: 36px;
  position: fixed;
  width: 280px;

  span {
    margin-left: 12px;
  }
`;