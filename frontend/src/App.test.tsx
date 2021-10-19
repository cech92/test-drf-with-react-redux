import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Login } from './components/Login';

test('Test app renders successfully', () => {
  render(<App />);
});
