import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';

// uid comes from firebase auth user.
export const getUser = async (uid: string) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(uid)
    .get();
