import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducer/rootReducer';

const middlewareEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(rootReducer, middlewareEnhancer);
export type AppState = ReturnType<typeof rootReducer>;

/**
 * Required for redux devtools chrome extension.
 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__(): object;
  }
}
