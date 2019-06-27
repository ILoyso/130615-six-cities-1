import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FavoritesEmpty from '../favotires-empty/favotires-empty.jsx';
import FavoritesFooter from '../favorites-footer/favorites-footer.jsx';
import PlacesList from '../places-list/places-list.jsx';
import {getFavoritePlaces, getFavoriteCities} from '../../reducer/data/selectors';


/**
 * Component for favorites
 * @param {Object} props
 * @return {*}
 */
const Favorites = (props) => {
  const {
    cities,
    places
  } = props;

  return places.length === 0 ? <FavoritesEmpty /> : <>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>

          <ul className="favorites__list">
            {Array.from(cities).map((city, index) => <li className="favorites__locations-items" key={index}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>

              <PlacesList
                classHelper={`favorites`}
                places={places.filter((place) => place.city === city)}
              />
            </li>)}
          </ul>
        </section>
      </div>
    </main>
    <FavoritesFooter />
  </>;
};


Favorites.propTypes = {
  cities: PropTypes.instanceOf(Set).isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};


/**
 * Function for connect state with current component
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  cities: getFavoriteCities(state),
  places: getFavoritePlaces(state),
});


export {Favorites};

export default connect(mapStateToProps)(Favorites);
