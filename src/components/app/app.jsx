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
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
  })).isRequired
};


export default App;
