import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import history from '../../utils/history';
import {Routes} from '../../constants/routes';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import PlacesList from '../places-list/places-list.jsx';
import PlacesMap from '../places-map/places-map.jsx';

import {getRatingInPercent} from '../../utils/utils';
import {Operation} from '../../reducer/data/data';
import {getComments, getNearestPlaces} from '../../reducer/data/selectors';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {getAuthorizationStatus} from '../../reducer/user/selectors';


const PlacesListWrapped = withActiveItem(PlacesList);


// PlaceProperty component
class PlaceProperty extends React.PureComponent {

  /**
   * Method for render component
   * @return {*}
   */
  render() {
    const {
      comments,
      isAuthorizationRequired,
      nearestPlaces,
      place,
      setFavorite
    } = this.props;

    const {
      bedrooms,
      city,
      description,
      goods,
      host,
      id,
      images,
      isFavorite,
      isPremium,
      maxAdults,
      price,
      rating,
      title,
      type,
    } = place;

    return <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image, index) => <div className="property__image-wrapper" key={index}>
              <img className="property__image" src={image} alt="Photo studio" />
            </div>)}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">{title}</h1>
              <button
                className={`property__bookmark-button ${isFavorite && `property__bookmark-button--active`} button`}
                onClick={() => {
                  if (isAuthorizationRequired) {
                    history.push(Routes.LOGIN);
                  } else {
                    setFavorite(place);
                  }
                }}
                type="button"
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{Math.round(rating)}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good, index) => <li className="property__inside-item" key={index}>
                  {good}
                </li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={host.avatar} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {host.name}
                </span>
                {host.isPro && <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>

            <ReviewsList
              comments={comments}
              id={id}
              isAuthorizationRequired={isAuthorizationRequired}
            />
          </div>
        </div>

        <PlacesMap
          city={city}
          className={`property`}
          places={nearestPlaces}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          <PlacesListWrapped
            classHelper={`near`}
            places={nearestPlaces}
          />
        </section>
      </div>
    </main>;
  }

  /**
   * Method is invoked immediately after a component is mounted (inserted into the tree)
   * Here is comments downloaded
   */
  componentDidMount() {
    const {place} = this.props;
    this.props.loadComments(place.id);
  }
}


PlaceProperty.propTypes = {
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
  isAuthorizationRequired: PropTypes.bool.isRequired,
  loadComments: PropTypes.func.isRequired,
  nearestPlaces: PropTypes.arrayOf(PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    isPremium: PropTypes.bool.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  place: PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  setFavorite: PropTypes.func.isRequired,
};


/**
 * Function for connect state with current component
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  comments: getComments(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  nearestPlaces: getNearestPlaces(state, ownProps.place.id)
});


/**
 * Function for connect action creator methods with current component
 * @param {Function} dispatch
 * @return {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(Operation.loadComments(id)),
  setFavorite: (place) => dispatch(Operation.setFavorite(place))
});


export {PlaceProperty};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceProperty);
