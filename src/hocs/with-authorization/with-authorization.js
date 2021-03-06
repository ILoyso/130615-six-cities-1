import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {Operation as UserOperation} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';


/**
 * Helper for authorization
 * @param {Node} Component
 * @return {*}
 */
const withAuthorization = (Component) => {

  class WithAuthorization extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        user: {
          email: ``,
          password: ``
        }
      };

      this._logIn = this._logIn.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onChange={this._onChange}
        onLogIn={this._logIn}
        user={this.state.user}
      />;
    }

    /**
     * Update user data in state when form fields changed
     * @param {Event} evt
     * @private
     */
    _onChange(evt) {
      this.setState({
        user: Object.assign({}, this.state.user, {
          [evt.target.name]: evt.target.value
        })
      });
    }

    /**
     * Create data for logIn
     * @param {Event} evt
     * @private
     */
    _logIn(evt) {
      const {email, password} = this.state.user;

      evt.preventDefault();
      this.props.onLogIn({
        email,
        password,
      });

    }
  }

  WithAuthorization.propTypes = {
    onLogIn: PropTypes.func.isRequired,
  };

  return WithAuthorization;
};


const mapDispatchToProps = (dispatch) => ({
  loadPlaces: () => dispatch(DataOperation.loadPlaces()),
  onLogIn: (data) => dispatch(UserOperation.logIn(data)),
});


export {withAuthorization};

export default compose(
    connect(null, mapDispatchToProps),
    withAuthorization
);
