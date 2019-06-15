import {createSelector} from 'reselect';

import NameSpace from '../name-spaces';


const NAME_SPACE_DATA = NameSpace.DATA;


/**
 * Function for get city
 * @param {Object} state
 * @return {*}
 */
export const getCity = (state) => {
  return state[NAME_SPACE_DATA].city;
};


/**
 * Function for get comments
 * @param {Object} state
 * @return {*}
 */
export const getComments = (state) => {
  return state[NAME_SPACE_DATA].comments;
};


/**
 * Function for get all places
 * @param {Object} state
 * @return {Array}
 */
export const getPlaces = (state) => {
  return state[NAME_SPACE_DATA].places;
};


/**
 * Function for get all cities
 * @param {Object} state
 * @return {Array}
 */
export const getCities = createSelector(
    getPlaces,
    (places) => [...new Set(places.map((place) => place.city))].slice(0, 6)
);


/**
 * Function for get all current places (sort by current city)
 * @param {Object} state
 * @return {Array}
 */
export const getCurrentPlaces = createSelector(
    getCity,
    getPlaces,
    (city, places) => places.filter((place) => place.city === city)
);
