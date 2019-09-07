import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';
import MyAccountPage from './My-Account-Page';

const MyAccountPageTwo = withRouter(MyAccountPage);

/* global it */

it('My-Account Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MyAccountPageTwo updateAll={() => (undefined)} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
