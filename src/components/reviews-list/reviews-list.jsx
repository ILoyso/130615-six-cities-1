import React from 'react';
import PropTypes from 'prop-types';

import ReviewItem from '../review-item/review-item.jsx';
import ReviewForm from '../review-form/review-form.jsx';

import withSendComments from '../../hocs/with-send-comments/with-send-comments';


const ReviewFormWrapped = withSendComments(ReviewForm);


/**
 * Component for reviews list
 * @param {Object} props
 * @return {*}
 */
const ReviewsList = (props) => {
  const {
    comments,
    id,
    isAuthorizationRequired
  } = props;

  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ul className="reviews__list">
      {comments.map((comment, index) => <ReviewItem
        commentItem={comment}
        key={index}
      />)}
    </ul>
    {isAuthorizationRequired || <ReviewFormWrapped
      id={id}
    />}
  </section>;
};


ReviewsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  id: PropTypes.number.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired
};


export default ReviewsList;
