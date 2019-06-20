import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MainScreen} from './main-screen.jsx';

configure({adapter: new Adapter()});


it(`MainScreen correctly renders`, () => {
  const mainScreen = shallow(<MainScreen
    changeCity={jest.fn()}
    cities={[`Amsterdam`, `Amsterdam2`]}
    city={`Amsterdam`}
  />);

  expect(mainScreen).toMatchSnapshot();
});
