import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {PlaceCard} from './place-card.jsx';


const placeMock = {
  info: {
    id: 1,
    img: `apartment-01.jpg`,
    isFavorite: true,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  },
  onCardHover: jest.fn(),
  onCardImageClick: jest.fn(),
  onTitleClick: jest.fn(),
  setFavorite: jest.fn()
};

it(`Place card correctly renders`, () => {
  const placeCard = renderer
    .create(<MemoryRouter>
      <PlaceCard
        info={placeMock.info}
        isAuthorizationRequired={false}
        onCardHover={placeMock.onCardHover}
        onCardImageClick={placeMock.onCardImageClick}
        onTitleClick={placeMock.onTitleClick}
        setFavorite={placeMock.setFavorite}
      />
    </MemoryRouter>)
    .toJSON();

  expect(placeCard).toMatchSnapshot();
});
