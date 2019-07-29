import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';
import { User } from '../types';

// uid comes from firebase auth user.
export const updateUser = async (uid: string, changes: Partial<User>) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(uid)
    .update(changes);
