import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';

import { useUser } from '../../user/useUser';
import { TeamsEmptyState } from './TeamsEmptyState';
import { TeamsOverview } from './TeamsOverview';
import { useTeams } from '../useTeams';

export const Teams: FunctionComponent<RouteComponentProps> = () => {
  const { getAllTeams, teams } = useTeams();
  const { user } = useUser();

  useEffect(() => {
    const shouldFetchAllTeams =
      user && Object.keys(teams).length === 0 && user.teams.length > 0;

    if (shouldFetchAllTeams) {
      getAllTeams();
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
