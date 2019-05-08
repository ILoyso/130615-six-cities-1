import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCard from './place-card.jsx';

const placeMock = {
  img: `apartment-01.jpg`,
  isPremium: true,
  price: 120,
  rating: 93,
  title: `Beautiful & luxurious apartment at great location`,
  type: `apartment`
};

it(`Place card correctly renders`, () => {
  const tree = renderer
    .create(<PlaceCard
      img={placeMock.img}
      isPremium={placeMock.isPremium}
      price={placeMock.price}
      rating={placeMock.rating}
      title={placeMock.title}
      type={placeMock.type}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
