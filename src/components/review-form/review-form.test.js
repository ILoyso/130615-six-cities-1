import React from 'react';
import renderer from 'react-test-renderer';

import ReviewForm from './review-form.jsx';


it(`ReviewForm correctly renders`, () => {
  const reviewForm = renderer
    .create(<ReviewForm
      id={5}
      onChange={jest.fn()}
      onSendComment={jest.fn()}
      rating={`3`}
      review={`test`}
    />)
    .toJSON();

  expect(reviewForm).toMatchSnapshot();
});
