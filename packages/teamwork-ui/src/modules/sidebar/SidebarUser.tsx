import { navigate } from '@reach/router';
import { darken, rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';

import { Toggle } from '../../components/toggle/Toggle';
import { auth } from '../../firebase';
import { useUser } from '../../hooks/useUser';
import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

const signOut = async () => {
  await auth.doSignOut();
  navigate('/login');
};

export const SidebarUser: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <Toggle>
      {({ isOpen, toggle }) => (
        <SidebarUserWrapper>
          <Flex
            alignItems="center"
            flex={1}
            justifyContent="space-between"
            onClick={toggle}
          >
            <Flex alignItems="center">
              <SidebarUserPic />
              <span>
                <SidebarUserName>{user && user.firstName}</SidebarUserName>{' '}
                <SidebarUserName>{user && user.lastName}</SidebarUserName>
              </span>
            </Flex>
            <StyledChevron
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="12px"
              height="12px"
              viewBox="0 0 12 12"
              isOpen={isOpen}
            >
              <g transform="translate(0, 0)">
                <polygon
                  points="6 5.882 2.148 2.03 0.074 4.104 6 10.03 11.926 4.104 9.852 2.03 6 5.882"
                  fill="#FFFFFF"
                />
              </g>
            </StyledChevron>
          </Flex>
          <SidebarUserDropdown isOpen={isOpen}>
            <SidebarUserDropdownButton onClick={signOut} type="button">
              Sign out
            </SidebarUserDropdownButton>
          </SidebarUserDropdown>
        </SidebarUserWrapper>
      )}
    </Toggle>
  );
};

const SidebarUserWrapper = styled(Flex)`
  align-items: center;
  background: ${Color.BLUE_SKY};
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px 16px;
  position: relative;
  transition: all 0.35s ${Easing.OUT};

  &:hover {
    background: ${darken(0.1, Color.BLUE_SKY)};
  }
`;

const SidebarUserName = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

const SidebarUserPic = styled.div`
  background: white;
  border-radius: 50%;
  height: 24px;
  margin-right: 10px;
  opacity: 0.75;
  width: 24px;
`;

const SidebarUserDropdown = styled.div<{ isOpen: boolean }>`
  background: ${Color.NAVY};
  border-radius: 4px;
  left: 0;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  padding: 10px;
  position: absolute;
  top: 48px;
  transform: translateY(${props => (props.isOpen ? '0' : '20%')});
  transition: all 0.35s ${Easing.OUT};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  width: 100%;
  z-index: 1;
`;

const SidebarUserDropdownButton = styled.button`
  background: none;
  color: white;
  text-align: left;
  width: 100%;
`;

const StyledChevron = styled.svg<{ isOpen: boolean }>`
  transform: rotate(${props => (props.isOpen ? '180deg' : '0deg')});
  transition: all 0.35s ${Easing.OUT};
`;
