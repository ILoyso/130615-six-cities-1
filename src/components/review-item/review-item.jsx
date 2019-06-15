import React from 'react';
import PropTypes from 'prop-types';

import {getRatingInPercent} from '../../utils/utils';


/**
 * Component for review item
 * @param {Object} props
 * @return {*}
 */
const ReviewItem = (props) => {
  const {commentItem} = props;
  const {
    user,
    rating,
    comment,
    date,
  } = commentItem;

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatar} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">{user.name}</span>
      {user.isPro && <span className="property__user-status">Pro</span>}
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{comment}</p>
      <time className="reviews__time" dateTime="2019-04-24">April 2019 ????? {date}</time>
    </div>
  </li>;
};


ReviewItem.propTypes = {
  commentItem: PropTypes.shape({
    user: PropTypes.shape({
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};


export default ReviewItem;
