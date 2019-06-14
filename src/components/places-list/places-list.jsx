import React from 'react';
import PropTypes from 'prop-types';

import PlaceCard from '../place-card/place-card.jsx';


// Component for rendering list of places
const PlacesList = (props) => {
  const {
    places,
    setActiveItem
  } = props;

  return <div className="cities__places-list places__list tabs__content">
    {places.map((place, index) => <PlaceCard
      info={place}
      key={index}
      onCardHover={setActiveItem}
      onCardImageClick={setActiveItem}
    />)}
  </div>;
};


PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired
};


export default PlacesList;
