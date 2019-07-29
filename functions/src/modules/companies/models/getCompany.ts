import { db } from '../../../config/firebase';
import { COMPANIES_COLLECTION } from '../constants';

export const GET_COMPANY = 'GET_COMPANY';

export const getCompany = async (id: string) =>
  await db
    .collection(COMPANIES_COLLECTION)
    .doc(id)
    .get();
