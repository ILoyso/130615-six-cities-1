import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCard from './place-card.jsx';


const placeMock = {
  info: {
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  },
  onCardHover: jest.fn(),
  onCardImageClick: jest.fn(),
  onTitleClick: jest.fn()
};

it(`Place card correctly renders`, () => {
  const placeCard = renderer
    .create(<PlaceCard
      info={placeMock.info}
      onCardHover={placeMock.onCardHover}
      onCardImageClick={placeMock.onCardImageClick}
      onTitleClick={placeMock.onTitleClick}
    />)
    .toJSON();

  expect(placeCard).toMatchSnapshot();
});
