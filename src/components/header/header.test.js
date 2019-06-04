import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header.jsx';


it(`Header correctly renders`, () => {
  const header = renderer
    .create(<Header />)
    .toJSON();

  expect(header).toMatchSnapshot();
});
