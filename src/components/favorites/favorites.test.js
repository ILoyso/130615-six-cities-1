import React from 'react';
import renderer from 'react-test-renderer';

import Favorites from './favorites.jsx';


it(`Favorites correctly renders`, () => {
  const favorites = renderer
    .create(<Favorites />)
    .toJSON();

  expect(favorites).toMatchSnapshot();
});
