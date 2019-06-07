import { Link } from '@reach/router';
import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';
import { IMember, ITeam } from './types';

interface TeamsOverviewProps {
  teams: {
    [id: string]: ITeam;
  };
}

export const TeamsOverview: FunctionComponent<TeamsOverviewProps> = ({
  teams,
}) => {
  const teamKeys = Object.keys(teams);

  if (teamKeys.length === 0) {
    return null;
  }

  return (
    <TeamsOverviewWrapper>
      <Box as="header" mb="12px">
        <TeamsOverviewHeading>Your teams</TeamsOverviewHeading>
      </Box>
      <TeamsOverviewList>
        {teamKeys.map((key: string) => {
          const { displayName, name, members } = teams[key];

          return (
            <TeamsOverviewListItem key={name}>
              <TeamsOverviewListLink to={`/${name}`}>
                <Box>
                  <TeamsOverviewTeamName>{displayName}</TeamsOverviewTeamName>
                </Box>
                <Box>
                  <TeamsOverviewMembersList>
                    {members.map((member: IMember) => (
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
      </TeamsOverviewList>
    </TeamsOverviewWrapper>
  );
};

const TeamsOverviewWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 24px 36px;
`;

const TeamsOverviewHeading = styled.h1`
  color: ${Color.ORANGE};
  font-size: 30px;
`;

const TeamsOverviewList = styled.ul`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  list-style-type: none;
`;

const TeamsOverviewListItem = styled.li``;

const TeamsOverviewListLink = styled(Link)`
  background: ${rgba('black', 0.25)};
  border-radius: 4px;
  display: block;
  padding: 16px;
  text-decoration: none;
  transition: background 0.35s ${Easing.OUT};
  width: 100%;

  &:hover {
    background: ${Color.BLUE_SKY};
  }
`;

const TeamsOverviewTeamName = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 8px;
`;

const TeamsOverviewMembersList = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
`;

const TeamsOverviewMemberItem = styled.li`
  align-items: center;
  background: ${rgba('white', 0.75)};
  border-radius: 50%;
  box-shadow: 0 1px 1px ${rgba('black', 0.1)};
  display: flex;
  height: 24px;
  justify-content: center;
  margin-left: -8px;
  width: 24px;

  img {
    width: 16px;
  }

  &:last-child {
    margin-left: 0;
  }
`;
