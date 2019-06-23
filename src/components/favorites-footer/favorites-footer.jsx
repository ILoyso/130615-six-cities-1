import React from 'react';
import {Link} from 'react-router-dom';


/**
 * Component for favorites footer
 * @return {*}
 */
const FavoritesFooter = () => {
  return <footer className="footer">
    <Link className="footer__logo-link" to={`/`}>
      <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
    </Link>
  </footer>;
};


export default FavoritesFooter;
