import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect } from 'react';

import { useUser } from '../../user/useUser';
import { useTeams } from '../useTeams';
import { TeamsEmptyState } from './TeamsEmptyState';
import { TeamsOverview } from './TeamsOverview';

export const Teams: FunctionComponent<RouteComponentProps> = () => {
  const { getAllTeams, teams } = useTeams();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const teamsKeys = Object.keys(teams);
      const userTeams = user.teams;
      const shouldFetchAllTeams =
        teamsKeys.length !== userTeams.length ||
        (teamsKeys.length === 0 && userTeams.length > 0);

      if (shouldFetchAllTeams) {
        getAllTeams();
      }
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
