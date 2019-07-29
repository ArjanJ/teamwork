import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';

export const DELETE_TEAM = 'DELETE_TEAM';

export const deleteTeam = async (id: string) =>
  await db
    .collection(TEAMS_COLLECTION)
    .doc(id)
    .delete();
