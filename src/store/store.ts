import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { callAPIMiddleware } from '../middleware/callAPIMiddleware';

import authReducer from '../modules/auth/reducer';
import teamsReducer from '../modules/teams/reducer';
import userReducer from '../modules/user/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
  user: userReducer,
});

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
