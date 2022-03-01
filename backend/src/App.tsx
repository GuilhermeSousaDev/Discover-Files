import React from 'react';
import Router from './routes';
import { AuthProvider } from './services/Context';

import { GlobalStyle } from './styles/global';

function App() {
  return (
    <AuthProvider>
      <Router />
      <GlobalStyle />
    </AuthProvider>
  )
}

export default App;
