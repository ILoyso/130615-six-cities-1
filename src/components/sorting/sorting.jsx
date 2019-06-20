import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component for sorting
 * @param {Object} props
 * @return {*}
 */
const Sorting = (props) => {
  const {
    activeOption,
    isOpen,
    onChange,
    onClick,
    options
  } = props;

  const activeClass = `places__option--active`;

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span
      className="places__sorting-type"
      onClick={onClick}
      tabIndex="0"
    >
      {activeOption.text}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isOpen && `places__options--opened`}`}>
      {options.map((option, index) => <li
        className={`places__option ${option.id === activeOption.id && activeClass}`}
        key={index}
        onClick={() => {
          onChange(option.id);
          onClick();
        }}
        tabIndex="0"
      >
        {option.text}
      </li>)}
    </ul>
  </form>;
};


Sorting.propTypes = {
  activeOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};


export default Sorting;
