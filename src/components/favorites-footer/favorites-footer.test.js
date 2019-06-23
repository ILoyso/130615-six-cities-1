import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import FavoritesFooter from './favorites-footer.jsx';


it(`Favorites correctly renders`, () => {
  const favoritesFooter = renderer
    .create(<MemoryRouter>
      <FavoritesFooter />
    </MemoryRouter>)
    .toJSON();

  expect(favoritesFooter).toMatchSnapshot();
});
