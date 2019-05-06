import React from 'react';
import PropTypes from 'prop-types';

import MainScreen from '../main-screen/main-screen.jsx';


/**
 * Application component, here the whole process begins
 * @param {Object} props
 * @return {*}
 */
const App = (props) => {
  const {places} = props;

  return <MainScreen
    places={places}
  />;
};


App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
};


export default App;
