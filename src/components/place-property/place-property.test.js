import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from 'enzyme-to-json';


Enzyme.configure({adapter: new Adapter()});

import {PlaceProperty} from './place-property.jsx';


const placeMock = {
  bedrooms: 5,
  city: `Test City`,
  description: `Test Description`,
  goods: [`Good1`, `Good2`],
  host: {
    avatar: `testAvatar`,
    isPro: true,
    name: `testName`,
  },
  id: 1,
  images: [`Img1`, `Img2`],
  isFavorite: true,
  isPremium: true,
  maxAdults: 5,
  price: 200,
  rating: 3.1,
  title: `Test Title`,
  type: `Test Type`,
};

const nearestPlaceMock = [{
  bedrooms: 5,
  coordinates: [100, 300],
  description: `Test Description`,
  goods: [`Good1`, `Good2`],
  host: {
    avatar: `testAvatar`,
    isPro: true,
    name: `testName`,
  },
  id: 1,
  img: `test img`,
  images: [`Img1`, `Img2`],
  isPremium: true,
  maxAdults: 5,
  price: 200,
  rating: 3.1,
  title: `Test Title`,
  type: `Test Type`,
}];

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

describe(`PlaceProperty Component`, () => {
  it(`PlaceProperty correctly renders`, () => {
    const placeProperty = shallow(<PlaceProperty
      comments={commentMock}
      isAuthorizationRequired={true}
      loadComments={jest.fn()}
      nearestPlaces={nearestPlaceMock}
      place={placeMock}
      setFavorite={jest.fn()}
    />);

    expect(shallowToJson(placeProperty)).toMatchSnapshot();
  });
});
