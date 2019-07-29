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
    type: SET_ACTIVE_SPACE,
    payload: activeSpace,
  };
}

export function setSpaces(spaces: Spaces): SetSpaces {
  return {
    type: SET_SPACES,
    payload: spaces,
  };
}

export type SpacesActions = SetActiveSpace | SetSpaces;
