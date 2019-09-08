import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Items from './All-Items-Page';

/* global it */

it('My-Account Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Items token={''} item={{ id: 1, name: 'a', description: 'a', picture: 'hej' }} key={1} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
