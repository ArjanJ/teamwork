import { Team } from 'teamwork-types';

import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';

export const createTeam = async (team: Team) => {
  const doc = db.collection(TEAMS_COLLECTION).doc();
  team.id = doc.id;
  await doc.set(team);
  return doc;
};
