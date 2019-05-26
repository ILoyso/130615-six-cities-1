import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list.jsx';


it(`CitiesList correctly renders`, () => {
  const citiesList = renderer
    .create(<CitiesList
      changeCity={jest.fn()}
      cities={[`Amsterdam`, `Amsterdam2`]}
      city={`Amsterdam`}
    />)
    .toJSON();

  expect(citiesList).toMatchSnapshot();
});
