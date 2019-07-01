const STAR_PERCENT = 20;

/**
 * Function for convert rating to percent
 * @param {Number} rating
 * @return {number}
 */
export const getRatingInPercent = (rating) => {
  return Math.round(rating) * STAR_PERCENT;
};


/**
 * Function for calc a distance between two place with GPS coords
 * @param {Array} start
 * @param {Array} end
 * @return {number}
 */
export const calcDistance = (start, end) => {
  const EARTH_RADIUS = 6372795;
  const factorToRadian = Math.PI / 180;

  const lat1 = start[0] * factorToRadian;
  const long1 = start[1] * factorToRadian;
  const lat2 = end[0] * factorToRadian;
  const long2 = end[1] * factorToRadian;

  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  const y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;
  const ad = Math.atan2(y, x);

  const dist = ad * EARTH_RADIUS;
  return dist;
};
