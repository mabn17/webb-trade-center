import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';
import AllItemsPage from './All-Items-Page';

const AllItemsPageTwo = withRouter(AllItemsPage);

/* global it */

it('My-Account Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AllItemsPageTwo updateAll={() => (undefined)} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

