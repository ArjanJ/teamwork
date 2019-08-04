import { darken, rgba } from 'polished';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useModal } from 'react-modal-hook';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import {
  Team,
  TeamMember,
} from '../../../../functions/src/modules/teams/types';
import { Button, ButtonKind } from '../../../components/button/Button';
import { Dropdown, DropdownItem } from '../../../components/dropdown/Dropdown';
import { MenuIcon } from '../../../components/icons/MenuIcon';
import { PoseListStaggerListItem } from '../../../components/pose/PoseListStagger';
import { Toggle } from '../../../components/toggle/Toggle';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { useTeams } from '../useTeams';
import { TeamsAddMembersModal } from './TeamsAddMembersModal';
import { TeamsCard, TeamsDivider, TeamsGrid } from './TeamsShared';

interface TeamMembersProps {
  team: Team;
}

export const TeamMembers: FunctionComponent<TeamMembersProps> = ({ team }) => {
  const [showMembers, setShowMembers] = useState(false);
  const { updateTeam } = useTeams();

  useEffect(() => {
    if (team) {
      setShowMembers(true);
    }

    return () => {
      setShowMembers(false);
    };
  }, [showMembers, team]);

  const removeTeamMember = (email: string) =>
    updateTeam(team.id, {
      members: team.members.filter(
        (member: TeamMember) => member.email !== email,
      ),
    });

  const [showModal, hideModal] = useModal(() => (
    <TeamsAddMembersModal hideModal={hideModal} team={team} />
  ));

  return (
    <Box>
      <Subheading>Your team</Subheading>
      <TeamsGrid pose={showMembers ? 'visible' : 'hidden'}>
        {team.members.map((member: TeamMember) => {
          const onRemoveClick = () => removeTeamMember(member.email);

          return (
            <PoseListStaggerListItem key={member.email}>
              <TeamsCard>
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
                          <TeamMembersExpandButton
                            onClick={toggle}
                            type="button"
                          >
                            <MenuIcon />
                          </TeamMembersExpandButton>
                          <Dropdown isOpen={isOpen}>
                            <DropdownItem>Edit info</DropdownItem>
                            <DropdownItem onClick={onRemoveClick}>
                              Remove from team
                            </DropdownItem>
                          </Dropdown>
                        </React.Fragment>
                      )}
                    </Toggle>
                  </Box>
                </Flex>
              </TeamsCard>
            </PoseListStaggerListItem>
          );
        })}
      </TeamsGrid>
      <TeamsDivider />
      <Flex justifyContent="flex-end">
        <Button kind={ButtonKind.PRIMARY} onClick={showModal} type="button">
          Add team member
        </Button>
      </Flex>
    </Box>
  );
};

const Subheading = styled.h2`
  color: white;
  font-size: 16px;
  margin-bottom: 12px;
`;

const TeamMembersName = styled.p`
  color: ${Color.NAVY};
  font-weight: 700;
  margin-bottom: 0;
`;

const TeamMembersEmail = styled.p`
  color: ${darken(0.45, 'white')};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const TeamMembersIcon = styled(Flex)`
  align-items: center;
  background: ${rgba(Color.BLUE_PERSIAN, 0.2)};
  border-radius: 50%;
  height: 42px;
  justify-content: center;
  width: 42px;

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
