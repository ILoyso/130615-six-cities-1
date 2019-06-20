import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import {CITIES_DATA} from '../../constants/cities';

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});

const SETTINGS = {
  icon: ICON,
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

    this._map = null;
    this._mapRef = React.createRef();
  }

  /**
   * Method for render map
   * @return {*}
   */
  render() {
    const className = this.props.className;

    return <section className={`${className}__map map`}>
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
    const {
      city,
      places
    } = this.props;

    try {
      this._createMap(city);
      this._addPinsToMap(places);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method is invoked when component is updated
   * Here map is updated
   */
  componentDidUpdate() {
    const {
      city,
      places
    } = this.props;
    const cityCenter = CITIES_DATA[city];
    const {zoom} = SETTINGS;

    this._map.setView(cityCenter, zoom);
    this._addPinsToMap(places);
  }

  /**
   * App places pins to map
   * @param {Object} places
   * @private
   */
  _addPinsToMap(places) {
    const {activeItem} = this.props;

    places.forEach((place) => {
      let {icon} = SETTINGS;
      let coordinates = place.coordinates;

      if (activeItem && (activeItem.id === place.id)) {
        icon = ICON_ACTIVE;
        coordinates = activeItem.coordinates;
      }

      return leaflet
        .marker(coordinates, {icon})
        .addTo(this._map);
    });
  }

  /**
   * Initialization of map and set app params
   * @param {String} city
   * @throws {Error} when leaflet (map) not loaded
   * @private
   */
  _createMap(city) {
    const cityCenter = CITIES_DATA[city];

    const {
      marker,
      zoom,
      zoomControl,
    } = SETTINGS;

    this._map = leaflet.map(this._mapRef.current, {
      cityCenter,
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

    this._map.setView(cityCenter, zoom);
  }
}


PlacesMap.propTypes = {
  activeItem: PropTypes.object,
  city: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
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
