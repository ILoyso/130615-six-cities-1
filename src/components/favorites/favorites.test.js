import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});

import {Favorites} from './favorites.jsx';


const placeMock = [
  {
    city: `Amsterdam`,
    coordinates: [100, 100],
    id: 1,
    img: `apartment-01.jpg`,
    isFavorite: true,
    isPremium: true,
    price: 120,
    rating: 93,
    title: `Beautiful & luxurious apartment at great location`,
    type: `apartment`
  }
];

const citiesMock = new Set([`Amsterdam`]);

describe(`Favorites Component`, () => {
  it(`Favorites correctly renders`, () => {
    const favorites = shallow(<Favorites
      cities={citiesMock}
      places={placeMock}
    />);

    expect(shallowToJson(favorites)).toMatchSnapshot();
  });
});
