import { darken, rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useUser } from '../../hooks/useUser';
import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';
import { TeamsGraphic } from './TeamsGraphic';

interface ITeamsProps {
  path: string;
}

export const Teams: FunctionComponent<ITeamsProps> = () => {
  const { user } = useUser();

  if (user === null) {
    return null;
  }

  return (
    <Wrapper>
      <SickGradientBox>
        <Heading>
          Hi {user.firstName}! get started with Teamwork by creating your first
          team.
        </Heading>
        <div>
          <CreateTeamButton type="button">Create your team</CreateTeamButton>
        </div>
        <TeamsGraphicWrapper>
          <TeamsGraphic />
        </TeamsGraphicWrapper>
      </SickGradientBox>
    </Wrapper>
  );
};

const SickGradientBox = styled.div`
  background: linear-gradient(111.12deg, #fda57d 1.35%, #f9d749 100%);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  min-height: 304px;
  max-width: 846px;
  padding: 48px;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 48px 36px;
`;

const Heading = styled.h1`
  color: ${Color.BLUE_RAGE};
  font-size: 24px;
  max-width: 384px;
`;

const TeamsGraphicWrapper = styled.div`
  max-width: 370px;
  position: absolute;
  top: 36px;
  right: 48px;

  svg {
    height: auto;
    width: 100%;
  }
`;

const CreateTeamButton = styled.button`
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

export default Teams;
