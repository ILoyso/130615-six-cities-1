import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withSorting} from './with-sorting';
import {SORTING_OPTIONS} from '../../constants/sorting-options';


configure({adapter: new Adapter()});


const MockComponent = () => <div />;
const MockComponentWrapped = withSorting(MockComponent);

const placesMock = [
  {
    id: 1,
    price: 100,
    rating: 100,
    title: `test 1`,
  },
  {
    id: 3,
    price: 25,
    rating: 150,
    title: `test 3`,
  },
  {
    id: 2,
    price: 50,
    rating: 10,
    title: `test 2`,
  },
];


describe(`withSorting`, () => {
  it(`Sorting by default (popular) correctly works`, () => {
    const component = shallow(<MockComponentWrapped
      places={placesMock}
    />);

    expect(component.state().activeOption.id).toEqual(`popular`);
    expect(component.state().options).toEqual(SORTING_OPTIONS);
    expect(component.state().sortingPlaces).toEqual(placesMock);
  });

  it(`Sorting from low to hide correctly works`, () => {
    const component = shallow(<MockComponentWrapped
      places={placesMock}
    />);

    component.props().onChange(`low-to-high`);

    expect(component.state().activeOption.id).toEqual(`low-to-high`);
    expect(component.state().options).toEqual(SORTING_OPTIONS);
    expect(component.state().sortingPlaces).toEqual([
      {
        id: 3,
        price: 25,
        rating: 150,
        title: `test 3`,
      },
      {
        id: 2,
        price: 50,
        rating: 10,
        title: `test 2`,
      },
      {
        id: 1,
        price: 100,
        rating: 100,
        title: `test 1`,
      }
    ]);
  });

  it(`Sorting from hide to low correctly works`, () => {
    const component = shallow(<MockComponentWrapped
      places={placesMock}
    />);

    component.props().onChange(`high-to-low`);

    expect(component.state().activeOption.id).toEqual(`high-to-low`);
    expect(component.state().options).toEqual(SORTING_OPTIONS);
    expect(component.state().sortingPlaces).toEqual([
      {
        id: 1,
        price: 100,
        rating: 100,
        title: `test 1`,
      },
      {
        id: 2,
        price: 50,
        rating: 10,
        title: `test 2`,
      },
      {
        id: 3,
        price: 25,
        rating: 150,
        title: `test 3`,
      }
    ]);
  });

  it(`Sorting by rating correctly works`, () => {
    const component = shallow(<MockComponentWrapped
      places={placesMock}
    />);

    component.props().onChange(`rating`);

    expect(component.state().activeOption.id).toEqual(`rating`);
    expect(component.state().options).toEqual(SORTING_OPTIONS);
    expect(component.state().sortingPlaces).toEqual([
      {
        id: 3,
        price: 25,
        rating: 150,
        title: `test 3`,
      },
      {
        id: 1,
        price: 100,
        rating: 100,
        title: `test 1`,
      },
      {
        id: 2,
        price: 50,
        rating: 10,
        title: `test 2`,
      }
    ]);
  });

});
