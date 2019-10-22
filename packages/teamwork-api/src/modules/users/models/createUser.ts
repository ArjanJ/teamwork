import { User } from 'teamwork-types';

import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';

// uid comes from firebase auth user.
export const createUser = async (uid: string, user: User) => {
  const doc = db.collection(USERS_COLLECTION).doc(uid);
  user.id = uid;
  await doc.set(user);
  return doc;
};
