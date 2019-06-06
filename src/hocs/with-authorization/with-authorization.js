import React from 'react';
import PropTypes from 'prop-types';


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
          email: `test@test.com`,
          password: `password`
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


export default withAuthorization;
