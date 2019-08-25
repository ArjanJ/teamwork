import { UserCompany } from 'teamwork-types';

import { SpacesActions } from './actions';
import { SET_ACTIVE_SPACE, SET_SPACES } from './types';

export interface SpacesState {
  activeSpace: UserCompany['id'] | null;
  spaces: UserCompany[];
}

const initialState = {
  activeSpace: null,
  spaces: [],
};

export const selectActiveSpace = (state: SpacesState, activeSpace: string) =>
  state.spaces.find(space => space.id === activeSpace);

export default function(
  state: SpacesState = initialState,
  action: SpacesActions,
): SpacesState {
  switch (action.type) {
    case SET_ACTIVE_SPACE:
      return {
        ...state,
        activeSpace: action.payload,
      };
    case SET_SPACES:
      return {
        ...state,
        spaces: action.payload,
      };
    default:
      return state;
  }
}
