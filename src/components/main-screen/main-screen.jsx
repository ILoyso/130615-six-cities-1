import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlacesList from '../places-list/places-list.jsx';
import PlacesMap from '../places-map/places-map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';

import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {getCities, getCity, getCurrentPlaces} from '../../reducer/selectors';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities';


const PlacesListWrapped = withActiveItem(PlacesList);


/**
 * Component for main screen of application
 * @param {Object} props
 * @return {*}
 */
const MainScreen = (props) => {
  const {
    changeCity,
    cities,
    city,
    places
  } = props;

  return <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList
      changeCity={changeCity}
      cities={cities}
      city={city}
    />
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{places.length} {places.length > 1 ? `places` : `place`} to stay in {city}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex="0">
                Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex="0">Popular</li>
              <li className="places__option" tabIndex="0">Price: low to high</li>
              <li className="places__option" tabIndex="0">Price: high to low</li>
              <li className="places__option" tabIndex="0">Top rated first</li>
            </ul>
            {/* <select class="places__sorting-type" id="places-sorting">
              <option class="places__option" value="popular" selected="">Popular</option>
              <option class="places__option" value="to-high">Price: low to high</option>
              <option class="places__option" value="to-low">Price: high to low</option>
              <option class="places__option" value="top-rated">Top rated first</option>
            </select> */}
          </form>
          <PlacesListWrapped
            places={places}
          />
        </section>
        <div className="cities__right-section">
          <PlacesMap
            city={city}
            places={places}
          />
        </div>
      </div>
    </div>
  </main>;
};


/**
 * Function for connect state with current component
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  places: getCurrentPlaces(state),
});


/**
 * Function for connect action creator methods with current component
 * @param {Function} dispatch
 * @return {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => {
    dispatch(CitiesActionCreator.changeCity(city));
  },
});


MainScreen.propTypes = {
  changeCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
};


export {MainScreen};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
