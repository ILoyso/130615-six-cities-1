import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card.jsx';


Enzyme.configure({adapter: new Adapter()});

const placeMock = {
  info: {
    id: 1,
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


describe(`PlaceCard Component`, () => {
  it(`Click on place card image returns active card`, () => {
    const {
      info,
      onCardHover,
      onCardImageClick,
      onTitleClick
    } = placeMock;

    onCardImageClick.mockReturnValue(info);

    const placeCard = shallow(<PlaceCard
      info={info}
      onCardHover={onCardHover}
      onCardImageClick={onCardImageClick}
      onTitleClick={onTitleClick}
    />);

    const cardImage = placeCard.find(`.place-card__image-wrapper a`);
    cardImage.simulate(`click`, {
      preventDefault: () => {}
    });

    expect(placeMock.onCardImageClick).toHaveBeenCalledTimes(1);
    expect(placeMock.onCardImageClick.mock.results[0].value).toEqual(info);
  });
});
