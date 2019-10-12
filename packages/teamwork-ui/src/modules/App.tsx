import React, { Suspense } from 'react';
import { ModalProvider } from 'react-modal-hook';
import { StoreContext } from 'redux-react-hook';

import { Routes } from '../routes/Routes';
import { store } from '../store/store';
import { GlobalStyles } from '../styles/GlobalStyles';

const App = () => (
  <StoreContext.Provider value={store}>
    <GlobalStyles />
    <ModalProvider>
      <Suspense fallback={null}>
        <Routes />
      </Suspense>
    </ModalProvider>
  </StoreContext.Provider>
);

export default App;
