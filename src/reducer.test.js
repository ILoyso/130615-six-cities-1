import {
  ActionCreator,
  reducer
} from './reducer';
import {PLACES_DATA} from './mock/places';


describe(`Reducer works correctly`, () => {
  it(`returns initial state without parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `Amsterdam`,
      places: PLACES_DATA
    });
  });

  it(`Reducer should change city by a given value`, () => {
    expect(reducer({
      city: `Amsterdam`,
      places: []
    }, {
      type: `CHANGE_CITY`,
      payload: `New City`,
    })).toEqual({
      city: `New City`,
      places: []
    });
  });

  it(`Reducer should change places by a given value`, () => {
    expect(reducer({
      city: `Amsterdam`,
      places: [
        {
          coordinates: [5, 10],
          img: `src`,
          isPremium: true,
          price: 100,
          rating: 10,
          title: `Title`,
          type: `apartment`
        }
      ]
    }, {
      type: `CHANGE_PLACES`,
      payload: [
        {
          coordinates: [10, 10],
          img: `src`,
          isPremium: false,
          price: 50,
          rating: 5,
          title: `Title`,
          type: `apartment`
        }
      ],
    })).toEqual({
      city: `Amsterdam`,
      places: [
        {
          coordinates: [10, 10],
          img: `src`,
          isPremium: false,
          price: 50,
          rating: 5,
          title: `Title`,
          type: `apartment`
        }
      ]
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city correctly change it`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Amsterdam`
    });
  });

  it(`Action creator for change places correctly change it`, () => {
    expect(ActionCreator.changePlaces([
      {
        coordinates: [10, 10],
        img: `src`,
        isPremium: false,
        price: 50,
        rating: 5,
        title: `Title`,
        type: `apartment`
      }
    ])).toEqual({
      type: `CHANGE_PLACES`,
      payload: [
        {
          coordinates: [10, 10],
          img: `src`,
          isPremium: false,
          price: 50,
          rating: 5,
          title: `Title`,
          type: `apartment`
        }
      ]
    });
  });
});
