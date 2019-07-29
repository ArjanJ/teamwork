import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';

export const GET_USER = 'GET_USER';

// uid comes from firebase auth user.
export const getUser = async (uid: string) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(uid)
    .get();
