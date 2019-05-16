import React from 'react';
import renderer from 'react-test-renderer';

import PlacesList from './places-list.jsx';

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

it(`PlacesList correctly renders`, () => {
  const placesList = renderer
    .create(<PlacesList
      places={placeMock}
    />)
    .toJSON();

  expect(placesList).toMatchSnapshot();
});
