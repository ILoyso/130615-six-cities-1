import NameSpace from '../name-spaces';


const NAME_SPACE_USER = NameSpace.USER;


/**
 * Function for get city
 * @param {Object} state
 * @return {*}
 */
export const getUser = (state) => {
  return state[NAME_SPACE_USER].user;
};


/**
 * Function for get authorization status
 * @param {Object} state
 * @return {*}
 */
export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE_USER].isAuthorizationRequired;
};
