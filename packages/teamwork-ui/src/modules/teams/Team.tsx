import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useTeams } from '../../hooks/useTeams';
import { useUser } from '../../hooks/useUser';

interface ITeamProps {
  teamName?: string;
}

export const Team: FunctionComponent<RouteComponentProps & ITeamProps> = ({
  teamName,
}) => {
  const { deleteTeam } = useTeams();
  const { user } = useUser();

  const getTeamId = () => {
    if (user && user.teams) {
      return user.teams.find(
        (team: { id: string; name: string }) => team.name === teamName,
      );
    }

    return null;
  };

  const teamId = getTeamId();

  if (!teamId || !teamName) {
    return null;
  }

  const { id } = teamId;

  return (
    <Wrapper>
      <h1>{teamName}</h1>
      <button onClick={() => deleteTeam({ id, name: teamName })}>
        Delete team
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 48px 36px;
`;

export default Team;
