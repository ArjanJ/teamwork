import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';

import { useTeams } from '../../hooks/useTeams';
import { useUser } from '../../hooks/useUser';
import { TeamsEmptyState } from './TeamsEmptyState';
import { TeamsOverview } from './TeamsOverview';

export const Teams: FunctionComponent<RouteComponentProps> = () => {
  const { getTeams, teams } = useTeams();
  const { user } = useUser();

  useEffect(() => {
    if (Object.keys(teams).length === 0) {
      getTeams();
    }
  }, [user]);

  if (user === null) {
    return null;
  }

  return (
    <React.Fragment>
      <TeamsOverview teams={teams} />
      <TeamsEmptyState user={user} />
    </React.Fragment>
  );
};

export default Teams;
