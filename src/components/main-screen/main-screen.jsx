import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CitiesList from '../cities-list/cities-list.jsx';
import Sorting from '../sorting/sorting.jsx';
import PlacesList from '../places-list/places-list.jsx';
import PlacesMap from '../places-map/places-map.jsx';

import withOpening from '../../hocs/with-opening/with-opening';
import {getCities, getCity} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/data/data';


const SortingWrapped = withOpening(Sorting);


/**
 * Component for main screen of application
 * @param {Object} props
 * @return {*}
 */
const MainScreen = (props) => {
  const {
    activeItem,
    activeOption,
    changeCity,
    cities,
    city,
    onChangeSorting,
    options,
    setActiveItem,
    sortingPlaces
  } = props;

  // console.log(sortingPlaces)

  return <div className="page page--gray page--main">
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        changeCity={changeCity}
        changeSorting={onChangeSorting}
        cities={cities}
        city={city}
      />
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{sortingPlaces.length} {sortingPlaces.length > 1 ? `places` : `place`} to stay in {city}</b>

            <SortingWrapped
              activeOption={activeOption}
              onChange={onChangeSorting}
              options={options}
            />

            <PlacesList
              classHelper={`cities`}
              places={sortingPlaces}
              setActiveItem={setActiveItem}
            />
          </section>
          <div className="cities__right-section">
            <PlacesMap
              activeItem={activeItem}
              city={city}
              className={`cities`}
              places={sortingPlaces}
            />
          </div>
        </div>
      </div>
    </main>
  </div>;
};


MainScreen.propTypes = {
  activeItem: PropTypes.object,
  activeOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  changeCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  sortingPlaces: PropTypes.arrayOf(PropTypes.shape({
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
  city: getCity(state),
  cities: getCities(state),
});


/**
 * Function for connect action creator methods with current component
 * @param {Function} dispatch
 * @return {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => {
    dispatch(ActionCreator.changeCity(city));
  },
});


export {MainScreen};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
