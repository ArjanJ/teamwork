import { db } from '../../../config/firebase';
import { COMPANIES_COLLECTION } from '../constants';

export const getCompany = async (id: string) =>
  await db
    .collection(COMPANIES_COLLECTION)
    .doc(id)
    .get();

export const getCompanyByName = async (name: string) =>
  await db
    .collection(COMPANIES_COLLECTION)
    .where('name', '==', name)
    .get();
