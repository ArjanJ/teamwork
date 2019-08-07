import { admin } from '../../../config/firebase';

interface FirebaseUser {
  displayName: string;
  email: string;
  password: string;
}

export const createFirebaseUser = async ({
  email,
  displayName,
  password,
}: FirebaseUser) =>
  await admin.auth().createUser({
    displayName,
    email,
    password,
  });
