import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import { HeaderMenu } from './components/';

function App() {
  return (
    <BrowserRouter>
      <HeaderMenu />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
