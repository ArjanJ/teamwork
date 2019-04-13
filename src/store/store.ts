import { combineReducers, createStore } from 'redux';

import { authReducer } from '../modules/auth/authReducer';

const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(reducers);
