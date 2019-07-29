import { db } from '../../../config/firebase';
import { COMPANIES_COLLECTION } from '../constants';
import { Company } from '../types';

export const CREATE_COMPANY = 'CREATE_COMPANY';

export const createCompany = async (company: Company) => {
  const doc = db.collection(COMPANIES_COLLECTION).doc();
  company.id = doc.id;
  await doc.set(company);
  return doc;
};
