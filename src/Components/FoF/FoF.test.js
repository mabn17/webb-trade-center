import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FoF from './FoF-Page';

/* global it */

it('404 renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <FoF />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
