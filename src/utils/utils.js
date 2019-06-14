const MAX_RATING = 5;
const MAX_RATING_PERCENT = 100;

/**
 * Function for convert rating to percent
 * @param {Number} rating
 * @return {number}
 */
export const getRatingInPercent = (rating) => {
  return (rating * MAX_RATING_PERCENT) / MAX_RATING;
};
