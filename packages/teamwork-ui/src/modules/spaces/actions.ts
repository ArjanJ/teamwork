import { UserCompany } from '../../../functions/src/modules/users/types';
import { SET_ACTIVE_SPACE, SET_SPACES } from './types';

interface SetActiveSpace {
  type: typeof SET_ACTIVE_SPACE;
  payload: UserCompany['id'];
}

interface SetSpaces {
  type: typeof SET_SPACES;
  payload: UserCompany[];
}

export function SetActiveSpace(activeSpace: UserCompany['id']) {
  return {
    type: SET_ACTIVE_SPACE,
    payload: activeSpace,
  };
}

export function SetSpaces(spaces: UserCompany[]) {
  return {
    type: SET_SPACES,
    payload: spaces,
  };
}

export type SpacesActions = SetActiveSpace | SetSpaces;
