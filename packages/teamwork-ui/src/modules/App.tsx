import React from 'react';
import { ModalProvider } from 'react-modal-hook';
import { StoreContext } from 'redux-react-hook';

import { store } from '../store/store';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Routes } from '../routes/Routes';

const App = () => (
  <StoreContext.Provider value={store}>
    <GlobalStyles />
    <ModalProvider>
      <Routes />
    </ModalProvider>
  </StoreContext.Provider>
);

export default App;
