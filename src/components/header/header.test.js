import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header.jsx';


describe(`Header Component`, () => {
  it(`Header correctly renders`, () => {
    const header = renderer
      .create(<Header
        isAuthorized={false}
        onSignInClick={jest.fn()}
        user={{}}
      />)
      .toJSON();

    expect(header).toMatchSnapshot();
  });
});
