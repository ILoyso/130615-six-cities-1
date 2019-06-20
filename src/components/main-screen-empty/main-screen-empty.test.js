import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {MainScreenEmpty} from './main-screen-empty.jsx';


it(`MainScreenEmpty correctly renders`, () => {
  const mainScreenEmpty = renderer
    .create(<MemoryRouter>
      <MainScreenEmpty
        changeCity={jest.fn()}
        cities={[`Amsterdam`, `Amsterdam2`]}
        city={`Amsterdam`}
        onChangeSorting={jest.fn()}
      />
    </MemoryRouter>)
    .toJSON();

  expect(mainScreenEmpty).toMatchSnapshot();
});
