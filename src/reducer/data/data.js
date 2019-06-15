import PlacesParser from '../../utils/places-parser';
import CommentsParser from '../../utils/comments-parser';


const initialState = {
  comments: [],
  places: []
};


const ActionType = {
  CHANGE_PLACES: `CHANGE_PLACES`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_PLACES: `LOAD_PLACES`,
};


/**
 * Methods that returns actions for reducer (Object with type and payload params)
 * @return {Object}
 */
const ActionCreator = {
  changePlaces: (places) => ({
    type: ActionType.CHANGE_PLACES,
    payload: places
  }),

  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },

  loadPlaces: (places) => {
    return {
      type: ActionType.LOAD_PLACES,
      payload: places,
    };
  }
};


const Operation = {
  loadComments: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(CommentsParser.parseComments(response.data)));
      });
  },

  loadPlaces: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadPlaces(PlacesParser.parsePlaces(response.data)));
      });
  },
};


/**
 * Reducer for change application state
 * @param {Object} state [state = initialState]
 * @param {Object} action
 * @param {String} action.type
 * @return {Object}
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_PLACES:
      return Object.assign({}, state, {
        places: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload,
      });

    case ActionType.LOAD_PLACES:
      return Object.assign({}, state, {
        places: action.payload,
      });
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
