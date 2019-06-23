import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import FavoritesEmpty from './favotires-empty.jsx';


it(`Favorites correctly renders`, () => {
  const favoritesEmpty = renderer
    .create(<MemoryRouter>
      <FavoritesEmpty />
    </MemoryRouter>)
    .toJSON();

  expect(favoritesEmpty).toMatchSnapshot();
});
