const initialState = {
  isAuthorized: false,
  isAuthorizationRequired: false,
  user: {
    avatarUrl: undefined,
    email: undefined,
    id: undefined,
    isPro: undefined,
    name: undefined,
  },
};


const ActionType = {
  CHECK_AUTHORIZATION: `CHECK_AUTHORIZATION`,
  GET_USER_DATA: `GET_USER_DATA`,
  LOG_IN: `LOG_IN`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};


/**
 * Methods that returns actions for reducer (Object with type and payload params)
 * @return {Object}
 */
const ActionCreator = {
  checkAuthorization: (status) => {
    return {
      type: ActionType.CHECK_AUTHORIZATION,
      payload: status,
    };
  },

  getUserData: (status) => {
    return {
      type: ActionType.GET_USER_DATA,
      payload: status,
    };
  },

  logIn: (status) => {
    return {
      type: ActionType.LOG_IN,
      payload: status,
    };
  },

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};


const Operation = {
  getUserData: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        return dispatch(ActionCreator.getUserData(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  logIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        dispatch(ActionCreator.logIn(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
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
    case ActionType.CHECK_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorized: action.payload,
    });

    case ActionType.GET_USER_DATA: return Object.assign({}, state, {
      user: {
        avatarUrl: action.payload[`avatar_url`],
        email: action.payload[`email`],
        id: action.payload[`id`],
        isPro: action.payload[`is_pro`],
        name: action.payload[`name`],
      }
    });

    case ActionType.LOG_IN: return Object.assign({}, state, {
      user: {
        avatarUrl: action.payload[`avatar_url`],
        email: action.payload[`email`],
        id: action.payload[`id`],
        isPro: action.payload[`is_pro`],
        name: action.payload[`name`],
      }
    });

    case ActionType.REQUIRED_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
