import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { Easing } from '../../styles/Easing';

export const SidebarTeams = () => {
  return (
    <Box mb="30px">
      <SidebarTeamsTitle>Your teams</SidebarTeamsTitle>
      <SidebarTeamsAddButton>
        Create a team
        <Box ml="12px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
          >
            <g transform="translate(0, 0)">
              <path
                d="M11,5H7V1A1,1,0,0,0,5,1V5H1A1,1,0,0,0,1,7H5v4a1,1,0,0,0,2,0V7h4a1,1,0,0,0,0-2Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </Box>
      </SidebarTeamsAddButton>
    </Box>
  );
};

const SidebarTeamsTitle = styled.h2`
  color: white;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 10px;
  opacity: 0.75;
  text-transform: uppercase;
`;

const SidebarTeamsAddButton = styled.button`
  align-items: center;
  background: none;
  color: white;
  display: flex;
  font-weight: 700;
  padding: 0;
  transition: all 0.35s ${Easing.OUT};

  &:hover {
    opacity: 0.7;
  }
`;
