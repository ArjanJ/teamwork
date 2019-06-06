import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';

import { useTeams } from '../../hooks/useTeams';
import { useUser } from '../../hooks/useUser';
import { TeamsEmptyState } from './TeamsEmptyState';

export const Teams: FunctionComponent<RouteComponentProps> = () => {
  const { getTeams, teams } = useTeams();
  const { user } = useUser();

  useEffect(() => {
    getTeams();
  }, [user]);

  if (user === null) {
    return null;
  }

  return (
    <Wrapper>
      <TeamsEmptyState teams={teams} user={user} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 48px 36px;
`;

export default Teams;
