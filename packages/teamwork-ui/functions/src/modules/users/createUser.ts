import { db } from '../../config/firebase';
import { USERS_COLLECTION } from './constants';
import { User } from './types';

export const createUser = async (user: User) =>
  await db
    .collection(USERS_COLLECTION)
    .doc(user.uid)
    .set(user);
