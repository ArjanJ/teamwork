import React from 'react';
import styled from 'styled-components';

import { UserDropdown } from '../../user/components/UserDropdown';

export const DashboardHeader = () => (
  <StyledDashboardHeader>
    <UserDropdown />
  </StyledDashboardHeader>
);

const StyledDashboardHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 24px;
`;
