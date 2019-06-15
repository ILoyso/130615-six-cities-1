import React from 'react';
import renderer from 'react-test-renderer';

import {PlaceProperty} from './place-property.jsx';


const placeMock = {
  bedrooms: 5,
  description: `Test Description`,
  goods: [`Good1`, `Good2`],
  host: {
    avatar: `testAvatar`,
    isPro: true,
    name: `testName`,
  },
  id: 1,
  images: [`Img1`, `Img2`],
  isPremium: true,
  maxAdults: 5,
  price: 200,
  rating: 3.1,
  title: `Test Title`,
  type: `Test Type`,
};

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

it(`PlaceProperty correctly renders`, () => {
  const placeProperty = renderer
    .create(<PlaceProperty
      comments={commentMock}
      loadComments={jest.fn()}
      place={placeMock}
    />)
    .toJSON();

  expect(placeProperty).toMatchSnapshot();
});
