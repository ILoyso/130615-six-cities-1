import React from 'react';
import renderer from 'react-test-renderer';
import PlacesMap from './places-map.jsx';


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


it(`PlacesMap renders correctly`, () => {
  const map = renderer
    .create(<PlacesMap
      city={`Amsterdam`}
      places={placeMock}
    />)
    .toJSON();

  expect(map).toMatchSnapshot();
});
