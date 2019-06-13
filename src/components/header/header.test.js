import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {Header} from './header.jsx';


describe(`Header Component`, () => {
  it(`Header correctly renders`, () => {
    const header = renderer
      .create(<MemoryRouter>
        <Header
          isAuthorizationRequired={false}
          user={{}}
        />
      </MemoryRouter>)
      .toJSON();

    expect(header).toMatchSnapshot();
  });
});
