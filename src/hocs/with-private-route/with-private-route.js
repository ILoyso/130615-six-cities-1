import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Redirect} from 'react-router-dom';

import {ROUTES} from '../../constants/routes';
import {getAuthorizationStatus} from '../../reducer/user/selectors';


const withPrivateRoute = (Component, anotherPath = undefined) => {
  const WithPrivateRoute = (props) => {
    const {isAuthorizationRequired} = props;

    if (!isAuthorizationRequired && anotherPath) {
      return <Redirect to={anotherPath} />;
    }

    return !anotherPath && isAuthorizationRequired
      ? <Redirect to={ROUTES.HOME} />
      : <Component
        {...props}
      />;
  };

  WithPrivateRoute.propTypes = {
    isAuthorizationRequired: PropTypes.bool
  };

  return WithPrivateRoute;
};


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state)
});


export default compose(
    connect(mapStateToProps),
    withPrivateRoute
);
