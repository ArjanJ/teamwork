import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';
import { Team } from '../types';

export const UPDATE_TEAM = 'UPDATE_TEAM';

interface UpdateTeam extends Omit<Team, 'id'> {}

export const updateTeam = async (id: string, changes: Partial<UpdateTeam>) =>
  await db
    .collection(TEAMS_COLLECTION)
    .doc(id)
    .update(changes);
