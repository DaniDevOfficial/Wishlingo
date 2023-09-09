import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App'; // or wherever your components are located
import { DataProvider } from './Components/DataContext'; // Adjust the path

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
);
