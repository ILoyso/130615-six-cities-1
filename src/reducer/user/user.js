const initialState = {
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
  LOG_IN: `LOG_IN`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};


/**
 * Methods that returns actions for reducer (Object with type and payload params)
 * @return {Object}
 */
const ActionCreator = {
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
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api.get(`/login`)
        .then((response) => {
          if (response && response.status === 200) {
            dispatch(ActionCreator.logIn(response.data));
          }
        })
        .catch((err) => {
          throw err;
        });
    };
  },

  logIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        dispatch(ActionCreator.logIn(response.data));
        dispatch(ActionCreator.requireAuthorization(false));
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
