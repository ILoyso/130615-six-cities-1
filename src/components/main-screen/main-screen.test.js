import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {MainScreen} from './main-screen.jsx';


const optionMock = {
  id: `popular`,
  text: `test`
};

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

it(`MainScreen correctly renders`, () => {
  const mainScreen = renderer
    .create(<MemoryRouter>
      <MainScreen
        activeItem={{}}
        activeOption={optionMock}
        changeCity={jest.fn()}
        cities={[`Amsterdam`, `Amsterdam2`]}
        city={`Amsterdam`}
        onChangeSorting={jest.fn()}
        options={[optionMock]}
        setActiveItem={jest.fn()}
        places={placeMock}
      />
    </MemoryRouter>)
    .toJSON();

  expect(mainScreen).toMatchSnapshot();
});
