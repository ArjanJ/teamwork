export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SET_AUTH_USER = 'SET_AUTH_USER';

export interface IAuthUser {
  displayName?: string | null;
  email: string;
  emailVerified: boolean;
  photoURL?: string | null;
  uid: string;
}
