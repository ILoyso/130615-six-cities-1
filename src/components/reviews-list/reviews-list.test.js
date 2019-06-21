import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsList from './reviews-list.jsx';


const commentMock = [{
  user: {
    isPro: true,
    name: `name`,
    avatar: `avatar`,
  },
  rating: 4,
  comment: `comment`,
  date: `date`,
}];

it(`ReviewsList correctly renders`, () => {
  const reviewsList = renderer
    .create(<ReviewsList
      comments={commentMock}
      id={5}
      isAuthorizationRequired={true}
    />)
    .toJSON();

  expect(reviewsList).toMatchSnapshot();
});
