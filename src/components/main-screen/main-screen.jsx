import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlacesWrapper from '../places-wrapper/places-wrapper.jsx';
import CitiesList from '../cities-list/cities-list.jsx';

import withSorting from '../../hocs/with-sorting/with-sorting';
import {getCities, getCity} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/data/data';


const PlacesWrapperWrapped = withSorting(PlacesWrapper);

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
  } = props;

  return <div className="page page--gray page--main">
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        changeCity={changeCity}
        cities={cities}
        city={city}
      />
      <PlacesWrapperWrapped />
    </main>
  </div>;
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


MainScreen.propTypes = {
  changeCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
};


export {MainScreen};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
