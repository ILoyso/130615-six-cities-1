import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';


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


it(`App correctly renders`, () => {
  const app = renderer
    .create(<App
      changeCity={jest.fn()}
      cities={[`Amsterdam`, `Amsterdam2`]}
      city={`Amsterdam`}
      places={placeMock}
    />).toJSON();

  expect(app).toMatchSnapshot();
});
