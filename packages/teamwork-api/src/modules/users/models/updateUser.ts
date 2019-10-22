import * as firebaseAdmin from 'firebase-admin';
import { User } from 'teamwork-types';

import { db } from '../../../config/firebase';
import { USERS_COLLECTION } from '../constants';

interface UpdateUser extends Omit<User, 'teams'> {
  teams: firebaseAdmin.firestore.FieldValue;
}

// uid comes from firebase auth user.
export const updateUser = async (uid: string, changes: Partial<UpdateUser>) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(uid)
    .update(changes);
