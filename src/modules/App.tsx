import React from 'react';
import { StoreContext } from 'redux-react-hook';

import { store } from '../store/store';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Routes } from './routes/Routes';

const App = () => (
  <StoreContext.Provider value={store}>
    <GlobalStyles />
    <Routes />
  </StoreContext.Provider>
);

export default App;
