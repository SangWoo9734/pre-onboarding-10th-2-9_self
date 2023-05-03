import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Search from './pages/Search';
import GlobalStyle from './style/GlobalStyle';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <Search />
    </Provider>
  </React.StrictMode>,
);
