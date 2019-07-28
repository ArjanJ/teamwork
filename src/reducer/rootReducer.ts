import { combineReducers } from 'redux';

import authReducer from '../modules/auth/reducer';
import teamsReducer from '../modules/teams/reducer';
import userReducer from '../modules/user/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
  user: userReducer,
});
