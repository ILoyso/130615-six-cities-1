import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import history from '../../utils/history';
import {Routes} from '../../constants/routes';
import {getRatingInPercent} from '../../utils/utils';
import {Operation} from '../../reducer/data/data';
import {getAuthorizationStatus} from '../../reducer/user/selectors';


/**
 * Component for place card
 * @param {Object} props
 * @return {*}
 */
const PlaceCard = (props) => {
  const {
    classCard,
    classCardInfo,
    classMain,
    info,
    isAuthorizationRequired,
    onCardImageClick,
    setFavorite
  } = props;

  const {
    id,
    img,
    isFavorite,
    isPremium,
    price,
    rating,
    title,
    type
  } = info;

  return <article className={`${classCard} place-card`}>
    {isPremium && <div className="place-card__mark">
      <span>Premium</span>
    </div>}
    <div className={`${classMain}__image-wrapper place-card__image-wrapper`}>
      <a href="#" onClick={(evt) => {
        evt.preventDefault();

        if (onCardImageClick) {
          onCardImageClick(info);
        }
      }}>
        <img className="place-card__image" src={img} width="260" height="200" alt="Place image" />
      </a>
    </div>
    <div className={`place-card__info ${classCardInfo}`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button ${isFavorite && `place-card__bookmark-button--active`} button`}
          onClick={() => {
            if (isAuthorizationRequired) {
              history.push(Routes.LOGIN);
            } else {
              setFavorite(info);
            }
          }}
          type="button">
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
        <Link to={`${Routes.OFFER}/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};


PlaceCard.propTypes = {
  classCard: PropTypes.string,
  classCardInfo: PropTypes.string,
  classMain: PropTypes.string,
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onCardImageClick: PropTypes.func,
  setFavorite: PropTypes.func.isRequired,
};


/**
 * Function for connect state with current component
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state),
});


/**
 * Function for connect action creator methods with current component
 * @param {Function} dispatch
 * @return {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  setFavorite: (place) => dispatch(Operation.setFavorite(place))
});


export {PlaceCard};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
