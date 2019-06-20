import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {PlacesWrapper} from './places-wrapper.jsx';


const placeMock = [
  {
    coordinates: [100, 100],
    id: 1,
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  }
];


it(`PlacesWrapper correctly renders`, () => {
  const placesWrapper = renderer
    .create(<MemoryRouter>
      <PlacesWrapper
        activeOption={{
          id: `test`,
          text: `test`
        }}
        city={`test`}
        onChange={jest.fn()}
        options={[{
          id: `test`,
          text: `test`
        }]}
        sortingPlaces={placeMock}
      />
    </MemoryRouter>)
    .toJSON();

  expect(placesWrapper).toMatchSnapshot();
});
