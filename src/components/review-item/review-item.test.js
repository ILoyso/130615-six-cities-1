import React from 'react';
import renderer from 'react-test-renderer';

import ReviewItem from './review-item.jsx';


const commentMock = {
  user: {
    isPro: true,
    name: `name`,
    avatar: `avatar`,
  },
  rating: 4,
  comment: `comment`,
  date: `date`,
};

it(`ReviewItem correctly renders`, () => {
  const reviewItem = renderer
    .create(<ReviewItem
      commentItem={commentMock}
    />)
    .toJSON();

  expect(reviewItem).toMatchSnapshot();
});
