import React from 'react';
import styled from 'styled-components';

import { TeamworkLogo } from '../logos/logos';

export const Header = () => (
  <StyledHeader>
    <a href="#">
      <TeamworkLogo />
    </a>
  </StyledHeader>
);

const StyledHeader = styled.header`
  padding: 24px;
`;
