import React, { FunctionComponent } from 'react';

import { ITeam } from './types';

interface TeamsOverviewProps {
  teams: ITeam[];
}

export const TeamsOverview: FunctionComponent<TeamsOverviewProps> = ({
  teams,
}) => {
  console.log(teams);
  return <h1>Teams</h1>;
};
