import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card.jsx';


Enzyme.configure({adapter: new Adapter()});

const placeMock = {
  img: `apartment-01.jpg`,
  isPremium: true,
  onTitleClick: jest.fn(),
  price: 120,
  rating: 93,
  title: `Beautiful & luxurious apartment at great location`,
  type: `apartment`
};

it(`Click on place card title correctly works`, () => {
  const welcomeScreen = shallow(<PlaceCard
    img={placeMock.img}
    isPremium={placeMock.isPremium}
    onTitleClick={placeMock.onTitleClick}
    price={placeMock.price}
    rating={placeMock.rating}
    title={placeMock.title}
    type={placeMock.type}
  />);

  const startButton = welcomeScreen.find(`.place-card__name a`);
  startButton.simulate(`click`);

  expect(placeMock.onTitleClick).toHaveBeenCalledTimes(1);
});
