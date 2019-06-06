import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities';
import {ActionCreator as UserActionCreator} from '../../reducer/user/user';
import Header from '../header/header.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from '../sign-in/sign-in.jsx';

import {Operation} from '../../reducer/user/user';
import {
  getAuthorizationStatus,
  getAuthorizedStatus,
  getCity,
  getCities,
  getCurrentPlaces,
  getUser
} from '../../reducer/selectors';
import withAuthorization from '../../hocs/with-authorization/with-authorization';


const AuthorizationScreenWrapped = withAuthorization(SignIn);


/**
 * Application component, here the whole process begins
 * @param {Object} props
 * @return {*}
 */
class App extends React.PureComponent {

  /**
   * Method for render app screen
   * @return {*}
   */
  render() {
    const {
      checkAuthorization,
      changeAuthorizationStatus,
      isAuthorizationRequired,
      isAuthorized,
      user
    } = this.props;

    checkAuthorization();

    return <>
      <Header
        isAuthorized={isAuthorized}
        onSignInClick={() => {
          changeAuthorizationStatus(isAuthorizationRequired);
        }}
        user={user}
      />
      {this._getScreen()}
    </>;
  }

  _getScreen() {
    const {
      changeCity,
      cities,
      city,
      isAuthorizationRequired,
      isAuthorized,
      logIn,
      places
    } = this.props;

    if (isAuthorizationRequired && !isAuthorized) {
      return <AuthorizationScreenWrapped
        onLogIn={logIn}
      />;
    }

    return <MainScreen
      changeCity={changeCity}
      cities={cities}
      city={city}
      places={places}
    />;
  }
}


/**
 * Function for connect state with app
 * @param {Object} state
 * @param {Object} ownProps
 * @return {Object}
 */
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  isAuthorized: getAuthorizedStatus(state),
  places: getCurrentPlaces(state),
  user: getUser(state)
});


/**
 * Function for connect action creator methods with app
 * @param {Function} dispatch
 * @return {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => {
    dispatch(CitiesActionCreator.changeCity(city));
  },

  checkAuthorization: () => dispatch(Operation.getUserData()),

  changeAuthorizationStatus: (status) => dispatch(UserActionCreator.requireAuthorization(!status)),

  logIn: (data) => dispatch(Operation.logIn(data)),
});


App.propTypes = {
  changeCity: PropTypes.func.isRequired,
  checkAuthorization: PropTypes.func.isRequired,
  changeAuthorizationStatus: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    img: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  user: PropTypes.object.isRequired,
};


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
