import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';
import { User } from '../types';

// uid comes from firebase auth user.
export const createUser = async (uid: string, user: User) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(uid)
    .set(user);
