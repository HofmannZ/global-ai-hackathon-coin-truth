import React from 'react';
import ReactDOM from 'react-dom';
import Whitepaper from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Whitepaper />, div);
});
