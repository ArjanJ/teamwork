import React, { useCallback } from 'react';
import { Flex } from 'rebass';
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { selectActiveSpace } from '../../spaces/reducer';

export const SidebarCompany = () => {
  const mapState = useCallback(
    state => ({
      activeSpace: selectActiveSpace(state.spaces, state.spaces.activeSpace),
    }),
    [],
  );
  const { activeSpace } = useMappedState(mapState);

  return (
    <Flex alignItems="center" mb="36px">
      <SidebarCompanyPic />
      {activeSpace && (
        <SidebarCompanyName>{activeSpace.name}</SidebarCompanyName>
      )}
    </Flex>
  );
};

const SidebarCompanyPic = styled.div`
  background: rgba(255, 255, 255, 0.75);
  border-radius: 4px;
  height: 48px;
  width: 48px;
`;

const SidebarCompanyName = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin-left: 12px;
  white-space: nowrap;
`;
