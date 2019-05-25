import {PLACES_DATA} from './mock/places';


const initialState = {
  city: `Amsterdam`,
  places: PLACES_DATA
};


const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_PLACES: `CHANGE_PLACES`
};


/**
 * Reducer for change application state
 * @param {Object} state [state = initialState]
 * @param {Object} action
 * @param {Number} action.payload
 * @param {String} action.type
 * @return {Object}
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });

    case ActionType.CHANGE_PLACES:
      return Object.assign({}, state, {
        places: action.payload,
      });
  }

  return state;
};


export {reducer};
