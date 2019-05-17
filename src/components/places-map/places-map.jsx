import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';


// PlacesMap component
class PlacesMap extends React.PureComponent {

  /**
   * Create PlacesMap component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  /**
   * Method for render map
   * @return {*}
   */
  render() {
    return <section className="cities__map map">
      <div
        id="map"
        ref={this._mapRef}
        style={{height: `100%`}}
      ></div>
    </section>;
  }

  /**
   * Method is invoked immediately after a component is mounted (inserted into the tree)
   * Here map is created
   */
  componentDidMount() {
    try {
      this._createMap();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Initialization of map and set app params
   * @private
   */
  _createMap() {
    const {places} = this.props;

    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;

    const map = leaflet.map(this._mapRef.current, {
      center: city,
      marker: true,
      zoom,
      zoomControl: false
    });

    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    places.forEach((place) => {
      const coordinates = place.coordinates;
      return leaflet
        .marker(coordinates, {icon})
        .addTo(map);
    });
  }
}


PlacesMap.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
};


export default PlacesMap;
