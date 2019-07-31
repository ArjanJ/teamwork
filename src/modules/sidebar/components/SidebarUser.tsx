import { navigate } from '@reach/router';
import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';

import { Dropdown, DropdownItem } from '../../../components/dropdown/Dropdown';
import { Toggle } from '../../../components/toggle/Toggle';
import { auth } from '../../../firebase';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { useUser } from '../../user/useUser';

const signOut = async () => {
  await auth.doSignOut();
  return navigate('/login');
};

export const SidebarUser: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <Toggle>
      {({ isOpen, toggle }) => (
        <div style={{ position: 'relative' }}>
          <SidebarUserWrapper onClick={toggle}>
            <Flex alignItems="center" flex={1} justifyContent="space-between">
              <Flex alignItems="center">
                <SidebarUserPic>
                  <img
                    alt="user icon"
                    src={`https://identicon-1132.appspot.com/${user &&
                      user.firstName}?s=64`}
                  />
                </SidebarUserPic>
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
          </SidebarUserWrapper>
          <Dropdown
            isOpen={isOpen}
            style={{
              background: Color.BLUE_PERSIAN,
              left: 0,
              top: '48px',
              width: '100%',
            }}
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

const SidebarUserWrapper = styled(Flex)`
  align-items: center;
  background: ${rgba('white', 0.25)};
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px 12px;
  position: relative;
  transition: all 0.35s ${Easing.OUT};

  &:hover {
    background: ${rgba('white', 0.35)};
  }
`;

const SidebarUserName = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

const SidebarUserPic = styled(Flex)`
  align-items: center;
  background: ${rgba('white', 0.75)};
  border-radius: 50%;
  height: 24px;
  justify-content: center;
  margin-right: 12px;
  width: 24px;

  img {
    width: 12px;
  }
`;

const StyledChevron = styled.svg<{ isOpen: boolean }>`
  transform: rotate(${props => (props.isOpen ? '180deg' : '0deg')});
  transition: all 0.35s ${Easing.OUT};
`;
