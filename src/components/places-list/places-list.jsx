import React from 'react';
import PropTypes from 'prop-types';

import PlaceCard from '../place-card/place-card.jsx';


// Component for rendering list of places
const PlacesList = (props) => {
  const {
    classHelper,
    places,
    setActiveItem
  } = props;

  let mainClass = classHelper || null;
  let listClass = null;
  let cardClass = null;

  switch (classHelper) {
    case `cities`: {
      listClass = `cities__places-list`;
      cardClass = `cities__place-card`;
      break;
    }

    case `near`: {
      listClass = `near-places__list`;
      cardClass = `near-places__card`;
      break;
    }

    default: {
      return null;
    }
  }

  return <div className={`${listClass} places__list tabs__content`}>
    {places.map((place, index) => <PlaceCard
      classCard={cardClass}
      classMain={mainClass}
      info={place}
      key={index}
      onCardImageClick={setActiveItem}
    />)}
  </div>;
};


PlacesList.propTypes = {
  classHelper: PropTypes.string,
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired
};


export default PlacesList;
