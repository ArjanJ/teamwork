import { combineReducers, createStore } from 'redux';

import authReducer from '../modules/auth/reducer';
import userReducer from '../modules/user/reducer';

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__(): object;
  }
}

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
