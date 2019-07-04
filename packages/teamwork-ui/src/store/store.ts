import { composeWithDevTools } from 'redux-devtools-extension';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';

import { callAPIMiddleware } from '../middleware/callAPIMiddleware';

import authReducer from '../modules/auth/reducer';
import teamsReducer from '../modules/teams/reducer';
import userReducer from '../modules/user/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
  user: userReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }

  return appReducer(state, action);
};

/**
 * Required for redux devtools chrome extension.
 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__(): object;
  }
}

const middlewareEnhancer = composeWithDevTools(
  applyMiddleware(callAPIMiddleware),
);

export const store = createStore(rootReducer, middlewareEnhancer);

export type AppState = ReturnType<typeof rootReducer>;
