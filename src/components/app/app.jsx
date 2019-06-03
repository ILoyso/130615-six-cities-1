import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/cities/cities';
import MainScreen from '../main-screen/main-screen.jsx';

import {getCity, getCities, getCurrentPlaces} from '../../reducer/selectors';


/**
 * Application component, here the whole process begins
 * @param {Object} props
 * @return {*}
 */
const App = (props) => {
  const {
    changeCity,
    cities,
    city,
    places
  } = props;

  return <MainScreen
    changeCity={changeCity}
    cities={cities}
    city={city}
    places={places}
  />;
};


/**
 * Function for connect state with app
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
 * Function for connect action creator methods with app
 * @param {Function} dispatch
 * @return {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});


App.propTypes = {
  changeCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
};


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
