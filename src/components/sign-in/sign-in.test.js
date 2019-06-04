import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in.jsx';


it(`SignIn correctly renders`, () => {
  const signIn = renderer
    .create(<SignIn />)
    .toJSON();

  expect(signIn).toMatchSnapshot();
});
