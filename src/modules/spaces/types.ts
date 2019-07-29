import { UserCompany } from '../../../functions/src/modules/users/types';

export const SET_ACTIVE_SPACE = 'SET_ACTIVE_SPACE';
export const SET_SPACES = 'SET_SPACES';

export type ActiveSpace = UserCompany['id'];
export type Spaces = UserCompany[];
