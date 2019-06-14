import React from 'react';
import renderer from 'react-test-renderer';

import PlaceProperty from './place-property.jsx';


const placeMock = {
  bedrooms: 5,
  description: `Test Description`,
  goods: [`Good1`, `Good2`],
  host: {
    avatar: `testAvatar`,
    isPro: true,
    name: `testName`,
  },
  images: [`Img1`, `Img2`],
  isPremium: true,
  maxAdults: 5,
  price: 200,
  rating: 3.1,
  title: `Test Title`,
  type: `Test Type`,
};

it(`PlaceProperty correctly renders`, () => {
  const placeProperty = renderer
    .create(<PlaceProperty
      place={placeMock}
    />)
    .toJSON();

  expect(placeProperty).toMatchSnapshot();
});
