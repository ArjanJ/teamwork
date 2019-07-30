import { ActiveSpace, SET_ACTIVE_SPACE, SET_SPACES, Spaces } from './types';

interface SetActiveSpace {
  type: typeof SET_ACTIVE_SPACE;
  payload: ActiveSpace;
}

interface SetSpaces {
  type: typeof SET_SPACES;
  payload: Spaces;
}

export function setActiveSpace(activeSpace: ActiveSpace): SetActiveSpace {
  return {
    payload: activeSpace,
    type: SET_ACTIVE_SPACE,
  };
}

export function setSpaces(spaces: Spaces): SetSpaces {
  return {
    payload: spaces,
    type: SET_SPACES,
  };
}

export type SpacesActions = SetActiveSpace | SetSpaces;
