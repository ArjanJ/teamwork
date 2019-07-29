import { db } from '../../../config/firebase';
import { COMPANIES_COLLECTION } from '../constants';
import { Company } from '../types';

export const CREATE_COMPANY = 'CREATE_COMPANY';

export const createCompany = async (company: Company) =>
  await db
    .collection(COMPANIES_COLLECTION)
    .doc()
    .set(company);
