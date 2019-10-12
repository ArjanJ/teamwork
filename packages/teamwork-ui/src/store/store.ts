import { applyMiddleware, createStore, Middleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducer/rootReducer';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, middleware);
export type AppState = ReturnType<typeof rootReducer>;
