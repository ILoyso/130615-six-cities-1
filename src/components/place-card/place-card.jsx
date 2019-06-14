import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getRatingInPercent} from '../../utils/utils';


/**
 * Component for place card
 * @param {Object} props
 * @return {*}
 */
const PlaceCard = (props) => {
  const {
    info,
    onCardHover,
    onCardImageClick
  } = props;

  const {
    id,
    img,
    isPremium,
    price,
    rating,
    title,
    type
  } = info;

  return <article className="cities__place-card place-card" onMouseEnter={() => {
    onCardHover(info);
  }}>
    {isPremium && <div className="place-card__mark">
      <span>Premium</span>
    </div>}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onClick={() => {
        onCardImageClick(info);
      }}>
        <img className="place-card__image" src={img} width="260" height="200" alt="Place image" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};


PlaceCard.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardImageClick: PropTypes.func.isRequired
};


export default PlaceCard;
