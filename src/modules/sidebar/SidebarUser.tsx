import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';

import { useUser } from '../../hooks/useUser';
import { Dropdown } from '../../components/dropdown/Dropdown';

export const SidebarUser: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <Dropdown>
      {({ isOpen, setIsOpen }) => (
        <SidebarUserWrapper onClick={() => setIsOpen(!isOpen)}>
          <span>
            <SidebarName>{user && user.firstName}</SidebarName>{' '}
            <SidebarName>{user && user.lastName}</SidebarName>
          </span>
        </SidebarUserWrapper>
      )}
    </Dropdown>
  );
};

const SidebarUserWrapper = styled(Flex)`
  align-items: center;
  background: ${rgba('white', 0.12)};
  border-radius: 4px;
  height: 40px;
  margin-bottom: 24px;
  margin-left: -16px;
  padding: 10px 16px;
`;

const SidebarName = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;
