import MockAdapter from 'axios-mock-adapter';

import PlacesParser from '../../utils/places-parser';
import {createAPI} from '../../api';
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer
} from './data';


describe(`Reducer works correctly`, () => {
  it(`returns initial state without parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
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
      type: ActionType.CHANGE_PLACES,
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
      type: ActionType.CHANGE_PLACES,
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

  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const placesLoader = Operation.loadPlaces();

    const mockPlaces = [
      {
        'id': 1,
        'city': {
          'name': `Amsterdam`,
          'location': {
            'latitude': 52.370216,
            'longitude': 4.895168,
            'zoom': 10
          }
        },
        'preview_image': `img/1.png`,
        'images': [`img/1.png`, `img/2.png`],
        'title': `Beautiful & luxurious studio at great location`,
        'is_favorite': false,
        'is_premium': false,
        'rating': 4.8,
        'type': `apartment`,
        'bedrooms': 3,
        'max_adults': 4,
        'price': 120,
        'goods': [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        'host': {
          'id': 3,
          'is_pro': true,
          'name': `Angelina`,
          'avatar_url': `img/1.png`
        },
        'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        'location': {
          'latitude': 52.35514938496378,
          'longitude': 4.673877537499948,
          'zoom': 8
        }
      }
    ];

    const mockResponse = {
      data: mockPlaces
    };

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockPlaces);

    return placesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PLACES,
          payload: PlacesParser.parsePlaces(mockResponse.data)
        });
      });
  });
});
