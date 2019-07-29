import { db } from '../../config/firebase';
import { TEAMS_COLLECTION } from './constants';

export const GET_TEAM = 'GET_TEAM';

export const getTeam = async (id: string) =>
  await db
    .collection(TEAMS_COLLECTION)
    .doc(id)
    .get();
