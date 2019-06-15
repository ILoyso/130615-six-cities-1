import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../header/header.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorites/favorites.jsx';
import PlaceProperty from '../place-property/place-property.jsx';

import withAuthorization from '../../hocs/with-authorization/with-authorization';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import {getCurrentPlaces} from '../../reducer/data/selectors';


const SignInWrapped = withPrivateRoute(withAuthorization(SignIn), `/`);
const FavoritesWrapped = withPrivateRoute(Favorites);


/**
 * Application component, here the whole process begins
 * @param {Object} props
 * @return {*}
 */
const App = (props) => {
  const {places} = props;

  return <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <MainScreen />}></Route>
      <Route path="/login" render={() => <SignInWrapped />}></Route>
      <Route path="/favorites" render={() => <FavoritesWrapped />} />

      {places.map((place, index) => <Route path={`/offer/${place.id}`} render={() => <PlaceProperty
        place={place}
      />} key={index}/>)}
    </Switch>
  </BrowserRouter>;
};

/**
 * Function for connect state with current component
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  places: getCurrentPlaces(state),
});


App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired
};


export {App};

export default connect(mapStateToProps)(App);
