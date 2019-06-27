import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {RATING} from '../../constants/rating';
import {getCommentSendingStatus, getCommentError} from '../../reducer/data/selectors';


/**
 * Component for create comment
 * @param {Object} props
 * @return {*}
 */
const ReviewForm = (props) => {
  const {
    disabled,
    errorCommentsSend,
    isCommentSending,
    onChange,
    onSendComment,
    rating,
    review,
  } = props;

  const disabledStatus = isCommentSending ? `disabled` : ``;


  return <form className="reviews__form form" action="#" method="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {RATING.map((item, index) => <React.Fragment key={index}>
        <input
          checked={parseInt(rating, 10) === item.value ? `checked` : ``}
          className="form__rating-input visually-hidden"
          disabled={disabledStatus}
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
      disabled={disabledStatus}
      id="review"
      maxLength={300}
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
        disabled={disabled ? `disabled` : disabledStatus}
        onClick={onSendComment}
        type="submit"
      >
        Submit
      </button>
    </div>
    {errorCommentsSend && <div style={{color: `red`, padding: `20px 0 0 0`}}>
      Something goes wrong, please try again later. The error is: {errorCommentsSend}
    </div>}
  </form>;
};


ReviewForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  errorCommentsSend: PropTypes.string,
  id: PropTypes.number.isRequired,
  isCommentSending: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSendComment: PropTypes.func.isRequired,
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};


/**
 * Function for connect state with current component
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  errorCommentsSend: getCommentError(state),
  isCommentSending: getCommentSendingStatus(state),
});


export {ReviewForm};

export default connect(mapStateToProps)(ReviewForm);
