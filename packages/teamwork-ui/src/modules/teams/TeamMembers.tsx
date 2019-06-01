import { rgba } from 'polished';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import posed from 'react-pose';
import { Box, Flex } from 'rebass';
import styled, { CSSProp } from 'styled-components';

import { Toggle } from '../../components/toggle/Toggle';
import { useTeams } from '../../hooks/useTeams';
import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';
import { TeamsAddMembersModal } from './TeamsAddMembersModal';
import { IMember, ITeam } from './types';

interface ITeamMembersProps {
  team: ITeam;
}

export const TeamMembers: FunctionComponent<ITeamMembersProps> = ({ team }) => {
  const [showMembers, setShowMembers] = useState(false);
  const { updateTeamMembers } = useTeams();

  useEffect(() => {
    if (team) {
      setShowMembers(true);
    }

    return () => {
      setShowMembers(false);
    };
  }, [showMembers, team]);

  const removeTeamMember = (email: string) =>
    updateTeamMembers(
      team.id,
      team.members.filter((member: IMember) => member.email !== email),
    );

  const [showModal, hideModal] = useModal(() => (
    <TeamsAddMembersModal hideModal={hideModal} team={team} />
  ));

  return (
    <Box>
      <Subheading>Your team</Subheading>
      <StyledTeamMembersList pose={showMembers ? 'visible' : 'hidden'}>
        {team &&
          team.members.map((member: IMember) => (
            <StyledTeamMembersListItem key={member.email}>
              <Flex justifyContent="space-between">
                <Flex>
                  <TeamMembersIcon>
                    <img
                      alt={member.firstName}
                      src={`https://identicon-1132.appspot.com/${
                        member.firstName
                      }?s=64`}
                    />
                  </TeamMembersIcon>
                  <Box ml="12px">
                    <TeamMembersName>
                      {member.firstName} {member.lastName}
                    </TeamMembersName>
                    <TeamMembersEmail>{member.email}</TeamMembersEmail>
                  </Box>
                </Flex>
                <Box>
                  <Toggle>
                    {({ isOpen, toggle }) => (
                      <React.Fragment>
                        <TeamMembersExpandButton onClick={toggle} type="button">
                          <MenuIcon />
                        </TeamMembersExpandButton>
                        <TeamMembersMenu isOpen={isOpen}>
                          <TeamMembersMenuItem>Edit info</TeamMembersMenuItem>
                          <TeamMembersMenuItem
                            onClick={() => removeTeamMember(member.email)}
                          >
                            Remove from team
                          </TeamMembersMenuItem>
                        </TeamMembersMenu>
                      </React.Fragment>
                    )}
                  </Toggle>
                </Box>
              </Flex>
            </StyledTeamMembersListItem>
          ))}
      </StyledTeamMembersList>
      <button onClick={showModal} type="button">
        Add team member
      </button>
    </Box>
  );
};

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        fill="#FFFFFF"
        d="M8,14H1c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h7c0.552,0,1,0.448,1,1v0C9,13.552,8.552,14,8,14z"
      />{' '}
      <path
        fill="#FFFFFF"
        d="M15,4H1C0.448,4,0,3.552,0,3v0c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v0C16,3.552,15.552,4,15,4z"
      />{' '}
      <path
        data-color="color-2"
        fill="#FFFFFF"
        d="M15,9H1C0.448,9,0,8.552,0,8v0c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v0 C16,8.552,15.552,9,15,9z"
      />
    </g>
  </svg>
);

const Subheading = styled.h2`
  color: white;
  font-size: 16px;
  margin-bottom: 12px;
`;

const TeamMembersList = posed.ul({
  visible: {
    delayChildren: 1000,
    staggerChildren: 50,
  },
});

const TeamMembersItem = posed.li({
  visible: { y: 0, opacity: 1 },
  hidden: { y: 20, opacity: 0 },
});

const StyledTeamMembersList = styled(TeamMembersList)`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  list-style-type: none;
`;

const StyledTeamMembersListItem = styled(TeamMembersItem)`
  background: ${rgba('black', 0.15)};
  border-radius: 4px;
  padding: 16px;
  position: relative;
`;

const TeamMembersName = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0;
`;

const TeamMembersEmail = styled.p`
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.75;
  text-transform: uppercase;
`;

const TeamMembersIcon = styled(Flex)`
  align-items: center;
  background: ${rgba('white', 0.75)};
  border-radius: 50%;
  height: 36px;
  justify-content: center;
  width: 36px;

  img {
    width: 16px;
  }
`;

const TeamMembersExpandButton = styled.button`
  background: none;
  opacity: 0.75;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }
`;

export const TeamMembersMenu = styled.div<{
  isOpen: boolean;
  styles?: CSSProp;
}>`
  background: ${Color.NAVY};
  border-radius: 4px;
  box-shadow: 0 4px 16px ${rgba('black', 0.15)};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  padding: 6px 0;
  position: absolute;
  right: 16px;
  top: 42px;
  transform: ${props => (props.isOpen ? 'none' : 'translateY(20%)')};
  transition: all 0.25s ${Easing.OUT};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  width: 174px;
  z-index: 1;

  ${props => props.styles}
`;

export const TeamMembersMenuItem = styled.button`
  background: none;
  color: white;
  font-size: 14px;
  padding: 6px 12px;
  text-align: left;
  transition: all 0.35s ${Easing.OUT};
  width: 100%;

  &:hover {
    background: ${rgba('white', 0.1)};
  }
`;
