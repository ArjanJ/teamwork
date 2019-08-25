import React from 'react';
import styled from 'styled-components';

import { UserDropdown } from '../../user/components/UserDropdown';

export const Header = () => (
  <StyledHeader>
    <UserDropdown />
  </StyledHeader>
);


const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 24px;
`;