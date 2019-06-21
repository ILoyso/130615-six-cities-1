import React from 'react';
import PropTypes from 'prop-types';

import {RATING} from '../../constants/rating';

/**
 * Component for create comment
 * @param {Object} props
 * @return {*}
 */
const ReviewForm = (props) => {
  const {
    onChange,
    onSendComment,
    review,
  } = props;

  return <form className="reviews__form form" action="#" method="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {RATING.map((item, index) => <React.Fragment key={index}>
        <input
          className="form__rating-input visually-hidden"
          id={`${item.value}-stars`}
          name="rating"
          onChange={onChange}
          type="radio"
          value={item.value}
        />
        <label htmlFor={`${item.value}-stars`} className="reviews__rating-label form__rating-label" title={item.text}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>)}
    </div>
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      onChange={onChange}
      placeholder="Tell how was your stay, what you like and what can be improved"
      value={review}
    ></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe
        your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button
        className="reviews__submit form__submit button"
        disabled=""
        onClick={onSendComment}
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>;
};


ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSendComment: PropTypes.func.isRequired,
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};


export default ReviewForm;
