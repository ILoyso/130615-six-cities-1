import {
  ActionCreator,
  ActionType,
  reducer
} from './cities';


describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state without parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `Amsterdam`,
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
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city correctly change it`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`
    });
  });
});
