import React from 'react';
import PropTypes from 'prop-types';

import PlaceCard from '../place-card/place-card.jsx';


// Component for rendering list of places
class PlacesList extends React.PureComponent {

  /**
   * Create PlacesList component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this._handlerCardAction = this._handlerCardAction.bind(this);
  }

  /**
   * Method for render place list
   * @return {*}
   */
  render() {
    const {places} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {places.map((place, index) => <PlaceCard
        info={place}
        key={index}
        onCardHover={this._handlerCardAction}
        onCardImageClick={this._handlerCardAction}
        onTitleClick={() => {}}
      />)}
    </div>;
  }

  _handlerCardAction(card) {
    this.setState({
      activeCard: card
    });

    return card;
  }
}


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
