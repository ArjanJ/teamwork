import { Link } from '@reach/router';
import { darken, rgba } from 'polished';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useModal } from 'react-modal-hook';
import posed from 'react-pose';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import {
  Team,
  TeamMember,
} from '../../../../functions/src/modules/teams/types';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { TeamsCreateModal } from './TeamsCreateTeamModal';

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
      <StyledTeamsOverviewList pose={showTeams ? 'visible' : 'hidden'}>
        {teamKeys.map((key: string) => {
          const { displayName, name, members } = teams[key];

          return (
            <TeamsOverviewListItem key={name}>
              <TeamsOverviewListLink to={`/teams/${name}`}>
                <Box>
                  <TeamsOverviewTeamName>{displayName}</TeamsOverviewTeamName>
                </Box>
                <Box>
                  <TeamsOverviewMembersList>
                    {members.map((member: TeamMember) => (
                      <TeamsOverviewMemberItem key={member.email}>
                        <img
                          alt={member.firstName}
                          src={`https://identicon-1132.appspot.com/${
                            member.firstName
                          }?s=64`}
                        />
                      </TeamsOverviewMemberItem>
                    ))}
                  </TeamsOverviewMembersList>
                </Box>
              </TeamsOverviewListLink>
            </TeamsOverviewListItem>
          );
        })}
      </StyledTeamsOverviewList>
      <Divider />
      <Flex justifyContent="flex-end">
        <AddTeamButton onClick={showModal} type="button">
          Add team
        </AddTeamButton>
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

const TeamsOverviewList = posed.ul({
  visible: {
    delayChildren: 600,
    staggerChildren: 50,
  },
});

const TeamsOverviewListItem = posed.li({
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
});

const StyledTeamsOverviewList = styled(TeamsOverviewList)`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  list-style-type: none;
  min-height: 94px;
`;

const TeamsOverviewListLink = styled(Link)`
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: block;
  padding: 24px;
  text-decoration: none;
  transition: all 0.35s ${Easing.OUT};
  width: 100%;

  &:hover {
    background: ${darken(0.08, 'white')};
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.16);
  }
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

const Divider = styled.div`
  background: white;
  height: 1px;
  margin: 48px 0;
  opacity: 0.25;
`;

const AddTeamButton = styled.button`
  background: ${Color.AQUA};
  border-radius: 99px;
  color: white;
  font-weight: 700;
  height: 40px;
  min-width: 100px;
  padding: 0 24px;
  position: relative;
  transition: background 0.35s ${Easing.OUT};

  &:hover {
    background: ${darken(0.06, Color.AQUA)};
  }
`;
