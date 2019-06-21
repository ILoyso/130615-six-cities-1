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
  it(`Should make a correct API call to GET /hotels`, function () {
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

  it(`Should make a correct API call to GET /comments/10`, function () {
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

  it(`Should make a correct API call to POST /comments/10`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const sendComments = Operation.sendComments(10, {
      comment: ``,
      rating: 5
    });

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
      .onPost(`/comments/10`)
      .reply(200, mockComments);

    return sendComments(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_COMMENT,
          payload: CommentsParser.parseComments(mockResponse.data)
        });
      });
  });

  it(`Should make a correct API call to POST /favorite/10/1`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const setFavorite = Operation.setFavorite({
      id: 10,
      isFavorite: false
    });

    const mockPlace = {
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
    };

    const mockResponse = {
      data: mockPlace
    };

    apiMock
      .onPost(`/favorite/10/1`)
      .reply(200, mockPlace);

    return setFavorite(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_PLACE,
          payload: PlacesParser.parsePlaces(mockResponse.data)
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`returns initial state without parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `Amsterdam`,
      comments: [],
      places: []
    });
  });

  it(`Reducer should change city by a given value`, () => {
    expect(reducer({
      city: `Amsterdam`
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `New City`,
    })).toEqual({
      city: `New City`
    });
  });

  it(`Reducer should change places by a given value`, () => {
    expect(reducer({
      city: `Amsterdam`,
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
      city: `Amsterdam`,
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
      city: `Amsterdam`,
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
      city: `Amsterdam`,
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

  it(`Reducer should update comments by a given value`, () => {
    expect(reducer({
      city: `Amsterdam`,
      comments: [],
      places: []
    }, {
      type: ActionType.POST_COMMENT,
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
      city: `Amsterdam`,
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

  it(`Reducer should update place by a given value`, () => {
    expect(reducer({
      city: `Amsterdam`,
      comments: [],
      places: [
        {
          coordinates: [10, 10],
          id: 10,
          img: `src`,
          isPremium: false,
          price: 50,
          rating: 5,
          title: `Title`,
          type: `apartment`
        },
        {
          coordinates: [100, 100],
          id: 15,
          img: `src`,
          isPremium: false,
          price: 500,
          rating: 50,
          title: `Title 2`,
          type: `apartment 2`
        }
      ]
    }, {
      type: ActionType.UPDATE_PLACE,
      payload: {
        coordinates: [100, 100],
        id: 15,
        img: `src`,
        isPremium: false,
        price: 1,
        rating: 1,
        title: `1`,
        type: `1`
      },
    })).toEqual({
      city: `Amsterdam`,
      comments: [],
      places: [
        {
          coordinates: [10, 10],
          id: 10,
          img: `src`,
          isPremium: false,
          price: 50,
          rating: 5,
          title: `Title`,
          type: `apartment`
        },
        {
          coordinates: [100, 100],
          id: 15,
          img: `src`,
          isPremium: false,
          price: 1,
          rating: 1,
          title: `1`,
          type: `1`
        }
      ]
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city correctly change it`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`
    });
  });

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

  it(`Action creator for post comments correctly works`, () => {
    expect(ActionCreator.postComment([
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
      type: ActionType.POST_COMMENT,
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

  it(`Action creator for update place correctly works`, () => {
    expect(ActionCreator.updatePlace({
      coordinates: [10, 10],
      img: `src`,
      isPremium: false,
      price: 50,
      rating: 5,
      title: `Title`,
      type: `apartment`
    })).toEqual({
      type: ActionType.UPDATE_PLACE,
      payload: {
        coordinates: [10, 10],
        img: `src`,
        isPremium: false,
        price: 50,
        rating: 5,
        title: `Title`,
        type: `apartment`
      }
    });
  });
});
