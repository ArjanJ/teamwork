import { combineReducers } from 'redux';

import authReducer from '../modules/auth/reducer';
import spacesReducer from '../modules/spaces/reducer';
import teamsReducer from '../modules/teams/reducer';
import userReducer from '../modules/user/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  spaces: spacesReducer,
  teams: teamsReducer,
  user: userReducer,
});
