import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CitiesList from '../cities-list/cities-list.jsx';
import {getCities, getCity} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/data/data';


/**
 * Component for MainScreenEmpty
 * @param {Object} props
 * @return {*}
 */
const MainScreenEmpty = (props) => {
  const {
    changeCity,
    cities,
    city,
    onChangeSorting
  } = props;

  return <div className="page page--gray page--main">
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        changeCity={changeCity}
        changeSorting={onChangeSorting}
        cities={cities}
        city={city}
      />
      <div className="cities__places-wrapper">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
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


MainScreenEmpty.propTypes = {
  changeCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
};


export {MainScreenEmpty};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenEmpty);
