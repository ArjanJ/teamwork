export const SET_AUTH_USER = 'SET_AUTH_USER';

export interface AuthUser {
  displayName?: string | null;
  email: string;
  emailVerified: boolean;
  photoURL?: string | null;
  uid: string;
}
