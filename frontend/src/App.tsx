import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle, { ModalStyle } from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>
        <GlobalStyle />
        <ModalStyle />
      </Router>
    </React.StrictMode>
  );
};

export default App;
