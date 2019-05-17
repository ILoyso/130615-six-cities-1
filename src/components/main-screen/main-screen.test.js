import React from 'react';
import renderer from 'react-test-renderer';

import MainScreen from './main-screen.jsx';

const placeMock = [
  {
    coordinates: [52.3909553943508, 4.85309666406198],
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  }
];

it(`App correctly renders`, () => {
  const mainScreen = renderer
    .create(<MainScreen
      places={placeMock}
    />)
    .toJSON();

  expect(mainScreen).toMatchSnapshot();
});
