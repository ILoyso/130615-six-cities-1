import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const SETTINGS = {
  center: [52.38333, 4.9],
  icon: leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  }),
  marker: true,
  zoom: 12,
  zoomControl: false
};

const LEAFLET_PARAMS = {
  copy: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  picture: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
};


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
   * @throws {Error} when leaflet (map) not loaded
   * @private
   */
  _createMap() {
    const {places} = this.props;

    const {
      center,
      icon,
      marker,
      zoom,
      zoomControl,
    } = SETTINGS;

    const map = leaflet.map(this._mapRef.current, {
      center,
      layers: [
        leaflet
          .tileLayer(LEAFLET_PARAMS.picture, {
            attribution: LEAFLET_PARAMS.copy
          }),
      ],
      marker,
      zoom,
      zoomControl,
    });

    map.setView(center, zoom);

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
