import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ROUTES} from '../../constants/routes';
import Header from '../header/header.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import MainScreenEmpty from '../main-screen-empty/main-screen-empty.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorites/favorites.jsx';
import PlaceProperty from '../place-property/place-property.jsx';

import withSorting from '../../hocs/with-sorting/with-sorting';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import withAuthorization from '../../hocs/with-authorization/with-authorization';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import {getCurrentPlaces} from '../../reducer/data/selectors';


const MainScreenWrapped = withActiveItem(withSorting(MainScreen));
const MainScreenEmptyWrapped = withActiveItem(withSorting(MainScreenEmpty));
const SignInWrapped = withPrivateRoute(withAuthorization(SignIn), ROUTES.HOME);
const FavoritesWrapped = withPrivateRoute(Favorites);


/**
 * Application component, here the whole process begins
 * @param {Object} props
 * @return {*}
 */
const App = (props) => {
  const {places} = props;

  return <>
    <Header />
    <Switch>
      <Route exact path={ROUTES.HOME} render={() => {
        if (places.length === 0) {
          return <MainScreenEmptyWrapped />;
        }
        return <MainScreenWrapped />;
      }}></Route>
      <Route path={ROUTES.LOGIN} render={() => <SignInWrapped />}></Route>
      <Route path={ROUTES.FAVORITES} render={() => <FavoritesWrapped />} />

      {places.map((place, index) => <Route path={`${ROUTES.OFFER}/${place.id}`} render={() => <PlaceProperty
        place={place}
      />} key={index}/>)}
    </Switch>
  </>;
};


App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired
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


export {App};

export default connect(mapStateToProps)(App);
