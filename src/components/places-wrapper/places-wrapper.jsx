import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlacesList from '../places-list/places-list.jsx';
import PlacesMap from '../places-map/places-map.jsx';
import Sorting from '../sorting/sorting.jsx';

import withActiveItem from '../../hocs/with-active-item/with-active-item';
import withOpening from '../../hocs/with-opening/with-opening';
import {getCity} from '../../reducer/data/selectors';


const PlacesListWrapped = withActiveItem(PlacesList);
const SortingWrapped = withOpening(Sorting);


/**
 * Component for places wrapper
 * @param {Object} props
 * @return {*}
 */
const PlacesWrapper = (props) => {
  const {
    activeOption,
    city,
    onChange,
    options,
    sortingPlaces
  } = props;

  return <div className="cities__places-wrapper">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortingPlaces.length} {sortingPlaces.length > 1 ? `places` : `place`} to stay in {city}</b>

        <SortingWrapped
          activeOption={activeOption}
          onChange={onChange}
          options={options}
        />

        <PlacesListWrapped
          classHelper={`cities`}
          places={sortingPlaces}
        />
      </section>
      <div className="cities__right-section">
        <PlacesMap
          city={city}
          className={`cities`}
          places={sortingPlaces}
        />
      </div>
    </div>
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
});


PlacesWrapper.propTypes = {
  activeOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  city: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  sortingPlaces: PropTypes.arrayOf(PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};


export {PlacesWrapper};

export default connect(mapStateToProps)(PlacesWrapper);
