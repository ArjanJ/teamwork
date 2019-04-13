import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Routes } from './routes/Routes';

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Routes />
  </Provider>
);

export default App;
