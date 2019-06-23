import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PlaceCard} from './place-card.jsx';


Enzyme.configure({adapter: new Adapter()});

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
  }
};


describe(`PlaceCard Component`, () => {
  it(`Click on place card image correctly works`, () => {
    const {info} = placeMock;
    const onCardImageClick = jest.fn();
    const onTitleClick = jest.fn();
    const setFavorite = jest.fn();

    const placeCard = shallow(<PlaceCard
      info={info}
      onCardImageClick={onCardImageClick}
      onTitleClick={onTitleClick}
      setFavorite={setFavorite}
    />);

    const cardImage = placeCard.find(`.place-card__image-wrapper a`);
    cardImage.simulate(`click`, {
      preventDefault: () => {}
    });

    expect(onCardImageClick).toHaveBeenCalledTimes(1);
  });

  it(`Click on place card favorite correctly works`, () => {
    const {info} = placeMock;
    const onCardImageClick = jest.fn();
    const onTitleClick = jest.fn();
    const setFavorite = jest.fn();

    const placeCard = shallow(<PlaceCard
      info={info}
      onCardImageClick={onCardImageClick}
      onTitleClick={onTitleClick}
      setFavorite={setFavorite}
    />);

    const button = placeCard.find(`.place-card__bookmark-button`);
    button.simulate(`click`);

    expect(setFavorite).toHaveBeenCalledTimes(1);
  });
});
