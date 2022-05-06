import React, { useEffect } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga4';

// import './serviceWorker';
import GlobalStyle, { ModalStyle } from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize('G-WXWS03ZXHY');
  }, []);

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
