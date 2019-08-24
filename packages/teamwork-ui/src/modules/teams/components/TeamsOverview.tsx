import { Link } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useModal } from 'react-modal-hook';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import { Team, TeamMember } from 'teamwork-types';

import { Button, ButtonKind } from '../../../components/button/Button';
import { PoseListStaggerListItem } from '../../../components/pose/PoseListStagger';
import { Color } from '../../../styles/Color';
import { TeamsCreateModal } from './TeamsCreateTeamModal';
import { TeamsCard, TeamsDivider, TeamsGrid } from './TeamsShared';

interface TeamsOverviewProps {
  teams: {
    [id: string]: Team;
  };
}

export const TeamsOverview: FunctionComponent<TeamsOverviewProps> = ({
  teams,
}) => {
  const [showTeams, setShowTeams] = useState(false);
  const teamKeys = Object.keys(teams);

  useEffect(() => {
    if (teamKeys.length > 0) {
      setShowTeams(true);
    }

    return () => {
      setShowTeams(false);
    };
  }, [showTeams, teamKeys]);

  const [showModal, hideModal] = useModal(() => (
    <TeamsCreateModal hideModal={hideModal} />
  ));

  if (teamKeys.length === 0) {
    return null;
  }

  return (
    <TeamsOverviewWrapper>
      <Box as="header" mb="24px">
        <TeamsOverviewHeading>Your teams</TeamsOverviewHeading>
      </Box>
      <TeamsGrid pose={showTeams ? 'visible' : 'hidden'}>
        {teamKeys.map((key: string) => {
          const { displayName, name, members } = teams[key];

          return (
            <PoseListStaggerListItem key={name}>
              <TeamsCard as={Link} to={`/teams/${name}`}>
                <Box>
                  <TeamsOverviewTeamName>{displayName}</TeamsOverviewTeamName>
                </Box>
                <Box>
                  <TeamsOverviewMembersList>
                    {members.map((member: TeamMember) => (
                      <TeamsOverviewMemberItem key={member.email}>
                        <img
                          alt={member.firstName}
                          src={`https://identicon-1132.appspot.com/${member.firstName}?s=64`}
                        />
                      </TeamsOverviewMemberItem>
                    ))}
                  </TeamsOverviewMembersList>
                </Box>
              </TeamsCard>
            </PoseListStaggerListItem>
          );
        })}
      </TeamsGrid>
      <TeamsDivider />
      <Flex justifyContent="flex-end">
        <Button kind={ButtonKind.PRIMARY} onClick={showModal} type="button">
          Add team
        </Button>
      </Flex>
    </TeamsOverviewWrapper>
  );
};

const TeamsOverviewWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 24px 36px;
`;

const TeamsOverviewHeading = styled.h1`
  color: ${Color.MINT};
  font-size: 30px;
`;

const TeamsOverviewTeamName = styled.h2`
  color: ${Color.NAVY};
  font-size: 24px;
  margin-bottom: 18px;
`;

const TeamsOverviewMembersList = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
`;

const TeamsOverviewMemberItem = styled.li`
  align-items: center;
  background: #dbd1f1;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  height: 36px;
  justify-content: center;
  margin-left: -12px;
  width: 36px;

  img {
    width: 16px;
  }

  &:last-child {
    margin-left: 0;
  }
`;
