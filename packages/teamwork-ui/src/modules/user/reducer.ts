import { IUser, UserActions } from './types';

type User = IUser | null;

interface IUserState {
  isCreating: boolean;
  isFetching: boolean;
  user: User;
}

const initialState: IUserState = {
  isCreating: false,
  isFetching: false,
  user: null,
};

export default function(state = initialState, action: UserActions) {
  switch (action.type) {
    default:
      return state;
  }
}
