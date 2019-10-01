import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SpesificItemPage from './Spesific-Item-Page';
import { BrowserRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });
const props = {
  params: { name: 'hej' }
};

describe('<SpesificItemPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<BrowserRouter
    >
      <SpesificItemPage match={props} />
    </BrowserRouter>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });
});
