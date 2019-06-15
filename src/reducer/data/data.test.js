import MockAdapter from 'axios-mock-adapter';

import PlacesParser from '../../utils/places-parser';
import CommentsParser from '../../utils/comments-parser';
import {createAPI} from '../../api';
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer
} from './data';


describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const placesLoader = Operation.loadPlaces();

    const mockPlaces = [
      {
        'bedrooms': 3,
        'city': {
          'name': `Amsterdam`,
          'location': {
            'latitude': 52.370216,
            'longitude': 4.895168,
            'zoom': 10
          }
        },
        'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        'goods': [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        'host': {
          'id': 3,
          'is_pro': true,
          'name': `Angelina`,
          'avatar_url': `img/1.png`
        },
        'id': 1,
        'images': [`img/1.png`, `img/2.png`],
        'is_favorite': false,
        'is_premium': false,
        'location': {
          'latitude': 52.35514938496378,
          'longitude': 4.673877537499948,
          'zoom': 8
        },
        'max_adults': 4,
        'preview_image': `img/1.png`,
        'price': 120,
        'rating': 4.8,
        'title': `Beautiful & luxurious studio at great location`,
        'type': `apartment`
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

  it(`Should make a correct API call to /comments/10`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const commentsLoader = Operation.loadComments(10);

    const mockComments = [
      {
        'comment': `test comment`,
        'date': `test date`,
        'id': 1,
        'rating': 4,
        'user': {
          'id': 1,
          'is_pro': true,
          'name': `test name`,
          'avatar_url': `test avatar`,
        },
      }
    ];

    const mockResponse = {
      data: mockComments
    };

    apiMock
      .onGet(`/comments/10`)
      .reply(200, mockComments);

    return commentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: CommentsParser.parseComments(mockResponse.data)
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`returns initial state without parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
      comments: [],
      places: []
    });
  });

  it(`Reducer should change places by a given value`, () => {
    expect(reducer({
      comments: [],
      places: []
    }, {
      type: ActionType.LOAD_PLACES,
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
      comments: [],
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

  it(`Reducer should change comments by a given value`, () => {
    expect(reducer({
      comments: [],
      places: []
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: [
        {
          user: {
            isPro: true,
            name: `test name`,
            avatar: `test avatar`,
          },
          rating: 4,
          comment: `test comment`,
          date: `test date`,
        }
      ],
    })).toEqual({
      comments: [
        {
          user: {
            isPro: true,
            name: `test name`,
            avatar: `test avatar`,
          },
          rating: 4,
          comment: `test comment`,
          date: `test date`,
        }
      ],
      places: []
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load places correctly works`, () => {
    expect(ActionCreator.loadPlaces([
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
      type: ActionType.LOAD_PLACES,
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

  it(`Action creator for load comments correctly works`, () => {
    expect(ActionCreator.loadComments([
      {
        user: {
          isPro: true,
          name: `test name`,
          avatar: `test avatar`,
        },
        rating: 4,
        comment: `test comment`,
        date: `test date`,
      }
    ])).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: [
        {
          user: {
            isPro: true,
            name: `test name`,
            avatar: `test avatar`,
          },
          rating: 4,
          comment: `test comment`,
          date: `test date`,
        }
      ]
    });
  });
});
