import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useUser } from '../../hooks/useUser';
import { TeamsEmptyState } from './TeamsEmptyState';

export const Teams: FunctionComponent<RouteComponentProps> = () => {
  const { user } = useUser();

  if (user === null) {
    return null;
  }

  return (
    <Wrapper>
      <TeamsEmptyState user={user} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 48px 36px;
`;

export default Teams;
