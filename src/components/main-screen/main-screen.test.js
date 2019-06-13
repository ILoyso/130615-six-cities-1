import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MainScreen} from './main-screen.jsx';

configure({adapter: new Adapter()});

const placeMock = [
  {
    city: `Amsterdam`,
    coordinates: [52.3909553943508, 4.85309666406198],
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  }
];


it(`MainScreen correctly renders`, () => {
  const mainScreen = shallow(<MainScreen
    changeCity={jest.fn()}
    cities={[`Amsterdam`, `Amsterdam2`]}
    city={`Amsterdam`}
    places={placeMock}
  />);

  expect(mainScreen).toMatchSnapshot();
});
