import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

const placeMock = [
  {
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  }
];

it(`App correctly renders`, () => {
  const tree = renderer
    .create(<App
      places={placeMock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
