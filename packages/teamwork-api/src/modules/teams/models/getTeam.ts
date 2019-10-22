import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';

export const getTeam = async (id: string) =>
  await db
    .collection(TEAMS_COLLECTION)
    .doc(id)
    .get();

export const getTeamWhere = async (property: string, value: string | number) =>
  await db
    .collection(TEAMS_COLLECTION)
    .where(property, '==', value)
    .get();
