import React from 'react';
import PropTypes from 'prop-types';

import PlaceCard from '../place-card/place-card.jsx';


/**
 * Component for rendering list of places
 * @param {Object} props
 * @return {*}
 */
const PlacesList = (props) => {
  const {places} = props;

  return <div className="cities__places-list places__list tabs__content">
    {places.map((place, index) => <PlaceCard
      info={place}
      key={index}
      onTitleClick={() => {}}
    />)}
  </div>;
};


PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
};


export default PlacesList;
