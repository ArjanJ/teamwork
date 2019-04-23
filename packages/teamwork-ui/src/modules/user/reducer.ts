import { IUser, UserActions } from './types';

type UserState = IUser | null;

const initialState: UserState = null;

export default function(state = initialState, action: UserActions) {
  switch (action.type) {
    default:
      return state;
  }
}
