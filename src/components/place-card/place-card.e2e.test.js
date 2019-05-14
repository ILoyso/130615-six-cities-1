import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card.jsx';


Enzyme.configure({adapter: new Adapter()});

const placeMock = {
  info: {
    img: `apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  },
  onTitleClick: jest.fn()
};

it(`Click on place card title correctly works`, () => {
  const welcomeScreen = shallow(<PlaceCard
    info={placeMock.info}
    onTitleClick={placeMock.onTitleClick}
  />);

  const startButton = welcomeScreen.find(`.place-card__name a`);
  startButton.simulate(`click`);

  expect(placeMock.onTitleClick).toHaveBeenCalledTimes(1);
});
