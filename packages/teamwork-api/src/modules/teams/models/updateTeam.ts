import { Team } from 'teamwork-types';

import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';

interface UpdateTeam extends Omit<Team, 'id'> {}

export const updateTeam = async (id: string, changes: Partial<UpdateTeam>) =>
  await db
    .collection(TEAMS_COLLECTION)
    .doc(id)
    .update(changes);
