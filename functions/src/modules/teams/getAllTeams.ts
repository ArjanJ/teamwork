import { db } from '../../config/firebase';
import { Company } from '../companies/types';
import { TEAMS_COLLECTION } from './constants';

export const GET_ALL_TEAMS = 'GET_ALL_TEAMS';

export const getAllTeams = async (company: Company) =>
  await db
    .collection(TEAMS_COLLECTION)
    .where('company.name', '==', company.name)
    .get();
