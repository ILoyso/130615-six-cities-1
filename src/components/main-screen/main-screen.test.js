import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});

import {MainScreen} from './main-screen.jsx';


const optionMock = {
  id: `popular`,
  text: `test`
};

const placeMock = [
  {
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

describe(`MainScreen Component`, () => {
  it(`MainScreen correctly renders`, () => {
    const mainScreen = shallow(<MainScreen
      activeItem={{}}
      activeOption={optionMock}
      changeCity={jest.fn()}
      cities={[`Amsterdam`, `Amsterdam2`]}
      city={`Amsterdam`}
      onChangeSorting={jest.fn()}
      options={[optionMock]}
      setActiveItem={jest.fn()}
      places={placeMock}
    />);

    expect(shallowToJson(mainScreen)).toMatchSnapshot();
  });
});
