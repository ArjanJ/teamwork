import { navigate } from '@reach/router';
import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import styled, { css } from 'styled-components';

import { Dropdown, DropdownItem } from '../../../components/dropdown/Dropdown';
import { ChevronDownIcon } from '../../../components/icons/ChevronDownIcon';
import { Toggle } from '../../../components/toggle/Toggle';
import { auth } from '../../../firebase';
import { Easing } from '../../../styles/Easing';
import { useUser } from '../useUser';

const signOut = async () => {
  await auth.doSignOut();
  return navigate('/login');
};

export const UserDropdown: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <Toggle>
      {({ isOpen, toggle }) => (
        <div style={{ position: 'relative' }}>
          <UserDropdownWrapper onClick={toggle}>
            <Flex alignItems="center" flex={1} justifyContent="space-between">
              <Flex alignItems="center">
                <UserDropdownPic>
                  <img
                    alt="user icon"
                    src={`https://identicon-1132.appspot.com/${user &&
                      user.firstName}?s=64`}
                  />
                </UserDropdownPic>
                <span>
                  <UserDropdownName>{user && user.firstName}</UserDropdownName>{' '}
                  <UserDropdownName>{user && user.lastName}</UserDropdownName>
                </span>
              </Flex>
              <ChevronWrapper isOpen={isOpen}>
                <ChevronDownIcon />
              </ChevronWrapper>
            </Flex>
          </UserDropdownWrapper>
          <Dropdown
            css={css`
              left: 0;
              width: 100%;
            `}
            isOpen={isOpen}
          >
            <DropdownItem onClick={signOut} type="button">
              Sign out
            </DropdownItem>
          </Dropdown>
        </div>
      )}
    </Toggle>
  );
};

const UserDropdownWrapper = styled(Flex)`
  align-items: center;
  background: ${rgba('black', 0.3)};
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  min-width: 180px;
  padding: 6px 12px;
  position: relative;
  transition: all 0.35s ${Easing.OUT};

  &:hover {
    background: ${rgba('black', 0.45)};
  }
`;

const UserDropdownName = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const UserDropdownPic = styled(Flex)`
  align-items: center;
  background: ${rgba('white', 0.5)};
  border-radius: 50%;
  height: 24px;
  justify-content: center;
  margin-right: 12px;
  width: 24px;

  img {
    width: 12px;
  }
`;

const ChevronWrapper = styled.span<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  transition: all 0.35s ${Easing.OUT};
`;
