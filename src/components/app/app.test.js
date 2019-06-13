import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

configure({adapter: new Adapter()});


it(`App correctly renders`, () => {
  const app = shallow(<App />);

  expect(app).toMatchSnapshot();
});
