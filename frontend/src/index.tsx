import React from 'react';
import ReactDOM from 'react-dom';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import App from './App';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

