import {createSelector} from 'reselect';

import NameSpace from '../name-spaces';
import {calcDistance} from '../../utils/utils';


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
 * Function for get comment sending status
 * @param {Object} state
 * @return {*}
 */
export const getCommentSendingStatus = (state) => {
  return state[NAME_SPACE_DATA].isCommentSending;
};


/**
 * Function for get comment error
 * @param {Object} state
 * @return {*}
 */
export const getCommentError = (state) => {
  return state[NAME_SPACE_DATA].errorCommentsSend;
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


/**
 * Function for get all favorite places (sort by isFavorite)
 * @param {Object} state
 * @return {Array}
 */
export const getFavoritePlaces = createSelector(
    getPlaces,
    (places) => places.filter((place) => place.isFavorite)
);


/**
 * Function for get all cities where user has favorite places
 * @param {Object} state
 * @return {Array}
 */
export const getFavoriteCities = createSelector(
    getFavoritePlaces,
    (places) => new Set(places.map((place) => place.city))
);


/**
 * Function for find three nearest places
 * @param {Object} state
 * @param {Number} id
 * @return {*}
 */
export const getNearestPlaces = (state, id) => {
  const allPlaces = getPlaces(state);
  const currentPlace = allPlaces.find((place) => place.id === id);

  return allPlaces.sort((a, b) => {
    const firstDist = calcDistance(currentPlace.coordinates, a.coordinates);
    const secondDist = calcDistance(currentPlace.coordinates, b.coordinates);

    return firstDist - secondDist;
  }).slice(1, 4);
};
