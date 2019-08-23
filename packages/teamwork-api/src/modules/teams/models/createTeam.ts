import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';
import { Team } from '../types';

export const CREATE_TEAM = 'CREATE_TEAM';

export const createTeam = async (team: Team) => {
  const doc = db.collection(TEAMS_COLLECTION).doc();
  team.id = doc.id;
  await doc.set(team);
  return doc;
};
