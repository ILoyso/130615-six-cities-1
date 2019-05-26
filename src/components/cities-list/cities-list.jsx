import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component for CitiesList
 * @param {Object} props
 * @return {*}
 */
const CitiesList = (props) => {
  const {
    changeCity,
    cities,
    city
  } = props;

  return <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((cityName, index) => <li className="locations__item" key={index}>
          <a
            className={`locations__item-link tabs__item ${city === cityName ? `tabs__item--active` : ``}`}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              changeCity(cityName);
            }}
          >
            <span>{cityName}</span>
          </a>
        </li>)}
      </ul>
    </section>
  </div>;
};


CitiesList.propTypes = {
  changeCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired
};


export default CitiesList;
