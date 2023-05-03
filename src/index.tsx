import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './pages/Search';
import GlobalStyle from './style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Search />
  </React.StrictMode>,
);
