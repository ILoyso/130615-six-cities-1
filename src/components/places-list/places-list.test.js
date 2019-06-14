import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import PlacesList from './places-list.jsx';

const placeMock = [
  {
    id: 1,
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
    .create(<MemoryRouter>
      <PlacesList
        places={placeMock}
        setActiveItem={jest.fn()}
      />
    </MemoryRouter>)
    .toJSON();

  expect(placesList).toMatchSnapshot();
});
