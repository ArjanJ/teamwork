import { darken, rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useTeams } from '../../hooks/useTeams';
import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';
import { IUser } from '../user/types';
import { TeamsGraphic } from './TeamsGraphic';

interface ITeamsEmptyStateProps {
  user: IUser;
}

export const TeamsEmptyState: FunctionComponent<ITeamsEmptyStateProps> = ({
  user,
}) => {
  const { createTeam } = useTeams();

  const handleCreateTeamClick = () => {
    createTeam({
      id: '',
      members: [],
      name: '420 Blazers',
    });
  };

  return (
    <TeamsEmptyStateBox>
      <TeamsEmptyStateHeading>
        Hi {user.firstName}! Get started with Teamwork by creating your first
        team.
      </TeamsEmptyStateHeading>
      <div>
        <TeamsEmptyStateCreateButton
          onClick={handleCreateTeamClick}
          type="button"
        >
          Create your team
        </TeamsEmptyStateCreateButton>
      </div>
      <TeamsEmptyStateGraphicWrapper>
        <TeamsGraphic />
      </TeamsEmptyStateGraphicWrapper>
    </TeamsEmptyStateBox>
  );
};

const TeamsEmptyStateBox = styled.div`
  background: linear-gradient(111.12deg, #ff6f6f 1.35%, #f9d749 100%);
  border-radius: 4px;
  box-shadow: 0 4px 24px ${rgba('black', 0.06)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  min-height: 304px;
  max-width: 846px;
  padding: 48px;
  position: relative;
`;

const TeamsEmptyStateHeading = styled.h1`
  color: ${Color.BLUE_RAGE};
  font-size: 24px;
  max-width: 420px;
`;

const TeamsEmptyStateGraphicWrapper = styled.div`
  max-width: 370px;
  position: absolute;
  top: 36px;
  right: 48px;

  svg {
    height: auto;
    width: 100%;
  }
`;

const TeamsEmptyStateCreateButton = styled.button`
  background: ${Color.BLUE_SKY};
  border-radius: 4px;
  box-shadow: 0 2px 10px ${rgba('black', 0.1)};
  color: white;
  font-weight: 700;
  height: 48px;
  padding: 0 24px;
  transition: background 0.35s ${Easing.OUT};

  &:hover {
    background: ${darken(0.05, Color.BLUE_SKY)};
  }
`;
