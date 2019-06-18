import MockAdapter from 'axios-mock-adapter';

import {createAPI} from '../../api';
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer
} from './user';


describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to GET /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const getAuthorization = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return getAuthorization(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_IN,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to POST /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const logIn = Operation.logIn();

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return logIn(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_IN,
          payload: [{fake: true}],
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state without parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false,
      user: {
        avatarUrl: undefined,
        email: undefined,
        id: undefined,
        isPro: undefined,
        name: undefined,
      }
    });
  });

  it(`Reducer should change required authorization by a given value`, () => {
    expect(reducer({
      isAuthorizationRequired: false,
      user: {
        avatarUrl: undefined,
        email: undefined,
        id: undefined,
        isPro: undefined,
        name: undefined,
      }
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true,
      user: {
        avatarUrl: undefined,
        email: undefined,
        id: undefined,
        isPro: undefined,
        name: undefined,
      }
    });
  });

  it(`Reducer should change user data by a given value`, () => {
    expect(reducer({
      isAuthorizationRequired: false,
      user: {
        avatarUrl: undefined,
        email: undefined,
        id: undefined,
        isPro: undefined,
        name: undefined,
      }
    }, {
      type: ActionType.LOG_IN,
      payload: {
        [`avatar_url`]: `test avatar`,
        [`email`]: `test email`,
        [`id`]: 1,
        [`is_pro`]: true,
        [`name`]: `test name`
      }
    })).toEqual({
      isAuthorizationRequired: false,
      user: {
        avatarUrl: `test avatar`,
        email: `test email`,
        id: 1,
        isPro: true,
        name: `test name`,
      }
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change required authorization correctly change it`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    });
  });

  it(`Action creator for log in correctly works`, () => {
    expect(ActionCreator.logIn({
      [`avatar_url`]: `test avatar`,
      [`email`]: `test email`,
      [`id`]: 1,
      [`is_pro`]: true,
      [`name`]: `test name`
    })).toEqual({
      type: ActionType.LOG_IN,
      payload: {
        [`avatar_url`]: `test avatar`,
        [`email`]: `test email`,
        [`id`]: 1,
        [`is_pro`]: true,
        [`name`]: `test name`
      }
    });
  });
});
