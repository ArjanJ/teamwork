import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';

// uid comes from firebase auth user.
export const getUser = async (uid: string) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(uid)
    .get();

export const getUserWhere = async <T>(property: string, value: T) =>
  await db
    .collection(USERS_COLLECTION)
    .where(property, 'array-contains', value)
    .get();
