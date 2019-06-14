import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {MainScreen} from './main-screen.jsx';


const placeMock = [
  {
    city: `Amsterdam`,
    coordinates: [52.3909553943508, 4.85309666406198],
    id: 1,
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  }
];


it(`MainScreen correctly renders`, () => {
  const mainScreen = renderer
    .create(<MemoryRouter>
      <MainScreen
        changeCity={jest.fn()}
        cities={[`Amsterdam`, `Amsterdam2`]}
        city={`Amsterdam`}
        places={placeMock}
      />
    </MemoryRouter>)
    .toJSON();

  expect(mainScreen).toMatchSnapshot();
});
